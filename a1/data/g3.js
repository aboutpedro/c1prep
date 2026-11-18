window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "One or more? -s and -es",
  intro: "Write the plural of the word in brackets.",
  items: [
    { s: "I've got two ___ (brother).", answers: ["brothers"],
      explain: "Most words: add -s. brother → brothers." },
    { s: "There are three ___ (bus) at the station.", answers: ["buses"],
      explain: "Words ending in -s: add -es. bus → buses." },
    { s: "Can I have two ___ (sandwich), please?", answers: ["sandwiches"],
      explain: "Words ending in -ch: add -es. sandwich → sandwiches." },
    { s: "We need six ___ (glass).", answers: ["glasses"],
      explain: "Words ending in -ss: add -es. glass → glasses." },
    { s: "I've got two ___ (box) of books.", answers: ["boxes"],
      explain: "Words ending in -x: add -es. box → boxes." },
    { s: "The ___ (dish) are in the kitchen.", answers: ["dishes"],
      explain: "Words ending in -sh: add -es. dish → dishes." },
    { s: "My grandparents have four ___ (cat).", answers: ["cats"],
      explain: "Most words: add -s. cat → cats." },
    { s: "There are many ___ (tomato) in this salad.", answers: ["tomatoes"],
      explain: "tomato → tomatoes (also potato → potatoes)." },
    { s: "I've got three ___ (class) today.", answers: ["classes"],
      explain: "Words ending in -ss: add -es. class → classes." },
    { s: "She's got two ___ (watch).", answers: ["watches"],
      explain: "Words ending in -ch: add -es. watch → watches." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences",
  textTitle: "-y, -f and other plurals",
  intro: "Write the plural of the word in brackets.",
  items: [
    { s: "Three ___ (family) live in our building.", answers: ["families"],
      explain: "Consonant + y: y → ies. family → families." },
    { s: "There are 30 ___ (city) in this country with an airport.", answers: ["cities"],
      explain: "Consonant + y: y → ies. city → cities." },
    { s: "Children love ___ (story).", answers: ["stories"],
      explain: "Consonant + y: y → ies. story → stories." },
    { s: "We go to the beach on ___ (day) off.", answers: ["days"],
      explain: "Vowel + y: just add -s. day → days." },
    { s: "I've got two ___ (key).", answers: ["keys"],
      explain: "Vowel + y: just add -s. key → keys." },
    { s: "Put the ___ (knife) in the drawer.", answers: ["knives"],
      explain: "knife → knives (also wife → wives, life → lives)." },
    { s: "The trees lose their ___ (leaf) in autumn.", answers: ["leaves"],
      explain: "leaf → leaves (also half → halves)." },
    { s: "There are three ___ (party) this weekend!", answers: ["parties"],
      explain: "Consonant + y: y → ies. party → parties." },
    { s: "We saw two ___ (wolf) at the zoo.", answers: ["wolves"],
      explain: "wolf → wolves (like knife → knives)." },
    { s: "My little brother has a lot of ___ (toy).", answers: ["toys"],
      explain: "Vowel + y: just add -s. toy → toys." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Irregular plurals",
  intro: "Choose the correct plural.",
  items: [
    { s: "There are 25 ___ in my class.", options: ["children", "childs", "childrens"], answer: 0,
      explain: "child → children." },
    { s: "Four ___ are waiting outside.", options: ["men", "mans", "mens"], answer: 0,
      explain: "man → men." },
    { s: "Two ___ work in the shop.", options: ["women", "womans", "womens"], answer: 0,
      explain: "woman → women." },
    { s: "Brush your ___ before bed.", options: ["teeth", "tooths", "teeths"], answer: 0,
      explain: "tooth → teeth." },
    { s: "My ___ hurt after the walk.", options: ["feet", "foots", "feets"], answer: 0,
      explain: "foot → feet." },
    { s: "There are ___ in the kitchen!", options: ["mice", "mouses", "mices"], answer: 0,
      explain: "mouse → mice." },
    { s: "How many ___ live in your city?", options: ["people", "peoples", "persons"], answer: 0,
      explain: "person → people." },
    { s: "The farmer has 100 ___.", options: ["sheep", "sheeps", "sheepes"], answer: 0,
      explain: "sheep → sheep (no change)." },
    { s: "We've got three ___ in our aquarium.", options: ["fish", "fishs", "fishies"], answer: 0,
      explain: "fish → fish (no change, like sheep)." },
    { s: "My ___ are wet.", options: ["jeans", "jean", "jeanses"], answer: 0,
      explain: "Jeans is always plural: my jeans are…" }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "this, that, these, those",
  intro: "Choose the correct word. this/these = near me; that/those = not near me. this/that = one; these/those = more than one.",
  items: [
    { s: "___ is my bedroom. Come in!", options: ["This", "These", "Those"], answer: 0,
      explain: "One room, here: this." },
    { s: "Look at ___ birds in the sky!", options: ["those", "these", "this"], answer: 0,
      explain: "More than one, far from me: those." },
    { s: "___ shoes are new. Do you like them?", options: ["These", "This", "That"], answer: 0,
      explain: "More than one, here (I'm wearing them): these." },
    { s: "Who is ___ man over there?", options: ["that", "this", "those"], answer: 0,
      explain: "One person, not near me: that." },
    { s: "___ apples are very good. Try one!", options: ["These", "This", "That"], answer: 0,
      explain: "More than one, here in my hand: these." },
    { s: "Can you see ___ house on the hill?", options: ["that", "these", "those"], answer: 0,
      explain: "One house, far away: that." },
    { s: "Is ___ your pen? It's on my desk.", options: ["this", "these", "those"], answer: 0,
      explain: "One thing, near me: this." },
    { s: "___ are my friends, Ana and Leo.", options: ["These", "This", "That"], answer: 0,
      explain: "More than one person, here: these." },
    { s: "I don't like ___ shirt. Show me the blue one.", options: ["this", "these", "those"], answer: 0,
      explain: "One thing: this (or that)." },
    { s: "What are ___ lights over there?", options: ["those", "that", "this"], answer: 0,
      explain: "More than one, far away: those." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Adjectives and nouns",
  intro: "Choose the correct sentence part. Adjectives go before the noun and don't change: two big dogs.",
  items: [
    { s: "I've got two ___.", options: ["big dogs", "bigs dogs", "dogs bigs"], answer: 0,
      explain: "Adjectives don't take -s: big dogs." },
    { s: "She's got ___.", options: ["a red car", "a car red", "red a car"], answer: 0,
      explain: "Adjective before the noun: a red car." },
    { s: "They're ___.", options: ["good friends", "goods friends", "friends good"], answer: 0,
      explain: "Adjectives don't change: good friends." },
    { s: "It's ___.", options: ["an old house", "a old house", "an house old"], answer: 0,
      explain: "old starts with a vowel sound: an old house." },
    { s: "These are ___.", options: ["new shoes", "news shoes", "shoes new"], answer: 0,
      explain: "Adjectives don't take -s: new shoes." },
    { s: "He's ___.", options: ["a happy child", "a child happy", "happy a child"], answer: 0,
      explain: "Adjective before the noun: a happy child." },
    { s: "My grandparents have ___.", options: ["a small garden", "a garden small", "small a garden"], answer: 0,
      explain: "Adjective before the noun." },
    { s: "Those are ___.", options: ["expensive cars", "expensives cars", "cars expensives"], answer: 0,
      explain: "Adjectives don't take -s." },
    { s: "This is ___.", options: ["an easy question", "a easy question", "an question easy"], answer: 0,
      explain: "easy starts with a vowel sound: an easy question." },
    { s: "I like ___.", options: ["hot drinks", "hots drinks", "drinks hot"], answer: 0,
      explain: "Adjectives don't take -s: hot drinks." }
  ]
}
];
