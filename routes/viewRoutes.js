const express = require('express');
const viewController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewController.getOverView);

router.get('/tour/:slug', authController.isLoggedIn, viewController.getTour);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);

module.exports = router;
