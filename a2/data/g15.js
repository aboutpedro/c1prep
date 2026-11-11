window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "and, but, or, so, because",
  intro: "Choose the best word to join the two parts of the sentence.",
  items: [
    { s: "I was tired, ___ I went to bed early.", options: ["so", "because", "but"], answer: 0,
      explain: "So introduces a result: I was tired → I went to bed early." },
    { s: "I went to bed early ___ I was tired.", options: ["because", "so", "or"], answer: 0,
      explain: "Because introduces a reason: why did I go to bed early? Because I was tired." },
    { s: "The hotel was nice, ___ the food was terrible.", options: ["but", "and", "so"], answer: 0,
      explain: "But joins two different or opposite ideas: nice ↔ terrible." },
    { s: "Would you like tea ___ coffee?", options: ["or", "and", "but"], answer: 0,
      explain: "Or gives a choice." },
    { s: "I bought some bread ___ some cheese.", options: ["and", "or", "but"], answer: 0,
      explain: "And adds another thing." },
    { s: "It was raining, ___ we didn't go to the beach.", options: ["so", "because", "or"], answer: 0,
      explain: "Result: it was raining → we didn't go." },
    { s: "She's happy ___ she passed all her exams.", options: ["because", "so", "but"], answer: 0,
      explain: "Reason: why is she happy? Because she passed." },
    { s: "I like football, ___ I don't like watching it on TV.", options: ["but", "so", "or"], answer: 0,
      explain: "Two different ideas: like it ↔ don't like watching it." },
    { s: "Hurry up, ___ we'll miss the train!", options: ["or", "and", "because"], answer: 0,
      explain: "Or here means if not: hurry up; if not, we'll miss the train." },
    { s: "The shop was closed, ___ I went to the one next to the station.", options: ["so", "because", "or"], answer: 0,
      explain: "Result: it was closed → I went to another one." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "when, before, after, until, while",
  intro: "Choose the correct word.",
  items: [
    { s: "Call me ___ you arrive at the airport.", options: ["when", "until", "while"], answer: 0,
      explain: "When = at the time that: call me at the moment you arrive." },
    { s: "I always have a shower ___ I go to bed.", options: ["before", "until", "while"], answer: 0,
      explain: "Before = earlier than: first a shower, then bed." },
    { s: "We watched a film ___ we had dinner. First dinner, then the film.", options: ["after", "before", "until"], answer: 0,
      explain: "First dinner, then the film: we watched it after we had dinner." },
    { s: "Wait here ___ I come back.", options: ["until", "while", "when"], answer: 0,
      explain: "Until = up to the time that: wait, and stop waiting when I come back." },
    { s: "Someone stole my bag ___ I was swimming.", options: ["while", "until", "before"], answer: 0,
      explain: "While = during the time that, often with a continuous verb: while I was swimming." },
    { s: "___ I was a child, I lived in a small village.", options: ["When", "Until", "Before"], answer: 0,
      explain: "When I was a child = at the time I was a child." },
    { s: "We stayed at the beach ___ it got dark, and then we went home.", options: ["until", "after", "before"], answer: 0,
      explain: "Until = up to the time that: we stayed, and when it got dark we left." },
    { s: "Turn off the lights ___ you leave the room.", options: ["when", "until", "while"], answer: 0,
      explain: "When you leave = at the time you leave." },
    { s: "My phone rang ___ I was driving, so I didn't answer.", options: ["while", "until", "before"], answer: 0,
      explain: "While + continuous: while I was driving." },
    { s: "Put on some sun cream ___ you go out. The sun is very strong.", options: ["before", "until", "while"], answer: 0,
      explain: "First the sun cream, then go out: before." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences",
  textTitle: "when, before, after, until + present",
  intro: "Write the correct form of the verb in brackets. When we talk about the future, we use the present simple after when, before, after, until and as soon as.",
  items: [
    { s: "I'll call you when I ___ home. (get)", answers: ["get"], width: 11,
      explain: "The future, but after when we use the present: when I get home. Not when I will get." },
    { s: "We'll have dinner after the film ___. (finish)", answers: ["finishes"], width: 11,
      explain: "After + present simple, even for the future: after the film finishes." },
    { s: "Don't go out until the rain ___. (stop)", answers: ["stops"], width: 11,
      explain: "Until + present simple: until the rain stops." },
    { s: "I'll send you a message as soon as I ___ the results. (have)", answers: ["have", "have got"], width: 11,
      explain: "As soon as + present simple: as soon as I have the results." },
    { s: "She ___ very happy when she sees her present. (be)", answers: ["will be"], width: 11,
      explain: "The main part of the sentence is about the future: she will be happy. The present (sees) goes after when." },
    { s: "Let's wait until Dad ___ here. (be)", answers: ["is", "'s"], width: 11,
      explain: "Until + present simple: until Dad is here." },
    { s: "Before you ___ the exam, read all the questions. (start)", answers: ["start"], width: 11,
      explain: "Before + present simple: before you start." },
    { s: "When I ___ older, I want to travel around the world. (be)", answers: ["am"], width: 11,
      explain: "When + present simple, even about the future: when I'm older." },
    { s: "I ___ you the money when I see you tomorrow. (give)", answers: ["will give"], width: 11,
      explain: "The main part is about the future: I'll give. The present (see) goes after when." },
    { s: "Can you feed the cat while we ___ on holiday? (be)", answers: ["are"], width: 11,
      explain: "While + present simple for the future: while we are on holiday." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "if + present, will",
  intro: "Choose the correct option. For a possible situation in the future: if + present simple, will + verb.",
  items: [
    { s: "If it ___ tomorrow, we'll stay at home.", options: ["rains", "will rain", "rained"], answer: 0,
      explain: "If + present simple: if it rains. Not if it will rain." },
    { s: "If you study hard, you ___ the exam.", options: ["will pass", "pass", "passed"], answer: 0,
      explain: "The result in the future: will + verb: you will pass." },
    { s: "If I see Tom, I ___ him the news.", options: ["'ll tell", "tell", "told"], answer: 0,
      explain: "Result: will + verb: I'll tell him." },
    { s: "We'll miss the bus if we ___ now.", options: ["don't leave", "won't leave", "didn't leave"], answer: 0,
      explain: "If + present simple (negative): if we don't leave." },
    { s: "If you're hungry, I ___ you a sandwich.", options: ["'ll make", "make", "made"], answer: 0,
      explain: "An offer about the future: I'll make you a sandwich." },
    { s: "What will you do if you ___ the job?", options: ["don't get", "won't get", "not get"], answer: 0,
      explain: "If + present simple: if you don't get." },
    { s: "If she ___ the bus, she'll be late for work.", options: ["misses", "will miss", "miss"], answer: 0,
      explain: "If + present simple, with -es for she: if she misses." },
    { s: "You ___ cold if you don't wear a coat.", options: ["'ll be", "are being", "were"], answer: 0,
      explain: "Result in the future: you'll be cold. The if part can come second." },
    { s: "If you heat ice, it ___.", options: ["melts", "melted", "is melt"], answer: 0,
      explain: "Something that is always true: if + present, present: it melts." },
    { s: "If I ___ time this weekend, I'll paint the kitchen.", options: ["have", "will have", "had"], answer: 0,
      explain: "If + present simple: if I have time." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Mixed practice",
  intro: "Choose the correct word or phrase.",
  items: [
    { s: "First, cut the onions. ___, put them in a pan with some oil.", options: ["Then", "Because", "Until"], answer: 0,
      explain: "Then = next, after that. It's useful for giving instructions and telling stories." },
    { s: "We waited for an hour, and ___ the bus came.", options: ["finally", "first", "before"], answer: 0,
      explain: "Finally = after a long time, at the end." },
    { s: "I can't come to the party ___ I'm working.", options: ["because", "so", "but"], answer: 0,
      explain: "Reason: because I'm working." },
    { s: "___ you're tired, have a rest.", options: ["If", "Or", "But"], answer: 0,
      explain: "If you're tired = in the situation that you're tired." },
    { s: "Text me ___ you get to the station.", options: ["when", "while", "until"], answer: 0,
      explain: "When = at the moment that." },
    { s: "I'll stay with you ___ the doctor arrives.", options: ["until", "while", "before"], answer: 0,
      explain: "Until = up to the time that the doctor arrives." },
    { s: "He doesn't eat meat, ___ he loves fish.", options: ["but", "so", "because"], answer: 0,
      explain: "Contrast: no meat ↔ loves fish." },
    { s: "Put your coat on, ___ you'll be cold.", options: ["or", "and", "because"], answer: 0,
      explain: "Or = if not: put it on; if not, you'll be cold." },
    { s: "We had a great holiday. ___ we went to Rome, and then we went to Florence.", options: ["First", "Finally", "Until"], answer: 0,
      explain: "First starts a list of events in order." },
    { s: "My brother was cooking ___ I was doing my homework.", options: ["while", "until", "so"], answer: 0,
      explain: "While = at the same time as." }
  ]
}
];
