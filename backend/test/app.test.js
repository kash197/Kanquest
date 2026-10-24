import assert from 'node:assert/strict'
import { after, before, test } from 'node:test'
import { createApp } from '../src/app.js'

let server
let baseUrl

before(async () => {
  const app = createApp({
    evaluateAnswer: async () => ({
      language: 'romanized_kannada',
      correct: true,
    }),
  })
  server = app.listen(0, '127.0.0.1')
  await new Promise((resolve, reject) => {
    server.once('listening', resolve)
    server.once('error', reject)
  })
  baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
  if (!server) return
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()))
  })
})

async function postEvaluation(body) {
  return fetch(`${baseUrl}/api/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

test('health endpoint responds without revealing provider configuration', async () => {
  const response = await fetch(`${baseUrl}/api/health`)
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { status: 'ok' })
})

test('invalid input is rejected before calling the evaluator', async () => {
  let evaluatorCalled = false
  const app = createApp({
    evaluateAnswer: async () => {
      evaluatorCalled = true
      return { language: 'romanized_kannada', correct: true }
    },
  })
  const localServer = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => localServer.once('listening', resolve))

  try {
    const response = await fetch(
      `http://127.0.0.1:${localServer.address().port}/api/evaluate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turnId: 'restaurant-turn-1', answer: '   ' }),
      },
    )
    assert.equal(response.status, 400)
    assert.equal((await response.json()).error.code, 'INVALID_REQUEST')
    assert.equal(evaluatorCalled, false)
  } finally {
    await new Promise((resolve) => localServer.close(resolve))
  }
})

test('request cannot provide an answer key or other extra fields', async () => {
  const response = await postEvaluation({
    turnId: 'restaurant-turn-1',
    answer: 'Nanage ondu dose beku.',
    correctAnswer: 'client supplied value',
  })
  assert.equal(response.status, 400)
  assert.equal((await response.json()).error.code, 'INVALID_REQUEST')
})

test('answers longer than 200 characters are rejected', async () => {
  const response = await postEvaluation({
    turnId: 'restaurant-turn-1',
    answer: 'a'.repeat(201),
  })
  assert.equal(response.status, 400)
  assert.equal((await response.json()).error.code, 'INVALID_REQUEST')
})

test('unknown turn IDs do not call the evaluator', async () => {
  let evaluatorCalled = false
  const app = createApp({
    evaluateAnswer: async () => {
      evaluatorCalled = true
      return { language: 'romanized_kannada', correct: true }
    },
  })
  const localServer = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => localServer.once('listening', resolve))

  try {
    const response = await fetch(
      `http://127.0.0.1:${localServer.address().port}/api/evaluate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turnId: 'unknown-turn', answer: 'hello' }),
      },
    )
    assert.equal(response.status, 404)
    assert.equal((await response.json()).error.code, 'UNKNOWN_TURN')
    assert.equal(evaluatorCalled, false)
  } finally {
    await new Promise((resolve) => localServer.close(resolve))
  }
})

test('known accepted answer returns a correct evaluation', async () => {
  let received
  const app = createApp({
    evaluateAnswer: async (input) => {
      received = input
      return { language: 'romanized_kannada', correct: true }
    },
  })
  const localServer = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => localServer.once('listening', resolve))

  try {
    const response = await fetch(
      `http://127.0.0.1:${localServer.address().port}/api/evaluate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnId: 'restaurant-turn-1',
          answer: 'Nanage ondu dose beku.',
        }),
      },
    )
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), {
      correct: true,
      feedback: 'Yep, one dosa.',
    })
    assert.equal(received.turnId, 'restaurant-turn-1')
    assert.match(received.rubric, /exactly one dosa/)
    assert.equal(received.answer, 'Nanage ondu dose beku.')
    assert.equal('correctAnswer' in received, false)
  } finally {
    await new Promise((resolve) => localServer.close(resolve))
  }
})

test('correct answers use natural feedback for each restaurant turn', async () => {
  const expectedFeedback = [
    ['restaurant-turn-2', 'Right, you asked if it’s spicy.'],
    ['restaurant-turn-3', 'Exactly. No extras, just the bill.'],
  ]

  for (const [turnId, feedback] of expectedFeedback) {
    const response = await postEvaluation({ turnId, answer: 'A correct response.' })
    assert.equal(response.status, 200)
    assert.deepEqual(await response.json(), { correct: true, feedback })
  }
})

