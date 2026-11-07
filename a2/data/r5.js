window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "open-cloze",
  textTitle: "An email from Sara",
  text: `Hi Jo,

Thanks [0] your email. I'm sorry I didn't reply sooner – I've been really busy [25] my exams. They finished yesterday, [26] now I can relax at last!

Are you free [27] Saturday? There's a new pizza restaurant in town and I'd love to try it. We can go to the cinema [28] that. There's a funny film on at the moment that everyone is talking [29].

Let me know [30] you can come.

Love,
Sara`,
  gaps: {
    0: { answers: ["for"] },
    25: { answers: ["with"], explain: "busy with something = doing a lot of it." },
    26: { answers: ["so"], explain: "so introduces a result: the exams finished, so now I can relax." },
    27: { answers: ["on"], explain: "on + days of the week: on Saturday." },
    28: { answers: ["after"], explain: "after that = later, when we have finished eating." },
    29: { answers: ["about"], explain: "talk about something." },
    30: { answers: ["if", "whether"], explain: "Let me know if… = tell me whether or not…" }
  }
},
/* ---------------- Set 2 ---------------- */
{
  type: "open-cloze",
  textTitle: "Ben's new flat",
  text: `Hi Alex,

Guess what? I've just moved [0] a new flat in the city centre! It's bigger [25] my old one, and it's got a balcony. [26] is also a big park near my flat, so I go running every morning.

Would you like to come and stay [27] a weekend? You can sleep [28] the spare room. I'm working every Saturday this month, but [29] weekend after next I'm free.

Write back soon and tell me [30] you think!

Ben`,
  gaps: {
    0: { answers: ["to", "into"] },
    25: { answers: ["than"], explain: "comparative + than: bigger than." },
    26: { answers: ["There"], explain: "There is + a singular noun: There is also a big park." },
    27: { answers: ["for"], explain: "for + a period of time: for a weekend." },
    28: { answers: ["in"], explain: "in a room: sleep in the spare room." },
    29: { answers: ["the"], explain: "the weekend after next = in two weeks." },
    30: { answers: ["what"], explain: "tell me what you think = give me your opinion." }
  }
},
/* ---------------- Set 3 ---------------- */
{
  type: "open-cloze",
  textTitle: "Thank you, Grandma",
  text: `Dear Grandma,

Thank you so much [0] the birthday present! I love the jacket – it's [25] favourite colour. I wore it [26] school yesterday and all my friends liked it.

I had a great birthday. Mum made a chocolate cake and [27] all went to a restaurant in the evening.

When [28] you coming to visit us? I want to show you my bedroom. Dad painted [29] blue last week. I've got some other news too: I've started guitar lessons. I have one [30] Saturday morning.

See you soon!

Lots of love,
Emma`,
  gaps: {
    0: { answers: ["for"] },
    25: { answers: ["my"], explain: "it's my favourite colour (possessive adjective)." },
    26: { answers: ["to"], explain: "wear something to a place: I wore it to school." },
    27: { answers: ["we"], explain: "We is the subject of 'went': Mum made a cake and we all went…" },
    28: { answers: ["are"], explain: "Present continuous for a future plan: When are you coming…?" },
    29: { answers: ["it"], explain: "it = my bedroom. Paint something + colour: painted it blue." },
    30: { answers: ["every", "each", "on"], explain: "every Saturday morning = each week. (On Saturday morning is also possible.)" }
  }
},
/* ---------------- Set 4 ---------------- */
{
  type: "open-cloze",
  textTitle: "Summer English courses",
  text: `Dear Sir or Madam,

I saw your advertisement [0] summer English courses and I would like [25] know more about them.

I am 17 years old and I have studied English [26] four years. Could you tell me [27] much the two-week course costs? I would also like to know [28] students stay with families or in a hotel. [29] it possible to do sports in the afternoons? I love playing tennis.

I look forward [30] hearing from you.

Yours faithfully,
Lucas Pereira`,
  gaps: {
    0: { answers: ["for"] },
    25: { answers: ["to"], explain: "would like + to + verb: I would like to know." },
    26: { answers: ["for"], explain: "present perfect + for + a period of time." },
    27: { answers: ["how"], explain: "how much = what price." },
    28: { answers: ["if", "whether"], explain: "I'd like to know if/whether… introduces a yes/no question inside a sentence." },
    29: { answers: ["Is"], explain: "Is it possible to…? (question with be)." },
    30: { answers: ["to"], explain: "look forward to + -ing: I look forward to hearing from you." }
  }
},
/* ---------------- Set 5 ---------------- */
{
  type: "open-cloze",
  textTitle: "A day at the beach",
  text: `Hi Kate,

Are you coming [0] the beach [25] us tomorrow? We're meeting at the bus station [26] nine o'clock. Don't forget [27] bring your swimming things!

Tom

Hi Tom,

I'd love to come, [28] I can't get there by nine. I have to take my little brother to his football match first. [29] I meet you at the beach later? I'll get [30] at about eleven.

Kate`,
  gaps: {
    0: { answers: ["to"] },
    25: { answers: ["with"], explain: "come with us = together with us." },
    26: { answers: ["at"], explain: "at + clock times: at nine o'clock." },
    27: { answers: ["to"], explain: "Don't forget + to + verb." },
    28: { answers: ["but"], explain: "but shows a contrast: I'd love to come, but I can't get there by nine." },
    29: { answers: ["Can", "Could", "Shall"], explain: "Can/Could I…? asks if something is possible or OK." },
    30: { answers: ["there"], explain: "get there = arrive at that place (the beach)." }
  }
}
];
