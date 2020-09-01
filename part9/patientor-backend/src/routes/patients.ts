import express from 'express';
import patientService from '../services/patient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatientEntry = patientService.addEntry({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  });
  res.status(201).json(newPatientEntry);
});

export default router;