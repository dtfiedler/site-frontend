
import React, { Component }  from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

/**
 * Generic page container that contains slots for children
 * elemnents.
 */
class Page extends Component {

    constructor(props){
        super(props)

        this.state = {
            loading: true
        }
    }

    render() {
        const {classes} =  this.props;
        return (
            <div className={classes.page}>
                <div className={classes.header}>
                    <Typography variant="h5" className={classes.title}>{this.props.title}</Typography>
                    <div className={classes.action}>{this.props.action}</div>
                </div>
                <div className="main">{this.props.content}</div>
            </div>
        )
    }
}


const useStyles = theme => ({
    header: {
      display: 'flex',
      height: 60
    },
    page: {
        display: 'block'
    },
    title: {
        flex: 1,
        display: 'flex',
        margin: 'auto'
    },
    action: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    }
  });

  export default withStyles(useStyles)(Page)