import patientData from '../../data/patients';
import { Patient, NewPatient } from '../types/Patient';
import * as uuid from 'uuid';
import { NewEntry, Entry } from '../types/Entry';


const patients: Array<Patient> = patientData;

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find((p) => p.id = id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
      id: uuid.v4(),
      ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry):Patient => {
  const patient = patients.find(p => p.id = patientId);
  if(!patient) throw new Error('Missing patient');
  const newEntry: Entry = {
    id: uuid.v4(),
    ...entry
  };
  patient.entries.push(newEntry);
  return patient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry
};