import React from 'react'
import {Link} from 'react-router-dom'

const RegisterComponent = (props) => {
    return (
        <div className="form-container">
            <form className="center-form" onSubmit = {props.handleSubmit} method="POST">

                <div className="mb-1">
                    <label htmlFor="inputFirstName" className="form-label">First name</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i class="fas fa-user"/></span>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputFirstName" 
                            name="firstname" 
                            placeholder="First Name"
                            required
                            value = {props.firstName}
                            onChange = {e => props.setFirstName(e.target.value)}                     
                        />
                    </div>
                </div>

                <div className="mb-1">
                    <label htmlFor="inputLastName" className="form-label">Last name</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i class="fas fa-user"/></span>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputLastName" 
                            name="lastname" 
                            placeholder="Last Name"
                            required           
                            value = {props.lastName}
                            onChange = {e => props.setLastName(e.target.value)}          
                        />
                    </div>
                </div>

                <div className="mb-1">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i class="fas fa-at"/></span>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="inputEmail" 
                            name="email" 
                            placeholder="Email"
                            required            
                            value = {props.email}
                            onChange = {e => props.setEmail(e.target.value)}         
                        />
                    </div>
                    <div className="form-error" style={(props.emailError) ? {display: "block"} : {}}>
                        Email already taken.
                    </div>
                </div>

                <div className="mb-1">
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
                            value = {props.password}
                            onChange = {e => props.setPassword(e.target.value)}       
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPasswordConfirm" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i class="fas fa-lock"/></span>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="inputPasswordConfirm" 
                            name="password2" 
                            placeholder="Confirm Password"
                            minLength={8}
                            required
                            value = {props.passwordConfirm}
                            onChange = {e => props.setPasswordConfirm(e.target.value)}
                            onBlur = {props.comparePasswords}            
                        />
                    </div>
                    <div className="form-error" style={(props.passwordError) ? {display: "block"} : {}}>
                        Passwords doesn't match.
                    </div>
                </div>

                <button className="btn btn-primary mb-3" >Register</button>

                <div>
                    <Link to="/login">Back to login.</Link>
                </div>

            </form>
        </div>
    )
}

export default RegisterComponent