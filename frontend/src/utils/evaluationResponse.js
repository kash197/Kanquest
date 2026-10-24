export const evaluationRetryMessage =
  'We could not check your response right now. Please retry.'

export async function readEvaluationResponse(response) {
  let data

  try {
    data = await response.json()
  } catch {
    return { ok: false, message: evaluationRetryMessage }
  }

  if (!response.ok) {
    const serverMessage =
      data &&
      typeof data === 'object' &&
      !Array.isArray(data) &&
      typeof data.error?.message === 'string' &&
      data.error.message.trim()

    return {
      ok: false,
      message: serverMessage || evaluationRetryMessage,
    }
  }

  if (
    !data ||
    typeof data !== 'object' ||
    Array.isArray(data) ||
    typeof data.correct !== 'boolean' ||
    typeof data.feedback !== 'string'
  ) {
    return { ok: false, message: evaluationRetryMessage }
  }

  return {
    ok: true,
    correct: data.correct,
    feedback: data.feedback,
  }
}
