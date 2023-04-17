async function handler(req, res) {
  const {queueName, queueHost} = req.params;

  const {Queues} = req.app.locals;
  if (queueName && queueHost) {
    const queue = await Queues.get(queueName, queueHost);
    if (!queue) return res.status(404).json({error: 'queue not found'});
    await pause(queue);
  } else {
    const queues = Queues.list();

    for (let queueData of queues) {
      const queue = await Queues.get(queueData.name, queueData.hostId);
      await pause(queue);
    }
  }

  return res.sendStatus(200);
}

async function pause(queue) {
  try {
    await queue.pause();
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
}

module.exports = handler;
