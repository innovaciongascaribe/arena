const router = require('express').Router();

const jobAdd = require('./jobAdd');
const jobRetry = require('./jobRetry');
const jobPromote = require('./jobPromote');
const jobRemove = require('./jobRemove');
const bulkJobsRemove = require('./bulkJobsRemove');
const bulkJobsRetry = require('./bulkJobsRetry');

router.post('/queue/:queueHost/:queueName/job', jobAdd);
router.post('/queue/:queueHost/:queueName/job/bulk', bulkJobsRemove);
router.patch('/queue/:queueHost/:queueName/job/bulk', bulkJobsRetry);
router.patch('/queue/:queueHost/:queueName/job/:id', jobRetry);
router.put('/queue/:queueHost/:queueName/job/:id', jobPromote);
router.delete('/queue/:queueHost/:queueName/job/:id', jobRemove);

module.exports = router;
