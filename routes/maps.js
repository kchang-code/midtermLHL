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
    let query = `SELECT * FROM maps ORDER BY name;`;
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

  //read latest map
  router.get("/last", (req, res) => {
    let query = `select * from maps order by id desc limit 1;`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        console.log(maps);
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
        console.log(maps);
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //read contribution map
  router.get("/:id", (req, res) => {
    let query = `
                SELECT maps.name
                FROM maps
                Join
                WHERE maps.name ='${req.params.name}'`;
    console.log(query);
    db.query(query)
      .then(data => {
        const maps = data.rows;
        console.log(maps);
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
    console.log(req.body);
    console.log(query);
    db.query(query)
      .then(data => {
        // res.send('data created');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //edit maps
  router.put("/edit", (req, res) => {
    let query = `update maps set name='${req.body.name}', description='${req.body.description}' where id='${req.body.id}';`;
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


  // DELETE MAP
  router.delete("/:name", (req, res) => {
    let query = `DELETE FROM maps WHERE name = '${req.params.name}';`;
    console.log(res)
    console.log(req.body)
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
