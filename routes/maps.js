/*
 * All routes for maps are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //read all maps
  router.get("/", (req, res) => {
    let query = `SELECT * FROM maps`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //read single map
  router.get("/:name", (req, res) => {
    let query = `SELECT * FROM maps WHERE maps.name ='${req.params.name}'`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //add a map to the db
  router.post("/", (req, res) => {
    let query = `INSERT INTO maps (name,description) VALUES ('${req.body.name}','${req.body.description}');`;
    console.log(query);
    db.query(query)
      .then(data => {
        res.send('data created');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //add map to fav maps
  router.post('/favorites', (req, res) => {
    const userId = req.user.name;
    const query = `INSERT INTO favorite_maps (user_id, map_id) VALUES ($1, $2) RETURNING *;`;
    const values = [userId, map_id];
    db.query(query, values)
      .then(data => {
        res.json({data});
      })
      .catch(err => {
        res.send(err);
      });
  });


  return router;
};
