
import React, { Component }  from 'react';
import { Typography } from '@material-ui/core';


/**
 * Generic page container that contains slots for children
 * elemnents.
 */
export default class Page extends Component {

    constructor(props){
        super(props)

        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <div className="page">
                <div className="header">
                    <Typography variant="h5">{this.props.title}</Typography>
                </div>
                <div className="main">{this.props.content}</div>
                <div className="footer">{this.props.footer}</div>
            </div>
        )
    }
}