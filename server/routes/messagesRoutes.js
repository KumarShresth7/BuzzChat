const express = require('express');
const { getMessages, postMessage } = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',authMiddleware, getMessages);
router.post('/',authMiddleware, postMessage);

module.exports = router;
