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

    componentDidUpdate(prev){
        const { lat, long, date = null, requestId = null} = this.props;
        if(!requestId && (lat !== prev.lat || long !== prev.long || date !== prev.date)){
            this.saveWeatherRequest()
        }
    }

    async saveWeatherRequest(){
        const { date, lat, long } = this.props;
        const saveDate = moment(date).unix();
        try {
            await MongoService.saveWeatherRequest(lat, long, saveDate);
        } catch(e){
           console.log(`Failed to save request: ${e}`);
        }
    }

    render() {
        const { date, lat, long, classes } = this.props;
        const dateUsed = date ? moment.unix(date) : moment();
        const range = moment.range(moment(dateUsed.toISOString()).subtract(6,'days'), moment(dateUsed.toISOString()));  
        const days = Array.from(range.by('day'));
        const nearbyCity = cities.gps_lookup(lat, long);
        return (
            <div>
                <Typography variant="subtitle2">
                    {lat && long ? `Previous 7 days in ${nearbyCity.city}, ${nearbyCity.state} (${lat}, ${long}) ending on ${dateUsed.format('MM/DD/YYYY')}`: 'Provide coorinates (i.e. latitude, longitude)'}
                </Typography>
                <div className={classes.container}>
                    {
                        days.map((date, index) => {
                            return <WeatherCard lat={lat} long={long} date={date} key={index}/>
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