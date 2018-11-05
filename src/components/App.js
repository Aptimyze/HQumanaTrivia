import React, {Component} from 'react';
import { BrowserRouter, Route, withRouter} from 'react-router-dom';
import Header from './Header';
import WinnerPage from'./WinnerPage';
import QuestionResults from'./QuestionResults';
import Questions from './Questions';
import Home from './Home';
import Lobby from './Lobby';
// import { connect } from 'react-redux';
import { socketConnect } from 'socket.io-react';
// import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      question: null,
      currentCorrectUsers: [],
      currentAnswer: '',
      lobby: [],
      users: [],
    }
  }

  componentDidMount = () => {

    this.props.socket.on('new-question',(data) => {
      console.log("new question ", this)
      this.setState({question: data})
      this.props.history.push('/questions')
      console.log(this.state)
    })

    this.props.socket.on('question-complete',(data) => {
        console.log('i received a question complete  ', this)
        //update state with new info from message
        this.setState({'currentAnswer': data.answer, 'currentCorrectUsers': data.currentCorrectUsers})
        this.props.history.push('/questionResults')

    })

    this.props.socket.on('gameover',(data) => {
      console.log('gamover received', this)
      this.setState({'currentCorrectUsers': data})
      this.props.history.push('/winnerPage')
    })


  }
  render = () =>{
    return(
      <div>
          <div>
            <Header />
            <Route exact path='/' component={Home}/>
            <Route path='/lobby' component={() => <Lobby state={this.state}/>}/>
            <Route path='/questions' component={() => <Questions state={this.state}/>}/>
            <Route path='/questionResults' component={() => <QuestionResults state={this.state}/>}/>
            <Route path='/winnerPage' component={() => <WinnerPage state={this.state}/>}/>
          </div>
      </div>
    )}
};

export default withRouter(socketConnect(App));




