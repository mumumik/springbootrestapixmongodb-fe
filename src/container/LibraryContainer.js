import React, { Component } from 'react';
import Home from '../components/Home';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Header from '../components/Header';
import { Route } from 'react-router-dom';

import { BehaviorSubject } from 'rxjs';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

class LibraryContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentUser: currentUserSubject.asObservable(),
            isLoggedin: false,
            signupMessage: null,
            loginMessage: null
        }
    }

    componentDidMount(){
        if(currentUserSubject.value){
            this.setState(()=>{
                return{
                    isLoggedin: true
                }
            })
        }
    }

    handleLogin = (username,password) => {
        // return fetch('http://localhost:5000/api/auth/login', {
        return fetch('http://mitraiscdccharles.ap-southeast-1.elasticbeanstalk.com/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
                email: username,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response =>{
            return response.json()
        })
        .then(responseJson => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if(responseJson.token){
                localStorage.setItem('currentUser', JSON.stringify(responseJson));
                currentUserSubject.next(responseJson);
                this.setState(()=>{
                    return{
                        isLoggedin:true
                    }
                })
                return responseJson;
            } else{
                this.setState(()=>{
                    return{
                        loginMessage: responseJson.message
                    }
                })
            }    
        });
    }

    handleLogout = () => {
        // authenticationService.logout();
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
        this.setState(()=>{
            return{
                isLoggedin:false,
                loginMessage: "Successfully logout"
            }
        })
    }

    handleSignup = (email,password,fullname) =>{

        // fetch('http://localhost:5000/api/auth/register', {
        fetch('http://mitraiscdccharles.ap-southeast-1.elasticbeanstalk.com/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                fullname: fullname
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response =>{
            return response.json()
        }).then(responseJson => {
            this.setState({
                signupMessage: responseJson.message
            })
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        
        return (
            <div>
                
                <Header isLoggedin={this.state.isLoggedin} handleLogout={this.handleLogout}/>
                {/*<Route exact path="/" component={Home} />*/}
                <Route exact path="/" 
                    render={
                        (props) => (this.state.isLoggedin ? 
                                        //<Home {...props} isLoggedin={this.state.isLoggedin} /> 
                                        <Home /> 
                                        : 
                                        <Login {...props} handleLogin={this.handleLogin} message="Please Login first"/>)
                    }
                />
                {/*<Route path="/login" component={Login} />*/}
                <Route path="/login" 
                    render={
                        (props) => (this.state.isLoggedin ?
                                        <Home /> 
                                        :
                                        <Login {...props} handleLogin={this.handleLogin} message={this.state.loginMessage}/>)
                    }
                />
                {/*<Route path="/signup" component={Signup} />*/}
                <Route path="/signup" 
                    render={
                        (props) => (<Signup {...props} handleSignup={this.handleSignup} message={this.state.signupMessage}/>)
                    }
                />
            </div>
        );
    }

}

export default LibraryContainer