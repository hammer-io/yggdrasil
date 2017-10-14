import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Yggdrasil');
});

module.exports = router;
