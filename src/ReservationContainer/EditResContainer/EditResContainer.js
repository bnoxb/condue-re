import React, { Component } from 'react';
import EditList from './EditList/EditList';
import EditRes from './EditRes/EditRes';

class EditResContainer extends Component {
    constructor(){
        super();

        this.state = {
            myReses: [],
            resToEdit: {
                name: '',
                date: '',
                time: '',
                numGuests: 1,
                note: ''
            },
            guestName: '',
            needRes: false,
            canEdit: false,
            showModal: false,
        }
    }

    componentDidMount(){
        if(this.props.resName.length > 0){
            this.handleName();
        }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({
            myReses: [],
        })
        this.canEdit();
    }

    handleName = async () => {
        await this.setState({
            guestName: this.props.resName,
        })
        this.canEdit();
    }

    canEdit = async () => {
        const myRes = this.props.reses.filter((res) => res.name === this.state.guestName);
        if(myRes.length > 0) {
            await this.setState({
                needRes: false,
                myReses: myRes,
                canEdit: true
            })
        } else {
            this.setState({
                needRes: true,
                canEdit: false,
            })
        }
    }

    handleEditFormInput = async (resEditing, e) => {
        await this.setState({
            resToEdit: {
                ...resEditing,
                [e.target.name]: e.target.value
            },
        })
    }

    showModal = (res) => {
        console.log('in show modal!');
        this.setState({
            showModal: true,
            resToEdit: res
        })
    }

    closeModalAndUpdate = async (resToEdit) => {
        try{
            // the fetch
            const resResponse = await fetch((process.env.REACT_APP_BACKEND + `api/v1/reservations/${resToEdit._id}`), {
                method: "PUT",
                body: JSON.stringify(resToEdit),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // error catching
            if(!resResponse.ok){
                throw Error(resResponse.statusText);
            }
            // parse it
            const parsedResponse = await resResponse.json();
            console.log(parsedResponse);
            //make new array and replace the res that matches id with the parsedResponse
            const newMyReses = this.state.myReses.map((res)=> {
                if(res._id === resToEdit._id){
                    res = parsedResponse.data;
                }
                return res;
            });

            this.setState({
                showModal: false,
                myReses: newMyReses
            })

        }catch(err){
            console.log(err);
        }
    }

    deleteRes = async (resToDeleteId) => {
        try{
            const deleteResponse = await fetch((process.env.REACT_APP_BACKEND + `api/v1/reservations/${resToDeleteId}`), {
                method: 'DELETE'
            });
            if(!deleteResponse.ok){
                throw Error(deleteResponse.statusText);
            }

            const newReses = this.state.myReses.filter((res)=> res._id !== resToDeleteId );
            console.log(`newReses = ${JSON.stringify(newReses)} and resToDeleteId = ${resToDeleteId}`);

            this.setState({
                myReses: newReses,
            })
            this.props.handleDeleteRes(resToDeleteId);
            this.canEdit();
        }catch(err){
            console.log(err);
        }
    }

    render(){
        const editList = this.state.myReses.map((res, i)=> {
            return(
                <div key={i}>
                    <EditList res={res} />
                    <EditRes resToEdit={res} closeModalAndUpdate={this.closeModalAndUpdate} deleteRes={this.deleteRes}/><br/>
                </div>
            )
        })
        return(
            <div>
                <h1>Enter Your Name</h1>
                {this.state.needRes ? <h1>You need to make a reservation</h1> : null}
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="guestName" value={this.state.guestName} onChange={this.handleInput}/>
                    <input type="Submit"/>
                </form><br/>
                {editList}
                
            </div>
        )
    }
}

export default EditResContainer;