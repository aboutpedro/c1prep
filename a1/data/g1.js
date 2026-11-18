window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "am, is or are?",
  intro: "Choose the correct form of be. I → am; he, she, it → is; you, we, they → are.",
  items: [
    { s: "I ___ a student.", options: ["am", "is", "are"], answer: 0,
      explain: "With I we always use am." },
    { s: "She ___ my teacher.", options: ["is", "am", "are"], answer: 0,
      explain: "With she we use is." },
    { s: "They ___ from Japan.", options: ["are", "is", "am"], answer: 0,
      explain: "With they we use are." },
    { s: "My brother ___ twelve.", options: ["is", "are", "am"], answer: 0,
      explain: "My brother = he, so we use is." },
    { s: "We ___ in the kitchen.", options: ["are", "is", "am"], answer: 0,
      explain: "With we we use are." },
    { s: "It ___ cold today.", options: ["is", "are", "am"], answer: 0,
      explain: "With it we use is." },
    { s: "You ___ very kind.", options: ["are", "is", "am"], answer: 0,
      explain: "With you we use are." },
    { s: "Tom and Ana ___ friends.", options: ["are", "is", "am"], answer: 0,
      explain: "Tom and Ana = they, so we use are." },
    { s: "The coffee ___ hot.", options: ["is", "are", "am"], answer: 0,
      explain: "The coffee = it, so we use is." },
    { s: "My shoes ___ new.", options: ["are", "is", "am"], answer: 0,
      explain: "My shoes = they (more than one), so we use are." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Short forms",
  intro: "Choose the correct short form. I am → I'm, he is → he's, we are → we're, they are → they're.",
  items: [
    { s: "___ hungry. Is there any food?", options: ["I'm", "I's", "I're"], answer: 0,
      explain: "I am → I'm." },
    { s: "___ my sister, Laura.", options: ["She's", "She'm", "She're"], answer: 0,
      explain: "She is → she's." },
    { s: "___ late! Let's go.", options: ["We're", "We's", "We'm"], answer: 0,
      explain: "We are → we're." },
    { s: "___ a good film.", options: ["It's", "Its", "It're"], answer: 0,
      explain: "It is → it's. (Its without an apostrophe means \"of it\".)" },
    { s: "___ in London this week.", options: ["They're", "Their", "They's"], answer: 0,
      explain: "They are → they're. Their means \"of them\": their car." },
    { s: "___ right. Thank you!", options: ["You're", "Your", "You's"], answer: 0,
      explain: "You are → you're. Your means \"of you\": your bag." },
    { s: "___ a doctor. He works in a hospital.", options: ["He's", "He're", "Hes"], answer: 0,
      explain: "He is → he's." },
    { s: "___ my dog, Max.", options: ["This is", "This are", "This am"], answer: 0,
      explain: "This + is: This is my dog." },
    { s: "___ from Brazil.", options: ["We're", "We's", "Were"], answer: 0,
      explain: "We are → we're. Were (no apostrophe) is the past of are." },
    { s: "___ ten o'clock. Time for bed!", options: ["It's", "It're", "Its"], answer: 0,
      explain: "It is → it's." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences",
  textTitle: "Negatives: not",
  intro: "Make the sentence negative. Write am not, isn't or aren't.",
  items: [
    { s: "I ___ (be) tired.", answers: ["am not"],
      explain: "I am not → I'm not. (We don't say \"I amn't\".)" },
    { s: "He ___ (be) at home.", answers: ["isn't", "'s not"],
      explain: "He is not → he isn't." },
    { s: "We ___ (be) ready.", answers: ["aren't", "'re not"],
      explain: "We are not → we aren't." },
    { s: "The bus ___ (be) late.", answers: ["isn't", "'s not"],
      explain: "The bus = it: it is not → it isn't." },
    { s: "My parents ___ (be) here.", answers: ["aren't", "'re not"],
      explain: "My parents = they: they are not → they aren't." },
    { s: "It ___ (be) my phone.", answers: ["isn't", "'s not"],
      explain: "It is not → it isn't." },
    { s: "You ___ (be) in my class.", answers: ["aren't", "'re not"],
      explain: "You are not → you aren't." },
    { s: "I ___ (be) from Spain. I'm from Mexico.", answers: ["am not"],
      explain: "I am not → I'm not." },
    { s: "These apples ___ (be) good.", answers: ["aren't", "'re not"],
      explain: "These apples = they: they are not → they aren't." },
    { s: "Sara ___ (be) a teacher. She's a student.", answers: ["isn't", "'s not"],
      explain: "Sara = she: she is not → she isn't." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Questions and short answers",
  intro: "Choose the correct question or short answer.",
  items: [
    { s: "___ you a student? – Yes, I am.", options: ["Are", "Is", "Am"], answer: 0,
      explain: "Questions start with be: Are you…?" },
    { s: "___ she your sister? – No, she isn't.", options: ["Is", "Are", "Am"], answer: 0,
      explain: "With she: Is she…?" },
    { s: "Are they from Italy? – Yes, ___.", options: ["they are", "they're", "are they"], answer: 0,
      explain: "In short answers we don't use the short form: Yes, they are." },
    { s: "Is it cold? – No, ___.", options: ["it isn't", "it not", "isn't it"], answer: 0,
      explain: "Short answer: No, it isn't." },
    { s: "Am I late? – No, ___.", options: ["you aren't", "I'm not", "you not"], answer: 0,
      explain: "The question is about \"I\", so the answer is about \"you\": No, you aren't." },
    { s: "___ your parents at home? – Yes, they are.", options: ["Are", "Is", "Am"], answer: 0,
      explain: "Your parents = they: Are they…?" },
    { s: "Is Mr Brown your teacher? – Yes, ___.", options: ["he is", "he's", "is he"], answer: 0,
      explain: "Short answer: Yes, he is." },
    { s: "___ this your bag? – Yes, it is. Thank you!", options: ["Is", "Are", "Am"], answer: 0,
      explain: "This + is: Is this…?" },
    { s: "Are you and Ben friends? – Yes, ___.", options: ["we are", "you are", "they are"], answer: 0,
      explain: "\"You and Ben\" includes me, so I answer with we: Yes, we are." },
    { s: "Is the shop open? – No, ___.", options: ["it isn't", "it not", "isn't it"], answer: 0,
      explain: "Short answer: No, it isn't." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences",
  textTitle: "Questions with where, what, how old",
  intro: "Write is or are.",
  items: [
    { s: "Where ___ my keys?", answers: ["are"],
      explain: "My keys = they (more than one): Where are…?" },
    { s: "What ___ your name?", answers: ["is"],
      explain: "Your name = one thing: What is…? We often say What's…?" },
    { s: "How old ___ your brother?", answers: ["is"],
      explain: "Your brother = he: How old is…?" },
    { s: "Where ___ you from?", answers: ["are"],
      explain: "With you: Where are you from?" },
    { s: "What ___ your favourite colours?", answers: ["are"],
      explain: "Colours = more than one: What are…?" },
    { s: "How ___ you today? – Fine, thanks.", answers: ["are"],
      explain: "With you: How are you?" },
    { s: "Where ___ the bathroom, please?", answers: ["is"],
      explain: "The bathroom = it: Where is…?" },
    { s: "How old ___ your children?", answers: ["are"],
      explain: "Your children = they: How old are…?" },
    { s: "What time ___ it? – It's six o'clock.", answers: ["is"],
      explain: "With it: What time is it?" },
    { s: "Who ___ that man? – He's my uncle.", answers: ["is"],
      explain: "That man = he: Who is…?" }
  ]
}
];
