import React from 'react'
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {Link} from 'react-router-dom'

const TeamInfoComponent = (props) => {
    const members = props.members.map((m, i) => {
        return (
            <tr key={m.id}>
                <td>{i+1}</td>
                <td>{m.firstName} {m.lastName}</td>
                <td>{m.email}</td>
                {(parseInt(props.userId) === parseInt(props.teamLeader.id)) &&
                <td>
                    <span className="d-flex justify-content-center">
                        <ButtonGroup>
                            <Button onClick={() => props.removeTeamMember(m.id)} variant="danger">Remove member</Button>
                            <Button onClick={(event) => props.updateTeam(event, m.id)} variant="primary">Promote to leader</Button>
                        </ButtonGroup>
                    </span>
                </td>}
            </tr>
        )
    })

    const backlogs = (props.prod.backlogs.length > 0 && props.prod.backlogs[0].id) ? props.prod.backlogs.map((b, i) => {
        return (
            <tr key={b.id}>
                <td>{i+1}</td>
                <td>{b.description}</td>
                <td>
                    {b.startTime && Intl.DateTimeFormat("en-Gb", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                    }).format(new Date(b.startTime))}
                </td>
                <td>
                    {b.endTime && Intl.DateTimeFormat("en-Gb", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                    }).format(new Date(b.endTime))}
                </td>
                <td>
                    <span className="d-flex justify-content-center">
                        <Button as={Link} to={{pathname: `/products/${props.prod.id}/backlogs/${b.id}`, product: props.prod}} variant="primary">Enter Backlog</Button>
                    </span>
                </td>
            </tr>
        )
    }) : null

    
    return (
        <div>
            <Card className="mb-3">
                <Card.Header>
                    <h4>Team: {props.name}</h4>
                    <h6>Team Code: <span className="text-primary">{props.teamCode}</span></h6>
                </Card.Header>
                <Card.Body>
                    <span>Team Leader:</span> <span className="ml-2"> <i>{props.teamLeader.firstName} {props.teamLeader.lastName}</i></span>
                    <br />
                    <span>Leader Email:</span> <span className="ml-2"> {props.teamLeader.email}</span>
                </Card.Body>
                <Card.Footer>
                    <p>
                        {(props.id && props.product) && <span>Team is currently working on the <i className="text-primary">{props.product.name}</i><br /><br /></span>}
                        {(parseInt(props.userId) === parseInt(props.teamLeader.id)) && <span>Below you can change teams name.</span>}
                    </p>
                    {(parseInt(props.userId) === parseInt(props.teamLeader.id)) &&
                    <form onSubmit={(event) => props.updateTeam(event, -1)}>
                            <span className="d-flex justify-content-start">
                                <div>
                                    <label htmlFor="inputTeamName" className="form-label">Team name</label>
                                    <div className="input-group">
                                        <span className="input-group-text form-addon"><i className="fas fa-quote-left"/></span>
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
                                <button style={{marginTop: "auto"}} className="btn btn-primary ml-3 mr-3" >Save changes</button>
                                <button type="button" onClick={props.deleteTeam} style={{marginTop: "auto"}} className="btn btn-danger" >Delete team</button>                   
                            </span>                             
                    </form>}
                </Card.Footer>
            </Card>
            <Accordion className="mb-4">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        <i className="far fa-hand-pointer"></i>
                        <span className="ml-2">Click here to view team members.</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        {(parseInt(props.userId) === parseInt(props.teamLeader.id)) && <th>Action</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {members}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="5">
                                            <i className="text-secondary"> To join team please enter team code {<Link to="/">Here</Link>}.</i>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            {(props.id && props.product) && 
            <div>
                <h5> Product Backlogs: </h5>
                <Table striped bordered hover className="mb-5">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Description</th>
                            <th>Start Time</th>
                            <th>EndTime</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backlogs}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="5">
                                <i className="text-secondary"> To enter backlog please click enter backlog button.</i>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
            </div>}
        </div>
    )
}

export default TeamInfoComponent