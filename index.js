const express = require("express");
morgan = require("morgan");
(bodyParser = require("body-parser")), (uuid = require("uuid"));

const app = express();

let topMovies = [
  {
    title: "The Lives of Others",
    director: "Florian Henckel von Donnersmarck",
    genre: "Drama",
    yearReleased: "2006",
    description:
      "In the 1980s, a member of the Stasi secret police conducting surveillance on private citizens becomes captivated by the people he's spying on.",
  },
  {
    title: "Snatch",
    director: "Guy Ritchie",
    genre: "Comedy",
    yearReleased: "2000",
    description:
      "A tale involving a boxing promoter and how his life becomes entangled with a Russian gangster, petty criminals, and a diamond.",
  },
  {
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    genre: "Sci-fi",
    yearReleased: "1999",
    description:
      "Enter the Matrix. A computer programmer finds himself in a world that leaves him to question everything, but most importantly, what is the Matrix?",
  },
  {
    title: "Fight Club",
    director: "David Fincher",
    genre: "Action",
    yearReleased: "1999",
    description:
      "A commentary on consumerism, 'Fight Club', tells the story of how a man suffering from insomnia encounters a strange salesman and how the two form an underground fight club that changes their lives.",
  },
  {
    title: "Hot Fuzz",
    director: "Edgar Wright",
    genre: "Comedy",
    yearReleased: "2007",
    description:
      "A cop transfers to a sleepy England village from London in what begins as a quiet new role suddenly turns into an investigation of mysterious deaths.",
  },
  {
    title: "Casino Royale",
    director: "Martin Campbell",
    genre: "Action",
    yearReleased: "2006",
    description:
      "British MI6 agent, James Bond, gets invloved in a high stakes poker game. Based on Ian Fleming's 1953 novel.",
  },
  {
    title: "Cool Runnings",
    director: "Jon Turtelaub",
    genre: "Comedy",
    yearReleased: "1993",
    description:
      "Four Jamaican bobsleighers recieve the help of a disgraced former chamption to compete in the 1988 Calgary Winter Olympics.",
  },
  {
    title: "Good Will Hunting",
    director: "Gus Van Sant",
    genre: "Drama",
    yearReleased: "1997",
    description:
      "Will Hunting is a genius and troubled young man who works at a university as a janitor. After solving a difficult math problem, a professor attempts to guide Will to reach his potential, but after being arrested is required to attend therapy as part of a plea deal.",
  },
  {
    title: "Black Panther",
    director: "Ryan Coogler",
    genre: "Action",
    yearReleased: "2018",
    description:
      "T'Challa is the son of a king of an advanced and hidden African nation, Wakanda. After dealing with the death of his father, T'Challa must take on challenges that threaten Wakanda.",
  },
  {
    title: "Crouching Tiger, Hidden Dragon",
    direcor: "Ang Lee",
    genre: "Drama",
    yearReleased: "2000",
    description:
      "Crouching Tiger, Hidden Dragon tells the story of a young Chinese warrior who steals a sword from a famed swordsman and the ensuing chase that follows taking her to a world of adventure and unexpected romance.",
  },
];

// HTTP requests

// GET
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// GET
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movies = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

// GET requests from ex2.4
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Welcome to myFlix movie app!");
});

app.get("/movies", (req, res) => {
  res.json(topMovies);
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// listen for requests
app.listen(5501, () => {
  console.log("Your app is listening on port 5501.");
});
