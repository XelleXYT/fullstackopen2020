import React from 'react';
import { Entry } from '../types';
import { Icon } from 'semantic-ui-react';

const entryStyle = {
  border: '1px solid lightgray',
  borderRadius: '5px',
  padding: '15px',
  margin: '5px'
};

const descriptionStyle = {
  color: 'gray',
  fontStyle: 'italic'
};

const HospitalEntry: React.FC<{entry: Entry}> = ({entry}) => {
  return (
    <div style={entryStyle}>
      <h3>{entry.date} <Icon name="doctor" size="big"/></h3>
      <div style={descriptionStyle}>{entry.description}</div>
    </div>
  );
};

const OccupationalHealthCare: React.FC<{entry: Entry}> = ({entry}) => {
  return (
    <div style={entryStyle}>
      <h3>{entry.date} <Icon name="stethoscope" size="big"/></h3>
      <div style={descriptionStyle}>{entry.description}</div>
    </div>
  );
};

const HealthCheckEntry: React.FC<{entry: Entry}> = ({entry}) => {
  return (
    <div style={entryStyle}>
      <h3>{entry.date} <Icon name="stethoscope" size="big"/></h3>
      <div style={descriptionStyle}>{entry.description}</div>
    </div>
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry}/>;

    case "OccupationalHealthCare":
      return <OccupationalHealthCare entry={entry}/>;

    case "HealthCheck":
      return <HealthCheckEntry entry={entry}/>;

    default:
      return null;
  }
};

export default EntryDetails;