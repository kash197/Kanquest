import dotenv from 'dotenv'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createApp } from './app.js'
import { createGeminiEvaluator } from './evaluator.js'

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(currentDirectory, '../.env') })

const repositoryRoot = path.resolve(currentDirectory, '../..')
const frontendDistPath = path.join(repositoryRoot, 'frontend', 'dist')
const canServeBuiltFrontend =
  process.env.NODE_ENV === 'production' &&
  existsSync(path.join(frontendDistPath, 'index.html'))

const app = createApp({
  evaluateAnswer: createGeminiEvaluator(),
  frontendDistPath: canServeBuiltFrontend ? frontendDistPath : undefined,
})

const port = Number.parseInt(process.env.PORT ?? '3001', 10)
app.listen(port, '0.0.0.0', () => {
  console.log(`Kanquest API listening on port ${port}`)
})
