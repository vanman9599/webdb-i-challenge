const express = require('express');
const knex = require('knex'); // 01 - install this npm package and sqlite3

// database access using knex
// const db = require('../data/db-config.js');

// 02 - configure the connection
const db = knex({
  client: 'sqlite3', // install this npm package as well
  connection: {
    filename: './data/budget.db3',
  },
  useNullAsDefault: true,
});

const router = express.Router();

// 03 - complete the endpoint
router.get('/', (req, res) => {
  // use knex get the data from the database
  // select * from posts
  // dbConnection.select('*').from('posts')
  db('accounts')
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .first()
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => res.status(500).json(error));
});

router.post('/', (req, res) => {
  // insert into posts () values ()

  const account = req.body;

  db('accounts')
    .insert(account, 'id')
    .then(arrayOfIds => {
      // arrayOfIds = [ id of the last record inserted ]
      const lastRecord = arrayOfIds[0];

      res.status(201).json(lastRecord);
    })
    .catch(error => res.status(500).json(error));
});

router.put('/:id', (req, res) => {
  db('accounts')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `${count} record(s) updated` });
      } else {
        res.status(404).json({ message: 'not found' });
      }
    })
    .catch(error => res.status(500).json(error));
});

router.delete('/:id', (req, res) => {
  // delete from posts where id = 14
  db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted` });
      // res.status(204).end();
    })
    .catch(error => res.status(500).json(error));
});

module.exports = router;
