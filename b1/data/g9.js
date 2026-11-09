window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "who, which or where?",
  intro: "Choose who, which or where.",
  items: [
    { s: "The woman ___ lives next door is a doctor.", options: ["who", "which", "where"], answer: 0,
      explain: "A person: who." },
    { s: "This is the café ___ we first met.", options: ["who", "which", "where"], answer: 2,
      explain: "A place, and we met there: where." },
    { s: "I've lost the watch ___ my dad gave me.", options: ["who", "which", "where"], answer: 1,
      explain: "A thing: which (or that)." },
    { s: "Do you know anyone ___ speaks Japanese?", options: ["who", "which", "where"], answer: 0,
      explain: "A person: who." },
    { s: "That's the hospital ___ I was born.", options: ["who", "which", "where"], answer: 2,
      explain: "A place, and I was born there: where." },
    { s: "The bus ___ goes to the airport leaves every hour.", options: ["who", "which", "where"], answer: 1,
      explain: "A thing: which (or that)." },
    { s: "Paris is a city ___ I'd love to live one day.", options: ["who", "which", "where"], answer: 2,
      explain: "A place, and I'd live there: where." },
    { s: "I've got a friend ___ is a professional dancer.", options: ["who", "which", "where"], answer: 0,
      explain: "A person: who." },
    { s: "Did you see the film ___ won the Oscar this year?", options: ["who", "which", "where"], answer: 1,
      explain: "A thing: which (or that)." },
    { s: "This is the drawer ___ I keep my passport.", options: ["who", "which", "where"], answer: 2,
      explain: "A place (in the drawer), so where. You could also say the drawer which I keep my passport in." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "whose, when, where or which?",
  intro: "Choose the correct word.",
  items: [
    { s: "That's the man ___ dog bit me.", options: ["whose", "when", "where", "which"], answer: 0,
      explain: "His dog → whose dog. Whose shows possession." },
    { s: "I'll never forget the day ___ I met my wife.", options: ["whose", "when", "where", "which"], answer: 1,
      explain: "A time (the day): when." },
    { s: "She's the singer ___ songs are always on the radio.", options: ["whose", "when", "where", "which"], answer: 0,
      explain: "Her songs → whose songs." },
    { s: "Summer is the time of year ___ most people go on holiday.", options: ["whose", "when", "where", "which"], answer: 1,
      explain: "A time: when." },
    { s: "That's the town ___ my parents grew up.", options: ["whose", "when", "where", "which"], answer: 2,
      explain: "A place where something happened: where." },
    { s: "Do you remember the year ___ we went to Iceland?", options: ["whose", "when", "where", "which"], answer: 1,
      explain: "A time (the year): when." },
    { s: "I have a friend ___ brother is a famous chef.", options: ["whose", "when", "where", "which"], answer: 0,
      explain: "Her brother → whose brother." },
    { s: "The book ___ you lent me was brilliant.", options: ["whose", "when", "where", "which"], answer: 3,
      explain: "A thing, the object of lent: which (or that, or nothing)." },
    { s: "The restaurant ___ we had dinner was very expensive.", options: ["whose", "when", "where", "which"], answer: 2,
      explain: "We had dinner there: where." },
    { s: "The students ___ phones rang had to leave the room.", options: ["whose", "when", "where", "which"], answer: 0,
      explain: "Their phones → whose phones." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Choose the correct sentence",
  intro: "Choose the correct sentence. Think about commas, about where you can use that, and about when you can leave out the relative word.",
  items: [
    { s: "I have one brother. ___", options: ["My brother, who lives in Rome, is a chef.", "My brother who lives in Rome is a chef."], answer: 0,
      explain: "I have only one brother, so who lives in Rome is extra information: use commas." },
    { s: "I have two sisters. One lives in London and one lives in Paris. ___", options: ["My sister who lives in London is a nurse.", "My sister, who lives in London, is a nurse."], answer: 0,
      explain: "The clause tells us which sister, so it's defining: no commas." },
    { s: "___", options: ["The Eiffel Tower, which was finished in 1889, is in Paris.", "The Eiffel Tower, that was finished in 1889, is in Paris."], answer: 0,
      explain: "After a comma (non-defining clause), you can't use that. Use which." },
    { s: "___", options: ["The people who live upstairs are very noisy.", "The people, who live upstairs, are very noisy."], answer: 0,
      explain: "The clause tells us which people, so it's defining: no commas." },
    { s: "___", options: ["My best friend, who I've known since school, is getting married.", "My best friend, that I've known since school, is getting married."], answer: 0,
      explain: "Non-defining clause (with commas): who, not that." },
    { s: "___", options: ["Is this the bag you were looking for?", "Is this the bag, you were looking for?"], answer: 0,
      explain: "A defining clause has no comma. You can leave out that because you is the subject of the clause." },
    { s: "___", options: ["The man who called you is waiting outside.", "The man called you is waiting outside."], answer: 0,
      explain: "Who is the subject of called, so you can't leave it out." },
    { s: "___", options: ["The film we saw last night was great.", "The film we saw it last night was great."], answer: 0,
      explain: "Don't repeat the object: the relative clause already refers to the film." },
    { s: "___", options: ["Lisbon, where I was born, is a beautiful city.", "Lisbon where I was born is a beautiful city."], answer: 0,
      explain: "There's only one Lisbon, so where I was born is extra information: use commas." },
    { s: "___", options: ["She lent me some money, which was really kind.", "She lent me some money, that was really kind."], answer: 0,
      explain: "Which can refer to the whole idea before it. That isn't possible after a comma." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences",
  textTitle: "Join the sentences",
  intro: "Join the two sentences. Write one word in each gap.",
  items: [
    { s: "I met a man. His dog is famous on Instagram. → I met a man ___ dog is famous on Instagram.", answers: ["whose"],
      explain: "His dog → whose dog." },
    { s: "This is the house. I grew up there. → This is the house ___ I grew up.", answers: ["where"],
      explain: "A place, and I grew up there: where." },
    { s: "She's the teacher. She helped me pass my exam. → She's the teacher ___ helped me pass my exam.", answers: ["who", "that"],
      explain: "A person, the subject of helped: who (or that)." },
    { s: "I bought a phone. It broke after a week. → I bought a phone ___ broke after a week.", answers: ["which", "that"],
      explain: "A thing, the subject of broke: which (or that)." },
    { s: "That's the girl. Her mum is my boss. → That's the girl ___ mum is my boss.", answers: ["whose"],
      explain: "Her mum → whose mum." },
    { s: "I remember the day. We moved to London on that day. → I remember the day ___ we moved to London.", answers: ["when", "that"],
      explain: "A time: when (that is also possible)." },
    { s: "My uncle is a pilot. He lives in Dubai. → My uncle, ___ lives in Dubai, is a pilot.", answers: ["who"],
      explain: "Extra information about a person, between commas: who (not that)." },
    { s: "We stayed at a hotel. It had a fantastic pool. → We stayed at a hotel ___ had a fantastic pool.", answers: ["which", "that"],
      explain: "A thing, the subject of had: which (or that)." },
    { s: "Rome is a city. Everyone should visit it once. → Rome is a city ___ everyone should visit once.", answers: ["which", "that"],
      explain: "A thing, the object of visit: which or that. (You could also leave it out.)" },
    { s: "Our neighbour is very friendly. Her garden is full of roses. → Our neighbour, ___ garden is full of roses, is very friendly.", answers: ["whose"],
      explain: "Her garden → whose garden." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Mixed practice",
  intro: "Complete the sentences with one word: who, which, that, whose, where or when.",
  items: [
    { s: "The man ___ fixed my car was really helpful.", answers: ["who", "that"],
      explain: "A person, the subject of fixed: who (or that)." },
    { s: "This is the park ___ I go running every morning.", answers: ["where"],
      explain: "A place, and I go running there: where." },
    { s: "Is that the woman ___ son plays for Benfica?", answers: ["whose"],
      explain: "Her son → whose son." },
    { s: "My laptop, ___ I bought last year, is already very slow.", answers: ["which"],
      explain: "Extra information about a thing, between commas: which (not that)." },
    { s: "I'll never forget the moment ___ I first saw the sea.", answers: ["when", "that"],
      explain: "A time: when (that is also possible)." },
    { s: "Are these the shoes ___ you wanted?", answers: ["that", "which"],
      explain: "A thing, the object of wanted: that or which (or nothing)." },
    { s: "My parents, ___ have been married for forty years, are having a party.", answers: ["who"],
      explain: "Extra information about people, between commas: who (not that)." },
    { s: "That's the shop ___ I bought this jacket.", answers: ["where"],
      explain: "A place, and I bought it there: where." },
    { s: "He told me a story ___ made me laugh.", answers: ["that", "which"],
      explain: "A thing, the subject of made: that or which." },
    { s: "The neighbours ___ car was stolen called the police.", answers: ["whose"],
      explain: "Their car → whose car." }
  ]
}
];
