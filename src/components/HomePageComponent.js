import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {Link} from 'react-router-dom'

const HomePageComponent = (props) => {
    const productItems = props.products.map(p => {return (
        <ListGroup.Item key={p.id} action as={Link} to={{pathname: `/products/${parseInt(p.id)}`, teams: props.teamsLeaded}}>
            {p.name}
        </ListGroup.Item>
    )})
    const teamsLeaded = props.teamsLeaded.map(lt => {return (
        <ListGroup.Item key={lt.id} action as={Link} to={`/teams/${parseInt(lt.id)}`}>
            {lt.name}
            <footer className="blockquote-footer mt-1 form-label">
                Created At: <cite>
                                {Intl.DateTimeFormat("en-Gb", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                }).format(new Date(lt.createdAt))}
                            </cite>
            </footer>
        </ListGroup.Item>
    )})
    const teasmParticipated = props.teamParticipated.map(tp => {return (
        <ListGroup.Item key={tp.id} action as={Link} to={`/teams/${parseInt(tp.id)}`}>
            {tp.name}
            <footer className="blockquote-footer mt-1 form-label">
                Created At: <cite>
                                {Intl.DateTimeFormat("en-Gb", {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "numeric"
                                }).format(new Date(tp.createdAt))}
                            </cite>
            </footer>
        </ListGroup.Item>
    )})
    
    return (
        <div className="full-width">
            <div className="row mt-5">
                <div className="col mb-3">
                    <Card style={{minWidth: '18rem', maxWidth: '28rem'}}>
                        <Card.Header className="bg-primary text-light">Products Owned</Card.Header>
                        <ListGroup variant="flush">
                            {productItems}
                            <ListGroup.Item as={Link} to="/add-product" action className="bg-secondary bg-gradient text-light">
                                <i className="fas fa-plus mr-3"></i>
                                Add Product
                            </ListGroup.Item>
                        </ListGroup>                    
                    </Card>
                </div>
                <div className="col mb-3">
                    <Card style={{minWidth: '18rem', maxWidth: '28rem'}}>
                        <Card.Header className="bg-primary text-light">Teams Leaded</Card.Header>
                        <ListGroup variant="flush">
                            {teamsLeaded}
                            <ListGroup.Item as={Link} to="/add-team" action className="bg-secondary bg-gradient text-light">
                                <i className="fas fa-plus mr-3"></i>
                                Add Team
                            </ListGroup.Item>
                        </ListGroup>                    
                    </Card>
                </div>
                <div className="col mb-3">
                    <Card style={{minWidth: '18rem', maxWidth: '28rem'}}>
                        <Card.Header className="bg-primary text-light">Teams Participated</Card.Header>
                        <ListGroup variant="flush">
                            {teasmParticipated}
                            <Card bg="secondary" className="bg-gradient" text="light">
                                <Card.Body>
                                    <Card.Title>Join Team</Card.Title>
                                    <Form className="form-inline">
                                        <FormControl 
                                            style={{width: '60%'}} 
                                            type="text" 
                                            placeholder="Team Code" 
                                            className="mr-3" 
                                            value={props.teamCode}
                                            onChange={(e) => props.setTeamCode(e.target.value)}
                                        />
                                        <Button onClick={props.joinTeam}>Submit</Button>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </ListGroup>                    
                    </Card>
                </div>
            </div>
            <Alert 
                variant="danger" 
                id="invalidCodeAlert" 
                className={`fixed-bottom ${props.invalidCode && "invalidCodeAlertHidden"}`} 
            >
                Team with provided team code doesn't exist.
            </Alert>
        </div>
    )
}

export default HomePageComponent