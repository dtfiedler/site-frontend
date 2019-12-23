import React from 'react';
import { Page, WeatherSearch } from '../../components';
import TextField from '@material-ui/core/TextField';
export default class Search extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isValid: false,
      lat: null,
      long: null
    }
    this.updateLatLong = this.updateLatLong.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  /**
   * Handles a change to the internal latittude and longitude values if the input matches
   * the expected regex.
   * 
   * @param {*} event 
   */
  handleInputChange(event){
    event.preventDefault();
    const [_lat, _long] = event.target.value.split(',').map(v => v.trim())
    const valid = (number) => number ? number.match(/^-?[0-9.,]+$/): false
    if (valid(_lat) && valid(_long)) {
      this.setState({
        _lat,
        _long
      });
    }
  }

  /**
   * Updates the latitude and longitude properties passed to child component.
   * 
   * @param {*} lat - defaults to internal lat if none provided
   * @param {*} long - defaults to internal long if none provided
   */
  updateLatLong(lat = this.state._lat, long = this.state._long){
    this.setState({
      lat,
      long
    });
  }

  render() {
    const { lat, long} = this.state;
    return (
      <Page title="Search"
        content={<WeatherSearch lat={lat} long={long}/>}
        action={
        <TextField 
          label="Search" 
          variant="outlined" 
          onChange={this.handleInputChange}
          onKeyPress={event => event.key === 'Enter' ? this.updateLatLong() : {}} 
          style={{width: '40%', minWidth: 150}} 
          margin="dense" 
          placeholder="Enter lat & long (e.g. 103.45,105.2)"/>
        }
        >
      </Page>
    )
  }
}