const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
const cors = require("cors");
require("dotenv").config();

// middlewares
const jwtCheck = auth({
  audience: 'https://node-api/',
  issuerBaseURL: 'https://dev-e6s0ch7ttbtt1yrl.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = ["http://localhost:5173"];
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
  // Vous pouvez ajouter d'autres options ici si nécessaire
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(jwtCheck);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API." });
});

// Les routes d'accès aux APIs
require("./src/routes/user.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
