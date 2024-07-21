import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Card, Spinner } from 'react-bootstrap';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: linear-gradient(to bottom, #000428, #004e92);
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  text-align: center;
  color: #004e92;
  margin-bottom: 20px;
`;

const ReportCard = styled(Card)`
  margin: 10px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;

  .card-body {
    text-align: left;
  }
`;

const LoadingSpinner = styled(Spinner)`
  display: block;
  margin: 0 auto;
  color: #004e92;
`;

function ProviderReports() {
  const [reports, setReports] = useState([]);
  

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('https://sell-skill.com/api/endpoints/getReport');
      setReports(response.data);
      console.log('reports ===> ' + response.data);
    };
    fetchReports();
  }, []);

  useEffect(() => {
    const killNewReportNotification = async() => {
      await axios.patch('/api/endpoints/killNewReportNotification')
    }
    killNewReportNotification()
  }, [])
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Provider Reports</Title>
        {reports.length > 0 ? (
          reports.map((report) => (
            <ReportCard key={report.id}>
              <Card.Body>
                <Card.Text>{report?.report.report}</Card.Text>
              </Card.Body>
            </ReportCard>
          ))
        ) : (
          <LoadingSpinner animation="border" />
        )}
      </Container>
    </>
  );
}

export default ProviderReports;
