import React from 'react'
import DatePicker from 'react-datepicker'
import Alert from 'react-bootstrap/Alert'

const AddEditBacklogComponent = (props) => {

    return (
        <div className="form-container form-container-80">
            <form className="center-form" onSubmit = {props.handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="inputSprintDescription" className="form-label">Sprint Description</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="fas fa-quote-left"/></span>
                        <textarea 
                            style={{minWidth: "20rem"}}
                            rows="2"
                            className="form-control" 
                            id="inputSprintDescription" 
                            name="description" 
                            placeholder="Item description"
                            required
                            value = {props.description}
                            onChange = {(e) => props.setDescription(e.target.value)}                     
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputStartDate" className="form-label">Start Date</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="far fa-clock"/></span>
                        <DatePicker
                            className="form-control"
                            id="inputStartDate" 
                            showTimeSelect
                            selected={props.startDate}
                            onChange={date => props.setStartDate(date)}
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputEndDate" className="form-label">End Date</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="far fa-clock"/></span>
                        <DatePicker
                            className="form-control"
                            id="inputEndDate" 
                            showTimeSelect
                            selected={props.endDate}
                            onChange={date => props.setEndDate(date)}
                        />
                    </div>
                </div>

                <button className="btn btn-primary mb-3" >Save Item</button>

            </form>
            <Alert 
                variant="success" 
                id="invalidCodeAlert" 
                className={`fixed-bottom ${props.success && "invalidCodeAlertHidden"}`} 
            >
               Sprint saved successfully. 
            </Alert>
        </div>
    )
}

export default AddEditBacklogComponent