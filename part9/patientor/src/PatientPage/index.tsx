import React, { useEffect } from 'react';
import { useStateValue, getPatient } from '../state';
import { Patient } from '../types';
import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Container, Header, Icon, Segment } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import { EntryFormValues, AddEntryForm } from "../AddEntryForm/AddEntryForm";

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
    };
    fetchPatient();
    // eslint-disable-next-line
  }, [patientId])

  const addNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(getPatient(updatedPatient));
      setPatient(updatedPatient);
    } catch (e) {
      console.error(e.message);
    }
  };

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
  };

  return (
    <div className="App">
      <Container>
        <div>
          <Header as="h2">{patient.name}{getGender(patient.gender)}</Header>
          <div>ssn: {patient.ssn}</div>
          <div>occupation: {patient.occupation}</div>
          <Header as="h3">entries</Header>
          {patient?.entries?.map(e =>
            <EntryDetails key={e.id} entry={e} />
          )}
        </div>
        <Segment>
          <Header as ="h3">add entry</Header>
          <AddEntryForm onSubmit={(data)=> addNewEntry(data) } />
        </Segment>
      </Container>
    </div>
  );
};

export default PatientPage;