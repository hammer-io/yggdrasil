import express from 'express';

const router = express.Router();

/**
 * @api {get} / API Home
 * @apiVersion 1.0.0
 * @apiName GetIndex
 * @apiGroup Index
 */
router.get('/', (req, res) => {
  res.send([{
    name: 'endor',
    version: 'v1.0.0',
    api_url: `http://${req.get('host')}/api/v1/`,
    documentation_url: `http://${req.get('host')}`
  }])
});

router.get('/v1', (req, res) => {
  res.send({
    name: 'endor',
    version: 'v1.0.0',
    documentation_url: `http://${req.get('host')}`,
    user_url: `http://${req.get('host')}/api/v1/user`,
    users_url: `http://${req.get('host')}/api/v1/users`,
    projects_url: `http://${req.get('host')}/api/v1/projects`
  });
});


module.exports = router;
