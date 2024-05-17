// *****!Variables*****
let coin = document.querySelector(".coin");
let flipBtn = document.querySelector("#flipCoin");
let resetBtn = document.querySelector("#resetGame");

//These lines initialize the variables heads and tails to keep track of the number of times heads and tails appear.
let heads = 0;
let tails = 0;
let roundsPlayed = 0;

//!Check if the user has played before
// let previousResults = getCookie("coinGameResults");
// if (previousResults) {
//   let parsedResults = JSON.parse(previousResults);
//   let Heads = parsedResults.heads;
//   let Tails = parsedResults.tails;
//   console.log("Heads:", Heads);
//   console.log("Tails:", Tails);
// } else {
//   console.log("No previous results found.");
// }

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

  roundsPlayed++;
  //Checks number of time Player plays.
  if (roundsPlayed === 3) {
    updateStats();
    storeResultsInCookie();
    flipBtn.disabled = true;

    resetBtn.addEventListener("click", () => {
      coin.style.animation = "none";
      heads = 0;
      tails = 0;
      updateStats();
      flipBtn.disabled = false;
    });
  } else {
    setTimeout(updateStats, 3000);
    disableButton();
  }
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

// function storeResultsInCookie() {
//   let results = {
//     heads: heads,
//     tails: tails,
//   };
//   document.cookie = `coinGameResults=${JSON.stringify(
//     results
//   )};expires=${new Date(Date.now() + 604800000).toUTCString()};path=/;Secure`;
// }

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(";").shift();
// }

// Function to send game results to the server using fetch
function storeResultsInCookie() {
  let results = {
    heads: heads,
    tails: tails,
  };
  fetch("/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(results),
  })
    .then((response) => response.text())
    .then((data) => console.log(data)) // Handle response from server
    .catch((error) => console.error(error));
}
