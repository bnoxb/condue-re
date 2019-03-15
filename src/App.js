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
import UserLogin from './UserLogin/UserLogin';
import queryString from 'query-string';
import Footer from './Footer/Footer';

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
      logged: false,
      targetDate: '',
      passTargetDate: false,
      userLogged: false,
      user: {
        name: "",
        email: "",
        _id: ""
      }
    }
  }

  componentDidMount = async () => {
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

  componentWillMount= async ()=>{
    const query = queryString.parse(this.props.location.search);
    if(query.name) {
      await this.setState({
        user: {
          name: query.name,
          email: query.email,
          _id: query._id
        },
        userLogged: true
      });
      console.log(this.state);

      this.props.history.push('/');
    }
  }

  render(){
    return(
      <main>
        <Header logged={this.state.logged} logOut={this.logOut} userLogged={this.state.userLogged}/>
        <Switch>
          <Route exact path="/" component={ SplashPage } />
          <Route exact path="/menu" component={ Menu } />
          <Route exact path="/reservation" render={(props) => <ReservationContainer {...props} targetDate={this.state.targetDate} passTargetDate={this.state.passTargetDate} logged={this.state.logged} userLogged={this.state.userLogged} user={this.state.user}/> }/>
          <Route exact path='/patio' render={(props) => <PatioContainer {...props} setTargetDate={this.setTargetDate} userLogged={this.state.userLogged}/> }/>
          <Route exact path='/about' render={(props) => <About {...props} userLogged={this.state.userLogged} userName={this.state.user.name}/> } />
          <Route exact path='/reviews' render={(props) => <ReviewContainer {...props} userLogged={this.state.userLogged} userName={this.state.user.name} /> } />
          <Route exact path='/adminlogin' render={(props) => <AdminLoginContainer {...props} logged={this.state.logged} logIn={this.logIn} logOut={this.logOut} />} />
          <Route exact path='/userlogin' component={ UserLogin } />
          <Route component= { My404 }/>
        </Switch>
        <Footer />
      </main>
    )
  }
}

export default App;
