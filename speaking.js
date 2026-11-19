/* C1 Prep: Speaking tests (C1, C2). Timers for each part, and pictures that open larger. */
(function () {
  "use strict";
  const fmt = (s) => Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
  const timers = [];
  let audio = null;

  function beep() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.28].forEach((at) => {
        const o = audio.createOscillator(), g = audio.createGain(), t = audio.currentTime + at;
        o.type = "sine"; o.frequency.value = 880;
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.18, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g).connect(audio.destination); o.start(t); o.stop(t + 0.25);
      });
    } catch (e) { /* no sound: the timer still shows the end */ }
  }

  function makeTimer(box) {
    const total = +box.dataset.seconds;
    const go = box.querySelector(".sp-go"), word = go.querySelector("span"), time = box.querySelector(".sp-time");
    const bar = box.querySelector(".sp-bar i"), reset = box.querySelector(".sp-reset");
    const startText = word.textContent;
    let left = total, end = 0, tick = 0;

    function draw() {
      time.textContent = left > 0 ? fmt(Math.ceil(left)) : "Time’s up";
      bar.style.width = (100 * (1 - left / total)) + "%";
      box.classList.toggle("ending", left > 0 && left <= 10);
    }
    function stop() { clearInterval(tick); tick = 0; box.classList.remove("running"); }
    function step() {
      left = Math.max(0, (end - Date.now()) / 1000);
      draw();
      if (left <= 0) {
        stop(); box.classList.add("done"); word.textContent = "Start again"; beep();
        time.setAttribute("aria-live", "assertive");
      }
    }
    const api = {
      pause() { if (!tick) return; left = Math.max(0, (end - Date.now()) / 1000); stop(); word.textContent = "Resume"; draw(); },
      start() {
        timers.forEach((t) => t !== api && t.pause());
        if (box.classList.contains("done")) api.reset();
        if (audio && audio.state === "suspended") audio.resume();
        end = Date.now() + left * 1000; box.classList.add("running"); word.textContent = "Pause"; reset.hidden = false;
        time.removeAttribute("aria-live");
        tick = setInterval(step, 250); step();
      },
      reset() { stop(); left = total; box.classList.remove("done", "ending"); word.textContent = startText; reset.hidden = true; draw(); }
    };
    go.addEventListener("click", () => (tick ? api.pause() : api.start()));
    reset.addEventListener("click", api.reset);
    draw();
    return api;
  }

  document.querySelectorAll(".sp-timer").forEach((b) => timers.push(makeTimer(b)));

  // pictures: open the large version in a dialog
  const big = document.querySelector("dialog.sp-big");
  if (big && big.showModal) {
    const img = big.querySelector("img");
    document.querySelectorAll("button.sp-photo").forEach((b) => b.addEventListener("click", () => {
      const small = b.querySelector("img");
      img.src = b.dataset.full; img.alt = small ? small.alt : "";
      big.showModal();
    }));
    big.querySelector(".sp-close").addEventListener("click", () => big.close());
    big.addEventListener("click", (e) => { if (e.target === big || e.target === img) big.close(); });
    big.addEventListener("close", () => { img.removeAttribute("src"); });
  }
})();
