window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Choose the auxiliary verb",
  intro: "Choose the correct word to complete each question.",
  items: [
    { s: "___ you live near here?", options: ["Do", "Does", "Are"], answer: 0,
      explain: "Present simple question with you: Do you live…?" },
    { s: "___ your brother like football?", options: ["Do", "Does", "Is"], answer: 1,
      explain: "Your brother = he, so the present simple question uses Does." },
    { s: "___ you tired? You look tired.", options: ["Do", "Are", "Have"], answer: 1,
      explain: "Tired is an adjective, so we use the verb be: Are you tired?" },
    { s: "___ they go to the concert last night?", options: ["Do", "Did", "Were"], answer: 1,
      explain: "Last night = past simple. Questions use Did + base verb: Did they go…?" },
    { s: "___ she ever been to Mexico?", options: ["Has", "Have", "Did"], answer: 0,
      explain: "Ever + been = present perfect. She takes has: Has she ever been…?" },
    { s: "___ it raining outside?", options: ["Does", "Is", "Do"], answer: 1,
      explain: "Raining is the -ing form, so this is the present continuous: Is it raining?" },
    { s: "Where ___ you go on holiday last summer?", options: ["did", "were", "do"], answer: 0,
      explain: "Last summer = past simple: Where did you go…?" },
    { s: "What ___ your sister doing now?", options: ["is", "does", "do"], answer: 0,
      explain: "Doing now = present continuous: What is she doing?" },
    { s: "How long ___ you known Marta?", options: ["did", "have", "are"], answer: 1,
      explain: "How long + known = present perfect: How long have you known…?" },
    { s: "___ you help me with this box, please?", options: ["Can", "Do", "Are"], answer: 0,
      explain: "Asking for help: Can you help me…?" }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Question words",
  intro: "Look at the answer and choose the correct question word.",
  items: [
    { s: "___ do you live? – In a small town near Porto.", options: ["Where", "When", "What"], answer: 0,
      explain: "The answer is a place, so we ask Where." },
    { s: "___ is your birthday? – In March.", options: ["When", "Where", "Who"], answer: 0,
      explain: "The answer is a time, so we ask When." },
    { s: "___ is that man? – He's my new boss.", options: ["Who", "Which", "What"], answer: 0,
      explain: "We're asking about a person: Who." },
    { s: "___ are you laughing? – Because Tom told a funny joke.", options: ["Why", "How", "What"], answer: 0,
      explain: "The answer starts with because, so we ask Why." },
    { s: "___ bag is this? – It's Ana's.", options: ["Whose", "Who", "Which"], answer: 0,
      explain: "The answer tells us who it belongs to, so we ask Whose." },
    { s: "___ do you go to the cinema? – About once a month.", options: ["How often", "How much", "How long"], answer: 0,
      explain: "Once a month is a frequency, so we ask How often." },
    { s: "___ does this jacket cost? – Forty euros.", options: ["How much", "How many", "How often"], answer: 0,
      explain: "Asking about a price: How much does it cost?" },
    { s: "___ sisters have you got? – Two.", options: ["How many", "How much", "How long"], answer: 0,
      explain: "Sisters is a plural countable noun, so we ask How many." },
    { s: "___ does the film start? – At half past eight.", options: ["What time", "How long", "Which"], answer: 0,
      explain: "The answer is a clock time, so we ask What time." },
    { s: "___ is it from here to the beach? – About two kilometres.", options: ["How far", "How long", "How much"], answer: 0,
      explain: "The answer is a distance, so we ask How far." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Subject or object question?",
  intro: "Choose the correct option. Remember: when who or what is the subject, there's no do, does or did.",
  items: [
    { s: "Who ___ you this present?", options: ["gave", "did give"], answer: 0,
      explain: "Who is the subject (someone gave you the present), so there's no did: Who gave you this?" },
    { s: "Who ___ at the party?", options: ["did you see", "you saw"], answer: 0,
      explain: "Here who is the object (you saw someone), so we need did: Who did you see?" },
    { s: "What ___ in the kitchen? There's water everywhere!", options: ["happened", "did happen"], answer: 0,
      explain: "What is the subject of happen, so there's no did: What happened?" },
    { s: "What ___ for dinner last night?", options: ["did you have", "you had"], answer: 0,
      explain: "What is the object (you had something), so we need did: What did you have?" },
    { s: "Who ___ the best in your class?", options: ["sings", "does sing"], answer: 0,
      explain: "Who is the subject, so the verb stays in its normal form: Who sings…?" },
    { s: "Which team ___ the match yesterday?", options: ["won", "did win"], answer: 0,
      explain: "Which team is the subject (a team won), so there's no did." },
    { s: "Who ___ to on the phone?", options: ["were you talking", "you were talking"], answer: 0,
      explain: "Who is the object of talk to, so we need the question form: Who were you talking to?" },
    { s: "How many people ___ to the meeting?", options: ["came", "did come"], answer: 0,
      explain: "How many people is the subject (people came), so there's no did." },
    { s: "What ___ your brother do? – He's a nurse.", options: ["does", "is"], answer: 0,
      explain: "To ask about someone's job: What does he do? (present simple question)." },
    { s: "Who ___ this cake? It's delicious!", options: ["made", "did make"], answer: 0,
      explain: "Who is the subject (someone made the cake), so we say Who made…?" }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Prepositions at the end, and What … like?",
  intro: "Choose the correct word to complete each question.",
  items: [
    { s: "Where are you ___? – I'm from Chile.", options: ["from", "of", "in"], answer: 0,
      explain: "Where are you from? The preposition goes at the end of the question." },
    { s: "Who are you waiting ___? – My sister.", options: ["for", "to", "at"], answer: 0,
      explain: "We say wait for someone, so the question is Who are you waiting for?" },
    { s: "What are you talking ___? – The football match last night.", options: ["about", "of", "with"], answer: 0,
      explain: "We say talk about something: What are you talking about?" },
    { s: "What's your new flat ___? – It's small but very bright.", options: ["like", "as", "how"], answer: 0,
      explain: "What is it like? asks someone to describe something." },
    { s: "Who did you go to the cinema ___? – With Maria and Leo.", options: ["with", "to", "for"], answer: 0,
      explain: "The answer is With Maria and Leo, so the question ends with with." },
    { s: "What are you looking ___? – My keys. I can't find them.", options: ["for", "at", "after"], answer: 0,
      explain: "You're trying to find your keys: look for something." },
    { s: "Which hotel did you stay ___? – The one next to the station.", options: ["at", "to", "on"], answer: 0,
      explain: "We stay at (or in) a hotel. The preposition goes at the end." },
    { s: "What was the weather ___ in Rome? – Hot and sunny.", options: ["like", "as", "how"], answer: 0,
      explain: "What was the weather like? asks for a description." },
    { s: "Who is this present ___? – It's for you!", options: ["for", "to", "of"], answer: 0,
      explain: "A present is for someone: Who is it for?" },
    { s: "What are you afraid ___? – Spiders!", options: ["of", "from", "about"], answer: 0,
      explain: "We say afraid of something: What are you afraid of?" }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Write the questions",
  intro: "Write the question for each answer. Use the words in brackets in the same order, and add any words you need (do, did, are, have…).",
  items: [
    { s: "___ – I live in Lisbon. (where / you / live)", answers: ["Where do you live?"], width: 26,
      explain: "Present simple: question word + do + you + base verb." },
    { s: "___ – She works in a bank. (where / your sister / work)", answers: ["Where does your sister work?"], width: 26,
      explain: "Your sister = she, so we use does, and work has no -s after does." },
    { s: "___ – I got up at seven. (what time / you / get up)", answers: ["What time did you get up?"], width: 26,
      explain: "The answer is in the past (got), so the question uses did + base verb." },
    { s: "___ – Yes, I've been to London twice. (you / ever / be / to London)", answers: ["Have you ever been to London?"], width: 26,
      explain: "Present perfect question: Have + you + ever + past participle (been)." },
    { s: "___ – Because I was tired. (why / you / leave / early)", answers: ["Why did you leave early?"], width: 26,
      explain: "A past action, so we use did + base verb: Why did you leave early?" },
    { s: "___ – No, she can't. (your mum / can / drive)", answers: ["Can your mum drive?"], width: 26,
      explain: "With can, there's no do: just put can before the subject." },
    { s: "___ – They're watching TV. (what / the children / do)", answers: ["What are the children doing?"], width: 26,
      explain: "The answer is in the present continuous, so the question is too: What are they doing?" },
    { s: "___ – Tom broke it. (who / break / the window)", answers: ["Who broke the window?"], width: 26,
      explain: "Who is the subject (Tom broke it), so there's no did: Who broke the window?" },
    { s: "___ – It costs twenty euros. (how much / this jacket / cost)", answers: ["How much does this jacket cost?"], width: 26,
      explain: "This jacket = it, so we use does + cost." },
    { s: "___ – I'm going to visit my grandparents. (what / you / do / this weekend)", answers: ["What are you going to do this weekend?", "What are you doing this weekend?"], width: 26,
      explain: "The answer uses going to, so the question does too: What are you going to do…? (What are you doing this weekend? is also correct.)" }
  ]
}
];
