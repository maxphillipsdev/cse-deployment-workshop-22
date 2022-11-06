import { Router } from 'express';
import { client } from '../db.js';

const router = Router();
const db = client.db('sus');
const statsCollections = db.collection('stats');

function seedStats() {
  if (statsCollections.countDocuments() === 0) {
    statsCollections.insertMany([
      {
        crewmate: 'Red',
      },
      {
        crewmate: 'Blue',
      },
      {
        crewmate: 'Green',
      },
    ]);
  }
}

seedStats();

router.get('/results', async (req, res) => {
  const stats = await statsCollections.find().toArray();
  res.json(stats);
});

router.post('/vote', async (req, res) => {
  const { crewmate } = req.body;
  const stats = await statsCollections.findOne({ crewmate });

  if (!stats || !crewmate)
    return res.status(404).json({ error: 'No crewmate provided.' });

  if (stats) {
    await statsCollections.updateOne({ crewmate }, { $inc: { votes: 1 } });
  } else {
    await statsCollections.insertOne({ crewmate, votes: 1 });
  }
  res.json({ message: 'Vote cast' });
});

export default router;
