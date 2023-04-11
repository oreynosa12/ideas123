const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// TODO: Implement logic to read notes from file and send them back as response
app.get('/api/notes', (req, res) => { 
    const tipId = req.params.tip_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((tip) => tip.tip_id === tipId);
        return result.length > 0
          ? res.json(result)
          : res.json('No tip with that ID');
      });
  
});



app.post('/api/notes', (req, res) => {
  // TODO: Implement logic to save a new note to file
  const newNote = req.body;
});

writeToFile('./db/db.json', newNote)

app.delete('/api/notes/:id', (req, res) => {
  // TODO: Implement logic to delete a note from file based on ID
  
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
