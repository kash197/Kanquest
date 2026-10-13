# KANNADA QUEST — COMPREHENSIVE PROJECT MEMORY UPDATE
**Date:** October 13, 2026  
**Project:** Kannada Quest (Kanquest)  
**Hackathon:** Kannada Digital Innovation Hackathon 2026  
**Selected Challenge:** Kannada for Everyone  
**Decision Status:** Approved 10-day MVP scope and first mission design

## INSTRUCTIONS TO PROJECT MEMORY

Update the existing `PROJECT_MEMORY.md` using all the information below.

**Important:**
- Preserve all previously confirmed requirements that do not conflict with this update.
- Incorporate the new decisions into the appropriate sections of the existing document rather than simply appending disconnected notes.
- Clearly distinguish confirmed decisions, recommendations, illustrative examples, and unresolved questions.
- Do not invent requirements or mark suggestions as finalized decisions.
- Return the complete updated `PROJECT_MEMORY.md` in Markdown so it can replace the local repository copy.
- Do not generate application code or begin implementation.

---

# 1. PROJECT OVERVIEW

## 1.1 Project identity

**Name:** Kannada Quest  
**Alternative name:** Kanquest  
**Hackathon:** Kannada Digital Innovation Hackathon 2026  
**Challenge:** Kannada for Everyone

## 1.2 Core vision

Kannada Quest is an interactive, mission-based language-learning application designed to help people who do not speak Kannada learn practical conversational Kannada.

The primary target audience includes people who have moved to Karnataka for education, employment, or other reasons and need to communicate in everyday situations.

The application should emphasize **real-world communication rather than academic language learning**.

Instead of primarily teaching Kannada grammar, script, or vocabulary through isolated memorization exercises, Kannada Quest should help learners understand and respond to conversations in situations such as:

- Ordering food at a restaurant.
- Shopping at a local store.
- Asking for directions.
- Communicating during everyday activities.

These situations are examples of the broader vision. Only the restaurant mission has been selected as the first confirmed scenario.

## 1.3 Core learning philosophy

The application should help learners develop the ability to understand simple Kannada dialogue and communicate an intended meaning.

The experience should be:

- Practical and situation-based.
- Accessible to non-Kannada speakers.
- Interactive rather than purely informational.
- Supportive of mistakes and repeated attempts.
- Progressively more challenging across difficulty levels.
- Focused on communicative success rather than exact memorization.

## 1.4 Romanized Kannada requirement

**CONFIRMED — MANDATORY**

All Kannada learning content must use Romanized Kannada, meaning Kannada words written using English letters.

Examples:

- `Namaskara`
- `Nanage neeru beku`
- `Nimge enu beku?`
- `Dhanyavada`

Do not display Kannada script as part of the learning experience.

This requirement applies to:

- Character dialogue.
- Multiple-choice response options.
- Learner input.
- Example answers.
- Kannada phrases in feedback.
- Advanced-mode conversations.

English may be used for interface instructions, explanations, translations, and hints.

The goal is to make conversational Kannada accessible to learners who cannot read Kannada script.

---

# 2. APPROVED HACKATHON MVP

## 2.1 Development constraint

**CONFIRMED**

The team has selected a focused MVP that can realistically be developed within approximately 10 days.

The developer is a beginner in frontend development, has basic programming knowledge, and wants to learn while building.

The available development time is limited, so features must be prioritized carefully.

The goal is **a small, complete, demonstrable application**, not a large platform with numerous incomplete features.

## 2.2 Essential MVP features

The application must include:

1. A way for learners to select a difficulty level.
2. Three difficulty levels: Beginner, Intermediate, and Advanced.
3. Mission-based learning experiences.
4. Multiple-choice interactions in Beginner mode.
5. Multiple-choice interactions in Intermediate mode.
6. Guided free-text Kannada responses in Advanced mode.
7. AI-based meaning evaluation in Advanced mode.
8. Answer feedback.
9. Question or conversation progression.
10. Mission-completion feedback.
11. Romanized Kannada throughout the learning experience.

## 2.3 Content scope

**CONFIRMED MVP TARGET**

**Beginner:**
- Two to three short MCQ missions.

**Intermediate:**
- Two to three short MCQ missions.

