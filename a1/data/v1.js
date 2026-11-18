window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences",
  textTitle: "My family",
  intro: "Complete the sentences with words from the box. There are two words you don't need.",
  bank: ["aunt", "brother", "children", "cousin", "daughter", "grandfather", "husband", "parents", "sister", "son", "uncle", "wife"],
  items: [
    { s: "My mother and father are my ___.", answers: ["parents"],
      explain: "Your mother and father are your parents." },
    { s: "My father's father is my ___.", answers: ["grandfather"],
      explain: "Your father's (or mother's) father is your grandfather." },
    { s: "My mother's sister is my ___.", answers: ["aunt"],
      explain: "Your mother's or father's sister is your aunt." },
    { s: "My uncle's son is my ___.", answers: ["cousin"],
      explain: "The child of your aunt or uncle is your cousin." },
    { s: "I'm a girl, and I've got one ___. His name is Leo.", answers: ["brother"],
      explain: "Leo is a boy: a brother." },
    { s: "My dad's brother is my ___.", answers: ["uncle"],
      explain: "Your mother's or father's brother is your uncle." },
    { s: "Mr and Mrs Lima have a boy. He's their ___.", answers: ["son"],
      explain: "A boy is his parents' son." },
    { s: "They also have a girl. She's their ___.", answers: ["daughter"],
      explain: "A girl is her parents' daughter." },
    { s: "Paula is married to Marco. She's his ___.", answers: ["wife"],
      explain: "A married woman is her husband's wife." },
    { s: "Marco is Paula's ___.", answers: ["husband"],
      explain: "A married man is his wife's husband." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Describing people",
  intro: "Choose the correct word.",
  items: [
    { s: "My brother is very ___. He's 1.95 m!", options: ["tall", "short", "long"], answer: 0,
      explain: "A person who is 1.95 m is tall." },
    { s: "She's got long, ___ hair.", options: ["blonde", "old", "tall"], answer: 0,
      explain: "Hair colours: blonde, dark, brown, red, grey." },
    { s: "My grandfather is ___. He's 85.", options: ["old", "young", "new"], answer: 0,
      explain: "At 85, a person is old. (For things we say new or old.)" },
    { s: "He's got blue ___.", options: ["eyes", "ears", "eye"], answer: 0,
      explain: "We see with our eyes. Two eyes: plural." },
    { s: "The baby is very ___. She's only three months old.", options: ["young", "old", "tall"], answer: 0,
      explain: "Three months old = very young." },
    { s: "My sister isn't tall. She's ___.", options: ["short", "long", "small hair"], answer: 0,
      explain: "The opposite of tall (for people) is short." },
    { s: "He's got a ___. It's black and very long.", options: ["beard", "eyes", "hair"], answer: 0,
      explain: "A beard is hair on a man's face." },
    { s: "She's very ___. Everyone says she's beautiful.", options: ["pretty", "ugly", "fat"], answer: 0,
      explain: "Pretty = nice to look at." },
    { s: "He doesn't have any hair. He's ___.", options: ["bald", "blonde", "short"], answer: 0,
      explain: "With no hair on the head: bald." },
    { s: "My dad wears ___ to read.", options: ["glasses", "eyes", "a glass"], answer: 0,
      explain: "We wear glasses to see better." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences",
  textTitle: "The body",
  intro: "Complete the sentences with words from the box. There are two words you don't need.",
  bank: ["arm", "back", "ears", "feet", "fingers", "hand", "head", "knee", "mouth", "neck", "nose", "teeth"],
  items: [
    { s: "We hear with our ___.", answers: ["ears"],
      explain: "We hear with our ears." },
    { s: "We have five ___ on each hand.", answers: ["fingers"],
      explain: "Each hand has five fingers." },
    { s: "We wear shoes on our ___.", answers: ["feet"],
      explain: "We wear shoes on our feet. (one foot, two feet)" },
    { s: "I write with my right ___.", answers: ["hand"],
      explain: "We write with our hand." },
    { s: "Open your ___ and say \"aah\".", answers: ["mouth"],
      explain: "We eat and talk with our mouth." },
    { s: "Brush your ___ after every meal.", answers: ["teeth"],
      explain: "We brush our teeth. (one tooth, two teeth)" },
    { s: "We smell with our ___.", answers: ["nose"],
      explain: "We smell with our nose." },
    { s: "I've got a headache. My ___ hurts.", answers: ["head"],
      explain: "A headache is a pain in your head." },
    { s: "I sleep on my ___, looking up at the ceiling.", answers: ["back"],
      explain: "Lying on your back, you look up." },
    { s: "She broke her ___ and now she can't use her hand.", answers: ["arm"],
      explain: "Your hand is at the end of your arm." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Jobs",
  intro: "Choose the correct job.",
  items: [
    { s: "A ___ works in a hospital and helps doctors.", options: ["nurse", "waiter", "farmer"], answer: 0,
      explain: "A nurse works in a hospital." },
    { s: "A ___ teaches students.", options: ["teacher", "driver", "cook"], answer: 0,
      explain: "A teacher teaches." },
    { s: "A ___ brings food to your table in a restaurant.", options: ["waiter", "pilot", "doctor"], answer: 0,
      explain: "A waiter (or waitress) serves food in a restaurant." },
    { s: "A ___ flies a plane.", options: ["pilot", "driver", "farmer"], answer: 0,
      explain: "A pilot flies a plane." },
    { s: "A ___ works on a farm with animals.", options: ["farmer", "dentist", "singer"], answer: 0,
      explain: "A farmer works on a farm." },
    { s: "A ___ looks at your teeth.", options: ["dentist", "teacher", "cook"], answer: 0,
      explain: "A dentist looks after your teeth." },
    { s: "A ___ makes food in a restaurant kitchen.", options: ["cook", "waiter", "police officer"], answer: 0,
      explain: "A cook (or chef) makes food." },
    { s: "A ___ drives a taxi.", options: ["taxi driver", "taxi pilot", "taxi cook"], answer: 0,
      explain: "A taxi driver drives a taxi." },
    { s: "A ___ works in a shop and sells things.", options: ["shop assistant", "farmer", "pilot"], answer: 0,
      explain: "A shop assistant works in a shop." },
    { s: "A ___ helps people when there's a crime.", options: ["police officer", "dentist", "waiter"], answer: 0,
      explain: "A police officer helps when there's a crime." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Countries and nationalities",
  intro: "Write the nationality.",
  items: [
    { s: "Maria is from Spain. She's ___.", answers: ["Spanish"],
      explain: "Spain → Spanish." },
    { s: "Hiro is from Japan. He's ___.", answers: ["Japanese"],
      explain: "Japan → Japanese." },
    { s: "We're from Brazil. We're ___.", answers: ["Brazilian"],
      explain: "Brazil → Brazilian." },
    { s: "Luca is from Italy. He's ___.", answers: ["Italian"],
      explain: "Italy → Italian." },
    { s: "My friends are from Mexico. They're ___.", answers: ["Mexican"],
      explain: "Mexico → Mexican." },
    { s: "Anne is from France. She's ___.", answers: ["French"],
      explain: "France → French." },
    { s: "Wei is from China. He's ___.", answers: ["Chinese"],
      explain: "China → Chinese." },
    { s: "Jack is from England. He's ___.", answers: ["English", "British"],
      explain: "England → English (also British)." },
    { s: "Hans is from Germany. He's ___.", answers: ["German"],
      explain: "Germany → German." },
    { s: "Lucía is from Argentina. She's ___.", answers: ["Argentinian", "Argentine"],
      explain: "Argentina → Argentinian (also Argentine)." }
  ]
}
];
