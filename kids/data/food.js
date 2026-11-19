/* Kids: Food. Each word has a picture in img/food-<word>.webp (spaces become hyphens: ice cream → food-ice-cream). */
window.KIDS = {
  unit: "food",
  games: ["learn", "listen", "read", "spell"],
  words: ["apple", "banana", "orange", "grapes", "pear", "strawberry", "watermelon", "carrot", "tomato",
          "bread", "cheese", "egg", "milk", "pizza", "cake", "ice cream", "sandwich", "burger"],
  img: (w) => "img/food-" + w.replace(/ /g, "-") + ".webp"
};
