import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';

class Lobby extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
            }
      }
  
      componentDidMount = () => {
        this.props.socket.on('new-player',(data) => {
            console.log('new player receiced', this)
            this.setState({'users': data})
          })
      
      }


    startGame = () => {
            this.props.socket.emit('start-game');
    }
// current.map 

    render() {
        return (
          <div className="container mt-5">
              <div className="row">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                <h2 className="text-center text-light">Lobby</h2>
                  <div className="card shadow mt-4 pt-3 pb-3">
                    <div className="card-body">
                      <h3>Players in lobby: {this.state.users.length} </h3>
                    </div> 
                  </div>
                </div>
              </div>
              <button type='button' onClick={() => { this.startGame() }} className="btn btn-primary btn-block mt-5"></button>
          </div>
              
        )
    }
}
// emit start game message
export default socketConnect(Lobby);