**Advanced:**
- One working AI-assisted mission.

The exact number of questions in every mission has not been formally finalized.

For the first restaurant mission, approximately three short interactions are recommended to keep the experience manageable.

## 2.4 Scope-control principle

Do not expand the MVP simply because a feature seems interesting.

Prioritize:

1. Working core functionality.
2. Correct and understandable Kannada content.
3. Reliable answer evaluation.
4. Usable navigation.
5. Basic visual clarity.
6. Deployment and demonstration readiness.

Optional polish must not jeopardize the core application.

---

# 3. DIFFICULTY LEVELS

## 3.1 Beginner Mode

**STATUS: CONFIRMED**

### Purpose

Introduce learners to everyday Kannada through guided, situation-based multiple-choice questions.

Beginner mode should be accessible to someone with little or no Kannada knowledge.

### Learning interaction

The learner encounters a character speaking Romanized Kannada.

The application provides an English instruction describing what the learner needs to communicate.

The learner selects the appropriate Kannada response from three multiple-choice options.

Each Kannada option includes its English translation.

### Example

**Character:**

`Nimge enu beku?`

**English task instruction:**

"You want to order one dosa. Choose the appropriate response."

**Options:**

A. `Nanage eradu dose beku`  
English: "I want two dosas."

B. `Nanage ondu idli beku`  
English: "I want one idli."

C. `Nanage ondu dose beku`  
English: "I want one dosa."

**Correct answer:** C

This is an illustrative question, not final approved Kannada lesson content.

### Beginner assistance

Beginner mode includes:

- English task instructions.
- English translations alongside the Kannada answer options.
- Multiple-choice responses.
- Helpful feedback for mistakes.
- Unlimited retries.
- Explanations after correct answers.

English translations alongside response options are mandatory for Beginner mode.

Whether every character dialogue line should also display an automatic English translation has not been separately finalized.

### Expected learning outcome

The learner should begin associating common Kannada expressions with their meanings and appropriate everyday contexts.

---

# 4. INTERMEDIATE MODE

**STATUS: CONFIRMED**

## 4.1 Purpose

Help learners recognize and understand familiar Kannada expressions with less assistance than Beginner mode.

Intermediate mode should encourage learners to rely more on their understanding of Kannada vocabulary and sentence meaning.

## 4.2 Learning interaction

Intermediate mode uses the same fundamental MCQ system as Beginner mode.

The learner:

1. Reads a character's Romanized Kannada dialogue.
2. Reads an English instruction describing the intended response.
3. Chooses from three Romanized Kannada options.
4. Receives feedback.
5. Retries if incorrect.
6. Progresses after choosing the correct response.

## 4.3 Main difference from Beginner

**CONFIRMED**

Intermediate response options must not include English translations.

### Example

**Character:**

`Nimge enu beku?`

**Task:**

"You want to order one dosa."

**Options:**

A. `Nanage eradu dose beku`

B. `Nanage ondu idli beku`

C. `Nanage ondu dose beku`

**Correct answer:** C

The learner must recognize the difference between the food item and quantity without English translations beside the options.

## 4.4 Shared content requirement

**CONFIRMED**

For Mission 1, Beginner and Intermediate will use the same restaurant conversation and question content.

The difference is the level of assistance, not an entirely different storyline.

This means the application should ideally reuse:

- Character dialogue.
- Question content.
- Correct-answer information.
- Multiple-choice options.
- Mission progression.
- Answer evaluation logic.

The interface determines whether English translations are displayed.

This reduces implementation complexity and keeps the learning progression consistent.

## 4.5 Intermediate character dialogue translation

**NOT YET FINALIZED**

A previous recommendation was to avoid automatically displaying the English translation of the character's question in Intermediate mode.

This would increase the challenge.

However, this was suggested rather than explicitly approved.

Do not mark it as a finalized requirement.

---

# 5. BEGINNER AND INTERMEDIATE MCQ DESIGN

**STATUS: CONFIRMED**

This is an important quality requirement.

The options must be designed so that the correct answer does not stand out merely because it looks different.

The goal is to test understanding of Kannada, not the ability to guess from obvious clues.

## 5.1 Exactly three options

Each MCQ should have three response options.

There must be exactly one clearly correct response for the stated task.

