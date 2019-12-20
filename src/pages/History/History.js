import React from 'react';
import {Page, WeatherTable } from '../../components';

export default class History extends React.Component {
    render() {
        return (
          <Page title="History"
           content={
            <WeatherTable/>
           }>
          </Page>
        )
      }
}