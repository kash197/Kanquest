import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  evaluationRetryMessage,
  readEvaluationResponse,
} from '../src/utils/evaluationResponse.js'

test('an empty API response becomes a retryable message', async () => {
  const result = await readEvaluationResponse(
    new Response(null, { status: 502 }),
  )

  assert.deepEqual(result, { ok: false, message: evaluationRetryMessage })
})

test('a non-JSON API response becomes a retryable message', async () => {
  const result = await readEvaluationResponse(
    new Response('<html>Bad Gateway</html>', {
      status: 502,
      headers: { 'Content-Type': 'text/html' },
    }),
  )

  assert.deepEqual(result, { ok: false, message: evaluationRetryMessage })
})

test('a JSON API error shows its safe message and remains retryable', async () => {
  const result = await readEvaluationResponse(
    new Response(
      JSON.stringify({
        error: { message: 'AI checking is not configured on the server yet.' },
      }),
      { status: 503, headers: { 'Content-Type': 'application/json' } },
    ),
  )

  assert.deepEqual(result, {
    ok: false,
    message: 'AI checking is not configured on the server yet.',
  })
})

test('a valid evaluation response is returned to the gameplay screen', async () => {
  const result = await readEvaluationResponse(
    new Response(
      JSON.stringify({ correct: true, feedback: 'Well done.' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    ),
  )

  assert.deepEqual(result, {
    ok: true,
    correct: true,
    feedback: 'Well done.',
  })
})

test('a successful response with the wrong JSON shape remains retryable', async () => {
  const result = await readEvaluationResponse(
    new Response(JSON.stringify({ correct: 'yes' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }),
  )

  assert.deepEqual(result, { ok: false, message: evaluationRetryMessage })
})