## 5.2 Plausible distractors

Incorrect answers should be plausible things someone might say in the situation.

Avoid completely unrelated options.

### Poor example

**Task:** Order one dosa.

A. `Namaskara`

B. `Nanage ondu dose beku`

C. `Dhanyavada`

This is too easy because only one option resembles a food order.

### Improved example

**Task:** Order one dosa.

A. `Nanage eradu dose beku`

B. `Nanage ondu idli beku`

C. `Nanage ondu dose beku`

This requires the learner to distinguish:

- One versus two.
- Dosa versus idli.
- The intended order versus another plausible order.

## 5.3 Similar structure and length

Whenever practical, the three options should have similar sentence structures and lengths.

Avoid making the correct answer the only long, complete, or grammatically structured response.

## 5.4 Meaningful differences

Distractors should differ in details that are relevant to the intended meaning.

Possible differences include:

- Quantity.
- Food or drink item.
- Destination.
- Object.
- Acceptance versus refusal.
- Politeness or conversational intent.

The differences must be understandable and educational.

## 5.5 Avoid accidental multiple correct answers

Every question must be reviewed to ensure only one option satisfies the instruction.

For example, if the task is simply "Ask for food," multiple food-ordering phrases might all be valid.

The instruction must be specific enough to distinguish one answer.

## 5.6 Correct-answer position

The correct answer should not consistently appear in the same position.

Vary its position across questions.

For the small MVP, this can be handled through carefully prepared question data. Randomization is not mandatory.

## 5.7 Beginner translations

Beginner mode must retain English translations beside options, even though they make the questions easier.

This is intentional scaffolding for new learners.

Intermediate removes those translations to increase the challenge.

---

# 6. MCQ FEEDBACK AND RETRY SYSTEM

**STATUS: CONFIRMED**

Both Beginner and Intermediate use the same retry behavior.

## 6.1 Incorrect answer

When the learner selects an incorrect option:

1. The application indicates that the answer is incorrect.
2. A short, helpful explanation is displayed.
3. The learner remains on the same question.
4. The learner can choose another option.
5. The question is not marked complete.

The application should not immediately reveal the correct answer if doing so would undermine the retry experience.

## 6.2 Example incorrect feedback

**Task:** Order one dosa.

Learner selects:

`Nanage eradu dose beku`

Possible feedback:

"Not quite! 'Eradu' means two. The task asks you to order one dosa. Try again."

This feedback identifies the misunderstanding without explicitly selecting the correct answer.

## 6.3 Unlimited retries

**CONFIRMED**

Learners may retry as many times as necessary.

There is no maximum attempt limit.

The objective is learning rather than penalizing mistakes.

## 6.4 Correct answer

When the learner selects the correct answer:

1. Show positive feedback.
2. Explain the correct expression briefly.
3. Mark the current question complete.
4. Enable progression to the next question.

### Example

"Correct! 'Nanage ondu dose beku' means 'I want one dosa.'"

## 6.5 Progression

A learner should only progress to the next MCQ after selecting the correct answer.

A Next button can be used for this purpose.

## 6.6 Completion

After answering the final question correctly, the learner reaches a Mission Complete screen.

## 6.7 No penalties

The MVP will not penalize learners for incorrect attempts.

Complex scoring or attempt-based punishment is unnecessary.

---

# 7. ADVANCED MODE

**STATUS: CONFIRMED CORE DESIGN**

Advanced mode is the most distinctive part of Kannada Quest.

It moves beyond multiple-choice recognition and asks learners to construct their own Kannada responses.

## 7.1 Learning objective

Advanced mode should test whether learners can communicate a specified meaning in Romanized Kannada.

It should not demand one memorized sentence.

## 7.2 Guided conversation model

Advanced mode uses a conversational scenario involving a character.

For the first mission, the character is a restaurant waiter.

The character asks a question in Romanized Kannada.

The learner receives an English instruction telling them what meaning they need to express.

The learner must type their own Kannada response using English letters.

## 7.3 Character dialogue

The character's question appears in Romanized Kannada.

Example:

**Waiter:**

`Nimge enu beku?`

An English translation should not automatically be required for the learner to read the question.

Instead, a hint button is available.

## 7.4 English hint button

**CONFIRMED**

