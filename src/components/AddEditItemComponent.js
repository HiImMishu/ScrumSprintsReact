import React from 'react'
import Alert from 'react-bootstrap/Alert'

const AddEditItemComponent = (props) => {

    return (
        <div className="form-container form-container-80">
            <form className="center-form" onSubmit = {props.handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="inpupItemDescription" className="form-label">Item Description</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="fas fa-quote-left"/></span>
                        <textarea 
                            style={{minWidth: "20rem"}}
                            rows="5"
                            className="form-control" 
                            id="inpupItemDescription" 
                            name="description" 
                            placeholder="Item description"
                            required
                            value = {props.description}
                            onChange = {props.handleChange}                     
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
               Item saved successfully. 
            </Alert>
        </div>
    )
}

export default AddEditItemComponent