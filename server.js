const express = require('express');
const knex = require('knex');

const dbConnect = knex({
    client: 'sqlite3',
    connection: {
        filename: './data/budget.db3',
    },
    useNullAsDefault: true
})

const server = express();

// your code here
server.use(express.json());

server.get('/', (req, res) => {
    // use knex get the data from the database
    // select * from posts
    // dbConnection.select('*').from('posts')
    dbConnect('accounts')
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });

  server.get('/:id', (req, res) => {
    dbConnect('accounts')
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

  server.post('/', (req, res) => {
    // insert into posts () values ()
  
    const account = req.body;
  
    dbConnect('accounts')
      .insert(account, 'id')
      .then(arrayOfIds => {
        // arrayOfIds = [ id of the last record inserted ]
        const lastRecord = arrayOfIds[0];
  
        res.status(201).json(lastRecord);
      })
      .catch(error => res.status(500).json(error));
  });

  server.put('/:id', (req, res) => {
    dbConnect('accounts')
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

  server.delete('/:id', (req, res) => {
    // delete from posts where id = 14
    dbConnect('accounts')
      .where({ id: req.params.id })
      .del()
      .then(count => {
        res.status(200).json({ message: `${count} record(s) deleted` });
        // res.status(204).end();
      })
      .catch(error => res.status(500).json(error));
  });

module.exports = server;