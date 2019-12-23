import React, { Component }  from 'react';
import {Typography, Card, CardContent} from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import {DarkSkyService} from '../../services';
import Skycons from 'react-skycons'
import moment from 'moment';
import * as _ from 'lodash';
/**
 * Component for a simple weather card that displays weather details
 * for a given time unit provided by DarkSky Service
 */
class WeatherCard extends Component {

    constructor(props){
        super(props)

        this.state = {
            isLoading: false,
            weather: {},
            error: null
        }
    }

    /**
     * Fetches new weather when state changes.
     * 
     * @param {*} prev - the previos state before update occurs.
     */
    componentDidUpdate(prev){
        const { lat, long } = this.props;
        if(lat !== prev.lat || long !== prev.long){
            this.fetchWeatherForLocation()
        }
    }

    /**
     * Trigger request on component mount.
     */
    componentDidMount(){
        const { lat, long, date} = this.props;
        if(lat && long && date){
            this.fetchWeatherForLocation()
        }
    }

    /**
     * Fetches weather information for a given day, lat, and long and updates the state
     * as necesesary.
     */
    async fetchWeatherForLocation(){
        const { lat, long, date} = this.props;
        this.setState({isLoading: true})
        try {
            if(this.props.lat && this.props.long){
                const response = await DarkSkyService.fetchWeatherHistory(lat, long, moment(date).unix())
                this.setState(({
                    isLoading: false,
                    weather: response,
                    error: null
                }));
            } else {
               throw new Error('Invalid coordiantes');
            }
        } catch(err){
            err.name = ''
            this.setState({
                isLoading: false,
                weather: {},
                error: err.toString()
            })
        }
    }

    render() {
        const { lat, long, date, classes } = this.props;
        let cardContent;
        if(!this.state.error){
            const { data } = this.state.weather?.daily || {};
            const details = data && data.length ? data[0] : {};
            
            cardContent = Object.entries(details)
                .filter(([key]) => ['icon', 'summary', 'temperatureMin', 'temperatureMax', 'precipType', 'precipAccumulation', 'humdity'].includes(key))
                .map(([key, val], index) => {
                    switch(key){
                        case 'icon':
                            return (
                                <Skycons
                                    color='black'
                                    icon={val.split("-").join('_').toUpperCase()} 
                                    animate="true"
                                    className={classes.img}
                                    key={index}
                                    />
                            )
                        case 'summary':
                            return (
                                <div className={classes.summary} key={index}>
                                    <Typography variant="body2" component="p" key={index} >
                                        <i>{val}</i>
                                    </Typography>
                                </div>
                            )
                        case 'precipType':
                            // Only show if snow
                            if(val !== 'snow') break;
                            // eslint-disable-next-line no-fallthrough
                        default: 
                            return (
                                <div className={classes.details} key={index}>
                                    <Typography variant="body2" component="p" key={index} >
                                        <b>{_.startCase(key)}:</b> {val}
                                    </Typography>
                                </div>
                            )
                    }
                });
                /**
                 * This is a simple hack to make icon first and summary card second. 
                 * TODO: manually handle order of attributes when mapping.
                 */
                const temp = cardContent[0]
                cardContent[0] = cardContent[1]
                cardContent[1] = temp;
        } else {
            cardContent =  <div className={classes.error}>
                            <ErrorOutlineIcon fontSize="large"/>
                            <Typography variant="body2" component="p">
                                <b>{this.state.error}</b>
                            </Typography>
                        </div>
        }
        if(lat && long && date){
            return (
                <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {moment(this.props.date).format('MMMM DD')}
                        </Typography>
                        <Typography variant="h5">
                            {moment(this.props.date).format('dddd')}
                        </Typography>
                        { this.state.isLoading ? (<CircularProgress className={classes.img}/>) : (cardContent)}
                    </CardContent>
                </Card>
            )
        }
        
        return null;
    }
}

const useStyles = theme => ({
    card: {
      flex: 1,
      margin: 10,
      minWidth: 175,
    },
    title: {
      fontSize: 14,
    },
    details: {
        flex: 1
    },
    summary: {
        flex: 1,
        textAlign: 'center',
        minHeight: 50
    },
    img: {
        marginTop: 50,
        marginBottom: 50,
        margin: 'auto',
        display: 'block'
    },
    error: {
        textDecoration: 'italic',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    }
  });

  export default withStyles(useStyles)(WeatherCard)