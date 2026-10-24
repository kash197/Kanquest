import express from 'express'
import path from 'node:path'
import { restaurantTurnRubrics, createGeminiEvaluator } from './evaluator.js'

const allowedRequestKeys = new Set(['turnId', 'answer'])
const answerLimit = 200
const unavailableFeedback = 'We could not check your response right now. Please retry.'

function sendError(res, status, code, message, retryable = false) {
  return res.status(status).json({
    error: { code, message, retryable },
  })
}

function isValidRequest(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return false

  const keys = Object.keys(body)
  if (
    keys.length !== allowedRequestKeys.size ||
    keys.some((key) => !allowedRequestKeys.has(key))
  ) {
    return false
  }

  return (
    typeof body.turnId === 'string' &&
    typeof body.answer === 'string' &&
    body.answer.trim().length > 0 &&
    [...body.answer].length <= answerLimit
  )
}

function makeFeedback(correct, turnId, language) {
  if (!correct && language !== 'romanized_kannada') {
    return 'Please use Kannada written with English letters and try again.'
  }

  if (correct) {
    if (turnId === 'restaurant-turn-1') return 'Yep, one dosa.'
    if (turnId === 'restaurant-turn-2') return 'Right, you asked if it’s spicy.'
    if (turnId === 'restaurant-turn-3') {
      return 'Exactly. No extras, just the bill.'
    }
  }

  if (turnId === 'restaurant-turn-3') {
    return 'Try again and include both important parts of the task.'
  }

  return 'Try again and include the key details from the task.'
}

export function createApp({
  evaluateAnswer = createGeminiEvaluator(),
  frontendDistPath,
} = {}) {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '4kb' }))

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.post('/api/evaluate', async (req, res) => {
    if (!isValidRequest(req.body)) {
      return sendError(
        res,
        400,
        'INVALID_REQUEST',
        'Provide a restaurant turn ID and a response of 1 to 200 characters.',
      )
    }

    const { turnId, answer } = req.body
    const rubric = restaurantTurnRubrics[turnId]
    if (!rubric) {
      return sendError(res, 404, 'UNKNOWN_TURN', 'That mission turn is not available.')
    }

    try {
      const result = await evaluateAnswer({ turnId, rubric, answer })
      if (
        !result ||
        typeof result.correct !== 'boolean' ||
        ![
          'romanized_kannada',
          'tulu',
          'english_or_mixed',
          'other',
          'uncertain',
        ].includes(result.language)
      ) {
        throw new Error('Evaluator returned an invalid result.')
      }

      const correct =
        result.language === 'romanized_kannada' && result.correct

      return res.json({
        correct,
        feedback: makeFeedback(correct, turnId, result.language),
      })
    } catch (error) {
      if (error?.code === 'AI_NOT_CONFIGURED') {
        return sendError(
          res,
          503,
          'AI_NOT_CONFIGURED',
          'AI checking is not configured on the server yet.',
          true,
        )
      }

      return sendError(res, 503, 'AI_UNAVAILABLE', unavailableFeedback, true)
    }
  })

  app.use('/api', (_req, res) => {
    sendError(res, 404, 'NOT_FOUND', 'That API route was not found.')
  })

  if (frontendDistPath) {
    const absoluteFrontendDistPath = path.resolve(frontendDistPath)
    app.use(express.static(absoluteFrontendDistPath))
    app.get(/.*/, (_req, res) => {
      res.sendFile(path.join(absoluteFrontendDistPath, 'index.html'))
    })
  }

  app.use((error, _req, res, _next) => {
    if (error?.type === 'entity.too.large') {
      return sendError(res, 413, 'REQUEST_TOO_LARGE', 'The request is too large.')
    }

    if (error instanceof SyntaxError && 'body' in error) {
      return sendError(res, 400, 'INVALID_JSON', 'Send a valid JSON request body.')
    }

    return sendError(res, 500, 'SERVER_ERROR', 'The server could not process the request.')
  })

  return app
}
