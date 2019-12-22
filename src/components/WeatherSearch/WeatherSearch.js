import React, { Component }  from 'react';
import {WeatherCard} from '../';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import cities from 'cities';
import MongoService from '../../services/MongoService';

const moment = extendMoment(Moment);
/**
 * Component for a simple weather search tool that displays weather cards
 * for a given time unit provided by DarkSky Service.
 */
class WeatherSearch extends Component {

    constructor(props){
        super(props)

        this.state = {
            weather: []
        }
    }

    componentDidUpdate(prev){
        const { lat, long, searchDate} = this.props;
        if(lat !== prev.lat || long !== prev.long || searchDate !== prev.searchDate){
            this.saveWeatherRequest()
        }
    }

    async saveWeatherRequest(){
        const { searchDate, lat, long } = this.props;
        const date = moment(searchDate).unix();
        try {
            const response = MongoService.saveWeatherRequest(lat, long, date);
            console.log('sucessfully saved request', response);
        } catch(e){
            console.log('Failed to save weather request.', e);
        }
    }

    render() {
        const { searchDate, classes } = this.props;
        // If no search date is passed, current date will be used
        const days = Array.from(moment.range(moment(searchDate).subtract(6,"days"), moment(searchDate)).by('day'));
        const nearbyCity = cities.gps_lookup(this.props.lat, this.props.long);
        return (
            <div>
                <Typography variant="subtitle1">
                    {this.props.lat && this.props.long ? `Previous 7 days in ${nearbyCity.city}, ${nearbyCity.state} (${this.props.lat}, ${this.props.long})`: 'Provide coorinates (i.e. latitude, longitude)'}
                </Typography>
                <div className={classes.container}>
                    {
                        days.map((date, index) => {
                            return <WeatherCard lat={this.props.lat} long={this.props.long} date={date} key={index}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

const useStyles = theme => ({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    }
  });

  export default withStyles(useStyles)(WeatherSearch)