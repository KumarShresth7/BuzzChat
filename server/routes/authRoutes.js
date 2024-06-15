const express = require('express');
const {registerUser,loginUser,getAuthUser,getUsers} = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/me',authMiddleware,getAuthUser);
router.get('/users',authMiddleware,getUsers);

module.exports = router;