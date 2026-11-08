window.SETS = [
/* ---------------- Set 1 ---------------- */
{
  type: "mc-texts", startAt: 1, textTitle: "Out and about",
  items: [
    { kind: "notice", title: "SPORTS CENTRE",
      text: "The swimming pool will be closed for cleaning from 2 to 4 pm today.\nThe gym and tennis courts are open as usual.",
      options: ["All the facilities are closed this afternoon.", "You can use the pool this afternoon after 4 pm.", "The tennis courts are being cleaned today."], answer: 1,
      explain: "Only the pool closes, and only from 2 to 4 pm, so you can swim after 4." },
    { kind: "message", head: "From: Marta · To: Ian",
      text: "Ian – just to let you know the concert has been moved from Friday to Saturday because the singer is ill. Our tickets are still OK for the new date. Marta",
      options: ["Marta needs to buy new tickets.", "The concert has been cancelled because the singer is ill.", "The concert will take place a day later than planned."], answer: 2,
      explain: "Moved from Friday to Saturday = one day later. The tickets are still valid, and it isn't cancelled." },
    { kind: "notice", title: "MUSEUM SHOP",
      text: "Sale items can be exchanged but cannot be returned for a refund.",
      options: ["You can't get your money back for things you buy in the sale.", "Sale items cannot be changed for something else.", "You must keep your receipt to get a refund."], answer: 0,
      explain: "A refund = getting your money back. You can only exchange sale items for something else." },
    { kind: "message", head: "From: Riverside Gym · To: All members",
      text: "From next month, the gym will open an hour earlier, at 6 am, on weekdays. Weekend opening times will stay the same.",
      options: ["The gym will close earlier on weekdays.", "The gym will open at 6 am every day.", "From next month, members can start exercising at 6 am from Monday to Friday."], answer: 2,
      explain: "The change is only on weekdays (Monday to Friday) and it's about opening, not closing." },
    { kind: "notice", title: "LOST",
      text: "Small black backpack, left on the number 7 bus on Tuesday evening. It has my university notes in it – very important! Reward offered.\nPlease call Jonas: 07700 900456",
      options: ["Jonas will give money to the person who returns his bag.", "Jonas has found a backpack on a bus.", "Jonas lost his bag at the university."], answer: 0,
      explain: "'Reward offered' = Jonas will give something (usually money) to the person who finds it." }
  ]
},
/* ---------------- Set 2 ---------------- */
{
  type: "mc-texts", startAt: 1, textTitle: "Study and work",
  items: [
    { kind: "notice", title: "LIBRARY",
      text: "Students may borrow up to five books at a time.\nBooks on the red shelves are for use in the library only.",
      options: ["Students can only borrow books from the red shelves.", "Some books cannot be taken out of the library.", "Students can take as many books home as they like."], answer: 1,
      explain: "The books on the red shelves must stay in the library. The limit is five books." },
    { kind: "message", head: "From: Dr Evans · To: Year 2 students",
      text: "Your essays should be handed in by 5 pm on Friday. Anyone who needs more time must speak to me before Wednesday.",
      options: ["Students who want extra time need to ask by Wednesday.", "All essays must be finished by Wednesday.", "Dr Evans will give everyone extra time."], answer: 0,
      explain: "The deadline is Friday, but students who need longer must ask before Wednesday." },
    { kind: "notice", title: "STAFF ROOM",
      text: "The coffee machine is out of order. An engineer is coming on Thursday.\nPlease use the kettle until then.",
      options: ["The kettle is not working.", "Staff should not drink coffee until Thursday.", "Someone will try to repair the coffee machine on Thursday."], answer: 2,
      explain: "'Out of order' = broken. The engineer is coming on Thursday to fix it; until then, use the kettle." },
    { kind: "message", head: "From: Hannah · To: Leo",
      text: "Leo, I can't make our study group tonight – I've got a terrible cold. Could you send me notes on what you discuss? Thanks! H",
      options: ["Hannah wants to change the time of the study group.", "Hannah wants Leo to tell her what happens at the meeting.", "Hannah wants to borrow Leo's notes from the last class."], answer: 1,
      explain: "She's missing tonight's group and asks for notes on what they discuss tonight, not the last class." },
    { kind: "notice", title: "PART-TIME STAFF WANTED",
      text: "Café Verde needs friendly waiters for weekend shifts.\nNo experience needed – full training given.\nApply in person.",
      options: ["You must have worked in a café before.", "The jobs are for weekdays only.", "You should go to the café to apply."], answer: 2,
      explain: "'Apply in person' = go there yourself. No experience is needed, and the shifts are at the weekend." }
  ]
},
/* ---------------- Set 3 ---------------- */
{
  type: "mc-texts", startAt: 1, textTitle: "Travel",
  items: [
    { kind: "notice", title: "STATION INFORMATION",
      text: "Because of engineering work, there will be no trains between Hadley and Croft this Sunday.\nA replacement bus service will run every 30 minutes.",
      options: ["Trains will run every 30 minutes on Sunday.", "Passengers can travel between Hadley and Croft by bus on Sunday.", "Croft station will be closed all week."], answer: 1,
      explain: "There are no trains, but replacement buses will run between the two places." },
    { kind: "message", head: "From: Ollie · To: Mum",
      text: "Landed safely! The flight was a bit bumpy but fine. Waiting for my suitcase now – then I'll get a taxi to the hotel. Call you later x",
      options: ["Ollie is still at the airport.", "Ollie's suitcase has been lost.", "Ollie had a terrible flight."], answer: 0,
      explain: "He's waiting for his suitcase, so he's still at the airport. The flight was 'a bit bumpy but fine'." },
    { kind: "notice", title: "HOSTEL",
      text: "Towels can be hired at reception for €2.\nPlease return them when you check out.",
      options: ["Guests must bring their own towels.", "Towels are free at reception.", "Guests can pay to use a towel."], answer: 2,
      explain: "'Hired for €2' = you pay to use one and give it back." },
    { kind: "message", head: "From: Sea View Hotel · To: Ms Kowalski",
      text: "Unfortunately, the double room you asked for is not available on those dates. We can offer you a twin room at the same price, or a double room with a sea view for €20 more per night.",
      options: ["The hotel is full on the dates Ms Kowalski wants.", "Ms Kowalski can have a better room if she pays more.", "The twin room costs €20 more than the double room."], answer: 1,
      explain: "The hotel offers two choices; the sea-view double costs €20 more per night. The hotel isn't full." },
    { kind: "notice", title: "GATE 14",
      text: "Flight 207 to Lisbon is now boarding.\nPassengers travelling with small children may board first.",
      options: ["Some passengers can get on the plane before others.", "Families with young children should wait until the end.", "The flight has moved to another gate."], answer: 0,
      explain: "Passengers with small children can get on first." }
  ]
},
/* ---------------- Set 4 ---------------- */
{
  type: "mc-texts", startAt: 1, textTitle: "Home and friends",
  items: [
    { kind: "message", head: "From: Tom · To: Flatmates",
      text: "Whoever finished the milk, please buy some more! And remember it's my turn to have friends round on Friday. Thanks, T",
      options: ["Tom has bought some milk for everyone.", "Tom wants someone to replace the milk.", "Tom is inviting his flatmates to a party on Friday."], answer: 1,
      explain: "The person who finished the milk should buy more. Friday is Tom's turn to invite his own friends." },
    { kind: "notice", title: "TO ALL RESIDENTS",
      text: "Recycling bins will now be collected on Wednesday mornings instead of Mondays.\nPlease put your bins out the night before.",
      options: ["Bins should now be put out on Tuesday evenings.", "Recycling will be collected twice a week.", "Bins must be put out on Monday nights."], answer: 0,
      explain: "Collection is on Wednesday morning, so bins go out the night before: Tuesday evening." },
    { kind: "message", head: "From: Grandpa · To: Lily",
      text: "Lily, thank you for setting up my new phone. I've managed to send my first photo! Could you show me how to make video calls when you come on Sunday?",
      options: ["Grandpa has sent Lily a video.", "Lily is going to buy Grandpa a new phone.", "Grandpa wants Lily to teach him something."], answer: 2,
      explain: "He asks Lily to show him how to make video calls on Sunday." },
    { kind: "notice", title: "ROOM WANTED",
      text: "Quiet, tidy non-smoker looking for a room in a shared flat near the university, from September. Up to €400 a month.\nContact Sara: sara.b@example.com",
      options: ["Sara has a room to rent near the university.", "Sara wants to share a flat with smokers.", "Sara is looking for somewhere to live."], answer: 2,
      explain: "'Room wanted' = Sara needs a room. She is a non-smoker." },
    { kind: "message", head: "From: Jess · To: Nina",
      text: "Nina, would you like to borrow my tent for your camping trip? I won't need it until August. You'd just need to pick it up from my place.",
      options: ["Jess is offering to lend Nina something.", "Jess wants to go camping with Nina in August.", "Jess will bring the tent to Nina's house."], answer: 0,
      explain: "Jess offers to lend her tent. Nina has to collect it from Jess's place." }
  ]
},
/* ---------------- Set 5 ---------------- */
{
  type: "mc-texts", startAt: 1, textTitle: "Shopping and services",
  items: [
    { kind: "notice", title: "SELF-SERVICE TILLS",
      text: "Card payments only.\nTo pay in cash, please use tills 1–4.",
      options: ["Tills 1–4 only accept cards.", "You can't pay in cash at the self-service tills.", "The self-service tills are closed."], answer: 1,
      explain: "The self-service tills are card only; cash is accepted at tills 1–4." },
    { kind: "message", head: "From: QuickParcel",
      text: "We tried to deliver your parcel today, but nobody was home. We will try again tomorrow between 9 am and 1 pm, or you can collect it from our office.",
      options: ["There are two ways to get the parcel.", "The parcel was left with a neighbour.", "The parcel must be collected from the office."], answer: 0,
      explain: "You can wait for the second delivery tomorrow or collect it yourself." },
    { kind: "notice", title: "STORAGE",
      text: "Once opened, keep in the fridge and eat within three days.",
      options: ["This food must always be kept cold.", "You should eat this three days after you buy it.", "After you open it, you need to finish it quickly."], answer: 2,
      explain: "After opening, eat it within three days. Before opening, it doesn't need the fridge." },
    { kind: "notice", title: "HAIR STUDIO",
      text: "Appointments are not always necessary.\nIf you come without one, you may have to wait.",
      options: ["You must book before you come.", "There is always a long wait.", "It's possible to get a haircut without booking."], answer: 2,
      explain: "You can come without an appointment, but you might have to wait." },
    { kind: "message", head: "From: City Bikes",
      text: "Thank you for joining City Bikes! The first 30 minutes of every journey are free. After that, it's €1 for each extra 30 minutes.",
      options: ["Short journeys cost nothing.", "Every journey costs €1.", "You can only use a bike for 30 minutes."], answer: 0,
      explain: "Journeys of 30 minutes or less are free; you pay only for longer ones." }
  ]
}
];
