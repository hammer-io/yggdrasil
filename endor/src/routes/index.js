import express from 'express';

const router = express.Router();

/**
 * @api {get} / API Home
 * @apiVersion 1.0.0
 * @apiName GetIndex
 * @apiGroup Index
 */
router.get('/', (req, res) => {
  res.send('Hello, World');
});

module.exports = router;
