import { Diagnose } from "./Diagnose";

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
  type: "OccupationalHealthCare";
  employerName: string;
  sickLeave: {
    startDate: string;
    endDate: string;
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry =
  | BaseEntry
  | OccupationalHealthCareEntry
  | HospitalEntry
  | HealthCheckEntry;

type NewBaseEntry = Omit<BaseEntry, 'id'>;
type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
type NewHospitalEntry = Omit<HospitalEntry, 'id'>;
type NewOccupationalHealthcCreEntry = Omit<OccupationalHealthCareEntry, 'id'>;

export type NewEntry = 
  | NewBaseEntry
  | NewHealthCheckEntry
  | NewHospitalEntry
  | NewOccupationalHealthcCreEntry;