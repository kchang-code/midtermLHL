/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //add map to fav maps
  router.post('/', (req, res) => {
    const userId = req.body.user_id;
    const mapId = req.body.map_id;
    const query = `INSERT INTO favourite_maps (user_id, map_id) VALUES ('${userId}', '${mapId}');`;
    //const values = [userId, map_id];
    db.query(query)
      .then(data => {
        console.log('data added');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //delete fav map
  router.delete("/", (req, res) => {
    const userId = req.body.user_id;
    const mapId = req.body.map_id;
    let query = `DELETE FROM favourite_maps WHERE map_id = '${mapId}' and user_id='${userId}';`;
    console.log(query);
    db.query(query)
    .then(data => {
      res.send('data deleted');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;

};
