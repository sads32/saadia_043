const express = require('express');
const router = express.Router();
const Microwave = require('../models/microwave');
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const adminMiddleware = require('../middlewares/admin');

// Read - Get all microwaves
router.get('/', async (req, res, next) => {
  try {
    const allMicrowaves = await Microwave.find();
    res.render('microwave/index', { microwaves: allMicrowaves, isAdmin: req.session.user && req.session.user.role.includes('admin') });
  } catch (error) {
    next(error);
  }
});

// Create - Render the create form
router.get('/new',adminMiddleware, (req, res) => {
  res.render('microwave/new');
});

// Create - Save a new microwave
router.post('/', adminMiddleware,async (req, res, next) => {
  try {
    const { picture, title, price } = req.body;
    const newMicrowave = new Microwave({ picture, title, price });
    await newMicrowave.save();
    res.redirect('/microwaves');
  } catch (error) {
    next(error);
  }
});

// Update - Render the edit form
router.get('/:id/edit', adminMiddleware,async (req, res, next) => {
  try {
    const microwave = await Microwave.findById(req.params.id);
    res.render('microwave/edit', { microwave });
  } catch (error) {
    next(error);
  }
});

// Update - Update a microwave
router.put('/:id',adminMiddleware, async (req, res, next) => {
  try {
    const { picture, title, price } = req.body;
    await Microwave.findByIdAndUpdate(req.params.id, { picture, title, price });
    res.redirect('/microwaves');
  } catch (error) {
    next(error);
  }
});

// Delete - Delete a microwave
router.delete('/:id',adminMiddleware, async (req, res, next) => {
  try {
    await Microwave.findByIdAndDelete(req.params.id);
    res.redirect('/microwaves');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