Advanced mode includes a Hint button.

When activated, it reveals the English translation of the character's Kannada question.

Example:

**Original dialogue:**

`Nimge enu beku?`

**Hint:**

"What would you like?"

The hint is optional.

The learner can attempt to understand the Kannada question before requesting help.

## 7.5 English response instruction

**CONFIRMED**

After the character's question, the application provides an English instruction explaining what the learner should communicate.

Example:

**Your task:**

"Say in Kannada: I would like one dosa, please."

This is separate from the hint.

The hint translates what the character said.

The task instruction tells the learner what they must say.

This distinction is essential.

## 7.6 Free-text Kannada response

**CONFIRMED**

The learner types their answer into a text input field.

The answer must be in Romanized Kannada.

Example:

`Nanage ondu dose beku`

There are no multiple-choice options in Advanced mode.

## 7.7 AI meaning evaluation

**CONFIRMED**

An AI model evaluates whether the learner's response communicates the intended meaning.

The evaluation must prioritize meaning rather than exact string matching.

The AI should consider:

- Whether the requested object or action is correct.
- Whether the intended quantity is preserved.
- Whether the response is appropriate to the situation.
- Whether the overall meaning matches the task.
- Whether spelling variations are reasonable.
- Whether an alternative expression communicates the same intent.

## 7.8 Spelling tolerance

Romanized Kannada does not have one universally followed spelling convention in everyday typing.

The application should tolerate reasonable variations.

For example:

- `beku`
- `bekku`, where context makes the intended word reasonably clear.

However, tolerance must not cause the AI to accept answers with genuinely different meanings.

The evaluator should distinguish harmless spelling differences from meaningful vocabulary mistakes.

## 7.9 Alternative valid phrasings

The AI should not require the learner to reproduce one exact sentence.

For example, depending on the intended task and politeness requirements, both of these may successfully request a dosa:

- `Nanage ondu dose beku`
- `Ondu dose kodi`

The evaluator should consider whether the response successfully communicates the requested meaning.

The examples must be linguistically reviewed before use in the final application.

## 7.10 Recommended implementation strategy

**RECOMMENDATION — NOT A FINAL TECHNOLOGY DECISION**

Use a short, prewritten Advanced conversation.

The mission defines:

- The character's question.
- Its English translation.
- The learner's English task instruction.
- The intended meaning.
- Reference answers or evaluation guidance.

AI evaluates the learner's response.

The conversation progresses through predefined interactions.

This approach is recommended over unrestricted AI-generated conversations because it:

- Reduces implementation complexity.
- Makes lesson content predictable.
- Simplifies testing.
- Reduces the chance of unexpected dialogue.
- Helps control API usage.
- Improves reliability during a hackathon demonstration.

The AI remains meaningful because it evaluates free-text learner responses.

## 7.11 Advanced retry behavior

**UNRESOLVED**

Allowing learners to retry incorrect Advanced responses with helpful AI feedback has been recommended.

However, this has not yet been explicitly confirmed as a final decision.

The implementation should not assume this behavior is approved until it is decided.

## 7.12 AI integration concerns

The following still need to be resolved:

- AI provider.
- API access and pricing.
- Evaluation prompt.
- Expected response format.
- Handling malformed AI responses.
- Handling network errors.
- Handling unavailable AI services.
- Avoiding incorrect acceptance or rejection.
- Secure storage of API credentials.

API secrets must never be exposed in frontend code or committed to GitHub.

---

# 8. MISSION 1 — ORDERING AT A RESTAURANT

**STATUS: CONFIRMED SCENARIO**

## 8.1 Mission title

**Ordering at a Restaurant**

A shorter interface title such as "At the Restaurant" may be used.

The exact display title can be finalized during UI design.

## 8.2 Scenario

The learner visits a restaurant in Karnataka.

A waiter approaches and communicates in Kannada.

The learner must respond appropriately to complete a simple food-ordering interaction.

## 8.3 Mission objective

Practice conversational Kannada for:

1. Ordering a food item.
2. Requesting a drink.
3. Politely ending the interaction.

These are the agreed broad interaction goals.

## 8.4 Suggested interaction count

Approximately three short interactions are recommended for the MVP.

The exact wording and final number of questions are not yet approved.

