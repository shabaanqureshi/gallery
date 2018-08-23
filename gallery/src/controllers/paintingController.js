const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:paintingController');

function paintingController(nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'galleryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('paintings');

        const paintings = await col.find().toArray();

        res.render(
          'paintingListView',
          {
            nav,
            title: 'Paintings',
            paintings
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'galleryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('paintings');

        const painting = await col.findOne({ _id: new ObjectID(id) });
        debug(painting);
        res.render(
          'paintingView',
          {
            nav,
            title: 'Painting',
            painting
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }
  return {
    getIndex,
    getById
  };
}

module.exports = paintingController;
