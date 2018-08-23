const express = require('express');

const artistRouter = express.Router();

artistRouter.route('/')
  .get((req, res) => {
    res.render('artistListView', {
      nav: [{ link: '/paintings', title: 'Paintings' },
        { link: '/artists', title: 'Artists' }],
      title: 'Artists List'
    });
  });

module.exports = artistRouter;

