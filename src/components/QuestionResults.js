import React, { Component } from 'react';

class QuestionResults extends Component {

    render() {
        return (
          <div className="container mt-5">
              <div className="row">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <h2 className="text-center text-light">Results</h2>
                  <div className="card shadow mt-4 pt-3 pb-3">
                    <div className="card-body">
                      <h3>Correct Answer:</h3>
                      <p className="lead">{this.props.state.currentAnswer}</p>
                      <h3>Number of players left: {this.props.state.currentCorrectUsers.length}</h3>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        )
    }
}

export default QuestionResults
