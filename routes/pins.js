/*
 * All routes for pins are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();


module.exports = (db) => {
  //read all pins
  router.get("/", (req, res) => {
    let query = `SELECT * FROM pins`;
    console.log(query);
    db.query(query)
      .then(data => {
        const pins = data.rows;
        res.json({ pins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //read single pin
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM pins WHERE map_id ='${req.params.id}'`;
    console.log(query);
    db.query(query)
      .then(data => {
        const pins = data.rows;
        res.json({ pins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //add a pin to the db
  router.post("/", (req, res) => {
    let query = `
      INSERT INTO
      pins (title,description,image,map_id,user_id,latitude,longitude)
      VALUES
      (
        '${req.body.title}',
        '${req.body.description}',
        '${req.body.image}',
        '${req.body.map_id}',
        '${req.body.user_id}',
        '${req.body.latitude}',
        '${req.body.longitude}'
      )`;
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

  //edit pin

  //delete pin
  router.delete("/:title", (req, res) => {
    let query = `DELETE from pins where pins.title='${req.params.title}';`
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
  return router;
};
