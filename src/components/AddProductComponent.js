import React from 'react'
import Alert from 'react-bootstrap/Alert'

const AddProductComponent = (props) => {
    const teams = props.teamsLeaded.map(tl => {
        return <option key={tl.id} value={tl.id}>{tl.name}</option>
    })

    return (
        <div className="form-container form-container-80">
            <form className="center-form" onSubmit = {props.addProduct}>

                <div className="mb-1">
                    <label htmlFor="inputProductName" className="form-label">Product name</label>
                    <div className="input-group">
                        <span className="input-group-text form-addon"><i className="fas fa-quote-left"/></span>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="inputProductName" 
                            name="productName" 
                            placeholder="Product Name"
                            required
                            value = {props.productName}
                            onChange = {(e) => props.setProductName(e.target.value)}                     
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputDevTeam" className="form-label">Dev Team</label>
                    <select
                        disabled = {teams.lenght === 0}  
                        className="form-control form-select form-select mb-3" 
                        id="inputDevTeam" 
                        name="lastName" 
                        placeholder="Last Name"           
                        value = {props.team}
                        onChange = {(e) => props.setTeam(e.target.value)}          
                    >
                        <option value="-1">Select team</option>
                        {teams}
                    </select>
                </div>

                <button className="btn btn-primary mb-3" >Add Product</button>

            </form>
            <Alert 
                variant="success" 
                id="invalidCodeAlert" 
                className={`fixed-bottom ${props.addSuccess && "invalidCodeAlertHidden"}`} 
            >
               Product added successfuly. 
            </Alert>
        </div>
    )
}

export default AddProductComponent