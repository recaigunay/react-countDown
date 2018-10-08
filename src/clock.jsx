import React, { Component } from 'react';
import './App.css';
import ButtonGroup from 'react-bootstrap/es/ButtonGroup';
import Button from 'react-bootstrap/es/Button';
import FormControl from 'react-bootstrap/es/FormControl';
import HelpBlock from 'react-bootstrap/es/HelpBlock';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Well from 'react-bootstrap/es/Well';

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            myerrors: [],
            datevalue: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }
    ChangeDeadline(e) {
        //debugger;
        //e.preventDefault();
        const input = document.getElementById("newdate");
        const val = input.value;
        input.value = "";

        this.setState({ myerrors: [] });
        var validatinErrorList = this.getValidationState();
        this.setState({
            myerrors: validatinErrorList
        })

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

    handleChange(e) {
        this.setState({ datevalue: e.target.value });
    }

    getValidationState() {
        var arr = [];
        const length = this.state.datevalue.length;
        if (length === 10) {
            var datetimeStr = this.state.datevalue.substr(0, 4);
            var year = datetimeStr.substr(0, 4);
            const dtNow = new Date();
            if (year < dtNow.year) {
                arr.push("The year you entered should be min" + dtNow.year);
            }
            var sign1 = datetimeStr.substr(4, 1);
            if (sign1 !== "." && sign1 !== "/" && sign1 !== "-") {
                arr.push("The first sign between year and month is wrong. (the right signs are /.-)")
            }
            var month = datetimeStr.substr(5, 2);
            if (month > 12) {
                arr.push("The month you entered should be less than 13");
            }
            var sign2 = datetimeStr.substr(7, 1);
            if (sign2 !== "." && sign2 !== "/" && sign2 !== "-") {
                arr.push("The second sign between month and day is wrong. (the right signs are /.-)")
            }
            var day = datetimeStr.substr(8, 2);
            if (day > 31) {
                arr.push("The day you entered should be less than 32");
            }


        } else if (length !== 0) {
            arr.push("The date length you entered is wrong.")
        }
        return arr;
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

                <form>
                    <FormGroup
                        controlId="newdate"
                    >
                        <Well> <div>Count Down to {this.props.deadline}</div>
                            <div className="Clock-Days">{this.state.days} Days</div>
                            <div className="Clock-Hours">{this.state.hours} Hours</div>
                            <div className="Clock-Minutes">{this.state.minutes} Minutes</div>
                            <div className="Clock-Seconds">{this.state.seconds} Seconds</div>

                        </Well>


                        <FormControl
                            type="text"
                            value={this.state.datevalue}
                            placeholder="new date (2019/01/20)"
                            onChange={this.handleChange}
                            with="50"
                        />

                        <FormControl.Feedback />
                        <HelpBlock>
                            {this.state.myerrors.map((error, i) => <p key={i}>{error.value}</p>)}
                        </HelpBlock>


                        <ButtonGroup>
                            <Button bsStyle="success" onClick={() => this.ChangeDeadline()}>Update Date</Button>
                        </ButtonGroup>



                    </FormGroup>
                </form>

            </div>
        )
    }

}
export default Clock;