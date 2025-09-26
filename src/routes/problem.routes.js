const router = require('express').Router();
const pc = require('../controllers/problem.controller');

router.post('/', pc.createProblem);
router.get('/', pc.getProblems);
router.get('/:id', pc.getProblem);
router.patch('/:id', pc.updateProblem);
router.delete('/:id', pc.deleteProblem);

module.exports = router;