## 8.5 Suggested conversation outline

### Interaction 1 — Ordering food

**Waiter:**

`Nimge enu beku?`

**Intended learner action:**

Order one dosa.

**Possible target response:**

`Nanage ondu dose beku`

### Interaction 2 — Ordering a drink

**Waiter:**

`Kudiyakke enu beku?`

**Intended learner action:**

Ask for water.

**Possible target response:**

`Nanage neeru beku`

### Interaction 3 — Finishing the order

**Waiter:**

`Innu enadaru beka?`

**Intended learner action:**

Politely say that nothing else is needed.

**Possible target response:**

`Beda, dhanyavada`

These are illustrative lesson examples and should be reviewed for naturalness, correctness, and consistency before implementation.

## 8.6 Beginner restaurant experience

The learner sees the waiter dialogue, reads an English task instruction, and chooses from three Kannada options with English translations.

Incorrect responses produce feedback and allow retries.

Correct responses unlock the next interaction.

## 8.7 Intermediate restaurant experience

The learner encounters the same conversation and questions.

The three Kannada response options appear without English translations.

The learner must use their Kannada understanding to select the appropriate response.

Incorrect responses produce feedback and allow retries.

## 8.8 Advanced restaurant experience

The learner encounters the waiter speaking Romanized Kannada.

An optional Hint button reveals the English translation.

An English instruction describes what the learner should say.

The learner types their Kannada response.

AI evaluates whether the intended meaning is communicated.

For the MVP, the restaurant interaction should be short and predictable.

## 8.9 Mission completion

**CONFIRMED**

After the learner successfully finishes the required interactions, the application displays a mission-completion screen.

Suggested contents:

- "Mission Complete!"
- A short congratulatory message.
- A statement of what the learner practiced.
- A way to return to mission or difficulty selection.

The exact design and whether to display a vocabulary recap are not finalized.

---

# 9. APPLICATION FLOW

## 9.1 Confirmed functional sequence

The application must support the following general flow:

1. Learner opens Kannada Quest.
2. Learner selects a difficulty.
3. Learner begins a mission.
4. Learner completes the required interactions.
5. Learner receives feedback.
6. Learner progresses through the mission.
7. Learner reaches the completion screen.

## 9.2 Recommended navigation

**PROPOSED — NOT YET APPROVED**

Home screen → Difficulty selection → Mission selection → Mission interaction → Mission complete.

The exact screen layout and navigation design remain open.

## 9.3 Progression requirements

**CONFIRMED**

The MVP requires question progression and mission completion.

However, the following are not finalized:

- Whether missions unlock sequentially.
- Whether learners can freely select any mission.
- Whether completed missions remain marked as completed.
- Whether progress persists after closing the browser.

Avoid implementing complex progression rules without discussion.

---

# 10. USER INTERFACE AND EXPERIENCE

## 10.1 General design goals

**DESIGN GUIDANCE — NOT FINALIZED VISUAL SPECIFICATIONS**

The interface should be:

- Easy for beginners to understand.
- Clean and readable.
- Focused on one learning interaction at a time.
- Consistent across difficulty levels.
- Suitable for a hackathon demonstration.

## 10.2 Suggested screen components

Potential interface elements include:

- Application title.
- Difficulty selection buttons or cards.
- Mission title.
- Character dialogue area.
- English task instruction.
- Multiple-choice answer buttons.
- Advanced free-text input.
- Hint button.
- Submit or Check Answer button.
- Feedback area.
- Next button.
- Mission-completion screen.

These are functional design suggestions, not a finalized visual design.

## 10.3 Visual style

The following remain undecided:

- Color palette.
- Fonts.
- Character illustrations.
- Background images.
- Layout.
- Animation style.
- Mobile versus desktop design priorities.

Avoid spending excessive time on decorative features before core functionality works.

---

# 11. DEFERRED FEATURES

**STATUS: CONFIRMED OUT OF MVP SCOPE**

The following features are intentionally postponed:

- User accounts and authentication.
- Leaderboards.
- Speech recognition.
- Voice conversations.
- Pronunciation scoring.
- Extensive lesson libraries.
- Elaborate animations.
- Complex character systems.
- Large-scale gamification.
- Advanced statistics.
- Complex scoring systems.

