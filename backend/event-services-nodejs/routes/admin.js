const express = require('express');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();
const { getAllRegistrations } = require('../controllers/adminController');

router.get('/dashboard', authenticate, authorizeAdmin, (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});
router.get('/registrations', getAllRegistrations);
module.exports = router;