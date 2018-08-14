const express = require('express');
const path = require('path');
const fs = require('fs');
const articles = require('./content/articles.js').articles; // todo: fix temporary abstraction with mongo
const toDos = require('./ToDo.js');

const app = express();

app.use(express.static('public')); // get inline requests from public directory
app.set('view engine', 'ejs');

app.listen(80, () => {
  console.log('Server started!');
});

app.route('/').get((req, res) => {
  res.render(__dirname + '/index',
    {
        toDos: toDos,
        articles: articles
    }
  );
});
