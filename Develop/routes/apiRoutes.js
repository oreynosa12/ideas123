const router = require('express').Router();
const store = require ('../db/store')



router.post("/api/notes", (req, res) => {
    store
    .addNote(req.body)
    .then(note =>{
        res.json(note)
    })
   .catch(err =>{
    res.status(500).json(err)
   })
  });
  
  router.delete("/api/notes/:id", (req, res) => {
    // TODO: Implement logic to delete a note from file based on ID
  });

  // TODO: Implement logic to read notes from file and send them back as response
router.get("/api/notes", (req, res) => {
    const tipId = req.params.tip_id;
    readFromFile("./db/db.json")
      .then((data) => JSON.parse(data))
      .then((json) => {
        console.log(json);
        const result = json.filter((tip) => tip.tip_id === tipId);
        return result.length > 0
          ? res.json(result)
          : res.json("No tip with that ID");
      });
  });

  module.exports = router;