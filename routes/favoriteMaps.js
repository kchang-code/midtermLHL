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
    const userId = req.user.id;
    const query = `INSERT INTO favorite_maps (user_id, map_id) VALUES ($1, $2) RETURNING *;`;
    const values = [userId, map_id];
    db.query(query, values)
      .then(data => {
        res.send('data added');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  return router;
};
