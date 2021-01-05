import React from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import {Link} from 'react-router-dom'

const ProductInfoComponent = (props) => {
    const backlogs = (props.backlogs.length > 0 && props.backlogs[0].id) ? props.backlogs.map((b, i) => {
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
                        <ButtonGroup>
                            <Button variant="primary">Update</Button>
                            <Button variant="primary">Info</Button>
                            <Button variant="danger">Delete</Button>
                        </ButtonGroup>
                    </span>
                </td>
            </tr>
        )
    }) : null

    const items = (props.productItems.length > 0 && props.productItems[0].itemId) ? props.productItems.map((item, i) => {
        return (
            <tr key={item.itemId}>
                <td>{i+1}</td>
                <td>{item.description}</td>
                <td>
                    {item.addedAt && Intl.DateTimeFormat("en-Gb", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                    }).format(new Date(item.addedAt))}
                </td>
                <td>
                    {item.status}
                </td>
                <td>
                    <span className="d-flex justify-content-center">
                        <ButtonGroup>
                            <Button as={Link} to={{pathName: `/products/items/"+${item.itemId}`, action: "update"}} variant="primary">Update</Button>
                            <Button variant="danger">Delete</Button>
                        </ButtonGroup>
                    </span>
                </td>
            </tr>
        )
    }) : null

    return (
        <div>
            <Card className="mb-5">
                <Card.Header>
                    <h4>Product: {props.name}</h4>
                </Card.Header>
                <Card.Body>
                    <span>Owner:</span> <span className="ml-2"> <i>{props.owner.firstName} {props.owner.lastName}</i></span>
                    <br />
                    <span>Email:</span> <span className="ml-3"> {props.owner.email}</span>
                </Card.Body>
                {(props.devTeam && props.devTeam.id) &&
                <Card.Footer>
                    A team called <i className="text-primary">{props.devTeam.name}</i> is currently working on the product.
                </Card.Footer>}
            </Card>

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
                    <tr>
                        <td>#</td>
                        <th colSpan="3">
                            Plan new sprint
                        </th>
                        <td>
                            <span className="d-flex justify-content-center">
                                <Button variant="success">Add Backlog</Button>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5">
                            <i className="text-secondary"> To see current backlog items and their progress click info next to backlog you want to review.</i>
                        </td>
                    </tr>
                </tfoot>
            </Table>

            <h5 className="md-4"> Product Items: </h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Description</th>
                        <th>Added At</th>
                        <th>Current Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                    <tr>
                        <td>#</td>
                        <th colSpan="3">
                            Add new Item
                        </th>
                        <td>
                            <span className="d-flex justify-content-center">
                                <Button variant="success">Add Item</Button>
                            </span>
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5">
                            <i className="text-secondary"> To obtain more information about items and people who work on items check product backlogs. </i>
                        </td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}

export default ProductInfoComponent