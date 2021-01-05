import React from 'react'
import Alert from 'react-bootstrap/Alert'

const EditAccountComponent = (props) => {
    return (
        <div className="form-container form-container-80">
            <form className="center-form" onSubmit = {props.editUser}>

                <div className="mb-1">
                    <label htmlFor="inputFirstName" className="form-label">First name</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="fas fa-user"/></span>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputFirstName" 
                            name="firstName" 
                            placeholder="First Name"
                            required
                            value = {props.firstName}
                            onChange = {props.handleChange}                     
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputLastName" className="form-label">Last name</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="fas fa-user"/></span>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputLastName" 
                            name="lastName" 
                            placeholder="Last Name"
                            required           
                            value = {props.lastName}
                            onChange = {props.handleChange}          
                        />
                    </div>
                </div>

                <button className="btn btn-primary mb-3" >Save Changes</button>

            </form>
            <Alert 
                variant="success" 
                id="invalidCodeAlert" 
                className={`fixed-bottom ${props.editSuccess && "invalidCodeAlertHidden"}`} 
            >
                User info updated successfuly. 
            </Alert>
        </div>
    )
}

export default EditAccountComponent