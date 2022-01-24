require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

app.use(cors());

app.get('/testytest', (req, res) => res.send('Hello World!'));

// Our Goodreads relay route!
app.get('/api/alltitles', async (req, res) => {
  try {
    axios({
      method: 'get',
      url: `https://movies-tvshows-data-imdb.p.rapidapi.com?type=${req.query.type}&title=${req.query.title}`,
      headers: {
        'x-rapidapi-key': 'a394fec0f6msh0eb3bb896bc76b3p13026cjsne014cc19422f',
        'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
      },
    }).then(function (response) {
      return res.json(response.data);
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

app.get('/api/singletitle', async (req, res) => {
  try {
    axios({
      method: 'get',
      url: `https://movies-tvshows-data-imdb.p.rapidapi.com/?type=${req.query.type}&imdb=${req.query.imdb}`,
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
      },
    }).then(function (response) {
      return res.json(response.data);
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});

app.listen(3001, () => console.log('Running on Port ' + 3001));
