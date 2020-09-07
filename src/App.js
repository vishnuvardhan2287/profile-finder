import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state ={
    users:[],
    user:{},
    repos:[],
    loading: false,
    alert: null
  }
  
  search = async (text) =>{
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}`);
    this.setState({
      users: res.data.items,
      loading: false
    })
  }

  //Get Single user
  getUser =async (userName) =>{
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${userName}`);
    this.setState({
      user: res.data,
      loading: false
    })
  }

  //get user repo
  getUserRepo = async (userName) =>{
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc`);
    this.setState({
      repos: res.data,
      loading: false
    })
  }

  clearUser =() =>{
    this.setState({
      users:[],
      loading: false
    })
  }

  setAlert =(msg,type) =>{
    this.setState({alert:{msg,type}});
    setTimeout(() =>{
      this.setState({
        alert:null
      })
    }, 3000)
  }
  render(){
    const {users,loading} = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render={props =>(
                <Fragment>
                    <Search searchUsers ={this.search} 
                    clearUser={this.clearUser}
                    showClear={this.state.users.length > 0 ? true : false} 
                    setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                </Fragment>
              )}/>
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props =>(
                <User 
                      {...props} 
                      getUser={this.getUser} 
                      user={this.state.user} 
                      getUserRepo={this.getUserRepo} 
                      repos={this.state.repos} 
                      loading={this.state.loading} 
                />
              )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
