import React, { Component } from 'react';
import dateFns from "date-fns";
import { Modal, ModalBody, ModalHeader, Button, ListGroup, ListGroupItem} from 'reactstrap';


class ResListForDay extends Component {
    constructor(){
        super();
        this.state = {
            showModal: false,
        }
    }

    componentDidMount(){
        if(this.props.showModalDay){
            this.setState({
                showModal: true,
            })
        }
    }

    hideModal = async () => {
        await this.setState({
            showModal: false,
        });
        this.props.closeModal();
    }

    handleAccept = (res) => {
        this.hideModal();
        this.props.acceptRes(res);
    }

    render(){
        const dateFormat = "dddd, MMMM Do"
        const resList = this.props.resesForDay.map((res, i)=> {
            return (
                <ListGroupItem className="modal-list-item" key={i}>
                    <h4>{res.name} ~ {res.numGuests} guests ~  {res.time}</h4>
                    <Button className="accept-button" onClick={this.handleAccept.bind(null, res)}>Accept</Button>
                </ListGroupItem>
            )
        });
        return(
            <Modal isOpen={this.state.showModal} className="modal-reslist">
                <ModalHeader className="modal-body-reslist modal-header">Pending Reservations ~ {dateFns.format(this.props.selectedDate, dateFormat)}</ModalHeader>
                <ModalBody className="modal-body-reslist">
                    <ListGroup>
                        {resList}
                    </ListGroup>
                </ModalBody>
                <Button onClick={this.hideModal}>Close</Button>
            </Modal>
        )
    }
};  

export default ResListForDay;