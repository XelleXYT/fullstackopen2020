import express from 'express';
import patientService from '../services/patient';
import { toNewPatient } from '../parser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getEntries());
});

router.post('/', (req, res) => {
  const newPatientEntry = patientService.addEntry(toNewPatient(req.body));
  res.status(201).json(newPatientEntry);
});

export default router;