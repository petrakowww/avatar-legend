const express = require('express'); //Сделано
const router = express.Router();

const { allowedRoles, checkSession } = require("../middlewares/validateSession");

const { controllerRegisterUser,
    controllerAuthenticationUser,
    controllerLogoutUser,
    controllerAuthenticationAdmin } = require('../controllers/authController');

const validateRegistration = require('../middlewares/validateRegistration');
const { validateAuth, validateAdminAuth } = require('../middlewares/validateAdminAuthentication');

router.get('/', allowedRoles('observer'), (req, res) => {
    res.render('authenticationView');
});

router.post('/register', allowedRoles(['observer']), validateRegistration, controllerRegisterUser);
router.post('/login', allowedRoles(['observer']), validateAuth, controllerAuthenticationUser);
router.post('/admin', allowedRoles(['observer']), validateAdminAuth, controllerAuthenticationAdmin);
router.get('/logout', allowedRoles(['user', 'admin']), controllerLogoutUser);

module.exports = router;
