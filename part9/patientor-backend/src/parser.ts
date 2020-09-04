/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NewPatient, Gender } from './types/Patient';
import { NewEntry, HealthCheckRating } from './types/Entry';


const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseString = (name:any): string => {
  if(!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseStringArray = (stringArray: string[]): string[] => {
  if(!stringArray){
    return [];
  }
  return stringArray;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if(!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + healthCheckRating);
  }
  return healthCheckRating;
};
export const toNewPatient = (object:any): NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: []
  };
};

export const toNewEntry = (object:any): NewEntry => {
  if(!object.type) throw new Error ('Missing type');

  const baseEntry: NewEntry = {
    description: parseString(object.description),
    date: parseDate(object.date),
    specialist: parseString(object.specialist),
    diagnosisCodes: parseStringArray(object.diagnosisCodes)
  };

  switch(object.type) {
    case 'HealthCheck':
      if(!object.healthCheckRating) {
        throw new Error ('Incorrect or missing healthCheckRating');
      } 
      return {
        ...baseEntry,
        type: object.type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case 'OccupationalHealthCare':
      if(!object.employerName) {
        throw new Error ('Incorrect or missing employerName');
      }
      if(!object.sickLeave || !object.sickLeave?.startDate || !object.sickLeave?.endDate) {
        throw new Error ('Incorrect or missing sickLeave');
      }
      return {
        ...baseEntry,
        type: object.type,
        employerName: parseString(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        }
      };
    case 'Hospital':
      if(!object.discharge || !object.discharge?.date || !object.discharge?.criteria) {
        throw new Error ('Incorrect or missing discharge');
      }
      return {
        ...baseEntry,
        type: object.type,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseString(object.discharge.criteria)
        }
      };
    default:
      throw new Error('Incorrect type');
  }
  return baseEntry;
};