import React from 'react'
import Alert from 'react-bootstrap/Alert'

const AddTeamComponent = (props) => {

    return (
        <div className="form-container form-container-80">
            <form className="center-form" onSubmit = {props.addTeam}>

                <div className="mb-3">
                    <label htmlFor="inputTeamName" className="form-label">Team name</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="fas fa-users"/></span>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputTeamName" 
                            name="teamName" 
                            placeholder="Team Name"
                            required
                            value = {props.teamName}
                            onChange = {(e) => props.setTeamName(e.target.value)}                     
                        />
                    </div>
                </div>

                <button className="btn btn-primary mb-3" >Add Team</button>

            </form>
            <Alert 
                variant="success" 
                id="invalidCodeAlert" 
                className={`fixed-bottom ${props.addSuccess && "invalidCodeAlertHidden"}`} 
            >
               Team added successfuly. Check out team information to obtain invitaton code. 
            </Alert>
        </div>
    )
}

export default AddTeamComponent