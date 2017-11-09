import express from 'express';

const router = express.Router();

/**
 * @api {get} / API Home
 * @apiVersion 0.1.0
 * @apiName GetIndex
 * @apiGroup Index
 */
router.get('/', (req, res) => {
  res.send('Hello, World');
});

module.exports = router;
