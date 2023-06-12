const express = require('express');
const router = express.Router();
const Refrigerator = require('../models/refrigerator');
const methodOverride = require("method-override");
const adminMiddleware = require('../middlewares/admin');

router.use(methodOverride("_method"));

// Read - Get all refrigerators
router.get('/', async (req, res, next) => {
  try {
    const refrigerators = await Refrigerator.find();
    res.render('refrigerators/index', { refrigerators, isAdmin: req.session.user && req.session.user.role.includes('admin') });
  } catch (error) {
    next(error);
  }
});

// Create - Render the create form
router.get('/new', adminMiddleware, (req, res) => {
  res.render('refrigerators/new', { isAdmin: true });
});

// Create - Save a new refrigerator
router.post('/', adminMiddleware, async (req, res, next) => {
  try {
    const { picture, title, price } = req.body;
    const refrigerator = new Refrigerator({ picture, title, price });
    await refrigerator.save();
    res.redirect('/refrigerators');
  } catch (error) {
    next(error);
  }
});

// Update - Render the edit form
router.get('/:id/edit', adminMiddleware, async (req, res, next) => {
  try {
    const refrigerator = await Refrigerator.findById(req.params.id);
    res.render('refrigerators/edit', { refrigerator, isAdmin: true });
  } catch (error) {
    next(error);
  }
});

// Update - Update a refrigerator
router.put('/:id', adminMiddleware, async (req, res, next) => {
  try {
    const { picture, title, price } = req.body;
    await Refrigerator.findByIdAndUpdate(req.params.id, { picture, title, price });
    res.redirect('/refrigerators');
  } catch (error) {
    next(error);
  }
});

// Delete - Delete a refrigerator
router.delete('/:id', adminMiddleware, async (req, res, next) => {
  try {
    await Refrigerator.findByIdAndDelete(req.params.id);
    res.redirect('/refrigerators');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
