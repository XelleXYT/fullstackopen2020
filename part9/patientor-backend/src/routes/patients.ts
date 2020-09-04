import express from 'express';
import patientService from '../services/patient';
import { toNewPatient, toNewEntry } from '../parser';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json(patientService.getPatients());
});

router.post('/', (req, res) => {
  const newPatientEntry = patientService.addPatient(toNewPatient(req.body));
  res.status(201).json(newPatientEntry);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientService.getPatient(id);

  if(patient){
    res.status(200).json(patient);
  } else {
    res.status(404);
  }

});

router.post('/:id/entries', (req, res) => {
  try{
    const patientId = req.params.id;
    const entry = toNewEntry(req.body);
    const patient = patientService.addEntry(patientId, entry);
    res.json(200).json(patient);
  } catch (e) {
    res.status(400);
  }
});
export default router;