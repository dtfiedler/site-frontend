import React from 'react';
import {Page, WeatherSearch } from '../../components';
import MongoService from '../../services/MongoService';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';

export default class History extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        history: [],
        expandedPanel: null,
        isLoading: false
      }

      this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount(){
      this.fetchWeatherRequestHistory();
    }

    async fetchWeatherRequestHistory(){
      this.setState({
        isLoading: true
      })
      try {
        const response = await MongoService.fetchWeatherRequestHistory();
        this.setState({
          history: response,
          isLoading: false
        });
      } catch(e){
        console.log('Failed to retrieve weather history.', e);
        this.setState({
          isLoading: false
        });
      }
    }

    handleChange = id => (event, expanded) => {
      this.setState({ 
        expandedPanel: id
      });
    }

    render() {
      const history = this.state.history.length ? this.state.history.map(request => {
        return (
          <ExpansionPanel key={request._id} onChange={this.handleChange(request._id)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}>
                <Typography style={{flex: 1}} variant="subtitle2">{`Weather details for (${request.latitude},${request.longitude}) for ${moment.unix(request.dateRequested).format('MM/DD/YY')}`}</Typography>
                <Typography style={{flex: 1, textAlign: 'right'}} variant="body2" color="textSecondary">{`${moment(request.timestamp).format('MM/DD/YYYY h:mm A')}`}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <WeatherSearch requestId={request._id} lat={this.state.expandedPanel === request._id ? request.latitude : null} long={this.state.expandedPanel === request._id ? request.longitude: null} date={this.state.expandedPanel === request._id ? request.dateRequested : null}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      }) : <Typography variant="subtitle2">No requests have been made. Navigate to the Search page to generate requests.</Typography>
      const content = !this.state.isLoading ? history : (<CircularProgress style={{display: 'block', margin: 'auto', marginTop: '25%'}}/>)
    
      return (
        <Page title="History" content={content}/>
      )
    }
}