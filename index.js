const express = require("express");
const app = express();

let topMovies = [
  {
    title: "The Lives of Others",
    director: "Florian Henckel von Donnersmarck",
  },
  {
    title: "Snatch",
    director: "Guy Ritchie",
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
  },
  {
    title: "Fight Club",
    director: "David Fincher",
  },
  {
    title: "Hot Fuzz",
    director: "Edgar Wright",
  },
  {
    title: "Casino Royale",
    director: "Martin Campbell",
  },
  {
    title: "Cool Runnings",
    director: "Jon Turtelaub",
  },
  {
    title: "Good Will Hunting",
    director: "Gus Van Sant",
  },
  {
    title: "Black Panther",
    director: "Ryan Coogler",
  },
  {
    title: "Grand Budapest Hotel",
    direcor: "Wes Anderson",
  },
];

// GET requests
app.get("/", (req, res) => {
  res.send("Welcome to myFlix movie app!");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use(express.static("public"));

// listen for requests
app.listen(5501, () => {
  console.log("Your app is listening on port 5501.");
});
