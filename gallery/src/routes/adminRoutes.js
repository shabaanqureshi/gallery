const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const paintings = [
  {
    pid: 1,
    title: 'Mona Lisa',
    artist: 'Leonardo Da Vinci',
    image: '../images/howtobuildarealestateempire.jpg',
    description: 'awfewfwefwefw'
  },
  {
    pid: 2,
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    image: '../images/howtobuildarealestateempire.jpg',
    description: 'fawewfwfwefwf'
  },
  {
    pid: 3,
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    image: '../images/howtobuildarealestateempire.jpg',
    description: 'fwewfw'
  }];

function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'galleryApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('paintings').insertMany(paintings);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
