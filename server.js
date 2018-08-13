const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

let toDos = [];
let remaining = 0;

app.use(express.static('public')); // get inline requests from public directory
app.set('view engine', 'ejs');

app.listen(8000, () => {
  console.log('Server started!');
  buildToDos();
});

app.route('/').get((req, res) => {
  res.render(__dirname + '/index',
    {
        toDos: toDos,
        remaining: remaining
    }
  );
});

function buildToDos(){
  fs.readFile('./ToDo.js', 'utf8', (err, data) => {
    if(err) {
      console.log(err);
      return;
    }
    let lines = data.split('\n');
    let done = false;
    for (var i = 0; i < lines.length; i++) {
      let line = lines[i].trim();
      if(line == '/* done:')
        done = true;
      if(line == '' || line.includes('/*'))
        continue;

      if(!done)
        remaining++;

      toDos.push({
        text: line,
        done: done,
      });
    }
    toDos = toDos.reverse();
    console.log('Todo list built');
  });
}
