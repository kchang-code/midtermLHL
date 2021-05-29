/*
 * All routes for login are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) => {
  router.get("/:name", (req, res) => {
    console.log(req.params.name);
    let query = `SELECT * FROM users WHERE users.name='${req.params.name}';`;
    console.log(query);
    db.query(query)
      .then(data => {
        const users = data.rows[0];
        //res.json({ users });
        res.cookie('name', users.name);
        res.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
