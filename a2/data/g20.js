window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "very or too?",
  intro: "Choose very or too. too = more than is good, so there's a problem.",
  items: [
    { s: "This coffee is ___ hot. I can't drink it.", options: ["too", "very", "enough"], answer: 0,
      explain: "There's a problem (I can't drink it): too." },
    { s: "The film was ___ good. I loved it!", options: ["very", "too", "enough"], answer: 0,
      explain: "No problem, just a lot: very." },
    { s: "I'm ___ tired to go out tonight.", options: ["too", "very", "enough"], answer: 0,
      explain: "A problem (I can't go out): too + adjective + to." },
    { s: "She's ___ tall. She's 1.85 m.", options: ["very", "too", "enough"], answer: 0,
      explain: "Just a fact, no problem: very." },
    { s: "These shoes are ___ small. They hurt my feet.", options: ["too", "very", "enough"], answer: 0,
      explain: "A problem (they hurt): too." },
    { s: "My grandmother is ___ old, but she still swims every day.", options: ["very", "too", "enough"], answer: 0,
      explain: "No problem (she still swims): very." },
    { s: "He's ___ young to drive. He's only 15.", options: ["too", "very", "enough"], answer: 0,
      explain: "A problem (he can't drive): too young to…" },
    { s: "The test was ___ difficult, but I passed.", options: ["very", "too", "enough"], answer: 0,
      explain: "I passed, so there was no problem: very." },
    { s: "This bag is ___ heavy. I can't carry it.", options: ["too", "very", "enough"], answer: 0,
      explain: "A problem (I can't carry it): too." },
    { s: "The hotel was ___ nice. We had a great time.", options: ["very", "too", "enough"], answer: 0,
      explain: "No problem: very." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "too much or too many?",
  intro: "Choose the correct option. too many + plural nouns; too much + nouns we can't count.",
  items: [
    { s: "There are ___ people here. Let's go somewhere quieter.", options: ["too many", "too much", "enough of"], answer: 0,
      explain: "people is plural: too many." },
    { s: "I ate ___ chocolate. I feel sick.", options: ["too much", "too many", "too"], answer: 0,
      explain: "chocolate can't be counted: too much." },
    { s: "You spend ___ time on your phone.", options: ["too much", "too many", "too"], answer: 0,
      explain: "time can't be counted: too much." },
    { s: "There are ___ cars in the city centre.", options: ["too many", "too much", "very"], answer: 0,
      explain: "cars is plural: too many." },
    { s: "Don't put ___ salt in the soup.", options: ["too much", "too many", "too"], answer: 0,
      explain: "salt can't be counted: too much." },
    { s: "I've got ___ things to do today.", options: ["too many", "too much", "too"], answer: 0,
      explain: "things is plural: too many." },
    { s: "He drinks ___ coffee. That's why he can't sleep.", options: ["too much", "too many", "too"], answer: 0,
      explain: "coffee can't be counted: too much." },
    { s: "There were ___ questions in the test. I didn't finish.", options: ["too many", "too much", "too"], answer: 0,
      explain: "questions is plural: too many." },
    { s: "It's ___ noise! I can't hear you.", options: ["too much", "too many", "very"], answer: 0,
      explain: "noise can't be counted: too much." },
    { s: "She has ___ clothes. Her wardrobe is full!", options: ["too many", "too much", "too"], answer: 0,
      explain: "clothes is plural: too many." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "enough",
  intro: "Choose the correct option. enough goes after adjectives (old enough) and before nouns (enough money).",
  items: [
    { s: "I'm not ___ to go on this ride.", options: ["tall enough", "enough tall", "too tall"], answer: 0,
      explain: "After an adjective: tall enough." },
    { s: "We haven't got ___ for a taxi.", options: ["enough money", "money enough", "too money"], answer: 0,
      explain: "Before a noun: enough money." },
    { s: "Is the water ___ to swim in?", options: ["warm enough", "enough warm", "too warm enough"], answer: 0,
      explain: "After an adjective: warm enough." },
    { s: "There aren't ___ for everyone.", options: ["enough chairs", "chairs enough", "too chairs"], answer: 0,
      explain: "Before a noun: enough chairs." },
    { s: "He isn't ___ to watch that film. It's for adults.", options: ["old enough", "enough old", "too old"], answer: 0,
      explain: "After an adjective: old enough." },
    { s: "Did you have ___ to finish the test?", options: ["enough time", "time enough", "too time"], answer: 0,
      explain: "Before a noun: enough time." },
    { s: "This bag isn't ___ for all my books.", options: ["big enough", "enough big", "too big"], answer: 0,
      explain: "After an adjective: big enough." },
    { s: "I didn't sleep ___ last night.", options: ["enough", "too", "very"], answer: 0,
      explain: "At the end, after a verb: sleep enough." },
    { s: "She speaks English ___ to work in London.", options: ["well enough", "enough well", "too well"], answer: 0,
      explain: "After an adverb: well enough." },
    { s: "We've got ___ eggs for the cake.", options: ["enough", "too", "very"], answer: 0,
      explain: "Before a noun: enough eggs." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "too or not … enough?",
  intro: "Choose the sentence that means the same.",
  items: [
    { s: "The box is too heavy for me. = The box isn't ___ for me.", options: ["light enough", "heavy enough", "enough light"], answer: 0,
      explain: "too heavy = not light enough." },
    { s: "I'm too short to reach the shelf. = I'm not ___ to reach the shelf.", options: ["tall enough", "short enough", "enough tall"], answer: 0,
      explain: "too short = not tall enough." },
    { s: "The room is too small for a party. = The room isn't ___ for a party.", options: ["big enough", "small enough", "enough big"], answer: 0,
      explain: "too small = not big enough." },
    { s: "The tea is too hot to drink. = The tea isn't ___ to drink.", options: ["cool enough", "hot enough", "enough cool"], answer: 0,
      explain: "too hot = not cool enough." },
    { s: "He's too young to vote. = He isn't ___ to vote.", options: ["old enough", "young enough", "enough old"], answer: 0,
      explain: "too young = not old enough." },
    { s: "The music is too quiet. = The music isn't ___.", options: ["loud enough", "quiet enough", "enough loud"], answer: 0,
      explain: "too quiet = not loud enough." },
    { s: "My phone is too slow. = My phone isn't ___.", options: ["fast enough", "slow enough", "enough fast"], answer: 0,
      explain: "too slow = not fast enough." },
    { s: "The questions were too difficult. = The questions weren't ___.", options: ["easy enough", "difficult enough", "enough easy"], answer: 0,
      explain: "too difficult = not easy enough." },
    { s: "It's too cold to swim. = It isn't ___ to swim.", options: ["warm enough", "cold enough", "enough warm"], answer: 0,
      explain: "too cold = not warm enough." },
    { s: "The shirt is too big for me. = The shirt isn't ___ for me.", options: ["small enough", "big enough", "enough small"], answer: 0,
      explain: "too big = not small enough." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Write too, very or enough",
  intro: "Write one word in each gap: too, very, much, many or enough.",
  items: [
    { s: "I can't buy it. It's ___ expensive.", answers: ["too"],
      explain: "A problem (I can't buy it): too." },
    { s: "There isn't ___ milk for everyone.", answers: ["enough"],
      explain: "Not as much as we need: not enough." },
    { s: "She's ___ friendly. Everyone likes her.", answers: ["very"],
      explain: "No problem: very." },
    { s: "You've given me too ___ food! I can't eat it all.", answers: ["much"],
      explain: "food can't be counted: too much." },
    { s: "Is your English good ___ for this job?", answers: ["enough"],
      explain: "After an adjective: good enough." },
    { s: "There are too ___ students in this class.", answers: ["many"],
      explain: "students is plural: too many." },
    { s: "The park is ___ beautiful in spring.", answers: ["very"],
      explain: "No problem: very." },
    { s: "He's ___ ill to go to school today.", answers: ["too"],
      explain: "A problem (he can't go): too." },
    { s: "We didn't have ___ time to visit the museum.", answers: ["enough"],
      explain: "Before a noun: enough time." },
    { s: "I'm not old ___ to drive.", answers: ["enough"],
      explain: "After an adjective: old enough." }
  ]
}
];
