import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';

class CreateReservation extends Component {
    constructor() {
        super();

        this.state = {
            res: {
                name: '',
                date: '',
                time: '',
                numGuests: 1,
                note: ''
            },
            showModal: false,
            showError: false,
        }
    }

    componentDidMount = () => {
        
        let date2;
        let dateFinal;
        if(this.props.targetDate){
            const date = new Date(this.props.targetDate);
            const jsonD = date.toJSON();
            const jsonDArr = jsonD.split('');
            date2 =  jsonDArr.splice(0, 10);
            dateFinal = date2.join('');
        } else {
            date2 = "there is no date";
        }
        if(this.props.showCreateModal){
            this.setState({
                showModal: true,
                res:{
                    date: dateFinal,
                }
            })
        }
    }

    handleInput = (e) => {
        this.setState({
            res: {
                ...this.state.res,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    hideModal = async (e) => {
        await this.setState({
            showModal: !this.state.showModal,
        })
        this.props.handleCancelModal();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.res.name === "" || this.state.res.date === "" || this.state.res.time === "" ){
            this.setState({
                showError: true,
            })
        } else {
            this.setState({
                showError: false,
                showModal: !this.state.showModal,
                res: {
                    name: this.props.resName,
                    date: this.props.selectedDate
                }
            })
            this.props.addRes(this.state.res);
        }
    }

    render(){
        
        return (
            <Modal isOpen={this.state.showModal} className="modal-main">
                <ModalHeader>Make a new Reservation at Condue</ModalHeader>
                {this.state.showError ? <h1>Must input required fields</h1> : null }
                <ModalBody>
                    <div>
                        <form >
                            <label>
                                New Reservation for {this.props.resName} on {this.props.selectedDate}
                            </label><br />
                            <label>
                                Enter Time:
                                <input type="text" name="time" onChange={this.handleInput}/>
                            </label><br/>
                            <label>
                                Enter Number of Guests:
                                <input type="number" name="numGuests" value={this.state.res.numGuests} onChange={this.handleInput}/>
                            </label><br/>
                            <label>
                                Additional Notes:
                                <input type="text" name="note" onChange={this.handleInput}/>
                            </label><br/>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                            <Button color="secondary" onClick={this.hideModal}>Cancel</Button>
                        </form>
                    </div>
                </ModalBody>
                    

            </Modal>        
        )    
    }
}

export default withRouter(CreateReservation);