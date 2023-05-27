const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

/**
 * Initialize the Passport authentication middleware
 * @param {Object} passport - Passport instance
 * @param {Function} getUserByEmail - Function to get user by email
 * @param {Function} getUserById - Function to get user by ID
 */
function initialize(passport, getUserByEmail, getUserById) {
  /**
   * Authenticate users
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {Function} done - Callback function
   */
  const authenticateUsers = async (email, password, done) => {
    // Get user by email
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user found with that email" });
    }
    try {
      // Compare the provided password with the hashed password
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      console.log(e);
      return done(e);
    }
  };

  // Use the LocalStrategy for authentication
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUsers));

  // Serialize and deserialize user objects for session management
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
