import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditRes extends Component {
    constructor(props){
        super(props);

        this.state = {
            showModal: false,
            res: {
                name: '',
                date: '',
                time: '',
                numGuests: 1,
                note: ''
            },
        }
    }

    componentDidMount = () => {
        console.log('Am I logging?');
        this.setState({
            res: this.props.resToEdit,
        })
    }

    showModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    submitUpdate = () => {
        this.setState({
            showModal: !this.state.showModal,
        })
        this.props.closeModalAndUpdate(this.state.res);
    }

    handleInput = (e) => {
        console.log(e.target.value);
        this.setState({
            res:{
                ...this.state.res,
                [e.target.name]: e.target.value,
            }
        })
    }

    handleDelete = () => {
        this.render();
        this.props.deleteRes(this.state.res._id);
    }

    render(){
        const date = new Date(this.state.res.date);
        const testDate = date.toLocaleString({
            "year" : "numeric",
            "month" : "2-digit",
            "day" : "2-digit"
        })
        // test date
        const jsonD = date.toJSON();
        let date2;
        let dateFinal;
        if(this.state.res.date){
            const jsonDArr = jsonD.split('');
            date2 =  jsonDArr.splice(0, 10);
            dateFinal = date2.join('');
        } else {
            date2 = "there is no date";
        }
        return(
            
            <div>
                <Button color="danger" onClick={this.showModal}>Edit</Button>
                <Button color="danger" onClick={this.handleDelete}>Delete</Button>
                <Modal isOpen={this.state.showModal} className="modal-main">
                    <ModalHeader >Edit {this.state.res.name}'s reservation</ModalHeader>
                    <ModalBody>
                        <form >
                            <label>
                                Edit Name:
                                <input type="text" name="name" value={this.state.res.name} onChange={this.handleInput}/><br/>
                            </label>
                            <label>
                                Edit Date:
                                <input type="date" name="date" value={dateFinal} onChange={this.handleInput} /><br/>
                            </label>
                            <label>
                                Edit Time:
                                <input type="text" name="time" value={this.state.res.time} onChange={this.handleInput}/><br/>
                            </label>
                            <label>
                                Edit Number of Guests:
                                <input type="number" name="numGuests" value={this.state.res.numGuests} onChange={this.handleInput}/><br/>
                            </label>
                            <label>
                                Edit Notes:
                                <input type="text" name="note" value={this.state.res.note} onChange={this.handleInput}/><br/>
                            </label>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.submitUpdate}>Submit</Button>
                        <Button color="secondary" onClick={this.showModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
   
}

export default EditRes;