window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Who did it?",
  intro: "Choose the correct sentence. I cut my hair = I did it myself. I had my hair cut = someone did it for me.",
  items: [
    { s: "I went to the hairdresser's yesterday. ___", options: ["I had my hair cut.", "I cut my hair."], answer: 0,
      explain: "The hairdresser cut it: I had my hair cut." },
    { s: "I didn't want to pay a hairdresser, so ___", options: ["I cut my hair myself.", "I had my hair cut."], answer: 0,
      explain: "I did it myself: I cut my hair myself." },
    { s: "We were too busy to clean the car, so ___ at the garage.", options: ["we had it washed", "we washed it"], answer: 0,
      explain: "Someone at the garage washed it: we had it washed." },
    { s: "My dad's a builder. ___", options: ["He built our house himself.", "He had our house built."], answer: 0,
      explain: "He's a builder, so he did it himself: he built it." },
    { s: "Sara isn't very good with computers, so ___", options: ["she had her laptop repaired.", "she repaired her laptop."], answer: 0,
      explain: "She isn't good with computers, so someone else repaired it." },
    { s: "My eyes were tired, so ___ at the optician's.", options: ["I had them tested", "I tested them"], answer: 0,
      explain: "The optician tested them: I had them tested." },
    { s: "We don't have time to cook tonight. ___", options: ["Let's have a pizza delivered.", "Let's deliver a pizza."], answer: 0,
      explain: "Someone brings the pizza to us: have a pizza delivered." },
    { s: "Ana loves DIY. ___", options: ["She painted the kitchen herself.", "She had the kitchen painted."], answer: 0,
      explain: "She loves DIY (doing jobs at home herself): she painted it herself." },
    { s: "Leo's suit was too long, so he took it to a tailor and ___", options: ["had it shortened.", "shortened it."], answer: 0,
      explain: "A tailor did it: he had it shortened." },
    { s: "The photos look really professional. A photographer took them. ___", options: ["We had them taken in a studio.", "We took them in a studio."], answer: 0,
      explain: "A photographer took them: we had them taken." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "have something done: the form",
  intro: "Choose the correct option. Have + object + past participle. Have changes for the tense; the past participle stays the same.",
  items: [
    { s: "I ___ my car serviced last week.", options: ["had", "have", "was"], answer: 0,
      explain: "Last week = past: had + my car + serviced." },
    { s: "We're ___ a new kitchen fitted next month.", options: ["having", "had", "have"], answer: 0,
      explain: "Present continuous for an arrangement: we're having it fitted." },
    { s: "She has her nails ___ every two weeks.", options: ["done", "do", "doing"], answer: 0,
      explain: "Past participle: done." },
    { s: "Where did you have your hair ___?", options: ["cut", "cutting", "to cut"], answer: 0,
      explain: "Past participle of cut: cut." },
    { s: "I need to have my eyes ___.", options: ["tested", "test", "testing"], answer: 0,
      explain: "Past participle: tested." },
    { s: "They've just had their house ___.", options: ["painted", "paint", "to paint"], answer: 0,
      explain: "Present perfect: have had + object + past participle (painted)." },
    { s: "You should ___ that cough checked by a doctor.", options: ["have", "had", "having"], answer: 0,
      explain: "After should: have (base form)." },
    { s: "I'm going to ___ my photo taken for my new passport.", options: ["have", "having", "had"], answer: 0,
      explain: "going to + have (base form)." },
    { s: "How often do you ___ your windows cleaned?", options: ["have", "has", "having"], answer: 0,
      explain: "Present simple question: do you have…?" },
    { s: "My watch stopped, so I ___ the battery replaced.", options: ["had", "did", "was"], answer: 0,
      explain: "A finished past action: had the battery replaced." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences",
  textTitle: "Write the sentence",
  intro: "Complete the second sentence with have something done. Use the words in brackets.",
  items: [
    { s: "A mechanic repaired my car yesterday. → I ___ yesterday. (my car)", answers: ["had my car repaired"], width: 22,
      explain: "Past: had + my car + repaired." },
    { s: "A hairdresser is going to colour my hair. → I'm going to ___. (my hair)", answers: ["have my hair coloured", "have my hair colored"], width: 22,
      explain: "going to + have + my hair + coloured." },
    { s: "Someone cleans our flat every week. → We ___ every week. (our flat)", answers: ["have our flat cleaned"], width: 22,
      explain: "Present simple: have + our flat + cleaned." },
    { s: "A photographer took our wedding photos. → We ___. (our wedding photos)", answers: ["had our wedding photos taken"], width: 22,
      explain: "Past: had + our wedding photos + taken." },
    { s: "A dentist is checking my teeth right now. → I'm ___ right now. (my teeth)", answers: ["having my teeth checked"], width: 22,
      explain: "Present continuous: am having + my teeth + checked." },
    { s: "Someone will deliver the sofa on Friday. → We'll ___ on Friday. (the sofa)", answers: ["have the sofa delivered"], width: 22,
      explain: "will + have + the sofa + delivered." },
    { s: "A tailor made his suit. → He ___. (his suit)", answers: ["had his suit made"], width: 22,
      explain: "Past: had + his suit + made." },
    { s: "Someone has fixed our roof. → We've ___. (our roof)", answers: ["had our roof fixed"], width: 22,
      explain: "Present perfect: have had + our roof + fixed." },
    { s: "An electrician should check the wires. → You should ___. (the wires)", answers: ["have the wires checked"], width: 22,
      explain: "should + have + the wires + checked." },
    { s: "A technician installed the new software. → I ___. (the new software)", answers: ["had the new software installed"], width: 22,
      explain: "Past: had + the new software + installed." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "get something done, and bad experiences",
  intro: "Choose the correct option. In informal English, get something done = have something done. Have something stolen / broken is used for bad experiences.",
  items: [
    { s: "Where did you get your phone ___? – At the shop near the station.", options: ["fixed", "fix", "to fix"], answer: 0,
      explain: "get + object + past participle: get it fixed." },
    { s: "I must ___ my hair cut. It's far too long.", options: ["get", "getting", "got"], answer: 0,
      explain: "must + get (base form) + my hair + cut." },
    { s: "He ___ his wallet stolen on the train.", options: ["had", "was", "did"], answer: 0,
      explain: "A bad experience: he had his wallet stolen (someone stole it)." },
    { s: "We had our flight ___ because of the storm.", options: ["cancelled", "cancel", "cancelling"], answer: 0,
      explain: "A bad experience, past participle: had our flight cancelled." },
    { s: "You should get that tooth ___ out.", options: ["taken", "take", "took"], answer: 0,
      explain: "get + object + past participle: get it taken out." },
    { s: "She had her bag ___ while she was on holiday.", options: ["stolen", "stole", "steal"], answer: 0,
      explain: "Bad experience: had her bag stolen (steal – stole – stolen)." },
    { s: "I'm ___ my bike repaired this afternoon.", options: ["getting", "get", "got"], answer: 0,
      explain: "Present continuous: I'm getting it repaired." },
    { s: "They had their windows ___ by the storm.", options: ["broken", "broke", "break"], answer: 0,
      explain: "Bad experience: had their windows broken." },
    { s: "Can you get these documents ___ by tomorrow?", options: ["translated", "translate", "translating"], answer: 0,
      explain: "get + object + past participle: get them translated." },
    { s: "My grandad had his driving licence ___ because of his eyesight.", options: ["taken away", "take away", "took away"], answer: 0,
      explain: "Bad experience: had it taken away." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Mixed practice",
  intro: "Write the correct form of have and the past participle of the verb in brackets.",
  items: [
    { s: "I ___ (my eyes / test) yesterday.", answers: ["had my eyes tested", "got my eyes tested"], width: 26,
      explain: "Past: had my eyes tested." },
    { s: "We need to ___ (the heating / check) before winter.", answers: ["have the heating checked", "get the heating checked"], width: 26,
      explain: "need to + have + the heating + checked (get is also fine)." },
    { s: "She ___ (her nails / paint) for the wedding tomorrow.", answers: ["is having her nails painted", "'s having her nails painted", "is getting her nails painted", "'s getting her nails painted"], width: 26,
      explain: "An arrangement for tomorrow: she's having her nails painted." },
    { s: "I ___ (my jacket / clean) last week, and it looks like new.", answers: ["had my jacket cleaned", "got my jacket cleaned"], width: 26,
      explain: "Past: had my jacket cleaned." },
    { s: "How often do you ___ (your car / wash)?", answers: ["have your car washed", "get your car washed"], width: 26,
      explain: "Present simple question: do you have your car washed?" },
    { s: "We've just ___ (the house / paint).", answers: ["had the house painted", "got the house painted"], width: 26,
      explain: "Present perfect: we've just had the house painted." },
    { s: "He ___ (his car / steal) last night.", answers: ["had his car stolen", "got his car stolen"], width: 26,
      explain: "Bad experience: he had his car stolen." },
    { s: "You should ___ (that mole / check) by a doctor.", answers: ["have that mole checked", "get that mole checked"], width: 26,
      explain: "should + have + that mole + checked." },
    { s: "I'm going to ___ (my photo / take) for my ID card.", answers: ["have my photo taken", "get my photo taken"], width: 26,
      explain: "going to + have + my photo + taken." },
    { s: "Did you ___ (the pizza / deliver) or did you collect it?", answers: ["have the pizza delivered", "get the pizza delivered"], width: 26,
      explain: "Past question: did you have the pizza delivered?" }
  ]
}
];
