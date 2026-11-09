window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "a or an?",
  intro: "Choose a or an. Listen to the first sound of the next word, not the first letter.",
  items: [
    { s: "I'm reading ___ interesting book about space.", options: ["a", "an"], answer: 1,
      explain: "Interesting starts with a vowel sound, so we use an." },
    { s: "She works at ___ university in Madrid.", options: ["a", "an"], answer: 0,
      explain: "University starts with a 'y' sound (you-ni-), which is a consonant sound, so we use a." },
    { s: "We waited for ___ hour at the airport.", options: ["a", "an"], answer: 1,
      explain: "The h in hour is silent, so the word starts with a vowel sound: an hour." },
    { s: "My dad has ___ old car that he loves.", options: ["a", "an"], answer: 1,
      explain: "What matters is the next word. Old starts with a vowel sound, so it's an old car." },
    { s: "Can I borrow ___ umbrella? It's raining.", options: ["a", "an"], answer: 1,
      explain: "Umbrella starts with a vowel sound: an umbrella." },
    { s: "He's ___ European footballer, but he plays in Brazil.", options: ["a", "an"], answer: 0,
      explain: "European starts with a 'y' sound (you-), so we say a European." },
    { s: "I'd like ___ orange juice, please.", options: ["a", "an"], answer: 1,
      explain: "Orange starts with a vowel sound. Here an orange juice means a glass of orange juice." },
    { s: "Paris is ___ beautiful city.", options: ["a", "an"], answer: 0,
      explain: "Beautiful starts with a consonant sound: a beautiful city." },
    { s: "She needs ___ uniform for her new job.", options: ["a", "an"], answer: 0,
      explain: "Uniform starts with a 'y' sound, like university: a uniform." },
    { s: "It was ___ honest mistake.", options: ["a", "an"], answer: 1,
      explain: "The h in honest is silent, so we say an honest mistake." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "a, an or the?",
  intro: "Choose a, an or the.",
  items: [
    { s: "I've got ___ dog and two cats.", options: ["a", "an", "the"], answer: 0,
      explain: "We mention the dog for the first time, and it's one dog: a dog." },
    { s: "We've got a dog and a cat. ___ dog is called Max.", options: ["A", "An", "The"], answer: 2,
      explain: "This is the second time we mention the dog, so now we know which one: the dog." },
    { s: "Can you turn off ___ light, please? I want to sleep.", options: ["a", "an", "the"], answer: 2,
      explain: "We both know which light: the one in this room." },
    { s: "My sister is ___ engineer.", options: ["a", "an", "the"], answer: 1,
      explain: "We use a/an with jobs. Engineer starts with a vowel sound: an engineer." },
    { s: "Is there ___ supermarket near here?", options: ["a", "an", "the"], answer: 0,
      explain: "Any supermarket, not a particular one: a supermarket." },
    { s: "___ moon looks really big tonight.", options: ["A", "An", "The"], answer: 2,
      explain: "There's only one moon, so we use the." },
    { s: "We stayed in ___ small hotel near the beach.", options: ["a", "an", "the"], answer: 0,
      explain: "First mention, and one of many hotels: a small hotel." },
    { s: "What's ___ name of this street?", options: ["a", "an", "the"], answer: 2,
      explain: "The street has one name, and we know which street: the name of this street." },
    { s: "I had ___ egg for breakfast.", options: ["a", "an", "the"], answer: 1,
      explain: "One egg, and egg starts with a vowel sound: an egg." },
    { s: "Who's ___ best player in your team?", options: ["a", "an", "the"], answer: 2,
      explain: "Superlatives (the best, the tallest) always take the." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences",
  textTitle: "the or no article?",
  intro: "Choose the, or choose – if you don't need an article.",
  items: [
    { s: "I don't like ___ coffee. It's too bitter.", options: ["the", "–"], answer: 1,
      explain: "Coffee in general, so no article." },
    { s: "___ coffee in this café is excellent.", options: ["The", "–"], answer: 0,
      explain: "Not coffee in general, but the coffee in this particular café: the." },
    { s: "My brother plays ___ guitar in a band.", options: ["the", "–"], answer: 0,
      explain: "We say play the guitar, play the piano for musical instruments." },
    { s: "We usually have ___ lunch at one o'clock.", options: ["the", "–"], answer: 1,
      explain: "No article with meals: have breakfast, have lunch, have dinner." },
    { s: "___ children usually love animals.", options: ["The", "–"], answer: 1,
      explain: "Children in general, so no article." },
    { s: "___ children in my class are very friendly.", options: ["The", "–"], answer: 0,
      explain: "Not all children, but the children in my class: the." },
    { s: "She goes to ___ work by bus.", options: ["the", "–"], answer: 1,
      explain: "We say go to work, go to school, go to bed, with no article." },
    { s: "Have you ever been to ___ Netherlands?", options: ["the", "–"], answer: 0,
      explain: "Most countries have no article, but some plural names do: the Netherlands, the USA, the Philippines." },
    { s: "They live in ___ Italy.", options: ["the", "–"], answer: 1,
      explain: "Most country names have no article: Italy, Brazil, Japan." },
    { s: "I think I left my bag in ___ car.", options: ["the", "–"], answer: 0,
      explain: "We both know which car (our car), so we use the." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences",
  textTitle: "a, an, the or –?",
  intro: "Choose a, an, the, or – if you don't need an article.",
  items: [
    { s: "___ life is short, so enjoy it!", options: ["A", "An", "The", "–"], answer: 3,
      explain: "Life in general, so no article. Not 'The life is short'." },
    { s: "He's ___ actor in a famous TV series.", options: ["a", "an", "the", "–"], answer: 1,
      explain: "A job, and actor starts with a vowel sound: an actor." },
    { s: "I'll meet you outside ___ station at six.", options: ["a", "an", "the", "–"], answer: 2,
      explain: "We both know which station (the one in our town), so we use the." },
    { s: "We're going to Japan ___ next year.", options: ["a", "an", "the", "–"], answer: 3,
      explain: "No article with next and last: next year, last week." },
    { s: "I need ___ new phone. Mine is broken.", options: ["a", "an", "the", "–"], answer: 0,
      explain: "Any new phone, one of many: a new phone." },
    { s: "Do you play ___ tennis?", options: ["a", "an", "the", "–"], answer: 3,
      explain: "No article with sports: play tennis, play football." },
    { s: "___ Atlantic Ocean is between Europe and America.", options: ["A", "An", "The", "–"], answer: 2,
      explain: "Oceans, seas and rivers take the: the Atlantic, the Mediterranean, the Amazon." },
    { s: "It's ___ only restaurant that's open on Mondays.", options: ["a", "an", "the", "–"], answer: 2,
      explain: "If there's only one, we use the: the only restaurant." },
    { s: "I go to the gym three times ___ week.", options: ["a", "an", "the", "–"], answer: 0,
      explain: "For frequency we say three times a week, twice a day." },
    { s: "There's ___ apple and a banana in my bag.", options: ["a", "an", "the", "–"], answer: 1,
      explain: "First mention, and apple starts with a vowel sound: an apple." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Mixed practice: a weekend in Lisbon",
  intro: "The sentences tell a story. Choose a, an, the, or – if you don't need an article.",
  items: [
    { s: "Last month I went on ___ short trip to Lisbon with my sister.", options: ["a", "an", "the", "–"], answer: 0,
      explain: "First mention, and one of many trips: a short trip." },
    { s: "We stayed in ___ old apartment in the Alfama district.", options: ["a", "an", "the", "–"], answer: 1,
      explain: "First mention, and old starts with a vowel sound: an old apartment." },
    { s: "___ apartment had a small balcony with a great view.", options: ["A", "An", "The", "–"], answer: 2,
      explain: "Second mention: now we know which apartment, so we use the." },
    { s: "On Saturday morning we had ___ breakfast in a famous café.", options: ["a", "an", "the", "–"], answer: 3,
      explain: "No article with meals: have breakfast." },
    { s: "___ coffee they served us was really strong.", options: ["A", "An", "The", "–"], answer: 2,
      explain: "A particular coffee, the coffee they served us, so we use the." },
    { s: "My sister is ___ architect, so she loved the old buildings.", options: ["a", "an", "the", "–"], answer: 1,
      explain: "A job, and architect starts with a vowel sound: an architect." },
    { s: "We don't usually eat ___ fish, but the grilled sardines were delicious.", options: ["a", "an", "the", "–"], answer: 3,
      explain: "Fish in general (as food), so no article." },
    { s: "It was ___ best meal of the trip.", options: ["a", "an", "the", "–"], answer: 2,
      explain: "Superlatives take the: the best meal." },
    { s: "On Sunday it rained, so we stayed at ___ home and read.", options: ["a", "an", "the", "–"], answer: 3,
      explain: "We say at home, with no article." },
    { s: "We're going back to ___ Portugal next summer.", options: ["a", "an", "the", "–"], answer: 3,
      explain: "Most country names have no article: Portugal." }
  ]
}
];
