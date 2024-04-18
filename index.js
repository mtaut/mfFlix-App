const express = require("express"),
  morgan = require("morgan"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

app.use = bodyParser.json();

let users = [
  {
    id: 1,
    name: "Sally",
    favoriteMovies: [],
  },
  {
    id: 2,
    name: "Bob",
    favoriteMovies: ["The Matrix"],
  },
];

let movies = [
  {
    Title: "The Lives of Others",
    Year: "2006",
    Description:
      "In the 1980s, a member of the Stasi secret police conducting surveillance on private citizens becomes captivated by the people he's spying on.",
    Genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",
    },
    Director: {
      Name: "Florian Henckel von Donnersmarck",
      Bio: "Florian Maria Georg Christian Graf Henckel von Donnersmarck is a German film director. He was born in Cologne, Germany into an aritocratic Roman Catholic family. He grew up New York City, Brussels, Frankfurt, and West Berlin. Donnersmarck is fluent in English, German, French, Russian, and Italian. He currently lives in Los Angeles with his wife, Christiane Asschenfeldt, and their three children.",
      Birth: "1973",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/The_Lives_of_Others#/media/File:Leben_der_anderen.jpg",
    Featured: false,
  },
  {
    Title: "Snatch",
    Year: "2000",
    Description:
      "Snatch tells the story of a boxing promoter and how his life becomes entangled with a Russian gangster, petty criminals, and a diamond.",
    Genre: {
      Name: "Comedy",
      Description:
        "In film and television, comedy is a genre that emphasizes humor. This type of film and television is designed to amuse audiences and make them laugh.",
    },
    Director: {
      Name: "Guy Ritchie",
      Bio: "Guy Stuart Ritchie is an English film director, producer, and screenwriter. He is known for his British gangster films and Sherlock Holmes films starring Robert Downey Jr. Ritchie was born in Hatfield, Hertfordshire, England. He left school at the age of 15 to work in entry-level jobs in the film industry before going on to direct TV commercials. He currently lives in Wiltshire, England.",
      Birth: "1968",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Snatch_(film)#/media/File:Snatch_ver4.jpg",
    Featured: false,
  },
  {
    Title: "The Matrix",
    Year: "1999",
    Description:
      "Enter the Matrix. A computer programmer finds himself in a world that leaves him to question everything, but most importantly, what is the Matrix?",
    Genre: {
      Name: "Sci-fi",
      Description:
        "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream media.",
    },
    Director: {
      Name: "Lana Wachowski, Lilly Wachowski",
      Bio: "Lana Wachowski (born Larry Wachowski) and Lilly Wachowski (born Andy Wachowski) are sisters, and were born in Chicago, Illinois. They have produced numerous notable films together. Lana Wachowski attended Bard college in New York state. Lilly attended Emerson College in Boston. They both currently live in Chicago.",
      Birth: "Lana: 1965 Lilly: 1967",
    },
    ImageURL:
      "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
    Featured: false,
  },
  {
    Title: "Fight Club",
    Year: "1999",
    Description:
      "A commentary on consumerism, 'Fight Club', tells the story of an unnamed man who, suffering from insomnia, meets a strange salesman and how the two form an underground fight club that serves as a form of therapy.",
    Genre: {
      Name: "Action",
      Description:
        "Action is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
    },
    Director: {
      Name: "David Fincher",
      Bio: "David Andrew Leo Fincher is an American film director and writer. Most of Fincher's films are psychological thrillers and have collectively grossed over $2.1 billion worldwide. Fincher was born in Denver, Colorado and has one child.",
      Birth: "1962",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Fight_Club#/media/File:Fight_Club_poster.jpg",
    Featured: false,
  },
  {
    Title: "Hot Fuzz",
    Year: "2007",
    Description:
      "A cop transfers to a sleepy England village from London, in what begins as a quiet new role suddenly turns into an investigation of mysterious deaths.",
    Genre: {
      Name: "Comedy",
      Description:
        "In film and television, comedy is a genre that emphasizes humor. This type of film and television is designed to amuse audiences and make them laugh.",
    },
    Director: {
      Name: "Edgar Wright",
      Bio: "Edgar Howard Wright is an English filmmaker and actor. He was born in Poole, England. Wright is known for fast-paced and kinetic, satirical films. He currently lives in London.",
      Birth: "1974",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Hot_Fuzz#/media/File:HotFuzzUKposter.jpg",
    Featured: false,
  },
  {
    Title: "Casino Royale",
    Year: "2006",
    Description:
      "British MI6 agent, James Bond, gets invloved in a high stakes poker game. Based on Ian Fleming's 1953 novel.",
    Genre: {
      Name: "Action",
      Description:
        "Action is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
    },
    Director: {
      Name: "Martin Campbell",
      Bio: "Martin Campbell is a New Zealand film and television director. Campbell was born in Hastings, New Zealand and currently based in the United Kingdom. He is known for directing two Zorro films, as well as the James Bond films Goldeneye and Casino Royale, featuring Daniel Craig.",
      Birth: "1943",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Casino_Royale_(2006_film)#/media/File:Casino_Royale_2_-_UK_cinema_poster.jpg",
    Featured: false,
  },
  {
    Title: "Cool Runnings",
    Year: "1993",
    Description:
      "Four Jamaican bobsleighers recieve the help of a disgraced former chamption to compete in the 1988 Calgary Winter Olympics.",
    Genre: {
      Name: "Comedy",
      Description:
        "In film and television, comedy is a genre that emphasizes humor. This type of film and television is designed to amuse audiences and make them laugh.",
    },
    Director: {
      Name: "Jon Turtelaub",
      Bio: "Jonathan Charles Turteltaub is an American film director and producer. Turteltaub was born in New York City and graduated from Wesleyan University and the USC School of the Cinematic Arts. Turteltaub has directed multiple successful Disney films. He lives in Malibu, California with his family.",
      Birth: "1963",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Cool_Runnings#/media/File:Coolrunnings.jpg",
    Featured: false,
  },
  {
    Title: "Good Will Hunting",
    Year: "1997",
    Description:
      "Will Hunting is a genius and troubled young man who works at a university as a janitor. After solving a difficult math problem, a professor attempts to guide Will to reach his potential, but after being arrested is required to attend therapy as part of a plea deal.",
    Genre: {
      Name: "Drama",
      Description:
        "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",
    },
    Director: {
      Name: "Gus Van Sant",
      Bio: "Gus Geen Van Sant Jr. is an American film director, producer, photographer, and musician. Van Sant has earned numerous acclaim as an independent filmmaker and produces films that typically deal with themes of marginalized subcultures, in particular homosexuality. Van Sant was born in Louisville, Kentucky and currently lives in Los Angeles, California.",
      Birth: "1952",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Good_Will_Hunting#/media/File:Good_Will_Hunting.png",
    Featured: false,
  },
  {
    Title: "Black Panther",
    Year: "2018",
    Description:
      "T'Challa is the son of a king of an advanced and hidden African nation, Wakanda. After dealing with the death of his father, T'Challa must take on challenges that threaten Wakanda.",
    Genre: {
      Name: "Action",
      Description:
        "Action is a film genre that predominantly features chase sequences, fights, shootouts, explosions, and stunt work.",
    },
    Director: {
      Name: "Ryan Coogler",
      Bio: "Ryan Kyle Coogler is an American filmmaker born in Oakland, California. Coogler's work has received widespread acclaim and commercial success and has been hailed by critics for centering on often overlooked cultures and characters, most notably African Americans. He currently resides in Oakland, California.",
      Birth: "1986",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Black_Panther_(film)#/media/File:Black_Panther_(film)_poster.jpg",
    Featured: false,
  },
  {
    Title: "Crouching Tiger, Hidden Dragon",
    Year: "2000",
    Description:
      "Crouching Tiger, Hidden Dragon tells the story of a young Chinese warrior who steals a sword from a famed swordsman and the ensuing chase that follows taking her to a world of adventure and unexpected romance.",
    Genre: "Drama",

    Director: {
      Name: "Ang Lee",
      Bio: "Ang Lee is a Taiwanese filmmaker born in Chaozhou, Pingtung, Taiwan. His films are known for their emotional charge and exploration of repressed, hidden emotions. Lee was educated in Taiwan and later in the United States. Lee also lives in Westchester County, New York with his wife, Jane.",
      Birth: "1954",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Crouching_Tiger,_Hidden_Dragon#/media/File:Crouching_Tiger,_Hidden_Dragon_(Chinese_poster).png",
    Featured: false,
  },
];

// HTTP requests

// CREATE
app.post("/users", (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(400).send("users need names");
  }
});

// UPDATE
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send("no such user");
  }
});

// CREATE
app.post("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

// DELETE
app.delete("/users/:id/:movieTitle", (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(
      (title) => title !== movieTitle
    );
    res
      .status(200)
      .send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send("no such user");
  }
});

// DELETE
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let user = users.find((user) => user.id == id);

  if (user) {
    users = users.filter((user) => user.id != id);
    res.status(200).send(`user ${id} has been deleted`);
  } else {
    res.status(400).send("no such user");
  }
});

// READ
app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

// READ
app.get("/movies/:title", (req, res) => {
  const { title } = req.params;
  const movie = movies.find((movie) => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("no such movie");
  }
});

// READ
app.get("/movies/genre/:genreName", (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find((movie) => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("no such genre");
  }
});

// READ
app.get("/movies/directors/:directorName", (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(
    (movie) => movie.Director.Name === directorName
  ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("no such director");
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to myFlix movie app!");
});

// listen for requests
app.listen(5501, () => {
  console.log("Your app is listening on port 5501.");
});
