import React, { Component }  from 'react';
import {Typography, Card, CardContent} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/**
 * Component for a simple weather card that displays weather details
 * for a given time unit provided by DarkSky Service
 */
class WeatherCard extends Component {

    constructor(props){
        super(props)

        this.state = {
            loading: true
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Day
                </Typography>
                <Typography variant="h5" component="h2">
                    Weather Details
                </Typography>
                <Typography variant="body2" component="p">
                    <b>Detail: </b> N/A
                </Typography>
                </CardContent>
            </Card>
        )
    }
}

const useStyles = theme => ({
    card: {
      height: 500,
      flex: 1,
      margin: 15
    },
    title: {
      fontSize: 14,
    }
  });

  export default withStyles(useStyles)(WeatherCard)