These may be considered after the MVP if time permits, but they must not distract from the core hackathon deliverable.

---

# 12. TECHNICAL PLANNING

## 12.1 Current status

**NOT FINALIZED**

The final technology stack has not been approved.

Previous discussions considered:

- HTML for structure.
- CSS for styling.
- JavaScript for interactions.
- Node.js and Express for a possible backend.
- JSON for mission data.
- Browser storage for possible local progress.
- An external AI API for Advanced evaluation.

These are possible choices, not finalized architecture.

## 12.2 Technical priorities

The implementation should favor:

- Beginner-friendly concepts.
- Minimal dependencies.
- Reusable components or functions.
- Easy local testing.
- Secure AI integration.
- Straightforward deployment.
- A stable hackathon demonstration.

## 12.3 Reusable MCQ engine

**RECOMMENDED IMPLEMENTATION**

Beginner and Intermediate should ideally share one MCQ engine.

Mission data can define questions, options, translations, and correct answers.

The difficulty level determines whether translations are displayed.

This avoids duplicating most of the code.

## 12.4 AI evaluation architecture

**RECOMMENDED IMPLEMENTATION**

A protected backend or equivalent secure server-side function should communicate with the AI provider.

Do not place a private API key directly in browser JavaScript.

The learner's response and the intended meaning can be sent securely for evaluation.

The AI response can then be displayed as feedback.

The exact architecture depends on the final stack and provider.

## 12.5 Early AI feasibility testing

**HIGH-PRIORITY RECOMMENDATION**

Test a minimal Romanized Kannada evaluation request early in development.

This should happen before investing substantial time in the complete Advanced interface.

The goal is to determine whether the chosen AI provider can reliably distinguish:

- Correct responses.
- Reasonable spelling variations.
- Alternative valid expressions.
- Wrong quantities.
- Wrong food items.
- Unrelated answers.

If this evaluation is unreliable, the team should adjust the approach before the deadline.

---

# 13. DEVELOPMENT WORKFLOW

## 13.1 Existing setup

**COMPLETED**

The development environment and collaboration workflow have been prepared.

Available tools include:

- ChatGPT Project: Kan-quest.
- Brainstorm chat.
- Project Memory chat.
- Building chat.
- Private GitHub repository: Kanquest.
- VS Code.
- Git for Windows.
- GitHub Desktop.
- Codex working with the local repository.
- `PROJECT_MEMORY.md`.

Codex has successfully read the project memory without modifying files.

## 13.2 Chat responsibilities

### Brainstorm

Used to discuss ideas, evaluate scope, and finalize product decisions.

Do not treat unapproved suggestions as requirements.

### Project Memory

Maintains the consolidated project context.

Updates `PROJECT_MEMORY.md` after important decisions.

### Building

Acts as a programming mentor.

Explains concepts, breaks work into small tasks, helps prepare Codex instructions, and guides testing.

### Codex

Assists with focused coding tasks in the local repository.

Code changes should be reviewed and understood by the developer.

### GitHub Desktop

Used for commits and pushes.

## 13.3 Synchronization workflow

After major project decisions:

1. Update Project Memory.
2. Obtain the revised `PROJECT_MEMORY.md`.
3. Update the local repository file.
4. Commit and push the change to GitHub.
5. Refresh any separately uploaded Project source if necessary.

Do not assume that ChatGPT conversations, local files, and GitHub automatically synchronize.

## 13.4 Learning-first requirement

The developer wants to understand the application being built.

Implementation guidance should:

- Explain unfamiliar concepts.
- Introduce manageable tasks.
- Avoid unnecessary complexity.
- Help the developer understand code changes.
- Encourage testing.
- Avoid generating an entire complex application without explanation.

---

# 14. SUGGESTED 10-DAY IMPLEMENTATION PLAN

**STATUS: RECOMMENDATION, NOT A FIXED COMMITMENT**

### Days 1–2: Foundation and feasibility

- Confirm the technology stack.
- Understand the basic frontend structure.
- Create the initial application interface.
- Test basic AI evaluation feasibility.

### Days 3–4: MCQ functionality

- Build the reusable MCQ interaction system.
- Implement Beginner translations.
- Implement Intermediate without option translations.
- Add correct and incorrect answer feedback.
- Add retry and Next behavior.

