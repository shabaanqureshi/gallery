const express = require('express');
const paintingController = require('../controllers/paintingController')

const paintingRouter = express.Router();

function router(nav) {
  const { getIndex, getById } = paintingController(nav);
  paintingRouter.use((req, res, next) => {
    if (req.user) {
    next();
     } else {
    res.redirect('/');
    }
  });
  paintingRouter.route('/')
    .get(getIndex);

  paintingRouter.route('/:id')
    .get(getById);
  return paintingRouter;
}


module.exports = router;
