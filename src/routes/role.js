const express = require('express');
const Role = require('../controllers/role');
const router = express.Router();

router.post('/', Role.createRole);
router.get('/', Role.findAllRoles);
router.get('/:id', Role.findRoleById);
router.put('/:id', Role.updateRole);
router.delete('/:id', Role.deleteRole);

module.exports = router;
