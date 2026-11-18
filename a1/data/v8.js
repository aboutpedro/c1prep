window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Hello and goodbye",
  intro: "Choose the correct answer or phrase.",
  items: [
    { s: "Hi, I'm Ana. – Hi, Ana. Nice to ___ you.", options: ["meet", "see to", "know to"], answer: 0,
      explain: "When we meet somebody for the first time: Nice to meet you." },
    { s: "How are you? – ___, thanks. And you?", options: ["Fine", "Good morning", "Nice"], answer: 0,
      explain: "A usual answer: Fine, thanks. (Or: I'm good, thanks.)" },
    { s: "It's 8 a.m. – Good ___!", options: ["morning", "night", "afternoon"], answer: 0,
      explain: "Before 12: Good morning." },
    { s: "It's 11 p.m. I'm going to bed. Good ___!", options: ["night", "evening", "morning"], answer: 0,
      explain: "When you go to bed or leave at night: Good night." },
    { s: "Bye! See you ___!", options: ["tomorrow", "yesterday", "ago"], answer: 0,
      explain: "See you tomorrow / later / soon." },
    { s: "What's your name? – ___ Pedro.", options: ["My name's", "My name", "I name"], answer: 0,
      explain: "My name's Pedro (or I'm Pedro)." },
    { s: "Where are you from? – I'm ___ Brazil.", options: ["from", "of", "in"], answer: 0,
      explain: "I'm from Brazil." },
    { s: "This is my friend, Ben. – Hello, Ben. ___.", options: ["Nice to meet you", "Goodbye", "You're welcome"], answer: 0,
      explain: "When someone introduces a person to you: Nice to meet you." },
    { s: "Have a nice ___! – Thanks, you too!", options: ["day", "night tomorrow", "good"], answer: 0,
      explain: "Have a nice day!" },
    { s: "How old are you? – I'm ___.", options: ["twenty", "twenty years", "twenty old"], answer: 0,
      explain: "I'm twenty (or I'm twenty years old)." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "In the classroom",
  intro: "Complete the sentences with words from the box. There are two words you don't need.",
  bank: ["board", "close", "homework", "listen", "mean", "open", "page", "pencil", "repeat", "sit", "spell", "understand"],
  items: [
    { s: "___ your books at page 12.", answers: ["Open"],
      explain: "Open your books." },
    { s: "What does this word ___?", answers: ["mean"],
      explain: "What does … mean?" },
    { s: "Can you ___ that, please? I didn't hear.", answers: ["repeat"],
      explain: "Repeat = say it again." },
    { s: "How do you ___ \"beautiful\"? – B-E-A-U-…", answers: ["spell"],
      explain: "To spell = to say the letters." },
    { s: "I don't ___. Can you explain it again?", answers: ["understand"],
      explain: "I don't understand = it isn't clear to me." },
    { s: "Look at the ___. The teacher is writing on it.", answers: ["board"],
      explain: "The teacher writes on the board." },
    { s: "Do exercise 3 for ___.", answers: ["homework"],
      explain: "Homework = work to do at home." },
    { s: "___ to the audio and answer the questions.", answers: ["Listen"],
      explain: "Listen to the audio." },
    { s: "Turn to ___ 40.", answers: ["page"],
      explain: "Turn to page 40." },
    { s: "___ your books, please. The class is finished.", answers: ["Close"],
      explain: "The opposite of open: close." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Please, thank you, sorry",
  intro: "Choose the correct answer.",
  items: [
    { s: "Thank you very much! – You're ___.", options: ["welcome", "thank you", "please"], answer: 0,
      explain: "A polite answer to thank you: You're welcome." },
    { s: "Sorry I'm late! – That's ___.", options: ["OK", "sorry", "please"], answer: 0,
      explain: "A friendly answer to sorry: That's OK. (Or: No problem.)" },
    { s: "___ me, is this seat free?", options: ["Excuse", "Sorry", "Please"], answer: 0,
      explain: "To start talking to a stranger: Excuse me." },
    { s: "Can I have some water, ___?", options: ["please", "thanks", "sorry"], answer: 0,
      explain: "To ask politely: please." },
    { s: "___! I didn't see you. Are you OK?", options: ["Sorry", "Excuse me", "Please"], answer: 0,
      explain: "When we make a mistake (we hit somebody): Sorry!" },
    { s: "Would you like some tea? – Yes, ___.", options: ["please", "thank", "sorry"], answer: 0,
      explain: "To accept: Yes, please." },
    { s: "Would you like some cake? – No, ___.", options: ["thank you", "please", "sorry"], answer: 0,
      explain: "To say no politely: No, thank you." },
    { s: "Here's your coffee. – ___ you.", options: ["Thank", "Thanks", "Please"], answer: 0,
      explain: "We say Thank you (or Thanks)." },
    { s: "Can you help me? – ___!", options: ["Of course", "Excuse me", "You're welcome"], answer: 0,
      explain: "Saying yes to a request: Of course! (or Sure!)" },
    { s: "I'm sorry, I can't come to your party. – ___ problem.", options: ["No", "Not", "Any"], answer: 0,
      explain: "No problem = it's OK." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences",
  textTitle: "Opposites",
  intro: "Write the opposite of the word in brackets.",
  items: [
    { s: "This bag isn't heavy. It's ___. (heavy)", answers: ["light"],
      explain: "heavy ↔ light." },
    { s: "The film wasn't boring. It was ___. (boring)", answers: ["interesting"],
      explain: "boring ↔ interesting." },
    { s: "My room isn't clean. It's ___. (clean)", answers: ["dirty"],
      explain: "clean ↔ dirty." },
    { s: "The shop isn't open. It's ___. (open)", answers: ["closed"],
      explain: "open ↔ closed." },
    { s: "My grandmother isn't young. She's ___. (young)", answers: ["old"],
      explain: "young ↔ old." },
    { s: "The test wasn't difficult. It was ___. (difficult)", answers: ["easy"],
      explain: "difficult ↔ easy." },
    { s: "This coffee isn't hot. It's ___! (hot)", answers: ["cold"],
      explain: "hot ↔ cold." },
    { s: "The bus isn't fast. It's ___. (fast)", answers: ["slow"],
      explain: "fast ↔ slow." },
    { s: "I'm not sad today. I'm ___. (sad)", answers: ["happy"],
      explain: "sad ↔ happy." },
    { s: "The street isn't quiet. It's ___. (quiet)", answers: ["noisy", "loud", "busy"],
      explain: "quiet ↔ noisy (or loud)." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Common verbs",
  intro: "Choose the correct verb.",
  items: [
    { s: "Can you ___ me the salt, please?", options: ["pass", "take", "put"], answer: 0,
      explain: "To give something across a table: pass." },
    { s: "I always ___ my keys! Where are they?", options: ["lose", "find", "win"], answer: 0,
      explain: "I don't know where they are: I lose them." },
    { s: "___ me! I'm over here!", options: ["Look at", "See", "Watch to"], answer: 0,
      explain: "Look at = turn your eyes to something." },
    { s: "I ___ English and Portuguese.", options: ["speak", "say", "talk"], answer: 0,
      explain: "We speak a language." },
    { s: "Can you ___ me your pen? I'll give it back.", options: ["lend", "borrow", "take"], answer: 0,
      explain: "Lend = give for a short time." },
    { s: "Can I ___ your pen? I'll give it back.", options: ["borrow", "lend", "give"], answer: 0,
      explain: "Borrow = take for a short time." },
    { s: "Please ___ the door. It's cold.", options: ["close", "open", "turn"], answer: 0,
      explain: "It's cold, so close the door." },
    { s: "I ___ for the bus every morning.", options: ["wait", "stay", "hope"], answer: 0,
      explain: "We wait for the bus." },
    { s: "She ___ \"hello\" and smiled.", options: ["said", "told", "spoke"], answer: 0,
      explain: "We say a word: she said \"hello\"." },
    { s: "___ me about your holiday!", options: ["Tell", "Say", "Speak"], answer: 0,
      explain: "Tell me about… (tell + person)." }
  ]
}
];
