const axios = require('axios');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../database/dbConfig')
const key = require('../_secrets/keys')

const { authenticate } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


function generateToken(user){
  secret = key.jwtKey

  const payload = {
      username: user.username,
      department: user.department
  }

  const options = {
      expiresIn: '1h',   // 15 minutes
      jwtid: '12345'
  }

  return jwt.sign(payload, secret, options)
}

async function register(req, res, next) {
  // implement user registration
  const credentials = req.body

  if(!credentials.username || !credentials.password){
    res.status(400).json({error: "Please include a valid Username and Password"})
  }

  const hash = bcrypt.hashSync(credentials.password, 10)
  credentials.password = hash
  
  await db('users')
    .insert(credentials)
    .then(function(ids) {
      db('users')
        .where({ id: ids[0] })
        .first()
        .then(user => {
          const token = generateToken(user)
          res.status(201).json(token)
        })
    })
    .catch(next)

}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
