import React from 'react'
import {Link} from 'react-router-dom'

const FormComponent = (props) => {
    return (
        <div className="login-container">
        <form className="login-form">

            <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Email address</label>
                <div className="input-group">
                    <span className="input-group-text form-addon"><i class="fas fa-user"/></span>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="inputEmail" 
                        name="email" 
                        placeholder="Email"
                        required
                        onChange={e => props.setEmail(e.target.value)}
                        value={props.email}                       
                    />
                </div>
                <div className="form-error" style={(props.emailError) ? {display: "block"} : {}}>
                    Invalid email
                </div>
            </div>

            <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <div className="input-group">
                    <span className="input-group-text form-addon"><i class="fas fa-lock"/></span>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="inputPassword" 
                        name="password" 
                        placeholder="Password"
                        required
                        minLength={8}
                        onChange={e => props.setPassword(e.target.value)} 
                    />
                </div>
                <div className="form-error" style={(props.passwordError) ? {display: "block"}: {}}>
                    Invalid password
                </div>
            </div>

            <button type="button" className="btn btn-primary mb-4" onClick={props.handleSubmit}>Login</button>

            <div>
                <Link to="/register">Don't have an account?</Link>
            </div>

        </form>
        </div>
    )
}

export default FormComponent