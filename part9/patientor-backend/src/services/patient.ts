import patientJSON from '../../data/patients.json';

import { Patient } from '../types/Patient';


const patients: Array<Patient> = patientJSON as Array<Patient>;

const getEntries = (): Array<Patient> => {
  return patients;
};

export default {
  getEntries
};