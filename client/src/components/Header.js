import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

    render() {
      return (
            <div className="container">
                <div className="row mt-5">
                  <div className="col-12 text-center text-light">
                    <h1><b>HQumana</b></h1>
                    <p className="lead">A real-time trivia game implementing web sockets. TEST</p>
                    {/* <Link to={'/'} className="link-text"> Home </Link>

                    <Link to={'/lobby'} className="link-text"> Lobby </Link>

                    <Link to={'/questions'} className="link-text"> questions </Link>

                    <Link to={'/QuestionResults'} className="link-text"> Question Results</Link>

                    <Link to={'/winnerPage'} className="link-text"> Winner Page </Link> */}

                  </div>
                </div>
            </div>
        )
    }
}

export default Header
