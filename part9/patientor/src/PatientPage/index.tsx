import React, { useEffect } from 'react'
import { useStateValue, getPatient } from '../state';
import { Patient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Container, Header, Icon } from 'semantic-ui-react';

const PatientPage: React.FC<{patientId: string}> = ({patientId}) => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = React.useState<Patient | undefined>();

  useEffect(()=> {
    const fetchPatient = async () => {
      if(!patient && patients[patientId] && patients[patientId].ssn) {
        setPatient(patients[patientId]);
      } else {
        try {
          const { data: detailedPatient }  = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${patientId}`
          );
          dispatch(getPatient(detailedPatient));
          setPatient(detailedPatient);
        } catch (e) {
          console.error(e.message);
        }
      }
    }
    fetchPatient();
    // eslint-disable-next-line
  }, [patientId])

  if(!patient) return null;

  const getGender = (gender: string) => {
    switch(gender){
      case "male":
        return <Icon name="mars"/>;
      case "female":
        return <Icon name="venus"/>;
      case "other":
        return <Icon name="other gender"/>;
      default:
        return <Icon name="genderless"/>;
    }
  }

  return (
    <div className="App">
      <Container>
        <div>
          <Header as="h2">{patient.name}{getGender(patient.gender)}</Header>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
        </div>
      </Container>
    </div>
  )
};

export default PatientPage;