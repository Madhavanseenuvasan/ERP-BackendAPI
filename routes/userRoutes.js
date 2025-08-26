const express = require('express');
const router = express.Router();
const {createUser, getUsers, getUserById, updateUser, deleteUser, register, login, logout, resetPassword, forgotPassword} = require('../controllers/userController')


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/resetpassword/:token').post(resetPassword);
router.route('/forgotpassword').post(forgotPassword);

router.route('/users').post(createUser);
router.route('/users').get(getUsers);
router.route('/users/:id').get(getUserById);
router.route('/users/:id').put(updateUser);
router.route('/users/:id').delete(deleteUser);

module.exports = router;

