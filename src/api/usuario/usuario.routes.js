'use strict';

const express = require('express');
const router = express.Router();

const api = require('./usuario.api');

router.route('/usuarios')
	.get(api.query)
	.post(api.create);

router.param('usuarioId', api.load);
router.route('/usuarios/:usuarioId')
	.get(api.get)
	.post(api.update)
	.delete(api.remove);

module.exports = router;
