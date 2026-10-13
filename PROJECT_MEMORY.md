# PROJECT_MEMORY.md — Kanquest

**Last updated:** October 14, 2026\
**Project:** Kanquest (formerly Kannada Quest)\
**Hackathon:** Kannada Digital Innovation Hackathon 2026\
**Challenge:** Kannada for Everyone\
**Status:** MVP design finalized; implementation pending.

## 1. Project Vision

Kanquest is a mission-based web application that helps non-Kannada speakers learn practical conversational Kannada through everyday situations.

The focus is on useful communication rather than formal grammar instruction.

**Important:** All learner-facing Kannada must use Romanized Kannada (Latin letters), never Kannada script.

## 2. MVP Scope

The approved MVP has three difficulty levels:

- **Beginner:** Three missions with three MCQ turns each. English translations appear automatically for dialogue and answer options.
- **Intermediate:** Exactly the same MCQ missions, questions, options, answers, and feedback as Beginner. Dialogue translations appear only when Hint is clicked. Answer options have no English translations.
- **Advanced:** One Restaurant mission with three free-text Romanized Kannada responses evaluated by AI. Dialogue translation is available through Hint.

**Total:** Seven playable mission experiences and 21 interactions.

All difficulty levels and missions are unlocked from the beginning.

### Approved mission lineup

| Mission                   | Beginner | Intermediate | Advanced       |
| ------------------------- | -------- | ------------ | -------------- |
| At the Restaurant         | 3 MCQs   | Same 3 MCQs  | 3 AI responses |
| Meeting Someone New       | 3 MCQs   | Same 3 MCQs  | Not in MVP     |
| Talking to an Auto Driver | 3 MCQs   | Same 3 MCQs  | Not in MVP     |

The previously proposed **At the Shop** mission was replaced by **Meeting Someone New**.

## 3. Approved Mission Content

### Restaurant

1. **Order one dosa**
   - Waiter: `Nimge enu beku?`
   - Correct: `Nanage ondu dose beku.`
   - MCQ options: `Nanage eradu dose beku.` / `Nanage ondu idli beku.` / `Nanage ondu dose beku.`
   - Correct option: C.
2. **Ask whether the dosa is spicy**
   - Waiter: `Sari, bere enadaru?`
   - Correct: `Dose khara ideya?`
   - MCQ options: `Dose bisi ideya?` / `Dose khara ideya?` / `Dose sihi ideya?`
   - Correct option: B.
3. **Decline additional items and request the bill**
   - Waiter: `Innu enadaru beka?`
   - Correct: `Beda, bill kodi.`
   - MCQ options: `Beda, menu kodi.` / `Beda, bill kodi.` / `Beku, bill kodi.`
   - Correct option: B.
   - Distractors require final naturalness review.

### Meeting Someone New

1. **Introduce yourself as Rahul**
   - Friend: `Namaskara! Nimma hesarenu?`
   - Correct: `Nanna hesaru Rahul.`
   - MCQ options: `Nimma hesaru Rahul.` / `Avana hesaru Rahul.` / `Nanna hesaru Rahul.`
   - Correct option: C.
2. **Respond that you're doing well**
   - Friend: `Neevu hegiddira?`
   - Correct: `Naanu chennagiddene.`
   - MCQ options: `Naanu chennagilla.` / `Naanu chennagiddene.` / `Neevu chennagiddira.`
   - Correct option: B.
3. **Say you'll see your friend again**
   - Friend: `Sari, bye!`
   - Correct: `Matte sigona!`
   - MCQ options: `Matte sigona!` / `Matte barthini!` / `Matte kelthini!`
   - Correct option: A.

### Talking to an Auto Driver

1. **Tell the driver to go to the railway station**
   - Driver: `Yellige hogbeku?`
   - Correct: `Railway station ge hogbeku.`
   - MCQ options: `Railway station inda barbeku.` / `Railway station ge hogbeku.` / `Railway station alli iddini.`
   - Correct option: B.
2. **Ask about the fare**
   - Driver: `Sari, hogona.`
   - Correct: `Eshtu duddu aagutte?`
   - MCQ options: `Eshtu doora?` / `Eshtu hottu?` / `Eshtu duddu aagutte?`
   - Correct option: C.
3. **Ask the driver to stop here**
   - Driver: `Station hattira bandvi.`
   - Correct: `Illi nillisi.`
   - MCQ options: `Illi hogi.` / `Illi nillisi.` / `Illi tirugisi.`
   - Correct option: B.

The complete English translations, task instructions, and approved feedback text are in the finalized **Kanquest MVP Product & Implementation Specification v1.0** in the Brainstorm chat. Use that specification alongside this memory file; do not recreate or silently alter content.

## 4. Advanced Restaurant

