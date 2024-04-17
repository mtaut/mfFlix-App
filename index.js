const express = require("express");
morgan = require("morgan");
(bodyParser = require("body-parser")), (uuid = require("uuid"));

const app = express();

let topMovies = [
  {
    title: "The Lives of Others",
    yearReleased: "2006",
    description:
      "In the 1980s, a member of the Stasi secret police conducting surveillance on private citizens becomes captivated by the people he's spying on.",
    genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",
    },
    director: {
      Name: "Florian Henckel von Donnersmarck",
      Bio: "Florian Maria Georg Christian Graf Henckel von Donnersmarck is a German film director. He was born in Cologne, Germany into an aritocratic Roman Catholic family. He grew up New York City, Brussels, Frankfurt, and West Berlin. Donnersmarck is fluent in English, German, French, Russian, and Italian. He currently lives in Los Angeles with his wife, Christiane Asschenfeldt, and their three children.",
      Birth: "1973",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/The_Lives_of_Others#/media/File:Leben_der_anderen.jpg",
    featured: false,
  },
  {
    title: "Snatch",
    yearReleased: "2000",
    description:
      "Snatch tells the story of a boxing promoter and how his life becomes entangled with a Russian gangster, petty criminals, and a diamond.",
    genre: {
      Name: "Comedy",
      Description:
        "In film and television, comedy is a genre that emphasizes humor. This type of film and television is designed to amuse audiences and make them laugh.",
    },
    director: {
      Name: "Guy Ritchie",
      Bio: "Guy Stuart Ritchie is an English film director, producer, and screenwriter. He is known for his British gangster films and Sherlock Holmes films starring Robert Downey Jr. Ritchie was born in Hatfield, Hertfordshire, England. He left school at the age of 15 to work in entry-level jobs in the film industry before going on to direct TV commercials. He currently lives in Wiltshire, England.",
      Birth: "1968",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Snatch_(film)#/media/File:Snatch_ver4.jpg",
    featured: false,
  },
  {
    title: "The Matrix",
    yearReleased: "1999",
    description:
      "Enter the Matrix. A computer programmer finds himself in a world that leaves him to question everything, but most importantly, what is the Matrix?",
    genre: {
      Name: "Sci-fi",
      Description:
        "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream media.",
    },
    director: {
      Names: "Lana Wachowski, Lilly Wachowski",
      Bio: "Lana Wachowski (born Larry Wachowski) and Lilly Wachowski (born Andy Wachowski) are sisters, and were born in Chicago, Illinois. They have produced numerous notable films together. Lana Wachowski attended Bard college in New York state. Lilly attended Emerson College in Boston. They both currently live in Chicago.",
      Birth: "Lana: 1965 Lilly: 1967",
    },
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    featured: false,
  },
  {
    title: "Fight Club",
    yearReleased: "1999",
    description:
      "A commentary on consumerism, 'Fight Club', tells the story of an unnamed man who, suffering from insomnia, meets a strange salesman and how the two form an underground fight club that serves as a form of therapy.",
    genre: {
      Name: "Action",
      Description:
        "Action is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
    },
    director: {
      Name: "David Fincher",
      Bio: "David Andrew Leo Fincher is an American film director and writer. Most of Fincher's films are psychological thrillers and have collectively grossed over $2.1 billion worldwide. Fincher was born in Denver, Colorado and has one child.",
      Birth: "1962",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Fight_Club#/media/File:Fight_Club_poster.jpg",
    featured: false,
  },
  {
    title: "Hot Fuzz",
    yearReleased: "2007",
    description:
      "A cop transfers to a sleepy England village from London, in what begins as a quiet new role suddenly turns into an investigation of mysterious deaths.",
    genre: {
      Name: "Comedy",
      Description:
        "In film and television, comedy is a genre that emphasizes humor. This type of film and television is designed to amuse audiences and make them laugh.",
    },
    director: {
      Name: "Edgar Wright",
      Bio: "Edgar Howard Wright is an English filmmaker and actor. He was born in Poole, England. Wright is known for fast-paced and kinetic, satirical films. He currently lives in London.",
      Birth: "1974",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Hot_Fuzz#/media/File:HotFuzzUKposter.jpg",
    featured: false,
  },
  {
    title: "Casino Royale",
    yearReleased: "2006",
    description:
      "British MI6 agent, James Bond, gets invloved in a high stakes poker game. Based on Ian Fleming's 1953 novel.",
    genre: {
      Name: "Action",
      Description:
        "Action is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
    },
    director: {
      Name: "Martin Campbell",
      Bio: "Martin Campbell is a New Zealand film and television director. Campbell was born in Hastings, New Zealand and currently based in the United Kingdom. He is known for directing two Zorro films, as well as the James Bond films Goldeneye and Casino Royale, featuring Daniel Craig.",
      Birth: "1943",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Casino_Royale_(2006_film)#/media/File:Casino_Royale_2_-_UK_cinema_poster.jpg",
    featured: false,
  },
  {
    title: "Cool Runnings",
    yearReleased: "1993",
    description:
      "Four Jamaican bobsleighers recieve the help of a disgraced former chamption to compete in the 1988 Calgary Winter Olympics.",
    genre: {
      Name: "Comedy",
      Description:
        "In film and television, comedy is a genre that emphasizes humor. This type of film and television is designed to amuse audiences and make them laugh.",
    },
    director: {
      Name: "Jon Turtelaub",
      Bio: "Jonathan Charles Turteltaub is an American film director and producer. Turteltaub was born in New York City and graduated from Wesleyan University and the USC School of the Cinematic Arts. Turteltaub has directed multiple successful Disney films. He lives in Malibu, California with his family.",
      Birth: "1963",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Cool_Runnings#/media/File:Coolrunnings.jpg",
    featured: false,
  },
  {
    title: "Good Will Hunting",
    yearReleased: "1997",
    description:
      "Will Hunting is a genius and troubled young man who works at a university as a janitor. After solving a difficult math problem, a professor attempts to guide Will to reach his potential, but after being arrested is required to attend therapy as part of a plea deal.",
    genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",
    },
    director: {
      Name: "Gus Van Sant",
      Bio: "Gus Geen Van Sant Jr. is an American film director, producer, photographer, and musician. Van Sant has earned numerous acclaim as an independent filmmaker and produces films that typically deal with themes of marginalized subcultures, in particular homosexuality. Van Sant was born in Louisville, Kentucky and currently lives in Los Angeles, California.",
      Birth: "1952",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Good_Will_Hunting#/media/File:Good_Will_Hunting.png",
    featured: false,
  },
  {
    title: "Black Panther",
    yearReleased: "2018",
    description:
      "T'Challa is the son of a king of an advanced and hidden African nation, Wakanda. After dealing with the death of his father, T'Challa must take on challenges that threaten Wakanda.",
    genre: {
      Name: "Action",
      Description:
        "Action is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
    },
    director: {
      Name: "Ryan Coogler",
      Bio: "Ryan Kyle Coogler is an American filmmaker born in Oakland, California. Coogler's work has received widespread acclaim and commercial success and has been hailed by critics for centering on often overlooked cultures and characters, most notably African Americans. He currently resides in Oakland, California.",
      Birth: "1986",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Black_Panther_(film)#/media/File:Black_Panther_(film)_poster.jpg",
    featured: false,
  },
  {
    title: "Crouching Tiger, Hidden Dragon",
    yearReleased: "2000",
    description:
      "Crouching Tiger, Hidden Dragon tells the story of a young Chinese warrior who steals a sword from a famed swordsman and the ensuing chase that follows taking her to a world of adventure and unexpected romance.",
    genre: "Drama",

    director: {
      Name: "Ang Lee",
      Bio: "Ang Lee is a Taiwanese filmmaker born in Chaozhou, Pingtung, Taiwan. His films are known for their emotional charge and exploration of repressed, hidden emotions. Lee was educated in Taiwan and later in the United States. Lee also lives in Westchester County, New York with his wife, Jane.",
      Birth: "1954",
    },
    imageUrl:
      "https://en.wikipedia.org/wiki/Crouching_Tiger,_Hidden_Dragon#/media/File:Crouching_Tiger,_Hidden_Dragon_(Chinese_poster).png",
    featured: false,
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
