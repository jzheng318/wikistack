const express = require('express');
const router = express.Router();
const views = require('../views');

router.get('/', (req, res) => {
  res.redirect('/');
});

// router.post('/', (req, res, next) => {
//   // res.send('go to POST /wiki/');
// });

router.get('/add', (req, res, next) => {
  res.send(views.addPage());
});

const { Page } = require('../models');
const { addPage } = require('../views');

router.post('/', async (req, res, next) => {
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();

    console.log(page);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
