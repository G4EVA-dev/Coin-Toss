// *****!Variables*****
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flipCoin");
let resetBtn = document.querySelector("#resetGame");

//These lines initialize the variables heads and tails to keep track of the number of times heads and tails appear.
let heads = 0;
let tails = 0;

// !Game Logic
flipBtn.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  console.log(i);
  coin.style.animation = "none";

  if (i) {
    setTimeout(() => {
      coin.style.animation = "spin-head 3s forwards";
    }, 100);
    heads++;
  } else {
    setTimeout(() => {
      coin.style.animation = "spin-tail 3s forwards";
    }, 100);
    tails++;
  }
  setTimeout(updateStats, 3000);
  disableButton();
});

//This function updates the HTML to display the current counts of heads and tails.
function updateStats() {
  document.querySelector("#headsCount").textContent = `Heads: ${heads}`;
  document.querySelector("#tailsCount").textContent = `Tails: ${tails}`;
}

//This function disables the flip button for 3 seconds to prevent multiple clicks during animation.
function disableButton() {
  flipBtn.disabled = true;
  setTimeout(function () {
    flipBtn.disabled = false;
  }, 3000);
}
// When clicked, it resets the animation, resets the counters for heads and tails, and updates the stats.

resetBtn.addEventListener("click", () => {
  coin.style.animation = "none";
  heads = 0;
  tails = 0;
  updateStats();
});
