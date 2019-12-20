import React, { Component }  from 'react';

/**
 * Component for a simple weather card that displays weather details
 * for a given time unit provided by DarkSky Service
 */
export default class WeatherTable extends Component {

    constructor(props){
        super(props)

        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div>
                This is a simple weather table.
            </div>
        )
    }
}