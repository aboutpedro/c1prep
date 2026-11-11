window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Subject or object pronoun?",
  intro: "Choose the correct pronoun. Subject pronouns (I, he, she, we, they) come before the verb; object pronouns (me, him, her, us, them) come after a verb or a preposition.",
  items: [
    { s: "My brother is in Canada. ___ works in a hotel there.", options: ["He", "Him", "His"], answer: 0,
      explain: "The pronoun is the subject of works, so we use he." },
    { s: "I don't know those girls. Do you know ___?", options: ["them", "they", "their"], answer: 0,
      explain: "The pronoun comes after the verb know, so we use the object pronoun them." },
    { s: "Can you help ___? I can't open this door.", options: ["me", "I", "my"], answer: 0,
      explain: "After the verb help we use the object pronoun me." },
    { s: "Lucy and ___ are in the same class.", options: ["I", "me", "my"], answer: 0,
      explain: "Lucy and I are the subject of are, so we use I." },
    { s: "This present is for ___. Happy birthday, Mum!", options: ["you", "your", "yours"], answer: 0,
      explain: "After the preposition for we use an object pronoun: for you." },
    { s: "We're going to the cinema. Do you want to come with ___?", options: ["us", "we", "our"], answer: 0,
      explain: "After the preposition with we use the object pronoun us." },
    { s: "I called Sara, but ___ didn't answer.", options: ["she", "her", "hers"], answer: 0,
      explain: "The pronoun is the subject of didn't answer, so we use she." },
    { s: "Where's my phone? I can't find ___.", options: ["it", "its", "them"], answer: 0,
      explain: "One thing (my phone) after the verb find: it." },
    { s: "Mr Lopez is very nice. Everyone likes ___.", options: ["him", "he", "his"], answer: 0,
      explain: "After the verb likes we use the object pronoun him." },
    { s: "Ana and Tom are getting married. ___ met at university.", options: ["They", "Them", "Their"], answer: 0,
      explain: "Ana and Tom are the subject of met, so we use they." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "my or mine? your or yours?",
  intro: "Choose the correct word. We use my, your, his, her, our, their before a noun, and mine, yours, his, hers, ours, theirs without a noun.",
  items: [
    { s: "Is this ___ bag? – Yes, thanks!", options: ["your", "yours"], answer: 0,
      explain: "There's a noun after the gap (bag), so we use your." },
    { s: "That isn't my umbrella. ___ is red.", options: ["Mine", "My"], answer: 0,
      explain: "No noun after the gap: mine = my umbrella." },
    { s: "Whose car is that? – It's ___. She bought it last week.", options: ["hers", "her"], answer: 0,
      explain: "No noun after the gap: hers = her car." },
    { s: "We love ___ new flat. It's very bright.", options: ["our", "ours"], answer: 0,
      explain: "There's a noun after the gap (flat), so we use our." },
    { s: "These aren't our seats. I think they're ___.", options: ["theirs", "their"], answer: 0,
      explain: "No noun after the gap: theirs = their seats." },
    { s: "My dog is called Max. What's ___ dog called?", options: ["your", "yours"], answer: 0,
      explain: "There's a noun after the gap (dog), so we use your." },
    { s: "Can I borrow your pen? I can't find ___.", options: ["mine", "my"], answer: 0,
      explain: "No noun after the gap: mine = my pen." },
    { s: "The cat is eating ___ dinner.", options: ["its", "it's"], answer: 0,
      explain: "Its (no apostrophe) means belonging to it. It's = it is." },
    { s: "Leo forgot his book, so I gave him ___.", options: ["mine", "my"], answer: 0,
      explain: "No noun after the gap: mine = my book." },
    { s: "My parents sold ___ house and moved to the coast.", options: ["their", "theirs", "there"], answer: 0,
      explain: "There's a noun after the gap (house), so we use their. There is for places." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "'s or s'? Whose?",
  intro: "Choose the correct option. We add 's to a person (my sister's car) and only ' after a plural that ends in -s (my parents' house).",
  items: [
    { s: "This is ___ bike. She rides it to school.", options: ["my sister's", "my sisters", "my sister"], answer: 0,
      explain: "One sister, and the bike belongs to her: my sister's bike." },
    { s: "The ___ room is upstairs. They share it.", options: ["boys'", "boy's", "boys"], answer: 0,
      explain: "They share it, so there's more than one boy: boys + ' = the boys' room." },
    { s: "We're having dinner at ___ house tonight.", options: ["Tom and Ana's", "Tom's and Ana", "Tom and Ana"], answer: 0,
      explain: "One house that belongs to both of them: add 's to the last name only: Tom and Ana's house." },
    { s: "___ phone is this? – I think it's Leo's.", options: ["Whose", "Who's", "Who"], answer: 0,
      explain: "To ask who something belongs to, we use whose. Who's = who is." },
    { s: "My ___ names are Rosa and Pedro.", options: ["parents'", "parent's", "parents"], answer: 0,
      explain: "Parents is plural and ends in -s, so we only add ': my parents' names." },
    { s: "The ___ toys are all over the floor.", options: ["children's", "childrens'", "childrens"], answer: 0,
      explain: "Children is plural but doesn't end in -s, so we add 's: the children's toys." },
    { s: "What's your ___ name?", options: ["teacher's", "teachers", "teacher"], answer: 0,
      explain: "The name belongs to the teacher: your teacher's name." },
    { s: "I'm going to ___ for lunch. My aunt is cooking.", options: ["my aunt's", "my aunts'", "my aunt"], answer: 0,
      explain: "We often say at/to someone's for their house: I'm going to my aunt's (house)." },
    { s: "Is this ___ coat or yours?", options: ["Maria's", "Marias", "Maria"], answer: 0,
      explain: "The coat belongs to Maria: Maria's coat." },
    { s: "___ the girl with the long hair? – That's my cousin.", options: ["Who's", "Whose", "Who"], answer: 0,
      explain: "Who's = who is: Who is the girl…?" }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "sentences",
  textTitle: "myself, yourself, themselves…",
  intro: "Complete each sentence with a reflexive pronoun: myself, yourself, himself, herself, itself, ourselves, yourselves or themselves.",
  items: [
    { s: "Be careful with that knife! Don't cut ___.", answers: ["yourself"], width: 12,
      explain: "We use a reflexive pronoun when the subject and the object are the same person: you → yourself." },
    { s: "My little sister is only four, but she can dress ___.", answers: ["herself"], width: 12,
      explain: "she → herself." },
    { s: "I taught ___ to play the guitar with videos.", answers: ["myself"], width: 12,
      explain: "I → myself. Nobody else taught me." },
    { s: "We really enjoyed ___ at the party.", answers: ["ourselves"], width: 12,
      explain: "We say enjoy yourself / ourselves = have a good time. we → ourselves." },
    { s: "Tom hurt ___ when he fell off his bike.", answers: ["himself"], width: 12,
      explain: "Tom → himself." },
    { s: "Help ___ to some cake, everyone!", answers: ["yourselves"], width: 12,
      explain: "We're talking to more than one person (everyone), so we use yourselves. Help yourself = take what you want." },
    { s: "The children made the cake ___. Nobody helped them.", answers: ["themselves"], width: 12,
      explain: "the children → themselves. Here it means without help." },
    { s: "This light turns ___ off after ten minutes.", answers: ["itself"], width: 12,
      explain: "this light → itself." },
    { s: "Did you paint the kitchen ___? It looks great!", answers: ["yourself", "yourselves"], width: 12,
      explain: "you → yourself (one person) or yourselves (more than one person)." },
    { s: "I live by ___ in a small flat.", answers: ["myself"], width: 12,
      explain: "by myself = alone." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "sentences", shuffle: true,
  textTitle: "Mixed practice",
  intro: "Choose the correct word.",
  items: [
    { s: "Is this your jacket? – No, it isn't ___.", options: ["mine", "me", "my", "myself"], answer: 0,
      explain: "No noun after the gap: mine = my jacket." },
    { s: "My grandparents live near ___.", options: ["us", "we", "our", "ours"], answer: 0,
      explain: "After the preposition near we use the object pronoun us." },
    { s: "___ name is Kevin, but everybody calls him Kev.", options: ["His", "He", "Him", "He's"], answer: 0,
      explain: "Before a noun (name): his." },
    { s: "She looked at ___ in the mirror.", options: ["herself", "her", "hers", "she"], answer: 0,
      explain: "She looked at the same person (she), so we use herself." },
    { s: "Those are my keys, not ___.", options: ["yours", "your", "you", "yourself"], answer: 0,
      explain: "No noun after the gap: yours = your keys." },
    { s: "I met ___ brother yesterday. He's really funny.", options: ["Carla's", "Carla", "Carlas", "Carlas'"], answer: 0,
      explain: "The brother of Carla: Carla's brother." },
    { s: "Paul and ___ went to the beach on Saturday.", options: ["I", "me", "my", "mine"], answer: 0,
      explain: "Paul and I are the subject of went, so we use I." },
    { s: "Our neighbours are on holiday. We're looking after ___ cat.", options: ["their", "theirs", "them", "they"], answer: 0,
      explain: "Before a noun (cat): their." },
    { s: "Can you give this letter to ___? He's in the office.", options: ["him", "he", "his", "himself"], answer: 0,
      explain: "After the preposition to we use the object pronoun him." },
    { s: "That's not your seat. It's ___. Her name is on it.", options: ["hers", "her", "she", "herself"], answer: 0,
      explain: "No noun after the gap: hers = her seat." }
  ]
}
];
