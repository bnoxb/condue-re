import React, { Component } from "react";
import dateFns from "date-fns";
import './style.css';
import ResListForDay from "./ResListForDay/ResListForDay";

class Calendar extends Component {
    constructor(){
        super()
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            showModalDay: false,
            resesForDay: [],
        }
    };

    componentDidMount() {
        this.props.getRes();
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

    renderCells = () => {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for(let i = 0; i < 7; i++){
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                let hasRes = false;
                for(let k = 0; k < this.props.reses.length; k++){
                    if(dateFns.isSameDay(day, this.props.reses[k].date)){
                        hasRes = true;
                    }
                }
                days.push(
                    <div 
                    className={`col cell ${
                        dateFns.isPast(day, monthStart)
                        ? "disabled"
                        : dateFns.isSameDay(day, selectedDate) 
                            ? "selected" 
                            : hasRes
                                ? "has-res"
                                : ""
                    }`}
                    key={day}
                    onClick={(e)=> this.onDateClick(dateFns.parse(cloneDay), e)}>
                        <span className="number">{formattedDate}</span>
                        <span className="bg">{formattedDate}</span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days=[];
        }
        return <div className="body">{rows}</div>
    }

    onDateClick = async (day, e) => {
        if(e.currentTarget.classList.contains('has-res')){
            const tempRes = [];
            for(let i = 0; i < this.props.reses.length; i++){
                if(dateFns.isSameDay(day, this.props.reses[i].date)){
                    tempRes.push(this.props.reses[i]);
                }
            }
            await this.setState({
                resesForDay: tempRes,
                showModalDay: true,
            })
        }
        this.setState({
            selectedDate: day
        });
    };

    closeModal = () => {
        this.setState({
            showModalDay: false,
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

    acceptRes = (res) => {
        console.log('ACCEPTED THE RES!! for: ', res);
    }

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
                {this.state.showModalDay ? <ResListForDay acceptRes={this.acceptRes} showModalDay={this.state.showModalDay} selectedDate={this.state.selectedDate} resesForDay={this.state.resesForDay} closeModal={this.closeModal} /> : null}
            </div>
        );
    }
}

export default Calendar;