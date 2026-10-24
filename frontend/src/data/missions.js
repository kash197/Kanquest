export const missions = [
  {
    id: 'restaurant',
    title: 'At the Restaurant',
    turns: [
      {
        speaker: 'Waiter',
        dialogue: 'Nimge enu beku?',
        dialogueTranslation: 'What would you like?',
        objective: 'Order one dosa',
        options: [
          { text: 'Nanage eradu dose beku.', translation: 'I want two dosas.' },
          { text: 'Nanage ondu idli beku.', translation: 'I want one idli.' },
          { text: 'Nanage ondu dose beku.', translation: 'I want one dosa.' },
        ],
        correctOptionIndex: 2,
      },
      {
        speaker: 'Waiter',
        dialogue: 'Sari, bere enadaru?',
        dialogueTranslation: 'Okay, anything else?',
        objective: 'Ask whether the dosa is spicy',
        options: [
          { text: 'Dose bisi ideya?', translation: 'Is the dosa hot?' },
          { text: 'Dose khara ideya?', translation: 'Is the dosa spicy?' },
          { text: 'Dose sihi ideya?', translation: 'Is the dosa sweet?' },
        ],
        correctOptionIndex: 1,
      },
      {
        speaker: 'Waiter',
        dialogue: 'Innu enadaru beka?',
        dialogueTranslation: 'Would you like anything else?',
        objective: 'Decline additional items and request the bill',
        options: [
          { text: 'Beda, menu kodi.', translation: 'No, please give me the menu.' },
          { text: 'Beda, bill kodi.', translation: 'No, please give me the bill.' },
          { text: 'Beku, bill kodi.', translation: 'I want the bill, please.' },
        ],
        correctOptionIndex: 1,
      },
    ],
  },
  {
    id: 'meeting-someone-new',
    title: 'Meeting Someone New',
    turns: [
      {
        speaker: 'Friend',
        dialogue: 'Namaskara! Nimma hesarenu?',
        dialogueTranslation: 'Hello! What is your name?',
        objective: 'Introduce yourself as Rahul',
        options: [
          { text: 'Nimma hesaru Rahul.', translation: 'Your name is Rahul.' },
          { text: 'Avana hesaru Rahul.', translation: 'His name is Rahul.' },
          { text: 'Nanna hesaru Rahul.', translation: 'My name is Rahul.' },
        ],
        correctOptionIndex: 2,
      },
      {
        speaker: 'Friend',
        dialogue: 'Neevu hegiddira?',
        dialogueTranslation: 'How are you?',
        objective: 'Respond that you\'re doing well',
        options: [
          { text: 'Naanu chennagilla.', translation: "I'm not well." },
          { text: 'Naanu chennagiddene.', translation: "I'm doing well." },
          { text: 'Neevu chennagiddira.', translation: 'Are you doing well?' },
        ],
        correctOptionIndex: 1,
      },
      {
        speaker: 'Friend',
        dialogue: 'Sari, bye!',
        dialogueTranslation: 'Okay, bye!',
        objective: 'Say you\'ll see your friend again',
        options: [
          { text: 'Matte sigona!', translation: "Let's meet again!" },
          { text: 'Matte barthini!', translation: "I'll come again!" },
          { text: 'Matte kelthini!', translation: "I'll ask again!" },
        ],
        correctOptionIndex: 0,
      },
    ],
  },
  {
    id: 'auto-driver',
    title: 'Talking to an Auto Driver',
    turns: [
      {
        speaker: 'Driver',
        dialogue: 'Yellige hogbeku?',
        dialogueTranslation: 'Where do you need to go?',
        objective: 'Tell the driver to go to the railway station',
        options: [
          {
            text: 'Railway station inda barbeku.',
            translation: 'I need to come from the railway station.',
          },
          {
            text: 'Railway station ge hogbeku.',
            translation: 'I need to go to the railway station.',
          },
          {
            text: 'Railway station alli iddini.',
            translation: "I'm at the railway station.",
          },
        ],
        correctOptionIndex: 1,
      },
      {
        speaker: 'Driver',
        dialogue: 'Sari, hogona.',
        dialogueTranslation: "Okay, let's go.",
        objective: 'Ask about the fare',
        options: [
          { text: 'Eshtu doora?', translation: 'How far is it?' },
          { text: 'Eshtu hottu?', translation: 'How long will it take?' },
          { text: 'Eshtu duddu aagutte?', translation: 'How much will it cost?' },
        ],
        correctOptionIndex: 2,
      },
      {
        speaker: 'Driver',
        dialogue: 'Station hattira bandvi.',
        dialogueTranslation: "We're near the station now.",
        objective: 'Ask the driver to stop here',
        options: [
          { text: 'Illi hogi.', translation: 'Go here.' },
          { text: 'Illi nillisi.', translation: 'Stop here.' },
          { text: 'Illi tirugisi.', translation: 'Turn here.' },
        ],
        correctOptionIndex: 1,
      },
    ],
  },
]
