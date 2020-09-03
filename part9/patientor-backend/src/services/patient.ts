import patientData from '../../data/patients';
import { Patient, NewPatient } from '../types/Patient';
import * as uuid from 'uuid';


const patients: Array<Patient> = patientData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getEntry = (id: string): Patient | undefined => {
  return patients.find((p) => p.id = id)
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
      id: uuid.v4(),
      ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

export default {
  getEntries,
  getEntry,
  addEntry
};