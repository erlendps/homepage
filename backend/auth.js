const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];
    
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");
    req.user = decodedToken;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({error: new Error("Invalid request")});
  }
}