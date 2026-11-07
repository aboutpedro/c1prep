window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "Comparatives",
  intro: "Complete the sentences with the comparative form of the adjectives in brackets.",
  items: [
    { s: "My bag is ___ (heavy) than yours.", answers: ["heavier"],
      explain: "Consonant + y: change y to -ier (heavy → heavier)." },
    { s: "Trains are ___ (fast) than buses.", answers: ["faster"],
      explain: "Short adjectives (one syllable) add -er: fast → faster." },
    { s: "This exercise is ___ (difficult) than the last one.", answers: ["more difficult"],
      explain: "Long adjectives (three syllables or more) use more: more difficult." },
    { s: "The weather today is ___ (bad) than yesterday.", answers: ["worse"],
      explain: "Irregular: bad → worse → the worst." },
    { s: "Your phone is ___ (expensive) than mine.", answers: ["more expensive"],
      explain: "Long adjective: more expensive." },
    { s: "My brother is two years ___ (old) than me.", answers: ["older"],
      explain: "old → older." },
    { s: "The city is ___ (noisy) than the village where I grew up.", answers: ["noisier"],
      explain: "Two-syllable adjectives ending in -y: -ier (noisy → noisier)." },
    { s: "I feel ___ (good) today than I did yesterday.", answers: ["better"],
      explain: "Irregular: good → better → the best." },
    { s: "Their garden is ___ (big) than ours.", answers: ["bigger"],
      explain: "One vowel + one consonant: double the consonant (big → bigger)." },
    { s: "The second film was ___ (interesting) than the first.", answers: ["more interesting"],
      explain: "Long adjective: more interesting." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "Superlatives",
  intro: "Complete the sentences with the superlative form of the adjectives in brackets.",
  items: [
    { s: "It's the ___ (cold) day of the year so far.", answers: ["coldest"],
      explain: "Short adjectives: the + -est (cold → the coldest)." },
    { s: "This is the ___ (good) pizza in town.", answers: ["best"],
      explain: "Irregular: good → better → the best." },
    { s: "Who is the ___ (tall) person in your family?", answers: ["tallest"],
      explain: "tall → the tallest." },
    { s: "That was the ___ (bad) film I've ever seen.", answers: ["worst"],
      explain: "Irregular: bad → worse → the worst." },
    { s: "Mount Everest is the ___ (high) mountain in the world.", answers: ["highest"],
      explain: "high → the highest. After a superlative we use in + a place: in the world." },
    { s: "This is the ___ (expensive) restaurant in the city.", answers: ["most expensive"],
      explain: "Long adjectives: the most + adjective." },
    { s: "Today was the ___ (happy) day of my life.", answers: ["happiest"],
      explain: "Consonant + y: -iest (happy → the happiest)." },
    { s: "It's the ___ (big) room in the house.", answers: ["biggest"],
      explain: "Double the g: big → the biggest." },
    { s: "Maths is the ___ (difficult) subject for me.", answers: ["most difficult"],
      explain: "Long adjective: the most difficult." },
    { s: "December is the ___ (busy) month for shops.", answers: ["busiest"],
      explain: "busy → the busiest." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Comparative or superlative?",
  intro: "Choose the correct option.",
  items: [
    { s: "Rome is ___ than my town.", options: ["bigger", "the biggest", "more big"], answer: 0,
      explain: "Than tells us to use the comparative: bigger than." },
    { s: "She's the ___ student in the class.", options: ["younger", "youngest", "most young"], answer: 1,
      explain: "The + in the class (a whole group): superlative, the youngest." },
    { s: "This is ___ book I've ever read.", options: ["the most boring", "more boring", "the boringest"], answer: 0,
      explain: "Superlative + I've ever…: the most boring (boring is a long adjective)." },
    { s: "My new flat is ___ than my old one.", options: ["more comfortable", "the most comfortable", "comfortabler"], answer: 0,
      explain: "Comparing two flats + than: more comfortable." },
    { s: "Which is ___ planet in our solar system?", options: ["the largest", "larger", "the most large"], answer: 0,
      explain: "One planet compared with all the others: the largest." },
    { s: "In the city centre, walking is often ___ than driving.", options: ["faster", "the fastest", "more fast"], answer: 0,
      explain: "Two things compared + than: faster than." },
    { s: "My grandma makes ___ cakes in the world!", options: ["the best", "better", "the goodest"], answer: 0,
      explain: "Irregular superlative: good → the best." },
    { s: "Is Spanish ___ than English?", options: ["easier", "the easiest", "more easy"], answer: 0,
      explain: "easy → easier (y → -ier)." },
    { s: "That's ___ joke I've ever heard!", options: ["the funniest", "funnier", "the most funny"], answer: 0,
      explain: "funny → the funniest (y → -iest)." },
    { s: "Today is ___ than yesterday.", options: ["hotter", "the hottest", "more hot"], answer: 0,
      explain: "hot → hotter (double the t)." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "as … as, too and enough",
  intro: "Choose the correct option.",
  items: [
    { s: "My sister is as tall ___ my mum.", options: ["as", "than", "like"], answer: 0,
      explain: "as + adjective + as = the same: as tall as." },
    { s: "The bus isn't ___ fast as the train.", options: ["as", "more", "than"], answer: 0,
      explain: "not as + adjective + as = less: The bus is slower." },
    { s: "This coffee is ___ hot to drink. Let's wait a minute.", options: ["too", "enough", "very"], answer: 0,
      explain: "too + adjective = more than is good or possible: too hot to drink." },
    { s: "I'm not old ___ to drive.", options: ["enough", "too", "as"], answer: 0,
      explain: "Enough comes after the adjective: old enough." },
    { s: "Is your room as ___ as mine?", options: ["big", "bigger", "biggest"], answer: 0,
      explain: "as + the normal adjective + as: as big as." },
    { s: "The film wasn't as good ___ the book.", options: ["as", "than", "that"], answer: 0,
      explain: "not as good as (not 'than')." },
    { s: "These shoes are ___ small. I need a bigger size.", options: ["too", "enough", "as"], answer: 0,
      explain: "too small = smaller than I need." },
    { s: "We haven't got ___ money to buy a new car.", options: ["enough", "too", "as"], answer: 0,
      explain: "Enough comes before a noun: enough money." },
    { s: "Is the water warm ___ for swimming?", options: ["enough", "too", "as"], answer: 0,
      explain: "adjective + enough: warm enough." },
    { s: "My new phone is ___ expensive as my old one.", options: ["as", "more", "the most"], answer: 0,
      explain: "as expensive as = the same price." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Mixed practice",
  intro: "Complete the sentences. Use the adjective in brackets and add any other words you need (than, the, as, too…).",
  items: [
    { s: "A car is ___ (expensive) a bike.", answers: ["more expensive than"],
      explain: "Comparative of a long adjective + than: more expensive than." },
    { s: "This is ___ (good) café in the area.", answers: ["the best"],
      explain: "Superlative: the best … in the area." },
    { s: "My brother is ___ (old) me.", answers: ["older than"],
      explain: "Comparative + than: older than." },
    { s: "Russia is ___ (big) country in the world.", answers: ["the biggest"],
      explain: "Superlative + in the world: the biggest." },
    { s: "I'm not ___ (fast) my friend at running.", answers: ["as fast as"],
      explain: "not as + adjective + as: I'm not as fast as my friend." },
    { s: "Today's test was ___ (easy) yesterday's.", answers: ["easier than"],
      explain: "easy → easier + than." },
    { s: "That was ___ (bad) meal I've ever had.", answers: ["the worst"],
      explain: "Superlative + I've ever…: the worst." },
    { s: "Cats are ___ (independent) dogs.", answers: ["more independent than"],
      explain: "Long adjective: more independent than." },
    { s: "She's ___ (friendly) person I know.", answers: ["the friendliest", "the most friendly"],
      explain: "friendly → the friendliest (the most friendly is also possible)." },
    { s: "This box is ___ (heavy) for me to carry.", answers: ["too heavy"],
      explain: "too + adjective + for me = I can't carry it." }
  ]
}
];
