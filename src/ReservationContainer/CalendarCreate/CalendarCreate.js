import React, { Component } from 'react';
import CreateReservation from './CreateReservation/CreateReservation';
import dateFns from 'date-fns';
import { withRouter } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';

class CalendarCreate extends Component {
    constructor(){
        super();
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            showCreateModal: false,
            showError: false,
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
        
        if(this.props.showCreateModal && this.props.targetDate){
            this.setState({
                showCreateModal: true,
                selectedDate: new Date(this.props.targetDate),
            })
        }
    }

    renderHeader = () => {
        const dateFormat = "MMMM YYYY";

        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col col-end">
                    <div className="icon" onClick={this.nextMonth}>
                        chevron_right
                    </div>
                </div>
            </div>
        )
    }

    renderDays = () => {
        const dateFormat = "dddd";
        const days = [];

        let startDate = dateFns.startOfWeek(this.state.currentMonth);
        for(let i = 0; i < 7; i++){
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }

        return <div className="days row">{days}</div>
    }

    setDateVars = () => {
        const monthStart = dateFns.startOfMonth(this.state.currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        return {
            monthStart: monthStart,
            monthEnd: dateFns.endOfMonth(monthStart),
            startDate: dateFns.startOfWeek(monthStart),
            endDate: dateFns.endOfWeek(monthEnd),
            dateFormat: "D"
        }
    }

    dayRenderClasses = (day, monthStart, formattedDate) => {
        const cloneDay = day;   
        return(
            <div 
                className={`col cell ${
                    dateFns.isSameDay(day, new Date())
                        ? ""
                        : dateFns.isPast(day, monthStart)
                            ? "disabled"
                            : ""
                }
                ${
                    dateFns.isSameDay(day, this.state.selectedDate)  
                        ? "selected" 
                        : ""
                }`}
                
                key={day}
                onClick={(e)=> this.onDateClick(dateFns.parse(cloneDay), e)}>
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                </div>
        )
    }

    renderCells = () => {
        const { monthStart, startDate, endDate, dateFormat } = this.setDateVars();
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (rows.length < 4) {
            let oldWeekCounter = 0;
            for(let i = 0; i < 7; i++){
                formattedDate = dateFns.format(day, dateFormat);
                if(dateFns.isPast(day, monthStart)){
                    oldWeekCounter++;
                }
                const theDay = this.dayRenderClasses(day, monthStart, formattedDate);

                days.push(theDay);
                day = dateFns.addDays(day, 1);
            }
            if(oldWeekCounter < 7){
                rows.push(
                    <div className="row" key={day}>
                        {days}
                    </div>
                );
            }
            oldWeekCounter = 0;
            days=[];
        }
        return <div className="body">{rows}</div>
    }

    onDateClick = (day) => {
        this.setState({
            selectedDate: day,
            showCreateModal: true,
        })
    }

    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    handleInput = (e) => {
        this.setState({
            res: {
                ...this.state.res,
                [e.currentTarget.name]: e.currentTarget.value
            }
        })
    }

    hideModal = async (e) => {
        await this.setState({
            showModal: !this.state.showCreateModal,
        })
        this.props.handleCancelModal();
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const dateFormat = "YYYY-MM-DD"
        if(this.state.res.time === ""){
            this.setState({
                showError: true,
            })
        } else {
            await this.setState({
                showError: false,
                showModal: !this.state.showModal,
                res: {
                    ...this.state.res,
                    name: this.props.resName,
                    date: dateFns.format(this.state.selectedDate, dateFormat)
                }
            });
            this.props.addRes(this.state.res);
        }
    }

    renderModal = () => {
        const dateFormat = "dddd, MMMM Do"

        return(
            <Modal isOpen={this.state.showCreateModal} className="modal-main">
                <ModalHeader>Make a new Reservation at Condue</ModalHeader>
                {this.state.showError ? <h1>Must input required fields</h1> : null }
                <ModalBody>
                    <div>
                        <form >
                            <label>
                                New Reservation for {this.props.resName} on {dateFns.format(this.state.selectedDate, dateFormat)}
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

    render(){
        return(
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
                {this.state.showCreateModal ? 
                    this.renderModal()
                : null}
            </div>
        )
    }
}

export default withRouter(CalendarCreate);