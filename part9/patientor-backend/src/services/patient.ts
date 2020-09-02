import patientJSON from '../../data/patients.json';
import { Patient, NewPatient } from '../types/Patient';
import * as uuid from 'uuid';


const patients: Array<Patient> = patientJSON as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return patients;
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
  addEntry
};