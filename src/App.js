import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import SplashPage from './SplashPage/SplashPage';
import Menu from './Menu/Menu';
import ReservationContainer from './ReservationContainer/ReservationContainer';
import PatioContainer from './PatioContainer/PatioContainer';
import About from './About/About';
import ReviewContainer from './ReviewContainer/ReviewContainer';
import AdminLoginContainer from './AdminLoginContainer/AdminLoginContainer';
import CreateReservation from './ReservationContainer/CreateReservation/CreateReservation';

const My404 = () => {
  return(
    <div>
      You are Lost!!
    </div>
  )
}

class App extends Component {
  constructor(){
    super();

    this.state = {
      logged: true,
      targetDate: '',
      passTargetDate: false,
    }
  }

  componentDidMount = async () => {

    // THIS LOGS IN IMMIDIATELY FOR TESTING CHANGE!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
    this.setState({
      logged: true
    });
    // CHANGE THIS PART!!!>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const loggedResponse = await fetch(process.env.REACT_APP_BACKEND + 'auth');
    if(!loggedResponse.ok){
      throw Error(loggedResponse.statusText);
    }

    const parsedResponse = await loggedResponse.json();
    if(parsedResponse.data === "not logged in"){
      this.setState({
        logged: false,
      })
    }else if (parsedResponse.data.logged) {
      this.setState({
        logged: true,
      })
    }
  }

  setTargetDate = (date) => {
    this.setState({
      targetDate: date,
      passTargetDate: true,
    })
  }

  logIn = () => {
    this.setState({
      logged: true,
    })
  }

  logOut = () => {
    this.setState({
      logged: false,
    })
  }

  render(){
    return(
      <main>
        <Header logged={this.state.logged} logOut={this.logOut}/>
        <Switch>
          <Route exact path="/" component={ SplashPage } />
          <Route exact path="/menu" component={ Menu } />
          <Route exact path="/reservation" render={(props) => <ReservationContainer {...props} targetDate={this.state.targetDate} passTargetDate={this.state.passTargetDate} logged={this.state.logged}/> }/>
          <Route exact path="/reservation/create" render={(props) => <CreateReservation {...props} targetDate={this.state.targetDate} />} />
          <Route exact path='/patio' render={(props) => <PatioContainer {...props} setTargetDate={this.setTargetDate} /> }/>
          <Route exact path='/about' component={ About }/>
          <Route exact path='/reviews' component={ ReviewContainer }/>
          <Route exact path='/adminlogin' render={(props) => <AdminLoginContainer {...props} logged={this.state.logged} logIn={this.logIn} logOut={this.logOut} />} />
          <Route component= { My404 }/>
        </Switch>
      </main>
    )
  }
}

export default App;
