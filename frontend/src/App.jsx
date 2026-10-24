import { useState } from 'react'
import { missions as missionDataList } from './data/missions.js'
import {
  evaluationRetryMessage,
  readEvaluationResponse,
} from './utils/evaluationResponse.js'

const glossaryGroups = [
  {
    mission: 'At the Restaurant',
    entries: [
      ['Nanage', 'For me / I want'],
      ['Beku', 'Want / need'],
      ['Beda', "Don't want / no"],
      ['Kodi', 'Please give'],
      ['Khara', 'Spicy'],
    ],
  },
  {
    mission: 'Meeting Someone New',
    entries: [
      ['Namaskara', 'Hello'],
      ['Hesaru', 'Name'],
      ['Hegiddira', 'How are you?'],
      ['Chennagiddene', "I'm doing well"],
      ['Matte sigona', "Let's meet again"],
    ],
  },
  {
    mission: 'Talking to an Auto Driver',
    entries: [
      ['Yellige', 'Where to?'],
      ['Hogbeku', 'Need to go'],
      ['Eshtu', 'How much?'],
      ['Illi', 'Here'],
      ['Nillisi', 'Please stop'],
    ],
  },
]

export default function App() {
  const [screen, setScreen] = useState('home')
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedMission, setSelectedMission] = useState('')
  const [showGlossary, setShowGlossary] = useState(false)
  const [currentMission, setCurrentMission] = useState(null)
  const [completedMissionId, setCompletedMissionId] = useState(null)
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answerStatus, setAnswerStatus] = useState(null)
  const [showHint, setShowHint] = useState(false)
  const [response, setResponse] = useState('')
  const [advancedStatus, setAdvancedStatus] = useState(null)
  const [advancedFeedback, setAdvancedFeedback] = useState('')

  const currentTurn = currentMission?.turns[currentTurnIndex]

  function startSelectedMission() {
    const mission = missionDataList.find(
      (item) => item.title === selectedMission,
    )

    if (!mission) return

    const canResumeMission =
      currentMission?.id === mission.id && completedMissionId !== mission.id

    if (!canResumeMission) {
      setCurrentMission(mission)
      setCurrentTurnIndex(0)
      setSelectedOption(null)
      setAnswerStatus(null)
      setShowHint(false)
      setResponse('')
      setAdvancedStatus(null)
      setAdvancedFeedback('')
    }

    setCompletedMissionId(null)
    setScreen('gameplay')
  }

  function checkAnswer() {
    if (selectedOption === null || !currentTurn) return

    setAnswerStatus(
      selectedOption === currentTurn.correctOptionIndex ? 'correct' : 'incorrect',
    )
  }

  function goToNextTurn() {
    if (!currentMission) return

    if (currentTurnIndex === currentMission.turns.length - 1) {
      setCompletedMissionId(currentMission.id)
      setScreen('complete')
      return
    }

    setCurrentTurnIndex((turnIndex) => turnIndex + 1)
    setSelectedOption(null)
    setAnswerStatus(null)
    setShowHint(false)
    setResponse('')
    setAdvancedStatus(null)
    setAdvancedFeedback('')
  }

  async function checkAdvancedAnswer() {
    if (
      !currentMission ||
      currentMission.id !== 'restaurant' ||
      !currentTurn ||
      !response.trim() ||
      advancedStatus === 'checking' ||
      advancedStatus === 'correct'
    ) {
      return
    }

    setAdvancedStatus('checking')
    setAdvancedFeedback('')

    try {
      const result = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          turnId: `restaurant-turn-${currentTurnIndex + 1}`,
          answer: response,
        }),
      })
      const evaluation = await readEvaluationResponse(result)

      if (!evaluation.ok) {
        setAdvancedStatus('error')
        setAdvancedFeedback(evaluation.message)
        return
      }

      setAdvancedStatus(evaluation.correct ? 'correct' : 'incorrect')
      setAdvancedFeedback(evaluation.feedback)
    } catch {
      setAdvancedStatus('error')
      setAdvancedFeedback(evaluationRetryMessage)
    }
  }

  const missions = [
    {
      title: 'At the Restaurant',
      description: 'Order food, ask a question, and request the bill.',
    },
    {
      title: 'Meeting Someone New',
      description: 'Introduce yourself and have a friendly conversation.',
    },
    {
      title: 'Talking to an Auto Driver',
      description: 'Tell the driver where to go and ask about the fare.',
    },
  ]

  const availableMissions =
    selectedDifficulty === 'Advanced'
      ? missions.slice(0, 1)
      : missions

  return (
    <div className="min-h-screen bg-[#fff8ed] text-[#3b2a1f]">
      <header className="mx-auto flex max-w-6xl items-center px-5 py-6 sm:px-8">
        <span className="text-2xl font-bold tracking-tight">Kanquest</span>
      </header>

      {screen === 'home' ? (
        <main className="mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8 sm:pt-24">
          <p className="rounded-full border border-[#ead5bd] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#9b4b26]">
            Practical Kannada, one mission at a time
          </p>

          <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Kanquest
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#69574a]">
            Learn useful, conversational Kannada through short missions based
            on everyday situations.
          </p>

          <button
            type="button"
            onClick={() => setScreen('difficulty')}
            className="mt-9 rounded-full bg-[#b94e24] px-7 py-4 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
          >
            Start Learning
          </button>

          <div className="mt-16 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#eadcc8] bg-white/80 p-5">
              <p className="font-semibold">Three levels</p>
              <p className="mt-2 text-sm text-[#755c49]">
                Start with Beginner or choose your challenge.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadcc8] bg-white/80 p-5">
              <p className="font-semibold">Real-life missions</p>
              <p className="mt-2 text-sm text-[#755c49]">
                Practice for everyday conversations.
              </p>
            </div>

            <div className="rounded-2xl border border-[#eadcc8] bg-white/80 p-5">
              <p className="font-semibold">Learn using English letters</p>
              <p className="mt-2 text-sm text-[#755c49]">
                Practice useful Kannada phrases without needing to read Kannada
                script.
              </p>
            </div>
          </div>
        </main>
      ) : screen === 'difficulty' ? (
        <main className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8">
          <button
            type="button"
            onClick={() => setScreen('home')}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#755c49] hover:bg-white"
          >
            ← Back
          </button>

          <section className="mt-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b4b26]">
              Choose your level
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              How would you like to learn?
            </h1>
            <p className="mt-4 text-[#69574a]">
              All difficulty levels are available to choose.
            </p>

            <button
              type="button"
              aria-expanded={showGlossary}
              aria-controls="mission-glossary"
              onClick={() => setShowGlossary(true)}
              className="mt-6 rounded-full border border-[#b94e24] bg-white px-5 py-2.5 font-semibold text-[#9b4b26] transition hover:bg-[#fff8ed] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
            >
              Glossary
            </button>

            {showGlossary && (
              <section
                id="mission-glossary"
                aria-labelledby="glossary-heading"
                className="mx-auto mt-6 max-w-5xl rounded-3xl border border-[#eadcc8] bg-white p-5 text-left shadow-sm sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 id="glossary-heading" className="text-2xl font-bold">
                      Kannada Glossary
                    </h2>
                    <p className="mt-2 text-sm text-[#755c49]">
                      Useful words from the three missions.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowGlossary(false)}
                    className="shrink-0 rounded-full border border-[#eadcc8] px-4 py-2 text-sm font-semibold text-[#755c49] transition hover:border-[#b94e24] hover:text-[#9b4b26] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {glossaryGroups.map((group) => (
                    <section
                      key={group.mission}
                      aria-labelledby={`glossary-${group.mission.replaceAll(' ', '-').toLowerCase()}`}
                      className="rounded-2xl bg-[#fff8ed] p-4 sm:p-5"
                    >
                      <h3
                        id={`glossary-${group.mission.replaceAll(' ', '-').toLowerCase()}`}
                        className="font-bold text-[#9b4b26]"
                      >
                        {group.mission}
                      </h3>
                      <dl className="mt-3 space-y-3">
                        {group.entries.map(([word, meaning]) => (
                          <div
                            key={word}
                            className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 border-b border-[#eadcc8] pb-2 last:border-0 last:pb-0"
                          >
                            <dt className="font-semibold text-[#3b2a1f]">
                              {word}
                            </dt>
                            <dd className="text-sm text-[#755c49]">
                              — {meaning}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </section>
                  ))}
                </div>
              </section>
            )}

            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
              <button
                type="button"
                aria-pressed={selectedDifficulty === 'Beginner'}
                onClick={() => {
                  setSelectedDifficulty('Beginner')
                  setSelectedMission('')
                }}
                className={`rounded-2xl border bg-white p-6 text-left hover:border-[#b94e24] ${selectedDifficulty === 'Beginner' ? 'border-[#b94e24] ring-2 ring-[#b94e24]/20' : 'border-[#eadcc8]'}`}
              >
                <span className="text-xl font-bold">Beginner</span>
                <span className="mt-3 block text-sm leading-6 text-[#755c49]">
                  English translations appear with the dialogue and answer
                  options.
                </span>
              </button>

              <button
                type="button"
                aria-pressed={selectedDifficulty === 'Intermediate'}
                onClick={() => {
                  setSelectedDifficulty('Intermediate')
                  setSelectedMission('')
                }}
                className={`rounded-2xl border bg-white p-6 text-left hover:border-[#b94e24] ${selectedDifficulty === 'Intermediate' ? 'border-[#b94e24] ring-2 ring-[#b94e24]/20' : 'border-[#eadcc8]'}`}
              >
                <span className="text-xl font-bold">Intermediate</span>
                <span className="mt-3 block text-sm leading-6 text-[#755c49]">
                  Answer options appear without English translations.
                </span>
              </button>

              <button
                type="button"
                aria-pressed={selectedDifficulty === 'Advanced'}
                onClick={() => {
                  setSelectedDifficulty('Advanced')
                  setSelectedMission('')
                }}
                className={`rounded-2xl border bg-white p-6 text-left hover:border-[#b94e24] ${selectedDifficulty === 'Advanced' ? 'border-[#b94e24] ring-2 ring-[#b94e24]/20' : 'border-[#eadcc8]'}`}
              >
                <span className="text-xl font-bold">Advanced</span>
                <span className="mt-3 block text-sm leading-6 text-[#755c49]">
                  Type your own Kannada responses using English letters.
                </span>
              </button>
            </div>

            {selectedDifficulty && (
              <div className="mt-8">
                <p className="font-semibold text-[#9b4b26]">
                  {selectedDifficulty} selected
                </p>
                <button
                  type="button"
                  onClick={() => setScreen('missions')}
                  className="mt-5 rounded-full bg-[#b94e24] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
                >
                  Continue to missions
                </button>
              </div>
            )}
          </section>
        </main>
      ) : screen === 'missions' ? (
        <main className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8">
          <button
            type="button"
            onClick={() => setScreen('difficulty')}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#755c49] hover:bg-white"
          >
            ← Back
          </button>

          <section className="mt-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b4b26]">
              {selectedDifficulty} missions
            </p>
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              Choose a mission
            </h1>
            <p className="mt-4 text-[#69574a]">
              Choose a mission to practice everyday Kannada conversations.
            </p>

            <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
              {availableMissions.map((mission) => (
                <button
                  key={mission.title}
                  type="button"
                  aria-pressed={selectedMission === mission.title}
                  onClick={() => setSelectedMission(mission.title)}
                  className={`rounded-2xl border bg-white p-6 text-left transition hover:border-[#b94e24] ${selectedMission === mission.title ? 'border-[#b94e24] ring-2 ring-[#b94e24]/20' : 'border-[#eadcc8]'}`}
                >
                  <span className="text-xl font-bold">{mission.title}</span>
                  <span className="mt-3 block text-sm leading-6 text-[#755c49]">
                    {mission.description}
                  </span>
                  <span className="mt-5 block text-sm font-semibold text-[#9b4b26]">
                    3 turns
                  </span>
                </button>
              ))}
            </div>

            {selectedMission && (
              <button
                type="button"
                onClick={startSelectedMission}
                className="mt-8 rounded-full bg-[#b94e24] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
              >
                Start mission
              </button>
            )}
          </section>
        </main>
      ) : screen === 'gameplay' ? (
        <main className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
          <button
            type="button"
            onClick={() => setScreen('missions')}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-[#755c49] hover:bg-white"
          >
            ← Back to Missions
          </button>

          {currentMission && currentTurn && (
            <section className="mt-10 rounded-3xl border border-[#eadcc8] bg-white p-6 shadow-sm sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9b4b26]">
                {currentMission.title}
              </p>
              <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                Turn {currentTurnIndex + 1} of {currentMission.turns.length}
              </h1>

              <div className="mt-8 rounded-2xl bg-[#fff8ed] p-5">
                <p className="text-sm font-semibold text-[#755c49]">
                  {currentTurn.speaker}
                </p>
                <p className="mt-2 text-xl font-semibold">
                  {currentTurn.dialogue}
                </p>
                {selectedDifficulty === 'Beginner' || showHint ? (
                  <p className="mt-2 text-[#69574a]">
                    {currentTurn.dialogueTranslation}
                  </p>
                ) : null}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold">Your task</h2>
                <p className="mt-2 leading-7 text-[#69574a]">
                  {currentTurn.objective}
                </p>
              </div>

              {selectedDifficulty === 'Advanced' ? (
                <div className="mt-8">
                  <label
                    htmlFor="kannada-response"
                    className="block text-lg font-bold"
                  >
                    Your response
                  </label>
                  <textarea
                    id="kannada-response"
                    value={response}
                    maxLength={200}
                    disabled={advancedStatus === 'checking' || advancedStatus === 'correct'}
                    onChange={(event) => {
                      setResponse(event.target.value)
                      setAdvancedStatus(null)
                      setAdvancedFeedback('')
                    }}
                    rows={3}
                    placeholder="Use English letters to write your response"
                    className="mt-3 w-full rounded-2xl border border-[#eadcc8] bg-white p-4 text-[#3b2a1f] outline-none transition placeholder:text-[#a08d7d] focus:border-[#b94e24] focus:ring-2 focus:ring-[#b94e24]/20"
                  />
                  <div className="mt-4">
                    {advancedStatus === 'correct' ? (
                      <>
                        <p className="font-semibold text-[#477246]" role="status">
                          {advancedFeedback}
                        </p>
                        <button
                          type="button"
                          onClick={goToNextTurn}
                          className="mt-4 rounded-full bg-[#b94e24] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
                        >
                          {currentTurnIndex === currentMission.turns.length - 1
                            ? 'Finish mission'
                            : 'Next'}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={checkAdvancedAnswer}
                          disabled={!response.trim() || advancedStatus === 'checking'}
                          className="rounded-full bg-[#b94e24] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {advancedStatus === 'checking'
                            ? 'Checking…'
                            : advancedStatus === 'error'
                              ? 'Retry check'
                              : 'Check response'}
                        </button>
                        {(advancedStatus === 'incorrect' || advancedStatus === 'error') && (
                          <p
                            className="mt-4 font-semibold text-[#a33e2a]"
                            role="status"
                          >
                            {advancedFeedback}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <h2 className="text-lg font-bold">Choose your response</h2>
                  <div className="mt-4 grid gap-3">
                    {currentTurn.options.map((option, index) => (
                      <button
                        key={option.text}
                        type="button"
                        aria-pressed={selectedOption === index}
                        onClick={() => {
                          setSelectedOption(index)
                          setAnswerStatus(null)
                        }}
                        className={`rounded-2xl border bg-white p-4 text-left transition hover:border-[#b94e24] ${selectedOption === index ? 'border-[#b94e24] ring-2 ring-[#b94e24]/20' : 'border-[#eadcc8]'}`}
                      >
                        <span className="block">{option.text}</span>
                        {selectedDifficulty === 'Beginner' && (
                          <span className="mt-1 block text-sm text-[#755c49]">
                            {option.translation}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDifficulty !== 'Advanced' && (
                <div className="mt-6">
                  {answerStatus === 'correct' ? (
                    <>
                      <p className="font-semibold text-[#477246]" role="status">
                        Correct! Nice work.
                      </p>
                      <button
                        type="button"
                        onClick={goToNextTurn}
                        className="mt-4 rounded-full bg-[#b94e24] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
                      >
                        {currentTurnIndex === currentMission.turns.length - 1
                          ? 'Finish mission'
                          : 'Next'}
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={checkAnswer}
                        disabled={selectedOption === null}
                        className="rounded-full bg-[#b94e24] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Check Answer
                      </button>
                      {answerStatus === 'incorrect' && (
                        <p className="mt-4 font-semibold text-[#a33e2a]" role="status">
                          Not quite. Choose another option and try again.
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {selectedDifficulty !== 'Beginner' && (
                <button
                  type="button"
                  onClick={() => setShowHint((isVisible) => !isVisible)}
                  className="mt-6 rounded-lg px-3 py-2 text-sm font-semibold text-[#9b4b26] hover:bg-[#fff8ed]"
                >
                  {showHint ? 'Hide hint' : 'Hint'}
                </button>
              )}
            </section>
          )}
        </main>
      ) : (
        <main className="mx-auto flex max-w-3xl flex-col items-center px-5 pb-20 pt-16 text-center sm:px-8">
          <section
            aria-labelledby="completion-heading"
            className="w-full rounded-3xl border border-[#eadcc8] bg-white p-8 shadow-sm sm:p-10"
          >
            <div
              aria-hidden="true"
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f6dfb8] text-3xl text-[#b94e24]"
            >
              ✦
            </div>
            <p
              className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#9b4b26]"
              role="status"
              aria-live="polite"
            >
              Mission complete
            </p>
            <h1
              id="completion-heading"
              className="mt-3 text-3xl font-bold sm:text-4xl"
            >
              {currentMission?.title}
            </h1>
            <p className="mt-4 text-[#69574a]">
              You completed all three turns.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setScreen('missions')}
                className="rounded-full border border-[#eadcc8] bg-white px-6 py-3 font-semibold text-[#755c49] transition hover:border-[#b94e24]"
              >
                Back to Missions
              </button>
              <button
                type="button"
                onClick={startSelectedMission}
                className="rounded-full bg-[#b94e24] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#963d1c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7b351a]"
              >
                Replay Mission
              </button>
            </div>
          </section>
        </main>
      )}
    </div>
  )
}
