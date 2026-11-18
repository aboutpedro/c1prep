window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "Food",
  intro: "Complete the sentences with words from the box. There are two words you don't need.",
  bank: ["apples", "bread", "butter", "carrots", "cheese", "chicken", "eggs", "fish", "potatoes", "rice", "salad", "soup"],
  items: [
    { s: "I buy a loaf of ___ every morning.", answers: ["bread"],
      explain: "A loaf of bread." },
    { s: "Chickens give us ___.", answers: ["eggs"],
      explain: "Chickens lay eggs." },
    { s: "Sushi is made with ___ and fish.", answers: ["rice"],
      explain: "Sushi is rice with fish or vegetables." },
    { s: "I don't eat meat, but I eat ___. I love salmon.", answers: ["fish"],
      explain: "Salmon is a fish." },
    { s: "___ are red or green fruit.", answers: ["Apples"],
      explain: "Apples can be red or green." },
    { s: "My favourite pizza has a lot of ___ on it.", answers: ["cheese"],
      explain: "Pizza usually has cheese on top." },
    { s: "We make chips from ___.", answers: ["potatoes"],
      explain: "Chips (fries) are made from potatoes." },
    { s: "A ___ is cold, with lettuce and tomatoes.", answers: ["salad"],
      explain: "A salad: lettuce, tomatoes, cucumber…" },
    { s: "Tomato ___ is good on a cold day.", answers: ["soup"],
      explain: "Soup is hot and liquid." },
    { s: "___ is a type of meat from a bird.", answers: ["Chicken"],
      explain: "Chicken is meat from a bird." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Drinks",
  intro: "Choose the correct word.",
  items: [
    { s: "I drink ___ with milk in the morning.", options: ["coffee", "water", "juice"], answer: 0,
      explain: "Coffee with milk is a popular breakfast drink." },
    { s: "Orange ___ is my favourite drink.", options: ["juice", "milk", "tea"], answer: 0,
      explain: "Orange juice is made from oranges." },
    { s: "Cows give us ___.", options: ["milk", "juice", "water"], answer: 0,
      explain: "Milk comes from cows." },
    { s: "In the UK, people often drink ___ with milk.", options: ["tea", "juice", "water"], answer: 0,
      explain: "British people love tea with milk." },
    { s: "I'm thirsty. Can I have some ___?", options: ["water", "bread", "soup"], answer: 0,
      explain: "When you're thirsty, you drink water." },
    { s: "Hot ___ is a sweet drink. Children love it.", options: ["chocolate", "coffee", "milk tea"], answer: 0,
      explain: "Hot chocolate is a sweet drink." },
    { s: "Coca-Cola and lemonade are ___ drinks.", options: ["fizzy", "hot", "sweetly"], answer: 0,
      explain: "Drinks with bubbles are fizzy." },
    { s: "Adults drink ___ at parties. It's made from grapes.", options: ["wine", "milk", "juice"], answer: 0,
      explain: "Wine is made from grapes." },
    { s: "A ___ of coffee, please.", options: ["cup", "plate", "slice"], answer: 0,
      explain: "We drink coffee from a cup." },
    { s: "I'd like a ___ of orange juice, please.", options: ["glass", "slice", "piece"], answer: 0,
      explain: "We drink juice from a glass." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Meals",
  intro: "Choose the correct word.",
  items: [
    { s: "I have ___ at 7 a.m. before school.", options: ["breakfast", "lunch", "dinner"], answer: 0,
      explain: "The first meal of the day: breakfast." },
    { s: "We have ___ at 1 p.m.", options: ["lunch", "breakfast", "supper time"], answer: 0,
      explain: "The meal in the middle of the day: lunch." },
    { s: "We have ___ at 8 p.m.", options: ["dinner", "breakfast", "lunch"], answer: 0,
      explain: "The meal in the evening: dinner." },
    { s: "I'm ___. I didn't have breakfast.", options: ["hungry", "thirsty", "full"], answer: 0,
      explain: "You want food: you're hungry." },
    { s: "I'm ___. Can I have some water?", options: ["thirsty", "hungry", "full"], answer: 0,
      explain: "You want a drink: you're thirsty." },
    { s: "No more, thank you. I'm ___!", options: ["full", "hungry", "empty"], answer: 0,
      explain: "You can't eat any more: you're full." },
    { s: "I eat an apple as a ___ in the afternoon.", options: ["snack", "meal", "lunch"], answer: 0,
      explain: "A small thing you eat between meals: a snack." },
    { s: "This cake is very ___. It has a lot of sugar.", options: ["sweet", "salty", "sour"], answer: 0,
      explain: "A lot of sugar: sweet." },
    { s: "This soup is very ___. Put in less salt next time!", options: ["salty", "sweet", "spicy-sweet"], answer: 0,
      explain: "A lot of salt: salty." },
    { s: "The ice cream is for ___.", options: ["dessert", "breakfast", "starter"], answer: 0,
      explain: "The sweet food at the end of a meal: dessert." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "At the café",
  intro: "Choose the correct phrase.",
  items: [
    { s: "Waiter: Are you ready to ___?", options: ["order", "buy", "ask"], answer: 0,
      explain: "In a café or restaurant: Are you ready to order?" },
    { s: "Customer: ___ a coffee, please.", options: ["I'd like", "I like", "I want to like"], answer: 0,
      explain: "Polite: I'd like…" },
    { s: "Waiter: Would you like anything ___?", options: ["else", "more thing", "other"], answer: 0,
      explain: "Anything else? = something more?" },
    { s: "Customer: Can I have the ___, please?", options: ["bill", "ticket", "price"], answer: 0,
      explain: "The bill tells you how much to pay." },
    { s: "Waiter: ___ you are.", options: ["Here", "Where", "It"], answer: 0,
      explain: "When you give something: Here you are." },
    { s: "Customer: How ___ is a sandwich?", options: ["much", "many", "cost"], answer: 0,
      explain: "Asking the price: How much…?" },
    { s: "Waiter: Eat here or ___?", options: ["take away", "take out of", "go away"], answer: 0,
      explain: "Eat in the café or take the food with you: take away." },
    { s: "Customer: ___ you.", options: ["Thank", "Thanks", "Please"], answer: 0,
      explain: "Thank you (or Thanks)." },
    { s: "Waiter: Small, medium or ___?", options: ["large", "big size", "long"], answer: 0,
      explain: "Sizes: small, medium, large." },
    { s: "Customer: A table ___ two, please.", options: ["for", "to", "of"], answer: 0,
      explain: "A table for two (people)." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "a bottle of, a packet of",
  intro: "Complete the sentences with words from the box. There are two words you don't need.",
  bank: ["bar", "bottle", "box", "can", "carton", "cup", "jar", "kilo", "loaf", "packet", "slice", "tube"],
  items: [
    { s: "a ___ of wine", answers: ["bottle"],
      explain: "Wine comes in a bottle." },
    { s: "a ___ of chocolate", answers: ["bar"],
      explain: "Chocolate often comes in a bar." },
    { s: "a ___ of milk", answers: ["carton", "bottle"],
      explain: "Milk often comes in a carton (or a bottle)." },
    { s: "a ___ of bread", answers: ["loaf"],
      explain: "A whole bread: a loaf of bread." },
    { s: "a ___ of crisps", answers: ["packet", "bag"],
      explain: "Crisps come in a packet (or a bag)." },
    { s: "a ___ of tea", answers: ["cup"],
      explain: "We drink a cup of tea." },
    { s: "a ___ of beans", answers: ["can", "tin"],
      explain: "Beans often come in a can (in British English also a tin)." },
    { s: "a ___ of cake", answers: ["slice"],
      explain: "A piece of cake: a slice." },
    { s: "a ___ of potatoes", answers: ["kilo"],
      explain: "We buy potatoes by the kilo." },
    { s: "a ___ of chocolates", answers: ["box"],
      explain: "Chocolates often come in a box." }
  ]
}
];
