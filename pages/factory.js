/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { models, Report, Embed, service, Page } from 'powerbi-client';
import { PowerBIEmbed } from 'powerbi-client-react';
import styles from '../styles/App.module.css';

function App() {
  const [responseConfig, setResponseConfig] = useState({});
  useEffect(() => {
    fetch('https://getembedinfo.azurewebsites.net/api/PostOurEmbedInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': '*',
      },
      body: JSON.stringify({
        report: '6597db52-4566-4838-ab1d-13c933a957a5',
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        setResponseConfig(response);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Power BI Embed:</h1>
        <div> </div>
        <PowerBIEmbed
          embedConfig={{
            type: 'report', // Supported types: report, dashboard, tile, visual and qna
            id: responseConfig.ReportId,
            embedUrl: responseConfig.EmbedUrl,
            accessToken: responseConfig.EmbedToken,
            tokenType: models.TokenType.Embed,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false,
                },
                pageNavigation: {
                  visible: false,
                },
              },
              background: models.BackgroundType.Transparent,
            },
          }}
          eventHandlers={
            new Map([
              [
                'loaded',
                function () {
                  console.log('Report loaded');
                },
              ],
              [
                'rendered',
                function () {
                  console.log('Report rendered');
                },
              ],
              [
                'error',
                function (event) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName={styles.reportstyleclass}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </header>
    </div>
  );
}
export default App;
