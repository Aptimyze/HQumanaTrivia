import React, { Component } from 'react';
import { socketConnect } from 'socket.io-react';
import { bindActionCreators } from 'redux';
import { fetchUsers } from '../actions'
import { connect } from 'react-redux';


class Home extends Component {
    constructor(props) {
      super(props)
      this.state = {
          username: ''
          }
    }

    componentDidMount = () => {
    
    }

    // componentWillUnmount = () => {
    //     clearInterval()
    // }

    submitUser = (data) => {
      console.log('signing up user', data)
      debugger;
        if(data.username != ''){
            this.props.socket.emit('add-user', data)
            this.props.history.push('/lobby')
        }
    }

    render () {
        return (
            <div className="container" >
              <div className="row mt-5">
                <div className="col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                  <div className="card shadow pt-3 pb-3">
                    <div className="card-body">
                      <h1 className="text-center mb-4">Lets get started!</h1>
                      <form>
                        <input value={this.state.username}  onChange={(event) =>{this.setState({username: event.target.value})}} placeholder="Username" type="text" className="username" required />
                                  <label className="mb-5">Username Required</label>
                        <button type='button' onClick={() => { this.submitUser(this.state) }} className="btn btn-primary btn-block mt-5"> Sign In </button>
                      </form>
                    </div>
                  </div>
                  <div className="text-center"><p className="mt-5">The winner/winners get a free pat on the back.</p>
                  <p><b>You earned it!</b></p>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

const mapStateToProps = ({ users }) => {
  return { users }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchUsers }, dispatch)
}
export default socketConnect(connect(mapStateToProps, mapDispatchToProps)(Home));
