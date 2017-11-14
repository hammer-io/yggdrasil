import express from 'express';

const router = express.Router();

/**
 * @api {get} / API Home
 * @apiVersion 1.0.0
 * @apiName GetIndex
 * @apiGroup Index
 */
router.get('/', (req, res) => {
  res.send({
    name: 'endor',
    version: 'v1.0.0',
    documentation_url: req.get('host'),
    users_url: `${req.get('host')}/users`,
    projects_url: `${req.get('host')}/projects`
  });
});

module.exports = router;
