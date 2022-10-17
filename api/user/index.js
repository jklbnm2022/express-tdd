const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');

router.get('/', ctrl.getUsers);
router.get('/:id', ctrl.getUser);
router.delete('/:id', ctrl.deleteUser);
router.post('/', ctrl.postUser);
router.put('/:id', ctrl.putUser);

module.exports = router;