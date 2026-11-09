window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "say or tell?",
  intro: "Choose the correct option. Remember: tell + person, say (+ to + person).",
  items: [
    { s: "She ___ me she was tired.", options: ["said", "told"], answer: 1,
      explain: "There's a person after the verb (me), so we use told." },
    { s: "He ___ that he was hungry.", options: ["said", "told"], answer: 0,
      explain: "No person after the verb, so we use said." },
    { s: "They ___ us to wait outside.", options: ["said", "told"], answer: 1,
      explain: "tell + person + to: They told us to wait." },
    { s: "What did you ___ to her?", options: ["say", "tell"], answer: 0,
      explain: "say + to + person: What did you say to her?" },
    { s: "Can you ___ me the time, please?", options: ["say", "tell"], answer: 1,
      explain: "tell + person: Can you tell me the time?" },
    { s: "Maria ___ she would be a bit late.", options: ["said", "told"], answer: 0,
      explain: "No person after the verb: Maria said (that)…" },
    { s: "He ___ to me that he had lost his keys.", options: ["said", "told"], answer: 0,
      explain: "With to before the person, we use say: He said to me…" },
    { s: "I ___ him not to worry.", options: ["said", "told"], answer: 1,
      explain: "tell + person + not to: I told him not to worry." },
    { s: "Don't ___ anyone about the party! It's a surprise.", options: ["say", "tell"], answer: 1,
      explain: "tell + person: Don't tell anyone." },
    { s: "\"Good morning,\" she ___ with a smile.", options: ["said", "told"], answer: 0,
      explain: "To introduce someone's exact words, we use said." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "Reported statements: the tense moves back",
  intro: "Complete the reported sentences. Move the verb one step back into the past.",
  items: [
    { s: "\"I'm tired,\" said Ana. → Ana said she ___ tired.", answers: ["was"],
      explain: "am → was." },
    { s: "\"I live in Madrid,\" said Paul. → Paul said he ___ in Madrid.", answers: ["lived"],
      explain: "Present simple → past simple: live → lived." },
    { s: "\"We're watching a film,\" they said. → They said they ___ a film.", answers: ["were watching"],
      explain: "Present continuous → past continuous: are watching → were watching." },
    { s: "\"I've lost my phone,\" said Tom. → Tom said he ___ his phone.", answers: ["had lost"],
      explain: "Present perfect → past perfect: have lost → had lost." },
    { s: "\"I'll call you later,\" she said. → She said she ___ me later.", answers: ["would call", "'d call"],
      explain: "will → would." },
    { s: "\"I can't swim,\" said Leo. → Leo said he ___ swim.", answers: ["couldn't", "could not"],
      explain: "can't → couldn't." },
    { s: "\"I saw the film last week,\" said Sam. → Sam said he ___ the film the week before.", answers: ["had seen"],
      explain: "Past simple → past perfect: saw → had seen. Notice: last week → the week before." },
    { s: "\"We're going to move house,\" they said. → They said they ___ move house.", answers: ["were going to"],
      explain: "are going to → were going to." },
    { s: "\"I don't like spicy food,\" said Kate. → Kate said she ___ spicy food.", answers: ["didn't like", "did not like"],
      explain: "don't like → didn't like." },
    { s: "\"I have to work on Saturday,\" said my dad. → My dad said he ___ work on Saturday.", answers: ["had to"],
      explain: "have to → had to." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Reported questions",
  intro: "Choose the correct option. In reported questions, the subject comes before the verb and there's no do, does or did.",
  items: [
    { s: "\"Where do you live?\" → She asked me where ___.", options: ["I lived", "did I live", "I did live"], answer: 0,
      explain: "Normal word order (I lived) and no did: She asked me where I lived." },
    { s: "\"Are you hungry?\" → He asked me ___ hungry.", options: ["if I was", "was I", "if was I"], answer: 0,
      explain: "Yes/no question → if + subject + verb: if I was hungry." },
    { s: "\"What time does the train leave?\" → I asked what time the train ___.", options: ["left", "did leave", "does leave"], answer: 0,
      explain: "No does in reported questions, and the tense moves back: what time the train left." },
    { s: "\"Can you drive?\" → She asked me ___ drive.", options: ["if I could", "could I", "if could I"], answer: 0,
      explain: "if + subject + could: She asked me if I could drive." },
    { s: "\"Why are you crying?\" → My mum asked me why ___.", options: ["I was crying", "was I crying", "were I crying"], answer: 0,
      explain: "Subject before verb, and are → was: why I was crying." },
    { s: "\"Have you finished?\" → The teacher asked ___ finished.", options: ["whether we had", "had we", "whether had we"], answer: 0,
      explain: "whether (or if) + subject + had + past participle: whether we had finished." },
    { s: "\"Who did you meet?\" → He asked me who ___.", options: ["I had met", "had I met", "did I meet"], answer: 0,
      explain: "No did, and the past simple moves back to the past perfect: who I had met." },
    { s: "\"Do you like jazz?\" → She wanted to know ___ jazz.", options: ["if I liked", "did I like", "if I did like"], answer: 0,
      explain: "if + subject + past simple: if I liked jazz." },
    { s: "\"How old is your brother?\" → They asked me how old ___.", options: ["my brother was", "was my brother", "is my brother"], answer: 0,
      explain: "Subject (my brother) before the verb: how old my brother was." },
    { s: "\"Will you be at the party?\" → Tom asked ___ at the party.", options: ["if I would be", "would I be", "if would I be"], answer: 0,
      explain: "if + subject + would: Tom asked if I would be at the party." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences",
  textTitle: "Requests and orders",
  intro: "Complete the reported sentences with to or not to and a verb.",
  items: [
    { s: "\"Please sit down,\" she said to us. → She asked us ___ down.", answers: ["to sit"],
      explain: "ask + person + to + verb: She asked us to sit down." },
    { s: "\"Don't be late,\" the teacher said to us. → The teacher told us ___ late.", answers: ["not to be"],
      explain: "A negative order: tell + person + not to + verb." },
    { s: "\"Close the window, please,\" my dad said to me. → My dad asked me ___ the window.", answers: ["to close", "to shut"],
      explain: "A request: ask + person + to + verb." },
    { s: "\"Don't touch the paintings,\" the guide said. → The guide told us ___ the paintings.", answers: ["not to touch"],
      explain: "Negative order: told us not to touch." },
    { s: "\"Call me when you arrive,\" said Mum. → Mum told me ___ her when I arrived.", answers: ["to call", "to phone", "to ring"],
      explain: "An instruction: tell + person + to + verb. Notice me → her." },
    { s: "\"Please don't tell anyone,\" she said to me. → She asked me ___ anyone.", answers: ["not to tell"],
      explain: "A negative request: asked me not to tell." },
    { s: "\"Wait here,\" the police officer said to them. → The police officer told them ___ there.", answers: ["to wait", "to stay"],
      explain: "An order: told them to wait. Notice here → there." },
    { s: "\"Can you help me with my bags?\" the old man said. → The old man asked me ___ him with his bags.", answers: ["to help"],
      explain: "A request with can you…? → ask + person + to + verb." },
    { s: "\"Don't forget your passport,\" Dad said to me. → Dad told me ___ my passport.", answers: ["not to forget"],
      explain: "Negative instruction: told me not to forget." },
    { s: "\"Turn off your phones,\" the teacher said to the class. → The teacher told the class ___ their phones.", answers: ["to turn off", "to switch off"],
      explain: "An order: told the class to turn off their phones." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Mixed practice",
  intro: "Choose the correct option.",
  items: [
    { s: "\"I'll see you tomorrow.\" → She ___ she would see me the next day.", options: ["said", "told", "said me"], answer: 0,
      explain: "No person after the verb, so said. (Told needs a person: told me; said me is wrong.)" },
    { s: "\"I met him yesterday.\" → He said he ___ him the day before.", options: ["had met", "has met", "meets"], answer: 0,
      explain: "Past simple → past perfect: met → had met. Yesterday → the day before." },
    { s: "\"Where is the station?\" → A tourist asked me where the station ___.", options: ["was", "was it", "did be"], answer: 0,
      explain: "Normal word order and is → was: where the station was." },
    { s: "\"Don't open the door!\" → She told the children ___ the door.", options: ["not to open", "don't open", "to not opening"], answer: 0,
      explain: "Negative order: tell + person + not to + verb." },
    { s: "\"Are you coming to the party?\" → Tom asked me ___ to the party.", options: ["if I was coming", "was I coming", "if I am come"], answer: 0,
      explain: "Yes/no question → if + subject + verb, and are coming → was coming." },
    { s: "\"We've never been to Japan.\" → They told us they ___ to Japan.", options: ["had never been", "never were", "had never go"], answer: 0,
      explain: "Present perfect → past perfect: have never been → had never been." },
    { s: "\"I can help you tomorrow.\" → He said he ___ help me the next day.", options: ["could", "can to", "could to"], answer: 0,
      explain: "can → could, followed by the base verb (no to)." },
    { s: "\"Please call me back.\" → She ___ me to call her back.", options: ["asked", "said", "said to"], answer: 0,
      explain: "A request: ask + person + to + verb. We can't say said me to." },
    { s: "\"I'm going to buy a new car.\" → My neighbour said he ___ buy a new car.", options: ["was going to", "is going", "was going"], answer: 0,
      explain: "am going to → was going to (don't forget to before the verb)." },
    { s: "\"What did you buy?\" → My mum asked me what ___.", options: ["I had bought", "had I bought", "did I buy"], answer: 0,
      explain: "Normal word order, no did, and bought → had bought: what I had bought." }
  ]
}
];
