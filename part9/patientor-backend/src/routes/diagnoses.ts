import express from 'express';
import diagnoseService from '../services/diagnose';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(diagnoseService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnose!');
});

export default router;