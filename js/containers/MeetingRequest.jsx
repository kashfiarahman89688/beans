import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMeetingRequest } from '../actions/index';


class MeetingRequest extends Component {
  static renderButton(meetingRequest) {
    if (meetingRequest.key === '') {
      return (
        <button type="submit" className="btn btn-success btn-lg left30">
          Ask for a Meeting this week.
        </button>
      );
    }
    return (
      <button type="submit" className="btn btn-danger btn-lg left30">
        Remove request for a Meeting this week.
      </button>
    );
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.getMeetingRequest(this.getMeetingSpecKey());
  }
  getMeetingSpecKey() {
    const path = this.props.location.pathname.split('/');
    return path[path.length - 1];
  }
  handleSubmit() {
    axios.post(
      '/v1/meeting_request/',
      {
        meeting_spec_key: this.getMeetingSpecKey(),
        meeting_request_key: this.props.meetingRequest.key,
      },
    );
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {MeetingRequest.renderButton(this.props.meetingRequest)}
      </form>
    );
  }
}

MeetingRequest.propTypes = {
  getMeetingRequest: React.PropTypes.func.isRequired,
  location: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  meetingRequest: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

function mapStateToProps(state) {
  return { meetingRequest: state.meetingRequest };
}

export default connect(mapStateToProps, { getMeetingRequest })(MeetingRequest);
