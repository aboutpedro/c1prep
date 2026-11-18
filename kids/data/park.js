/* Kids: In the park. One picture; the spots are boxes in the picture's pixels [left, top, right, bottom]. */
window.KIDS = {
  unit: "park",
  games: ["yesno", "find"],
  scene: {
    src: "img/scene-park.webp", w: 1200, h: 896,
    alt: "A sunny park. A girl is kicking a red ball, a boy is riding a bike, a dog is running after a cat, an old man is reading a book on a bench, a woman is eating an ice cream, a duck is on the pond and a bird is in a tree.",
    spots: {
      man:   { box: [262, 240, 445, 520], label: "the old man" },
      woman: { box: [700, 212, 860, 612], label: "the woman" },
      boy:   { box: [485, 430, 708, 752], label: "the boy" },
      girl:  { box: [85, 515, 300, 830], label: "the girl" },
      dog:   { box: [718, 668, 938, 818], label: "the dog" },
      cat:   { box: [948, 690, 1118, 832], label: "the cat" },
      sun:   { box: [428, 55, 552, 182], label: "the sun" },
      ball:  { box: [254, 743, 340, 829], label: "the ball" },
      duck:  { box: [955, 498, 1060, 587], label: "the duck" },
      bird:  { box: [908, 152, 1010, 232], label: "the bird" }
    }
  },
  yesno: [
    { s: "The girl is kicking a ball.", a: true },
    { s: "The old man is eating an ice cream.", a: false, fix: "The old man is reading a book." },
    { s: "There is a duck on the pond.", a: true },
    { s: "The dog is sleeping.", a: false, fix: "The dog is running." },
    { s: "The boy is riding a bike.", a: true },
    { s: "The bird is in the tree.", a: true },
    { s: "The cat is running after the dog.", a: false, fix: "The dog is running after the cat." },
    { s: "The woman is reading a book.", a: false, fix: "The woman is eating an ice cream." }
  ],
  find: [
    { q: "Who is eating an ice cream?", a: ["woman"] },
    { q: "Who is reading a book?", a: ["man"] },
    { q: "Who is riding a bike?", a: ["boy"] },
    { q: "Who is kicking a ball?", a: ["girl", "ball"] },
    { q: "Where is the duck?", a: ["duck"] },
    { q: "Where is the bird?", a: ["bird"] },
    { q: "Find the dog.", a: ["dog"] },
    { q: "Find the cat.", a: ["cat"] }
  ]
};
