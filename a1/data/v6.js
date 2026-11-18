window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "Places in town",
  intro: "Complete the sentences with words from the box. There are two words you don't need.",
  bank: ["airport", "bank", "café", "chemist's", "cinema", "hospital", "library", "museum", "park", "post office", "station", "zoo"],
  items: [
    { s: "I get money from the ___.", answers: ["bank"],
      explain: "A bank keeps your money." },
    { s: "We watch films at the ___.", answers: ["cinema"],
      explain: "We watch films at the cinema." },
    { s: "I borrow books from the ___. It's free!", answers: ["library"],
      explain: "A library lends books." },
    { s: "We catch the train at the ___.", answers: ["station"],
      explain: "Trains stop at the station." },
    { s: "I send letters at the ___.", answers: ["post office"],
      explain: "We send letters and parcels at the post office." },
    { s: "I buy medicine at the ___.", answers: ["chemist's"],
      explain: "A chemist's (pharmacy) sells medicine." },
    { s: "Doctors and nurses work at the ___.", answers: ["hospital"],
      explain: "Doctors and nurses work in a hospital." },
    { s: "We have a coffee and a cake at the ___.", answers: ["café"],
      explain: "A café sells drinks and snacks." },
    { s: "The children play football in the ___.", answers: ["park"],
      explain: "A park has grass and trees. You can play there." },
    { s: "You can see old paintings at the ___.", answers: ["museum"],
      explain: "A museum shows old and interesting things." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Shops",
  intro: "Choose the correct shop.",
  items: [
    { s: "I buy bread at the ___.", options: ["baker's", "butcher's", "bookshop"], answer: 0,
      explain: "A baker's sells bread and cakes." },
    { s: "I buy meat at the ___.", options: ["butcher's", "baker's", "chemist's"], answer: 0,
      explain: "A butcher's sells meat." },
    { s: "I buy food for the week at the ___.", options: ["supermarket", "bookshop", "chemist's"], answer: 0,
      explain: "A supermarket sells food and many other things." },
    { s: "I buy a newspaper at the ___.", options: ["newsagent's", "butcher's", "bank"], answer: 0,
      explain: "A newsagent's sells newspapers and magazines." },
    { s: "I buy a dictionary at the ___.", options: ["bookshop", "baker's", "butcher's"], answer: 0,
      explain: "A bookshop sells books." },
    { s: "I buy flowers for my mum at the ___.", options: ["florist's", "butcher's", "bookshop"], answer: 0,
      explain: "A florist's sells flowers." },
    { s: "I buy shoes at the ___.", options: ["shoe shop", "baker's", "chemist's"], answer: 0,
      explain: "A shoe shop sells shoes." },
    { s: "I buy a new phone at the ___.", options: ["electronics shop", "baker's", "florist's"], answer: 0,
      explain: "An electronics shop sells phones and computers." },
    { s: "There are 100 shops in the new shopping ___.", options: ["centre", "street", "place"], answer: 0,
      explain: "A shopping centre (in the US: mall) has a lot of shops." },
    { s: "I buy fruit and vegetables at the ___ on Saturday mornings.", options: ["market", "bank", "library"], answer: 0,
      explain: "A market sells food outside or in a big hall." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Transport",
  intro: "Choose the correct word.",
  items: [
    { s: "I go to work ___ bus.", options: ["by", "with", "in"], answer: 0,
      explain: "With transport: by bus, by car, by train." },
    { s: "She goes to school ___ foot.", options: ["on", "by", "with"], answer: 0,
      explain: "We say on foot (= walking)." },
    { s: "We're ___ the train now. We arrive at six.", options: ["on", "in", "by"], answer: 0,
      explain: "On a train, bus or plane: on." },
    { s: "My dad ___ a car to work.", options: ["drives", "rides", "flies"], answer: 0,
      explain: "We drive a car." },
    { s: "I ___ my bike to the park.", options: ["ride", "drive", "fly"], answer: 0,
      explain: "We ride a bike." },
    { s: "The ___ leaves from platform 4.", options: ["train", "car", "bike"], answer: 0,
      explain: "Trains leave from platforms." },
    { s: "We ___ to Madrid. The flight is two hours.", options: ["fly", "drive", "ride"], answer: 0,
      explain: "We fly (in a plane)." },
    { s: "Let's take a ___. It's late and it's raining.", options: ["taxi", "bike", "walk"], answer: 0,
      explain: "A taxi takes you where you want and you pay the driver." },
    { s: "The ___ stop is in front of the bank.", options: ["bus", "train", "plane"], answer: 0,
      explain: "We wait for the bus at the bus stop." },
    { s: "I go to the island by ___.", options: ["boat", "car", "bike"], answer: 0,
      explain: "To go to an island: by boat (or ferry)." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Directions",
  intro: "Choose the correct word.",
  items: [
    { s: "Go ___ on. The station is at the end of this street.", options: ["straight", "right", "turn"], answer: 0,
      explain: "Go straight on = don't turn." },
    { s: "___ left at the traffic lights.", options: ["Turn", "Go", "Take"], answer: 0,
      explain: "Turn left / turn right." },
    { s: "The bank is ___ the left.", options: ["on", "at", "in"], answer: 0,
      explain: "on the left / on the right." },
    { s: "Take the second street ___ the right.", options: ["on", "in", "at"], answer: 0,
      explain: "the first/second street on the right." },
    { s: "Excuse me, ___ is the museum?", options: ["where", "what", "who"], answer: 0,
      explain: "Asking the way: Where is…?" },
    { s: "The museum is ___ the park. Just across the road!", options: ["opposite", "between", "under"], answer: 0,
      explain: "Opposite = on the other side of the road." },
    { s: "Is there a bank ___ here?", options: ["near", "next", "far"], answer: 0,
      explain: "near here = close to here." },
    { s: "It's a long way. It's very ___.", options: ["far", "near", "next"], answer: 0,
      explain: "Far = a long way." },
    { s: "Go ___ the bridge.", options: ["over", "in", "at"], answer: 0,
      explain: "We go over (or across) a bridge." },
    { s: "It's on the ___ of Green Street and Park Road.", options: ["corner", "right", "next"], answer: 0,
      explain: "Where two streets meet: the corner." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Holidays and hotels",
  intro: "Complete the sentences with words from the box. There are two words you don't need.",
  bank: ["beach", "booked", "key", "map", "menu", "passport", "room", "suitcase", "swim", "ticket", "trip", "wallet"],
  items: [
    { s: "I need my ___ to go to another country. It has my photo and my name in it.", answers: ["passport"],
      explain: "You show your passport at the airport." },
    { s: "I put my clothes in a ___.", answers: ["suitcase"],
      explain: "A suitcase is a big bag for travelling." },
    { s: "We've got a ___ with a sea view.", answers: ["room"],
      explain: "A hotel room." },
    { s: "I ___ the hotel online last month.", answers: ["booked"],
      explain: "book = reserve: I booked a room." },
    { s: "Here's your ___. Your room is number 205.", answers: ["key"],
      explain: "You open your room with a key." },
    { s: "Let's go to the ___ and lie in the sun.", answers: ["beach"],
      explain: "The beach = sand by the sea." },
    { s: "Can we ___ in the sea? Is it cold?", answers: ["swim"],
      explain: "We swim in the sea." },
    { s: "I've got a ___ of the city. We can't get lost!", answers: ["map"],
      explain: "A map shows streets and places." },
    { s: "I need a ___ for the train.", answers: ["ticket"],
      explain: "You need a ticket to travel by train." },
    { s: "We're going on a ___ to the mountains.", answers: ["trip"],
      explain: "A trip = a short journey or holiday." }
  ]
}
];
