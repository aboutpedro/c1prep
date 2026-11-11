window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Question tags with be, can, will and have",
  intro: "Choose the correct question tag. A positive sentence usually has a negative tag, and a negative sentence has a positive tag.",
  items: [
    { s: "You're from Brazil, ___?", options: ["aren't you", "isn't it", "don't you"], answer: 0,
      explain: "Positive sentence with are → negative tag: aren't you?" },
    { s: "It isn't very far, ___?", options: ["is it", "isn't it", "does it"], answer: 0,
      explain: "Negative sentence (isn't) → positive tag: is it?" },
    { s: "She can drive, ___?", options: ["can't she", "doesn't she", "isn't she"], answer: 0,
      explain: "Use the same auxiliary: can → can't she?" },
    { s: "They won't be late, ___?", options: ["will they", "won't they", "do they"], answer: 0,
      explain: "Negative (won't) → positive tag with will: will they?" },
    { s: "You've seen this film, ___?", options: ["haven't you", "didn't you", "aren't you"], answer: 0,
      explain: "Present perfect with have → haven't you?" },
    { s: "The shops were closed, ___?", options: ["weren't they", "wasn't it", "didn't they"], answer: 0,
      explain: "Were → weren't. The shops = they." },
    { s: "I'm late again, ___?", options: ["aren't I", "amn't I", "isn't I"], answer: 0,
      explain: "The tag for I am is aren't I? (amn't doesn't exist)." },
    { s: "Your brother has never been to Spain, ___?", options: ["has he", "hasn't he", "did he"], answer: 0,
      explain: "Never makes the sentence negative, so the tag is positive: has he?" },
    { s: "We should leave soon, ___?", options: ["shouldn't we", "don't we", "aren't we"], answer: 0,
      explain: "Should → shouldn't we?" },
    { s: "That's your car, ___?", options: ["isn't it", "isn't that", "doesn't it"], answer: 0,
      explain: "With this or that as the subject, the tag uses it: isn't it?" }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Question tags with do, does and did",
  intro: "Choose the correct question tag. When there's no auxiliary verb in the sentence, use do, does or did.",
  items: [
    { s: "You live near here, ___?", options: ["don't you", "aren't you", "doesn't you"], answer: 0,
      explain: "Present simple (live) → do: don't you?" },
    { s: "She works in a bank, ___?", options: ["doesn't she", "isn't she", "don't she"], answer: 0,
      explain: "Present simple with she → does: doesn't she?" },
    { s: "They went to the party, ___?", options: ["didn't they", "weren't they", "don't they"], answer: 0,
      explain: "Past simple (went) → did: didn't they?" },
    { s: "You didn't call me, ___?", options: ["did you", "didn't you", "do you"], answer: 0,
      explain: "Negative (didn't) → positive tag: did you?" },
    { s: "He doesn't eat meat, ___?", options: ["does he", "doesn't he", "is he"], answer: 0,
      explain: "Negative (doesn't) → positive: does he?" },
    { s: "Your parents met in Lisbon, ___?", options: ["didn't they", "weren't they", "haven't they"], answer: 0,
      explain: "Past simple (met) → didn't they?" },
    { s: "Leo plays the guitar, ___?", options: ["doesn't he", "isn't he", "don't he"], answer: 0,
      explain: "Present simple with he → doesn't he?" },
    { s: "You don't like spicy food, ___?", options: ["do you", "don't you", "are you"], answer: 0,
      explain: "Negative (don't) → positive: do you?" },
    { s: "The film started at eight, ___?", options: ["didn't it", "wasn't it", "doesn't it"], answer: 0,
      explain: "Past simple (started) → didn't it?" },
    { s: "Let's order a pizza, ___?", options: ["shall we", "don't we", "will we"], answer: 0,
      explain: "The tag after Let's is shall we?" }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences",
  textTitle: "Write the question tag",
  intro: "Write the question tag.",
  items: [
    { s: "It's a beautiful day, ___?", answers: ["isn't it"], width: 12,
      explain: "It's = it is → isn't it?" },
    { s: "You haven't finished yet, ___?", answers: ["have you"], width: 12,
      explain: "Negative (haven't) → have you?" },
    { s: "Maria speaks French, ___?", answers: ["doesn't she"], width: 12,
      explain: "Present simple, she → doesn't she?" },
    { s: "They're coming tomorrow, ___?", answers: ["aren't they"], width: 12,
      explain: "They're = they are → aren't they?" },
    { s: "You couldn't help me, ___?", answers: ["could you"], width: 12,
      explain: "Negative (couldn't) → could you? This is a polite way to ask for help." },
    { s: "We met at Ana's party, ___?", answers: ["didn't we"], width: 12,
      explain: "Past simple (met) → didn't we?" },
    { s: "He'll call us later, ___?", answers: ["won't he"], width: 12,
      explain: "He'll = he will → won't he?" },
    { s: "This bus goes to the airport, ___?", answers: ["doesn't it"], width: 12,
      explain: "This bus = it; present simple → doesn't it?" },
    { s: "Nobody called, ___?", answers: ["did they"], width: 12,
      explain: "Nobody makes the sentence negative, and we use they for nobody / somebody: did they?" },
    { s: "You were at home last night, ___?", answers: ["weren't you"], width: 12,
      explain: "Were → weren't you?" }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Indirect questions",
  intro: "Choose the correct sentence. After Could you tell me…? or Do you know…?, use normal word order (subject + verb), with no do, does or did.",
  items: [
    { s: "___", options: ["Could you tell me where the station is?", "Could you tell me where is the station?"], answer: 0,
      explain: "Indirect question: subject (the station) + verb (is)." },
    { s: "___", options: ["Do you know what time the bank opens?", "Do you know what time does the bank open?"], answer: 0,
      explain: "No does in an indirect question: what time the bank opens." },
    { s: "___", options: ["Can you tell me how much this costs?", "Can you tell me how much does this cost?"], answer: 0,
      explain: "Subject + verb, no does: how much this costs." },
    { s: "___", options: ["I wonder why she left so early.", "I wonder why did she leave so early."], answer: 0,
      explain: "After I wonder: normal word order, no did: why she left." },
    { s: "___", options: ["Do you know if Tom is coming?", "Do you know is Tom coming?"], answer: 0,
      explain: "For a yes/no question, use if (or whether): if Tom is coming." },
    { s: "___", options: ["Could you tell me where you bought that jacket?", "Could you tell me where did you buy that jacket?"], answer: 0,
      explain: "No did in an indirect question: where you bought." },
    { s: "___", options: ["Do you remember what his name was?", "Do you remember what was his name?"], answer: 0,
      explain: "Subject (his name) + verb (was)." },
    { s: "___", options: ["I'd like to know when the course starts.", "I'd like to know when does the course start?"], answer: 0,
      explain: "Normal word order, and no question mark after I'd like to know." },
    { s: "___", options: ["Do you know whether there's a pharmacy near here?", "Do you know is there a pharmacy near here?"], answer: 0,
      explain: "Yes/no question → whether (or if) + there is." },
    { s: "___", options: ["Can you tell me who that man is?", "Can you tell me who is that man?"], answer: 0,
      explain: "Subject (that man) + verb (is)." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Write the indirect question",
  intro: "Complete the indirect question. Use normal word order, and if for yes/no questions.",
  items: [
    { s: "Where is the toilet? → Could you tell me where ___?", answers: ["the toilet is"], width: 22,
      explain: "Subject + verb: where the toilet is." },
    { s: "What time does the film start? → Do you know what time ___?", answers: ["the film starts"], width: 22,
      explain: "No does, and start becomes starts: what time the film starts." },
    { s: "Is the museum open today? → Do you know ___ open today?", answers: ["if the museum is", "whether the museum is"], width: 22,
      explain: "Yes/no question → if (or whether) + subject + verb: if the museum is open." },
    { s: "How much did your phone cost? → Can I ask how much ___?", answers: ["your phone cost"], width: 22,
      explain: "No did; the verb goes into the past: how much your phone cost." },
    { s: "Where does Ana live? → Do you know where ___?", answers: ["Ana lives"], width: 22,
      explain: "No does; live → lives: where Ana lives." },
    { s: "Why was he angry? → I wonder why ___.", answers: ["he was angry"], width: 22,
      explain: "Subject + verb: why he was angry." },
    { s: "Can I park here? → Could you tell me ___ park here?", answers: ["if I can", "whether I can"], width: 22,
      explain: "Yes/no question → if + I + can." },
    { s: "When did they arrive? → Do you know when ___?", answers: ["they arrived"], width: 22,
      explain: "No did; arrive → arrived: when they arrived." },
    { s: "Who is that woman? → Do you know who ___?", answers: ["that woman is"], width: 22,
      explain: "Subject (that woman) + verb (is)." },
    { s: "Has the bus left? → Do you know ___ left?", answers: ["if the bus has", "whether the bus has"], width: 22,
      explain: "Yes/no question → if + subject + has: if the bus has left." }
  ]
}
];
