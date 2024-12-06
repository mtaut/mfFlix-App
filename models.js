// Import the required dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * Schema definition for the 'Movie' collection in MongoDB.
 *
 * This schema defines the structure of documents within the collection,
 * including the fields, their data types, and constraints.
 */
let movieSchema = mongoose.Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Genre: {
    Name: String,
    Description: String,
  },
  Director: {
    Name: String,
    Bio: String,
  },
  Actors: [String],
  ImagePath: String,
  Featured: Boolean,
});

// Requirements for user to register a profile
let userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Birthday: Date,
  FavoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.statics.hashPassword = (password) => {
  // Hashes a given password for secure storage
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  // Validates a given password against the stored hashed password
  return bcrypt.compareSync(password, this.Password);
};

// Create models from schema
let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

// Export models for use in other part of application
module.exports.Movie = Movie;
module.exports.User = User;
