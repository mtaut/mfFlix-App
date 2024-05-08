const express = require("express");
bodyParser = require("body-parser");
uuid = require("uuid");

const morgan = require("morgan");
const nodemon = require("nodemon");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");
const { check, validationResult } = require("express-validator");

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;

mongoose.connect("mongodb://localhost:27017/cfDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require("cors");
let allowedOrigins = ["http://localhost:5501", "http://testsite.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        // If a specific origin isn't found on the list of allowed origins

        let message =
          "The CORS policy for this application doesn't allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

let auth = require("./auth")(app);

const passport = require("passport");
require("./passport");

/*let users = [
  {
    id: 1,
    username: "Sally",
    favoriteMovies: [],
  },
  {
    id: 2,
    username: "Bob",
    favoriteMovies: ["The Matrix"],
  },
];*/

/*let movies = [
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
      Bio: "Lana Wachowski and Lilly Wachowski are sisters, and were born in Chicago, Illinois. They have produced numerous notable films together. Lana Wachowski attended Bard college in New York state. Lilly attended Emerson College in Boston. They both currently live in Chicago.",
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
    Description:
      "In film and television, drama is a category or genre of narrative fiction intended to be more serious than humorous in tone.",

    Director: {
      Name: "Ang Lee",
      Bio: "Ang Lee is a Taiwanese filmmaker born in Chaozhou, Pingtung, Taiwan. His films are known for their emotional charge and exploration of repressed, hidden emotions. Lee was educated in Taiwan and later in the United States. Lee also lives in Westchester County, New York with his wife, Jane.",
      Birth: "1954",
    },
    ImageURL:
      "https://en.wikipedia.org/wiki/Crouching_Tiger,_Hidden_Dragon#/media/File:Crouching_Tiger,_Hidden_Dragon_(Chinese_poster).png",
    Featured: false,
  },
];*/

// HTTP requests

// CREATE, allow new users to register
app.post(
  "/users",
  // Validation logic here for request *****
  [
    check("Username", "Username is required").isLength({ min: 5 }),
    check(
      "Username",
      "Username contains non alphanumeric characters - not allowed."
    ).isAlphanumeric(),
    check("Password", "Password is required").not().isEmpty(),
    check("Email", "Email does not appear valid").isEmail(),
  ],
  async (req, res) => {
    // Check the validation object for errors  *****
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
      .then((user) => {
        if (user) {
          // If the user is found, send a response that it already exists
          return res.status(400).send(req.body.Username + "already exists");
        } else {
          Users.create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday,
          })
            .then((user) => {
              res.status(201).json(user);
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error: " + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Get all users
app.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.find()
      .then((users) => {
        res.status(201).json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// Get a user by username
app.get(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOne({ Username: req.params.Username })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// UPDATE allow users to update their info     Will also require validation code
app.put(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if (req.user.Username !== req.params.Username) {
      return res.status(400).send("Permission denied");
    }
    // CONDITION ENDS
    Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $set: {
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        },
      },
      { new: true }
    ) //makes sure that the update document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// CREATE Add a movie to a user's list of favorites
app.post(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $push: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    ) // this line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// DELETE remove a movie from user's list of favorites
app.delete(
  "/users/:Username/movies/:MovieID",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndUpdate(
      { Username: req.params.Username },
      {
        $pull: { FavoriteMovies: req.params.MovieID },
      },
      { new: true }
    ) // this line makes sure that the updated document is returned
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// DELETE allow user to deregister
app.delete(
  "/users/:Username",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Users.findOneAndDelete({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(404).send(req.params.Username + " was not found");
        } else {
          res.status(200).send(req.params.Username + " was deleted.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// READ will return full list of movies
app.get(
  "/movies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Movies.find()
      .then((movies) => {
        res.status(201).json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// READ get movie by title
app.get(
  "/movies/:Title",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Movies.findOne({ Title: req.params.Title })
      .then((movie) => {
        res.json(movie);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

// READ get data about a genre by name
app.get(
  "/movies/genres/:Genre",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await Movies.findOne({ "Genre.Name": req.params.Genre })
      .then((movie) => {
        res.status(200).json(movie.Genre.Description);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

// READ get info on director
app.get(
  "/movies/directors/:Director",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    Movies.findOne({ "Director.Name": req.params.Director })
      .then((movie) => {
        res.status(200).json(movie.Director);
      })
      .catch((err) => {
        res.status(500).send("Error: " + err);
      });
  }
);

// Default text response when at /
app.get("/", (req, res) => {
  res.send("Welcome to myFlix movie app!");
});

// listen for requests
const port = process.env.PORT || 5501;
app.listen(port, "0.0.0.0", () => {
  console.log("Listening on Port " + port);
});
