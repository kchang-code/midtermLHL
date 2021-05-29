/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { user } = require('pg/lib/defaults');
const router = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {
    console.log(req.body);
    let query = `SELECT * FROM users WHERE users.name='${req.body.name}'`;
    console.log(query);
    db.query(query)
      .then(data => {
        const users = data.rows[0];
        //res.json({ users });
        res.cookie('name', users.name);
        res.send('Cookie Set');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
