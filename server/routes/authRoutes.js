const express = require('express');
const {registerUser,loginUser,getAuthUser} = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',authMiddleware,getAuthUser);

module.exports = router;