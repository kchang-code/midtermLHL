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
      pins (title,description,image,map_id,user_id,lat,lng)
      VALUES
      (
        '${req.body.title}',
        '${req.body.description}',
        '${req.body.image}',
        '${req.body.map_id}',
        '${req.body.user_id}',
        '${req.body.lat}',
        '${req.body.lng}'
      );`
    console.log(query);
    db.query(query)
      .then(data => {
        const pins = data.rows;
        console.log(pins);
        res.json({ pins });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //edit pin
  router.put("/edit", (req, res) => {
    let query = `
                update pins
                set title='${req.body.title}',
                description='${req.body.description}',
                image='${req.body.description}'
                where
                map_id='${req.body.map_id}'
                and user_id='${req.body.user_id}'
                and lat='${req.body.lat}'
                and lng='${req.body.lng}'
                `;
    console.log(req.body);
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

  //delete pin
  router.delete("/", (req, res) => {
    let query = `
    DELETE from pins
    where id in
    (
    select id
    from pins
    where
    map_id='${req.body.map_id}'
    and user_id='${req.body.user_id}'
    and lat='${req.body.lat}'
    and lng='${req.body.lng}'
    );`
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
