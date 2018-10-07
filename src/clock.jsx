import React, { Component } from 'react';
import './App.css';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    ChangeDeadline(e) {
        //debugger;
        //e.preventDefault();
        const input = document.getElementById("newdate");
        const val = input.value;
        input.value = "";
        this.props.ChangeDeadline(val);
    }
    componentWillMount() {
        this.CalculateTime(this.props.deadline);
    }
    componentDidMount() {
        setInterval(() => this.CalculateTime(this.props.deadline), 1000);
    }
    AddZero(num) {
        if (num < 10) return "0" + num;
        else return num;
    }
    CalculateTime(deadline) {
        //debugger;
        const dtNow = new Date();
        let dtLast = new Date(deadline);
        const diff = dtLast.getTime() - dtNow.getTime();
        if (diff > 0) {
            const seconds = this.AddZero(Math.floor((diff / 1000) % 60));
            const minutes = this.AddZero(Math.floor((diff / 1000 / 60) % 60));
            const hours = this.AddZero(Math.floor(diff / (1000 * 60 * 60) % 24));
            const days = this.AddZero(Math.floor(diff / (1000 * 60 * 60 * 24)));

            this.setState({
                days: days,
                minutes: minutes,
                hours: hours,
                seconds: seconds
            })
        }
    }
    render() {
        return (
            <div className="App">
                <div>CountDown to {this.props.deadline}</div>
                <div className="Clock-Days">{this.state.days} Days</div>
                <div className="Clock-Hours">{this.state.hours} Hours</div>
                <div className="Clock-Minutes">{this.state.minutes} Minutes</div>
                <div className="Clock-Seconds">{this.state.seconds} Seconds</div>
                <div>
                    <input id="newdate" placeholder='new date (2019/01/20)'></input>
                    <button onClick={() => this.ChangeDeadline()}>Submit</button>
                </div>

            </div>
        )
    }

}
export default Clock;