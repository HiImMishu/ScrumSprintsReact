import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

const BacklogComponent = (props) => {
    var productItems = [], toDoItems = [], testItems = [], buildItems = [], doneItems = []

    const getDraggable = (item, index) => {
        return (
            <Draggable key={item.itemId} draggableId={item.itemId.toString()} index={parseInt(index)}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <ListGroup.Item className={snapshot.isDragging ? "draggedItem" : ""}>{item.description}</ListGroup.Item>
                    </div>
                )}
            </Draggable>
        )
    }

    if (props.productItems.length > 0 && props.productItems[0].itemId) {
        props.productItems?.forEach((item, i) => {
            
            if (item.status === "Added") {
                productItems.push(getDraggable(item, productItems.length))
            }

            if (parseInt(item.sprint?.id) !== parseInt(props.backlog.id)) {
                return
            }

            else if(item.status === "ToDo") {
                toDoItems.push(getDraggable(item, toDoItems.length))
            }
            else if(item.status === "Test") {
                testItems.push(getDraggable(item, testItems.length))
            }
            else if(item.status === "Build") {
                buildItems.push(getDraggable(item, buildItems.length))
            }
            else if(item.status === "Done") {
                doneItems.push(getDraggable(item, doneItems.length))
            }
        });
    }

    return (
        <div>
            <Card className="mb-5">
                <Card.Header>
                    <h4>Product: {props.name}</h4>
                    <h5 className="text-secondary">Sprint: {props.backlog.description}</h5>
                </Card.Header>
                <Card.Body>
                    <span>Product Owner:</span> <span className="ml-2"> <i>{props.owner.firstName} {props.owner.lastName}</i></span>
                    <br />
                    <span>Owner Email:</span> <span className="ml-4"> {props.owner.email}</span>
                </Card.Body>
                <Card.Footer>
                    Below you can add items to backlog or change their state by dragging and dropping them.                
                </Card.Footer>
            </Card>

            <DragDropContext onDragEnd={props.onDragEnd}>
                <div className="row ml-0 mb-auto">
                <Card className="mr-3 col pd-0 mh-3" style={{minWidth: '10rem', maxWidth: '15rem'}}>
                    <Card.Header className="bg-secondary text-light">Product Items</Card.Header>
                    <Droppable droppableId="Added">
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <ListGroup variant="flush">
                                    {productItems}
                                </ListGroup> 
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    </Card>
                 
                    <Card className="mr-3 col pd-0 mb-auto mh-3" style={{minWidth: '10rem', maxWidth: '15rem'}}>
                        <Card.Header className="bg-primary text-light">To Do</Card.Header>
                        <Droppable droppableId="ToDo">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <ListGroup variant="flush">
                                        {toDoItems}
                                    </ListGroup> 
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>                 
                    </Card>

                    <Card className="mr-3 col pd-0 mb-auto mh-3" style={{minWidth: '10rem', maxWidth: '15rem'}}>
                        <Card.Header className="bg-primary text-light">Test</Card.Header>
                        <Droppable droppableId="Test">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <ListGroup variant="flush">
                                        {testItems}
                                    </ListGroup> 
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>                    
                    </Card>

                    <Card className="mr-3 col pd-0 mb-auto mh-3" style={{minWidth: '10rem', maxWidth: '15rem'}}>
                        <Card.Header className="bg-primary text-light">Build</Card.Header>
                        <Droppable droppableId="Build">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <ListGroup variant="flush">
                                        {buildItems}
                                    </ListGroup> 
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>                  
                    </Card>

                    <Card className="mr-3 col pd-0 mb-auto mh-3" style={{minWidth: '10rem', maxWidth: '15rem'}}>
                        <Card.Header className="bg-primary text-light">Done</Card.Header>
                        <Droppable droppableId="Done">
                            {(provided, snapshot) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    <ListGroup variant="flush">
                                        {doneItems}
                                    </ListGroup> 
                                    {provided.placeholder}
                                </div>
                            )}
                    </Droppable>                    
                    </Card>
                </div>
            </DragDropContext>
        </div>
    )
}

export default BacklogComponent