window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "Zero and first conditional",
  intro: "Complete the sentences with the correct form of the verbs in brackets.",
  items: [
    { s: "If you heat ice, it ___ (melt).", answers: ["melts"],
      explain: "Zero conditional (if + present, present) for things that are always true." },
    { s: "If it ___ (rain) tomorrow, we'll stay at home.", answers: ["rains"],
      explain: "First conditional: if + present simple, will + verb. We don't use will after if." },
    { s: "If you ___ (not / hurry), you'll miss the bus.", answers: ["don't hurry"],
      explain: "if + present simple (negative: don't + verb)." },
    { s: "I ___ (call) you if I have any problems.", answers: ["will call"],
      explain: "The result clause in the first conditional: will + verb." },
    { s: "If plants don't get water, they ___ (die).", answers: ["die"],
      explain: "A general truth: zero conditional, present simple in both parts." },
    { s: "What ___ (you / do) if you don't pass the exam?", answers: ["will you do"],
      explain: "Question in the result clause: What will you do…?" },
    { s: "If she ___ (get) the job, she'll move to London.", answers: ["gets"],
      explain: "if + present simple (she gets)." },
    { s: "We ___ (not / go) to the beach if the weather is bad.", answers: ["won't go"],
      explain: "Negative result: won't + verb." },
    { s: "If you mix red and yellow, you ___ (get) orange.", answers: ["get"],
      explain: "A fact: zero conditional." },
    { s: "If I ___ (see) Paul, I'll tell him to call you.", answers: ["see"],
      explain: "if + present simple, even though we're talking about the future." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "Second conditional",
  intro: "Complete the sentences with the correct form of the verbs in brackets.",
  items: [
    { s: "If I ___ (have) more money, I'd buy a new car.", answers: ["had"],
      explain: "Second conditional: if + past simple, would + verb, for imaginary situations now or in the future." },
    { s: "If she lived closer, we ___ (see) her more often.", answers: ["would see"],
      explain: "Result clause: would + verb." },
    { s: "What ___ (you / do) if you won the lottery?", answers: ["would you do"],
      explain: "Question: What would you do…?" },
    { s: "If I ___ (be) you, I'd talk to the teacher.", answers: ["were", "was"],
      explain: "If I were you… is used to give advice. (Was is common in informal speech.)" },
    { s: "I ___ (not / eat) that if I were you.", answers: ["wouldn't eat"],
      explain: "Negative result: wouldn't + verb." },
    { s: "If we ___ (not / have) a dog, we could travel more.", answers: ["didn't have"],
      explain: "if + past simple negative: didn't have." },
    { s: "He would be healthier if he ___ (do) more exercise.", answers: ["did"],
      explain: "The if-clause can come second: … if he did more exercise." },
    { s: "If you ___ (can) live anywhere, where would you live?", answers: ["could"],
      explain: "The past of can is could." },
    { s: "___ (you / tell) me if you had a problem?", answers: ["Would you tell"],
      explain: "Question: Would + subject + verb?" },
    { s: "If it ___ (not / be) so expensive, I'd buy it.", answers: ["wasn't", "weren't"],
      explain: "if + past of be: wasn't (or weren't, which is more formal)." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences",
  textTitle: "First or second conditional?",
  intro: "Choose the correct option.",
  items: [
    { s: "If I ___ time tomorrow, I'll help you.", options: ["have", "had"], answer: 0,
      explain: "A real possibility in the future (I'll help): first conditional, present simple after if." },
    { s: "If I ___ a superpower, I'd choose to fly.", options: ["have", "had"], answer: 1,
      explain: "An imaginary situation (I'd choose): second conditional." },
    { s: "If you study hard, you ___ the exam.", options: ["will pass", "would pass"], answer: 0,
      explain: "if + present simple → will." },
    { s: "If I were rich, I ___ a big house by the sea.", options: ["will buy", "would buy"], answer: 1,
      explain: "if + past (were) → would." },
    { s: "If it ___ sunny tomorrow, let's have a picnic.", options: ["is", "was"], answer: 0,
      explain: "A real plan for tomorrow: present simple." },
    { s: "If humans ___ live for 200 years, what would life be like?", options: ["can", "could"], answer: 1,
      explain: "Imaginary: could." },
    { s: "I ___ late if I don't leave now.", options: ["will be", "would be"], answer: 0,
      explain: "if + present (don't leave) → will." },
    { s: "If dogs could talk, what ___ they say?", options: ["will", "would"], answer: 1,
      explain: "Imaginary: would." },
    { s: "If you ___ to the shops later, can you buy some milk?", options: ["go", "went"], answer: 0,
      explain: "A real possibility: if + present simple." },
    { s: "If I ___ the head teacher, I'd make the lunch break longer.", options: ["am", "were"], answer: 1,
      explain: "Imaginary: if I were…" }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "if, unless, when, as soon as, in case",
  intro: "Choose the correct option.",
  items: [
    { s: "I'll call you ___ I arrive.", options: ["when", "unless", "in case"], answer: 0,
      explain: "when = at the time that (we're sure it will happen)." },
    { s: "You won't get better ___ you rest.", options: ["unless", "if", "when"], answer: 0,
      explain: "unless = if… not: You won't get better if you don't rest." },
    { s: "Take an umbrella ___ it rains.", options: ["in case", "unless", "as soon as"], answer: 0,
      explain: "in case = because it's possible that something will happen." },
    { s: "___ you don't hurry, we'll be late.", options: ["If", "Unless", "When"], answer: 0,
      explain: "If + negative. (Unless you hurry… would also be correct, but not unless + don't.)" },
    { s: "I'll give her the message ___ I see her. I see her every day.", options: ["when", "unless", "in case"], answer: 0,
      explain: "We're sure it will happen: when." },
    { s: "We'll start the meeting ___ everyone arrives.", options: ["as soon as", "unless", "in case"], answer: 0,
      explain: "as soon as = immediately when." },
    { s: "___ it stops raining, we'll go out.", options: ["When", "Unless", "In case"], answer: 0,
      explain: "When it stops raining = at the moment it stops." },
    { s: "I won't go to the party ___ you come with me.", options: ["unless", "if", "when"], answer: 0,
      explain: "unless = except if: I'll only go if you come." },
    { s: "Write down my number ___ you need it.", options: ["in case", "unless", "when"], answer: 0,
      explain: "in case = because you might need it." },
    { s: "___ you're hungry, there's some pizza in the fridge.", options: ["If", "Unless", "As soon as"], answer: 0,
      explain: "If you're hungry = in the situation that you're hungry." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Mixed practice",
  intro: "Complete the sentences with the correct form of the verbs in brackets.",
  items: [
    { s: "If you ___ (press) this button, the machine starts.", answers: ["press"],
      explain: "Zero conditional: a general rule." },
    { s: "I'll lend you my bike if you ___ (promise) to be careful.", answers: ["promise"],
      explain: "First conditional: present simple after if." },
    { s: "If I ___ (know) the answer, I'd tell you.", answers: ["knew"],
      explain: "Second conditional: I don't know it, so if + past simple." },
    { s: "Unless we ___ (leave) now, we'll miss the train.", answers: ["leave"],
      explain: "unless + present simple (not 'won't leave')." },
    { s: "If you had more free time, what ___ (you / learn)?", answers: ["would you learn"],
      explain: "Second conditional question." },
    { s: "She ___ (be) angry if you don't tell her the truth.", answers: ["will be"],
      explain: "if + present (don't tell) → will be." },
    { s: "If I ___ (be) taller, I'd play basketball.", answers: ["were", "was"],
      explain: "Imaginary: if I were/was." },
    { s: "I ___ (not / do) that if I were you.", answers: ["wouldn't do"],
      explain: "Advice with if I were you: wouldn't + verb." },
    { s: "If the shop ___ (be) closed, we'll go to the one in the next street.", answers: ["is"],
      explain: "Real possibility: if + present simple." },
    { s: "What would happen if everyone ___ (stop) using cars?", answers: ["stopped"],
      explain: "Imaginary situation: if + past simple." }
  ]
}
];
