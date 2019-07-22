import React, { Component } from 'react'
//import { authenticationService } from '../services/authentication.service'

class Login extends Component {
    // constructor(props){
    //     super(props)
    // }
    
    handleLogin = (e) =>{
        e.preventDefault()
        const email = e.target.elements.email.value.trim()
        const password = e.target.elements.password.value.trim()
        //authenticationService.login(email, password)
        this.props.handleLogin(email,password)
    }

    render() {
        return(
            <div className="container">
                <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <h1>Login</h1>
                    </div>
                    {this.props.message &&
                        <div className="alert alert-dark" role="alert">
                            {this.props.message}
                        </div>
                    }
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Login