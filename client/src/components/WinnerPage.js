import React, { Component } from 'react';

class WinnerPage extends Component {

    render() {
        return (
          <div className="container mt-5">
              <div className="row text-center text-light">
                <div className="col-sm-12">
                  <h1 className="mt-5">There were {this.props.state.currentCorrectUsers.length} WINNER/WINNERS!</h1>
                </div>
              </div>
          </div>
        )
    }
}

export default WinnerPage