### Days 5–7: Advanced mode

- Build the Advanced conversation interface.
- Add the optional English hint.
- Add English task instructions.
- Add free-text Kannada input.
- Connect AI evaluation securely.
- Test meaning and spelling tolerance.

### Day 8: Progression and usability

- Connect screens and missions.
- Add completion behavior.
- Improve readability and navigation.
- Fix usability issues.

### Days 9–10: Finalization

- Test all three difficulty levels.
- Verify Kannada content.
- Test error handling.
- Deploy a working demonstration.
- Prepare the hackathon submission.

Adjust this plan based on actual progress and technical blockers.

---

# 15. OPEN DECISIONS

The following questions remain unresolved and must not be silently treated as finalized:

1. Which AI provider will be used?
2. What frontend and backend stack will be used?
3. Where will the application be hosted?
4. What exact questions and answers will be included in the final restaurant mission?
5. What will the remaining Beginner and Intermediate missions be?
6. Will Advanced mode allow unlimited retries after incorrect responses?
7. What exact feedback format will the AI produce?
8. Will Intermediate character dialogue have an English translation or hint?
9. How will mission selection and unlocking work?
10. Will completed missions be saved locally?
11. What will the final interface look like?
12. Will the application use any scoring or XP system?
13. What error handling and fallback will be used when AI evaluation is unavailable?
14. How will the Kannada phrases and translations be validated?

These should be resolved only when necessary for implementation or when explicitly discussed and approved.

---

# 16. NON-NEGOTIABLE PROJECT PRINCIPLES

The following principles should guide all development:

**1. Practical Kannada first.**  
The application should teach language useful in real situations.

**2. Romanized Kannada throughout.**  
Do not require Kannada script literacy.

**3. All three difficulty levels must work.**  
Do not sacrifice an entire difficulty level for optional polish.

**4. Beginner and Intermediate must have meaningful MCQs.**  
Avoid obvious distractors and misleading question design.

**5. Mistakes should support learning.**  
Beginner and Intermediate learners can retry without penalties.

**6. Advanced must evaluate meaning.**  
Do not reduce Advanced mode to rigid exact-string matching.

**7. The MVP must remain small.**  
A working, tested experience is more valuable than numerous incomplete features.

**8. Secure AI credentials.**  
Never expose API secrets in frontend code or public repositories.

**9. Learn while building.**  
Use Codex as a coding assistant, not as a replacement for understanding.

**10. Keep project decisions documented.**  
Maintain `PROJECT_MEMORY.md` as the shared requirements reference.

---

# 17. CURRENT PROJECT STATUS

As of October 13, 2026:

**Completed:**
- Selected the Kannada for Everyone challenge.
- Defined Kannada Quest's core vision.
- Confirmed Romanized Kannada.
- Confirmed all three difficulty levels.
- Approved the focused 10-day MVP.
- Confirmed Beginner and Intermediate MCQ structure.
- Confirmed Advanced guided free-text interaction.
- Confirmed optional English translation hints in Advanced.
- Confirmed AI meaning-based evaluation.
- Selected Ordering at a Restaurant as Mission 1.
- Confirmed shared restaurant content for Beginner and Intermediate.
- Confirmed unlimited MCQ retries.
- Confirmed helpful answer feedback.
- Confirmed plausible and carefully balanced MCQ options.
- Completed the initial development environment and workflow setup.

**Not yet completed:**
- Final technology selection.
- AI provider selection.
- Final mission content writing and linguistic review.
- Application implementation.
- AI integration.
- Deployment.
- Hackathon submission.

**Immediate next phase:** Resolve the remaining implementation-critical decisions and begin developing the focused MVP through the Building workflow.

Do not expand scope without explicit approval.

---

# FINAL INSTRUCTION

Integrate all these decisions into the existing `PROJECT_MEMORY.md`, preserving earlier confirmed information.

Use clear sections for:
- Confirmed requirements.
- Approved MVP scope.
- Mission design.
- Interaction and feedback rules.
- Technical recommendations.
- Deferred features.
- Open questions.
- Current progress.

Return the **entire updated Markdown file**, not merely a summary or list of changes.

Do not begin coding.