window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "who or which?",
  intro: "Choose who or which. Who is for people; which is for things and animals.",
  items: [
    { s: "The woman ___ lives next door is a doctor.", options: ["who", "which"], answer: 0,
      explain: "A woman is a person: who." },
    { s: "I lost the watch ___ my grandfather gave me.", options: ["which", "who"], answer: 0,
      explain: "A watch is a thing: which." },
    { s: "Do you know the boy ___ is talking to Ana?", options: ["who", "which"], answer: 0,
      explain: "A boy is a person: who." },
    { s: "This is the bus ___ goes to the airport.", options: ["which", "who"], answer: 0,
      explain: "A bus is a thing: which." },
    { s: "I want a car ___ doesn't use much petrol.", options: ["which", "who"], answer: 0,
      explain: "A car is a thing: which." },
    { s: "The people ___ work here are very friendly.", options: ["who", "which"], answer: 0,
      explain: "People: who." },
    { s: "I don't like films ___ have sad endings.", options: ["which", "who"], answer: 0,
      explain: "Films are things: which." },
    { s: "She's the singer ___ won the competition.", options: ["who", "which"], answer: 0,
      explain: "A singer is a person: who." },
    { s: "Where's the cake ___ was on the table?", options: ["which", "who"], answer: 0,
      explain: "A cake is a thing: which." },
    { s: "I have a friend ___ speaks four languages.", options: ["who", "which"], answer: 0,
      explain: "A friend is a person: who." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "who, which or where?",
  intro: "Choose who, which or where. Where is for places: the town where I live.",
  items: [
    { s: "This is the restaurant ___ we had our first date.", options: ["where", "which", "who"], answer: 0,
      explain: "We had our date in the restaurant (a place where something happens): where." },
    { s: "That's the hospital ___ I was born.", options: ["where", "which", "who"], answer: 0,
      explain: "I was born there: where." },
    { s: "The man ___ fixed my car was very nice.", options: ["who", "which", "where"], answer: 0,
      explain: "A man: who." },
    { s: "I want a phone ___ takes good photos.", options: ["which", "where", "who"], answer: 0,
      explain: "A phone is a thing: which." },
    { s: "Is there a shop near here ___ I can buy stamps?", options: ["where", "which", "who"], answer: 0,
      explain: "I can buy stamps in that place: where." },
    { s: "The hotel ___ we stayed in was very old.", options: ["which", "where", "who"], answer: 0,
      explain: "We stayed in it: the preposition in is still there, so we use which (the hotel which we stayed in). Without in, we'd say the hotel where we stayed." },
    { s: "That's the teacher ___ helped me with my English.", options: ["who", "where", "which"], answer: 0,
      explain: "A teacher: who." },
    { s: "Paris is the city ___ my parents met.", options: ["where", "which", "who"], answer: 0,
      explain: "They met there: where." },
    { s: "This is the key ___ opens the front door.", options: ["which", "where", "who"], answer: 0,
      explain: "A key is a thing: which." },
    { s: "I'd like to live in a place ___ it's sunny all year.", options: ["where", "which", "who"], answer: 0,
      explain: "A place where something is true: where." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "that, not what",
  intro: "Choose the correct word. We can use that instead of who or which. Don't use what in these sentences.",
  items: [
    { s: "This is the book ___ I told you about.", options: ["that", "what", "where"], answer: 0,
      explain: "That (or which) for a thing. We don't say the book what." },
    { s: "Everything ___ she said was true.", options: ["that", "what", "who"], answer: 0,
      explain: "After everything, we use that: everything that she said." },
    { s: "The girl ___ sits next to me is from Peru.", options: ["that", "what", "which"], answer: 0,
      explain: "That (or who) for a person. Which is only for things." },
    { s: "I love the jacket ___ you're wearing.", options: ["that", "what", "who"], answer: 0,
      explain: "That (or which) for a thing." },
    { s: "Is this the train ___ goes to Oxford?", options: ["that", "what", "where"], answer: 0,
      explain: "That (or which) for a thing: the train that goes to Oxford." },
    { s: "He's the only person ___ understands me.", options: ["that", "what", "which"], answer: 0,
      explain: "That (or who) for a person." },
    { s: "The pizza ___ we ordered was cold.", options: ["that", "what", "who"], answer: 0,
      explain: "That (or which) for a thing. You can also leave it out: the pizza we ordered." },
    { s: "Are these the shoes ___ you bought yesterday?", options: ["that", "what", "who"], answer: 0,
      explain: "That (or which) for things." },
    { s: "She's the friend ___ I went to Spain with.", options: ["that", "what", "which"], answer: 0,
      explain: "That (or who) for a person." },
    { s: "There's something ___ I need to tell you.", options: ["that", "what", "who"], answer: 0,
      explain: "After something, everything, nothing, we use that." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences",
  textTitle: "Join the sentences",
  intro: "Join the two sentences. Write who, which, that or where in the gap.",
  items: [
    { s: "I have a cousin. She lives in Canada. → I have a cousin ___ lives in Canada.", answers: ["who", "that"], width: 8,
      explain: "She becomes who (or that). Don't repeat she." },
    { s: "This is a photo. I took it in Rome. → This is a photo ___ I took in Rome.", answers: ["which", "that"], width: 8,
      explain: "It becomes which (or that). Don't repeat it." },
    { s: "We visited a village. My mother was born there. → We visited the village ___ my mother was born.", answers: ["where"], width: 8,
      explain: "There becomes where." },
    { s: "I met a man. He works with my dad. → I met a man ___ works with my dad.", answers: ["who", "that"], width: 8,
      explain: "He becomes who (or that)." },
    { s: "We stayed at a hotel. It had a big pool. → We stayed at a hotel ___ had a big pool.", answers: ["which", "that"], width: 8,
      explain: "It becomes which (or that)." },
    { s: "That's the café. We have lunch there. → That's the café ___ we have lunch.", answers: ["where"], width: 8,
      explain: "There becomes where." },
    { s: "The students passed. They studied hard. → The students ___ studied hard passed.", answers: ["who", "that"], width: 8,
      explain: "They becomes who (or that), and the clause goes after students." },
    { s: "I read a book. It was really sad. → I read a book ___ was really sad.", answers: ["which", "that"], width: 8,
      explain: "It becomes which (or that)." },
    { s: "That's the park. I go running there. → That's the park ___ I go running.", answers: ["where"], width: 8,
      explain: "There becomes where." },
    { s: "The woman was very kind. She helped me. → The woman ___ helped me was very kind.", answers: ["who", "that"], width: 8,
      explain: "She becomes who (or that), and the clause goes after the woman." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "What is it?",
  intro: "Complete the definitions with who, which, that or where.",
  items: [
    { s: "A teacher is a person ___ works in a school.", answers: ["who", "that"], width: 8,
      explain: "A person: who (or that)." },
    { s: "A kitchen is a room ___ you cook.", answers: ["where"], width: 8,
      explain: "You cook in the room: where." },
    { s: "A fridge is a machine ___ keeps food cold.", answers: ["which", "that"], width: 8,
      explain: "A thing: which (or that)." },
    { s: "A library is a place ___ you can borrow books.", answers: ["where"], width: 8,
      explain: "You borrow books there: where." },
    { s: "A dentist is someone ___ looks after your teeth.", answers: ["who", "that"], width: 8,
      explain: "A person: who (or that)." },
    { s: "A dictionary is a book ___ tells you what words mean.", answers: ["which", "that"], width: 8,
      explain: "A thing: which (or that)." },
    { s: "An airport is a place ___ planes land and take off.", answers: ["where"], width: 8,
      explain: "Planes land there: where." },
    { s: "A waiter is a person ___ brings you food in a restaurant.", answers: ["who", "that"], width: 8,
      explain: "A person: who (or that)." },
    { s: "An umbrella is something ___ keeps you dry in the rain.", answers: ["which", "that"], width: 8,
      explain: "A thing: which (or that)." },
    { s: "A bakery is a shop ___ you can buy bread and cakes.", answers: ["where"], width: 8,
      explain: "You buy bread there: where." }
  ]
}
];
