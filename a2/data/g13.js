window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Adjective or adverb?",
  intro: "Choose the correct word. Adjectives describe a noun (a quick lunch); adverbs describe a verb (eat quickly).",
  items: [
    { s: "Please drive ___. The roads are icy.", options: ["carefully", "careful"], answer: 0,
      explain: "It describes how you drive (a verb), so we need the adverb: carefully." },
    { s: "She's a very ___ driver.", options: ["careful", "carefully"], answer: 0,
      explain: "It describes the noun driver, so we need the adjective: careful." },
    { s: "My brother speaks English very ___.", options: ["well", "good"], answer: 0,
      explain: "The adverb of good is well: he speaks well." },
    { s: "This soup tastes ___. Can I have some more?", options: ["good", "well"], answer: 0,
      explain: "After taste, look, feel, smell and sound we use an adjective: it tastes good." },
    { s: "The children were playing ___ in their room.", options: ["quietly", "quiet"], answer: 0,
      explain: "It describes how they were playing: quietly." },
    { s: "He works very ___. He's always the last to leave the office.", options: ["hard", "hardly"], answer: 0,
      explain: "The adverb of hard is hard. Hardly means almost not." },
    { s: "You look ___. Is everything OK?", options: ["sad", "sadly"], answer: 0,
      explain: "After look (= seem) we use an adjective: you look sad." },
    { s: "I passed the test ___. It was really easy.", options: ["easily", "easy"], answer: 0,
      explain: "It describes how I passed: easily (easy → easily)." },
    { s: "Don't walk so ___! I can't keep up with you.", options: ["fast", "fastly"], answer: 0,
      explain: "The adverb of fast is fast. There's no word fastly." },
    { s: "We got home ___ last night, after midnight.", options: ["late", "lately"], answer: 0,
      explain: "The adverb of late is late. Lately means recently." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "Write the adverb",
  intro: "Write the adverb of the word in brackets.",
  items: [
    { s: "The old man walked ___ up the hill. (slow)", answers: ["slowly"], width: 11,
      explain: "Most adverbs: adjective + -ly: slow → slowly." },
    { s: "The children smiled ___ when they saw the presents. (happy)", answers: ["happily"], width: 11,
      explain: "-y → -ily: happy → happily." },
    { s: "My grandmother cooks really ___. (good)", answers: ["well"], width: 11,
      explain: "good → well (irregular)." },
    { s: "Please listen ___. This is important. (careful)", answers: ["carefully"], width: 11,
      explain: "careful → carefully (keep both l's)." },
    { s: "It rained ___ all weekend. (heavy)", answers: ["heavily"], width: 11,
      explain: "-y → -ily: heavy → heavily." },
    { s: "She runs very ___. She's the fastest in her class. (fast)", answers: ["fast"], width: 11,
      explain: "fast → fast (no change)." },
    { s: "Can you speak more ___, please? I can't hear you. (loud)", answers: ["loudly"], width: 11,
      explain: "loud → loudly." },
    { s: "I played ___ and we lost the match. (terrible)", answers: ["terribly"], width: 11,
      explain: "-le → -ly: terrible → terribly." },
    { s: "The team trained ___ for the final. (hard)", answers: ["hard"], width: 11,
      explain: "hard → hard (no change). Hardly means almost not." },
    { s: "Lock the door ___ when you leave. (quiet)", answers: ["quietly"], width: 11,
      explain: "quiet → quietly." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "always, usually, never: where do they go?",
  intro: "Choose the correct sentence. Words like always, usually and never go before the main verb, but after be.",
  items: [
    { s: "___", options: ["I always get up at seven.", "I get up always at seven.", "Always I get up at seven."], answer: 0,
      explain: "Before the main verb: I always get up." },
    { s: "___", options: ["She is never late.", "She never is late.", "Never she is late."], answer: 0,
      explain: "After the verb be: she is never late." },
    { s: "___", options: ["We often go to the beach.", "We go often to the beach.", "We go to often the beach."], answer: 0,
      explain: "Before the main verb: we often go." },
    { s: "___", options: ["Are you usually tired after work?", "Do you are usually tired after work?", "Usually are you tired after work?"], answer: 0,
      explain: "With be in questions: Are you usually…?" },
    { s: "___", options: ["He doesn't usually drink coffee.", "He usually doesn't drinks coffee.", "He doesn't drink usually coffee."], answer: 0,
      explain: "In negatives, the adverb usually goes after doesn't / don't and before the main verb." },
    { s: "___", options: ["I have never been to Japan.", "I never have been to Japan.", "I have been never to Japan."], answer: 0,
      explain: "With have / has + past participle, the adverb goes between them: I have never been." },
    { s: "___", options: ["They are always happy to help.", "They always are happy to help.", "Always they are happy to help."], answer: 0,
      explain: "After be: they are always happy." },
    { s: "___", options: ["Do you often eat out?", "Do often you eat out?", "Often do you eat out?"], answer: 0,
      explain: "In questions: Do + you + often + main verb." },
    { s: "___", options: ["I can never remember his name.", "I can remember never his name.", "Never I can remember his name."], answer: 0,
      explain: "With can, the adverb goes after can: I can never remember." },
    { s: "___", options: ["We hardly ever watch TV.", "We watch hardly ever TV.", "We hardly watch ever TV."], answer: 0,
      explain: "Hardly ever (= almost never) goes before the main verb, like never." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "How often?",
  intro: "Choose the word or phrase that fits the meaning.",
  items: [
    { s: "I go swimming on Monday, Wednesday and Friday. I go swimming ___ a week.", options: ["three times", "three time", "thrice times"], answer: 0,
      explain: "We say once, twice, three times, four times… a week." },
    { s: "I go to the dentist in January and July. I go ___ a year.", options: ["twice", "two time", "second"], answer: 0,
      explain: "Two times = twice." },
    { s: "She drinks coffee every morning. She ___ drinks coffee in the morning.", options: ["always", "never", "sometimes"], answer: 0,
      explain: "Every morning = always." },
    { s: "He doesn't like fish. He ___ eats it.", options: ["never", "always", "often"], answer: 0,
      explain: "He doesn't like it, so he doesn't eat it: never." },
    { s: "We go to the cinema about once a year. We ___ go to the cinema.", options: ["hardly ever", "usually", "often"], answer: 0,
      explain: "Once a year is not often: hardly ever (= almost never)." },
    { s: "It rains here on most days in April. It ___ rains in April.", options: ["usually", "never", "hardly ever"], answer: 0,
      explain: "On most days = usually." },
    { s: "I have a meeting with my boss ___ Monday.", options: ["every", "each of", "always"], answer: 0,
      explain: "We say every Monday, every day, every week." },
    { s: "I play tennis now and then, maybe once or twice a month. I ___ play tennis.", options: ["sometimes", "always", "never"], answer: 0,
      explain: "Now and then / once or twice a month = sometimes." },
    { s: "My grandparents visit us ___ month.", options: ["once a", "one", "once in"], answer: 0,
      explain: "We say once a month." },
    { s: "___ do you go to the gym? – Three times a week.", options: ["How often", "How many", "How long"], answer: 0,
      explain: "The answer is a frequency, so we ask How often." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Word order: how, where, when",
  intro: "Choose the correct sentence. Usually the order is: verb + object + how + where + when.",
  items: [
    { s: "___", options: ["I go to school by bus every day.", "I go every day to school by bus.", "I every day go to school by bus."], answer: 0,
      explain: "Place (to school), then how (by bus), then time (every day) at the end." },
    { s: "___", options: ["She speaks English very well.", "She speaks very well English.", "She very well speaks English."], answer: 0,
      explain: "Don't put the adverb between the verb and the object: speaks English very well." },
    { s: "___", options: ["We arrived at the hotel late.", "We late arrived at the hotel.", "We arrived at late the hotel."], answer: 0,
      explain: "Place (at the hotel), then time (late). We arrived late at the hotel is also correct." },
    { s: "___", options: ["I met Ana in the park yesterday.", "I met yesterday Ana in the park.", "I yesterday met Ana in the park."], answer: 0,
      explain: "Object (Ana), place (in the park), time (yesterday)." },
    { s: "___", options: ["He drove the car slowly.", "He drove slowly the car.", "He slowly the car drove."], answer: 0,
      explain: "The adverb goes after the object: drove the car slowly." },
    { s: "___", options: ["They play football in the park on Saturdays.", "They play on Saturdays football in the park.", "They play in the park football on Saturdays."], answer: 0,
      explain: "Object (football), place (in the park), time (on Saturdays)." },
    { s: "___", options: ["I really like this song.", "I like really this song.", "I like this really song."], answer: 0,
      explain: "Really goes before the main verb: I really like." },
    { s: "___", options: ["My sister is still asleep.", "My sister still is asleep.", "My sister is asleep still."], answer: 0,
      explain: "Still goes after be: is still asleep." },
    { s: "___", options: ["I'll see you at the station at six.", "I'll see at the station you at six.", "I'll at six see you at the station."], answer: 0,
      explain: "Place (at the station), then time (at six)." },
    { s: "___", options: ["Please read the questions carefully.", "Please read carefully the questions.", "Please carefully the questions read."], answer: 0,
      explain: "The adverb goes after the object: read the questions carefully." }
  ]
}
];
