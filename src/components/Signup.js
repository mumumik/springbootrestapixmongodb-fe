import React, { Component } from 'react'

class Signup extends Component {
    
    handleSignup = (e) =>{
        e.preventDefault()
        const email = e.target.elements.email.value.trim()
        const password = e.target.elements.password.value.trim()
        const fullname = e.target.elements.fullname.value.trim()
        this.props.handleSignup(email, password, fullname)
    }

    render () {
        return (
            <div className="container">
                {this.props.message && 
                    <div className="alert alert-secondary" role="alert">
                        {this.props.message}
                    </div>
                }
                <form onSubmit={this.handleSignup}>
                    <div className="form-group">
                        <h1>Register your Account</h1>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Fullname</label>
                        <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Enter fullname" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup;