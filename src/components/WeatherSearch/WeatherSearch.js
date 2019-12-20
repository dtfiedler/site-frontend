import React, { Component }  from 'react';
import {WeatherCard} from '../';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
/**
 * Component for a simple weather search tool that displays weather cards
 * for a given time unit provided by DarkSky Service.
 */
class WeatherSearch extends Component {

    constructor(props){
        super(props)

        this.state = {
            loading: true,
            weather: ['test', 'test']
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Typography variant="subtitle1">This is a simple weather search component.</Typography>
                <div className={classes.container}>
                    {
                        this.state.weather.map((day, index) => {
                            return <WeatherCard key={index}/>
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
      justifyContent: 'space-between'
    }
  });

  export default withStyles(useStyles)(WeatherSearch)