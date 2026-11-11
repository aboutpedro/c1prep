window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "Wishes about the present",
  intro: "Complete the wishes with the correct form of the verbs in brackets.",
  items: [
    { s: "I don't have a car. I wish I ___ (have) one.", answers: ["had"],
      explain: "wish + past simple for a present situation we'd like to be different." },
    { s: "It's so cold! I wish it ___ (be) warmer.", answers: ["was", "were"],
      explain: "wish + was/were. were is more formal, but both are fine." },
    { s: "I can't swim. I wish I ___ (can) swim.", answers: ["could"],
      explain: "can → could after wish." },
    { s: "My flat is so small. If only it ___ (have) a garden!", answers: ["had"],
      explain: "If only + past simple: a stronger wish." },
    { s: "I have to work this weekend. I wish I ___ (not / have to).", answers: ["did not have to", "didn't have to"],
      explain: "have to → didn't have to after wish." },
    { s: "I wish I ___ (know) the answer, but I don't.", answers: ["knew"],
      explain: "wish + past simple." },
    { s: "She wishes she ___ (live) closer to her family.", answers: ["lived"],
      explain: "wish + past simple: she doesn't live close now." },
    { s: "I wish you ___ (be) here. I miss you.", answers: ["were", "was"],
      explain: "wish + were/was: you aren't here." },
    { s: "I wish I ___ (not / feel) so nervous about the exam.", answers: ["did not feel", "didn't feel"],
      explain: "wish + past simple negative." },
    { s: "If only we ___ (be) on holiday right now!", answers: ["were", "was"],
      explain: "If only + were/was." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "Regrets about the past",
  intro: "Complete the sentences with the correct form of the verbs in brackets.",
  items: [
    { s: "I wish I ___ (study) harder for my exams.", answers: ["had studied", "'d studied"],
      explain: "wish + past perfect for a past regret." },
    { s: "If only I ___ (not / say) that to her. She was really upset.", answers: ["had not said", "hadn't said"],
      explain: "If only + past perfect negative." },
    { s: "He wishes he ___ (take) the job in New York.", answers: ["had taken", "'d taken"],
      explain: "wish + past perfect: he didn't take it." },
    { s: "I wish we ___ (book) the tickets earlier. Now they're sold out.", answers: ["had booked", "'d booked"],
      explain: "Past regret: wish + past perfect." },
    { s: "You ___ (should / tell) me you were coming! I'd have cooked something.", answers: ["should have told"],
      explain: "should have + past participle criticises a past action (you didn't tell me)." },
    { s: "I wish I ___ (not / eat) so much. I feel sick.", answers: ["had not eaten", "hadn't eaten"],
      explain: "A regret about something that has just happened: past perfect." },
    { s: "She regrets ___ (not / go) to university.", answers: ["not going", "not having gone"],
      explain: "regret + -ing (or having + past participle) for something in the past." },
    { s: "If only you ___ (listen) to my advice!", answers: ["had listened", "'d listened"],
      explain: "If only + past perfect." },
    { s: "We ___ (should / not / leave) the window open. Everything got wet.", answers: ["should not have left", "shouldn't have left"],
      explain: "shouldn't have + past participle: it was a mistake." },
    { s: "I wish I ___ (be) there to see it. It sounds amazing.", answers: ["had been", "'d been"],
      explain: "wish + had been: I wasn't there." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "wish + would or wish + past?",
  intro: "Choose the correct option.",
  items: [
    { s: "I wish you ___ leaving your clothes on the floor!", options: ["would stop", "stopped", "had stopped"], answer: 0,
      explain: "wish + would for annoying behaviour we want someone to change." },
    { s: "I wish it ___ raining. I want to go out.", options: ["would stop", "stops", "has stopped"], answer: 0,
      explain: "wish + would for something we want to happen, but which is out of our control." },
    { s: "I wish I ___ taller.", options: ["were", "would be", "will be"], answer: 0,
      explain: "We can't use wish + would about ourselves or about states. Use the past: were." },
    { s: "I wish my neighbours ___ so much noise at night.", options: ["wouldn't make", "don't make", "won't make"], answer: 0,
      explain: "Annoying behaviour: wish + wouldn't." },
    { s: "I wish I ___ more time to read.", options: ["had", "would have", "have"], answer: 0,
      explain: "A present situation: wish + past simple. Not would, because it's about ourselves." },
    { s: "I wish you ___ me earlier. I could have helped.", options: ["had told", "would tell", "told"], answer: 0,
      explain: "A past situation: wish + past perfect." },
    { s: "I wish the bus ___ come. We've been waiting for ages.", options: ["would", "will", "had"], answer: 0,
      explain: "Impatience about something we want to happen: wish + would." },
    { s: "She wishes she ___ speak Italian.", options: ["could", "would", "can"], answer: 0,
      explain: "Ability: wish + could." },
    { s: "I wish people ___ more careful when they drive past the school.", options: ["would be", "are", "will be"], answer: 0,
      explain: "A wish about other people's behaviour: would." },
    { s: "I wish I ___ to that party last night. It was boring.", options: ["hadn't gone", "wouldn't go", "didn't go"], answer: 0,
      explain: "A past regret: wish + past perfect." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "would rather, it's time, had better",
  intro: "Choose the correct option.",
  items: [
    { s: "I'd rather ___ at home tonight. I'm exhausted.", options: ["stay", "to stay", "staying"], answer: 0,
      explain: "would rather + verb without to (same subject)." },
    { s: "I'd rather you ___ anyone about this.", options: ["didn't tell", "don't tell", "not tell"], answer: 0,
      explain: "would rather + another person + past simple." },
    { s: "It's time we ___ home. It's nearly midnight.", options: ["went", "go", "will go"], answer: 0,
      explain: "It's time + subject + past simple (we should do it now)." },
    { s: "It's time ___ the decorations down. It's February!", options: ["to take", "taking", "took"], answer: 0,
      explain: "It's time + to-infinitive is also possible when there's no subject." },
    { s: "You'd better ___ now, or you'll miss the train.", options: ["leave", "to leave", "leaving"], answer: 0,
      explain: "had better + verb without to: strong advice." },
    { s: "We'd better ___ make too much noise. The baby's asleep.", options: ["not", "don't", "not to"], answer: 0,
      explain: "Negative: had better not + verb." },
    { s: "Would you rather ___ the train or drive?", options: ["take", "taking", "to take"], answer: 0,
      explain: "would rather + verb without to." },
    { s: "I'd rather you ___ smoke in the house, if you don't mind.", options: ["didn't", "don't", "wouldn't"], answer: 0,
      explain: "would rather + person + past simple, even though we mean now." },
    { s: "It's high time the government ___ something about pollution.", options: ["did", "does", "will do"], answer: 0,
      explain: "It's high time + past simple: it should have happened already." },
    { s: "I'd rather go by bus ___ walk in this rain.", options: ["than", "to", "that"], answer: 0,
      explain: "would rather do X than do Y." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Rewrite the sentence",
  intro: "Complete the second sentence so that it means the same as the first. Use the word in brackets and between two and five words.",
  items: [
    { s: "It's a pity I can't come to your wedding. → I wish ___ to your wedding. (COULD)", answers: ["I could come"],
      explain: "wish + could for ability now." },
    { s: "I regret not taking more photos. → I wish ___ more photos. (TAKEN)", answers: ["I had taken", "I'd taken"],
      explain: "wish + past perfect for a past regret." },
    { s: "Please stop interrupting me. → I wish ___ interrupting me. (STOP)", answers: ["you would stop", "you'd stop"],
      explain: "wish + would for annoying behaviour." },
    { s: "I'd prefer to eat in tonight. → I'd ___ in tonight. (RATHER)", answers: ["rather eat"],
      explain: "would rather + verb without to." },
    { s: "You should go to bed now. → It's ___ to bed. (TIME)", answers: ["time you went", "time to go", "time you go"],
      explain: "It's time + you + past simple, or It's time + to-infinitive." },
    { s: "It was a mistake to lend him money. → I ___ him money. (SHOULDN'T)", answers: ["shouldn't have lent"],
      explain: "shouldn't have + past participle: a past mistake." },
    { s: "I'd prefer you not to call me at work. → I'd rather ___ me at work. (CALL)", answers: ["you didn't call", "you did not call"],
      explain: "would rather + person + past simple." },
    { s: "It's a shame I'm not good at maths. → If ___ at maths! (ONLY)", answers: ["only I were better", "only I was better", "only I were good", "only I was good"],
      explain: "If only + past simple for a present wish." },
    { s: "My advice is to see a doctor. → You ___ a doctor. (BETTER)", answers: ["had better see", "'d better see", "had better go and see"],
      explain: "had better + verb without to: strong advice." },
    { s: "I didn't know about the problem, and I'm sorry. → I wish ___ about the problem. (KNOWN)", answers: ["I had known", "I'd known"],
      explain: "wish + past perfect." }
  ]
}
];