Advanced follows the same three objectives as Beginner/Intermediate.

| Turn | Expected meaning                              | Example                  |
| ---- | --------------------------------------------- | ------------------------ |
| 1    | Order one dosa                                | `Nanage ondu dose beku.` |
| 2    | Ask if the dosa is spicy                      | `Dose khara ideya?`      |
| 3    | Decline additional items and request the bill | `Beda, bill kodi.`       |

Requirements:

- Learners type Romanized Kannada.
- AI evaluates intended meaning rather than exact wording.
- Accept reasonable spelling variations and equivalent expressions.
- Reject answers that miss essential meaning.
- Provide brief helpful feedback without revealing the complete answer.
- Unlimited retries.
- English dialogue translation available through Hint.
- English task instructions always visible.

If evaluation fails, preserve the input, show an error message and Retry button, and do not advance or mark the response incorrect.

## 5. Gameplay and Navigation

**Navigation:** Home → Difficulty Selection → Mission Selection → Gameplay → Mission Complete.

- Home includes a Start Learning button.
- Mission cards show title, description, and three-turn length.
- One conversation turn appears at a time, not a scrolling chat history.
- Each turn contains dialogue, English task, answer controls, feedback, and progress indicator.
- MCQs have three plausible options and exactly one correct answer.
- Correct answers show feedback; Next advances manually.
- Incorrect answers allow unlimited retries with helpful prewritten feedback.
- Hints reset between turns.
- Back to Missions is available during gameplay.
- Returning to an unfinished mission resumes its current turn during the same session.
- Refreshing or reopening resets progress.
- Mission Complete includes a simple celebration, Back to Missions, and Replay Mission.
- No persistent accounts or progress database.

## 6. Visual Design

**Brand:** Kanquest.

**Theme:** Warm Karnataka-inspired design.

- Cream background
- Earthy orange accents
- Brown text
- Rounded cards
- Simple icons
- Friendly typography
- Responsive mobile-friendly layout
- Minimal animation

## 7. Approved Technology Stack

| Component       | Technology               |
| --------------- | ------------------------ |
| Frontend        | React + Vite             |
| Styling         | Tailwind CSS             |
| Backend         | Node.js + Express        |
| Language        | JavaScript               |
| Primary AI      | Google Gemini free tier  |
| Backup AI       | Groq free plan           |
| Database        | None                     |
| Progress        | In-memory frontend state |
| Mission data    | Local JS/JSON files      |
| Version control | Git + GitHub             |

API keys must remain on the backend and outside version control.

Groq is a backup option; automatic switching between providers is not required.

## 8. Budget

**Strict budget target: ₹0.**

- No paid APIs or subscriptions.
- No paid billing enabled.
- Use free development tools.
- Use AI within verified free-tier quotas.
- Select genuinely free hosting for frontend and backend.
- No custom domain purchase.
- Handle API quota exhaustion gracefully.

Free-tier availability and limits must be verified before deployment. Unlimited usage is not guaranteed.

## 9. Explicitly Deferred Features

- User accounts and authentication
- Leaderboards and scoring
- XP, streaks, and elaborate gamification
- Speech and audio features
- Extensive animations
- Database-backed progress
- Additional Advanced missions
- Large mission libraries

Do not add these during the hackathon MVP unless the user explicitly changes the scope.

## 10. Outstanding Verification Items

1. **Kannada accuracy:** Have a fluent/native Kannada speaker review all dialogue, translations, and answer options for grammar and naturalness.
2. **Restaurant Turn 3:** Refine unnatural distractors while preserving the approved learning objective.
3. **AI quality:** Test Gemini with Romanized Kannada, spelling variations, equivalent phrasing, and incorrect meanings. Evaluate Groq if necessary.
4. **Zero-cost deployment:** Verify current frontend/backend hosting conditions and free API limits before deployment.
5. **End-to-end testing:** Confirm all seven experiences, 21 turns, hints, feedback, navigation, retries, completion, and mobile responsiveness.

## 11. Implementation Guidance

The project owner is learning frontend development. Work step by step, explain commands and code, and verify each stage before continuing.

Recommended order:

1. React/Vite/Tailwind setup.
2. Home, difficulty, and mission selection.
3. Shared MCQ engine and mission data.
4. Feedback, hints, progression, and completion.
5. Session-only progress and navigation.
6. Advanced typed-response UI.
7. Express backend and Gemini integration.
8. AI testing and error handling.
9. Responsive testing and zero-cost deployment.

**Primary priority:** Deliver a polished, working, practical Kannada-learning MVP within the hackathon timeline, without scope creep or paid services.

**Source of truth:** This memory file plus the complete approved Kanquest MVP Specification v1.0. If a detail is missing or ambiguous, ask before changing the product design.