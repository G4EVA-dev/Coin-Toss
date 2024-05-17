const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path"); //

const app = require('/home/glenndev/Documents/Coin-Toss/app');
const port = 3000;

// In-memory storage for game results (replace with a database or file system if needed)
let gameResults = []; // Array to store results

app.use(cookieParser()); // Middleware to parse cookies

app.use(bodyParser.json()); // This line parses JSON data in request bodies

// Route to receive game results
app.post("/results", (req, res) => {
  const gameResult = req.body; // Access game results from request body

  // Validate and process the game result (if needed)
  if (!gameResult || !gameResult.heads || !gameResult.tails) {
    return res.status(400).send("Invalid game result data");
  }

  // Store the game result
  gameResults.push(gameResult);
  console.log(`Game result stored: ${JSON.stringify(gameResult)}`);

  res.send("Game result received successfully!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