test('Tulu, English or mixed, other, and uncertain classifications cannot pass', async () => {
  let detectedLanguage = 'tulu'
  const app = createApp({
    evaluateAnswer: async () => ({
      language: detectedLanguage,
      correct: true,
    }),
  })
  const localServer = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => localServer.once('listening', resolve))

  try {
    const rejectedResponses = [
      ['tulu', 'mocked Tulu response', 'restaurant-turn-1'],
      ['english_or_mixed', 'is the dosa khaara?', 'restaurant-turn-2'],
      ['other', 'mocked response in another language', 'restaurant-turn-1'],
      ['uncertain', 'uncertain language response', 'restaurant-turn-1'],
    ]

    for (const [language, answer, turnId] of rejectedResponses) {
      detectedLanguage = language
      const response = await fetch(
        `http://127.0.0.1:${localServer.address().port}/api/evaluate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            turnId,
            answer,
          }),
        },
      )

      assert.equal(response.status, 200)
      assert.deepEqual(await response.json(), {
        correct: false,
        feedback: 'Please use Kannada written with English letters and try again.',
      })
    }
  } finally {
    await new Promise((resolve) => localServer.close(resolve))
  }
})

test('known rejected answer returns incorrect feedback without an answer key', async () => {
  const app = createApp({
    evaluateAnswer: async () => ({
      language: 'romanized_kannada',
      correct: false,
    }),
  })
  const localServer = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => localServer.once('listening', resolve))

  try {
    const response = await fetch(
      `http://127.0.0.1:${localServer.address().port}/api/evaluate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnId: 'restaurant-turn-3',
          answer: 'Bring me more food.',
        }),
      },
    )
    assert.equal(response.status, 200)
    const result = await response.json()
    assert.deepEqual(result, {
      correct: false,
      feedback: 'Try again and include both important parts of the task.',
    })
    assert.equal(JSON.stringify(result).includes('bill kodi'), false)
  } finally {
    await new Promise((resolve) => localServer.close(resolve))
  }
})

test('AI failures remain retryable and do not become incorrect answers', async () => {
  const app = createApp({
    evaluateAnswer: async () => {
      throw new Error('mocked provider quota failure')
    },
  })
  const localServer = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => localServer.once('listening', resolve))

  try {
    const response = await fetch(
      `http://127.0.0.1:${localServer.address().port}/api/evaluate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnId: 'restaurant-turn-2',
          answer: 'Dose spicy ideya?',
        }),
      },
    )
    assert.equal(response.status, 503)
    assert.deepEqual(await response.json(), {
      error: {
        code: 'AI_UNAVAILABLE',
        message: 'We could not check your response right now. Please retry.',
        retryable: true,
      },
    })
  } finally {
    await new Promise((resolve) => localServer.close(resolve))
  }
})

test('missing API key does not construct a Gemini client', async () => {
  const { createGeminiEvaluator } = await import('../src/evaluator.js')
  let clientCreated = false
  const evaluate = createGeminiEvaluator({
    getApiKey: () => '',
    createClient: () => {
      clientCreated = true
      throw new Error('client should not be constructed')
    },
  })
  const app = createApp({ evaluateAnswer: evaluate })
  const localServer = app.listen(0, '127.0.0.1')
  await new Promise((resolve) => localServer.once('listening', resolve))

  try {
    const response = await fetch(
      `http://127.0.0.1:${localServer.address().port}/api/evaluate`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnId: 'restaurant-turn-1',
          answer: 'one dosa',
        }),
      },
    )
    assert.equal(response.status, 503)
    assert.equal((await response.json()).error.code, 'AI_NOT_CONFIGURED')
    assert.equal(clientCreated, false)
  } finally {
    await new Promise((resolve) => localServer.close(resolve))
  }
})

test('Gemini evaluator uses the approved model with private structured output', async () => {
  const { createGeminiEvaluator } = await import('../src/evaluator.js')
  let interactionRequest
  const evaluate = createGeminiEvaluator({
    getApiKey: () => 'mock-key',
    createClient: () => ({
      interactions: {
        create: async (request) => {
          interactionRequest = request
          return {
            output_text: '{"language":"romanized_kannada","correct":true}',
          }
        },
      },
    }),
  })

  const result = await evaluate({
    rubric: 'Order one dosa.',
    answer: 'Nanage ondu dose beku.',
  })

  assert.deepEqual(result, { language: 'romanized_kannada', correct: true })
  assert.equal(interactionRequest.model, 'gemini-3.1-flash-lite')
  assert.equal(interactionRequest.store, false)
  assert.equal(interactionRequest.response_format.mime_type, 'application/json')
  assert.deepEqual(
    interactionRequest.response_format.schema.properties.language.enum,
    [
      'romanized_kannada',
      'tulu',
      'english_or_mixed',
      'other',
      'uncertain',
    ],
  )
  assert.match(interactionRequest.system_instruction, /Tulu is a separate language/)
  assert.match(
    interactionRequest.system_instruction,
    /is the dosa khaara\?" is english_or_mixed/,
  )
  assert.match(interactionRequest.system_instruction, /loanwords such as dosa or bill/)
  assert.match(interactionRequest.input, /Order one dosa/)
  assert.match(interactionRequest.input, /Nanage ondu dose beku/)
})

test('malformed Gemini output is treated as an evaluation failure', async () => {
  const { createGeminiEvaluator } = await import('../src/evaluator.js')
  const evaluate = createGeminiEvaluator({
    getApiKey: () => 'mock-key',
    createClient: () => ({
      interactions: {
        create: async () => ({
          output_text: '{"language":"romanized_kannada","correct":"yes"}',
        }),
      },
    }),
  })

  await assert.rejects(
    evaluate({ rubric: 'Order one dosa.', answer: 'hello' }),
    /invalid evaluation response/i,
  )
})
