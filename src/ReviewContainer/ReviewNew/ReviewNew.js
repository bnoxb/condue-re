import React from 'react';
import { Modal, ModalBody, ModalHeader, Label, Form, Input, FormGroup } from 'reactstrap';
import '../style.css';

const ReviewNew = (props) => {
    return(
        <Modal isOpen={props.showModal} className="reviews-modal">
            <ModalHeader>Review Condue</ModalHeader>
            <ModalBody>
                <Form onSubmit={props.newReview}>
                    <FormGroup>
                        <Label for="note">
                            Review:
                        </Label>
                        <Input type="text" name="note" onChange={props.handleInput} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="stars">
                            Stars:
                        </Label>
                        <Input type="number" name="stars" onChange={props.handleInput} />
                    </FormGroup>
                    <Input type="Submit" />
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default ReviewNew;