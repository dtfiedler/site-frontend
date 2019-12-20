import React from 'react';
import { Page, WeatherSearch } from '../../components';

export default class Search extends React.Component {
    render() {
      return (
        <Page title="Search"
         content={
          <WeatherSearch/>
         }>
        </Page>
      )
    }
}