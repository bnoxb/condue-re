import React, { Component } from 'react';
import dateFns from "date-fns";
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';


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
                <li key={i}>
                    <h1>Name: {res.name}</h1>
                    <p>Date: {dateFns.format(res.date, dateFormat)}</p>
                    <p>Time: {res.time}</p><button onClick={this.handleAccept.bind(null, res)}>Accept</button>
                    <button onClick={this.hideModal}>Close</button>
                </li>
            )
        });
        return(
            <Modal isOpen={this.state.showModal} className="modal-reslist">
                <ModalHeader>Pending Reservations</ModalHeader>
                <ModalBody>
                    <ul>
                        {resList}
                    </ul>
                </ModalBody>
            </Modal>
        )
    }
};  

export default ResListForDay;