import React from "react";
import Canvas from "../Canvas/Canvas";

import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'
import './Main.css';
import DataTable from "../DataTable/DataTable";
import {setX, setY, setR, setErrorX, setErrorY, setErrorR} from '../../redux/action';
import { fetchAddAttempts , fetchDeleteAttempts} from '../../redux/action';
import { connect }  from 'react-redux';

const Graph = ({currentEnteredX,
                   currentEnteredY,
                   currentEnteredR,
                   addAttempt,
                   deleteAttempts,
                   setX,
                   setY,
                   setR,
                   errorMessageX,
                   errorMessageY,
                   errorMessageR,
                   setErrorX,
                   setErrorY,
                   setErrorR,
                   errorX,
                   errorY,
                   errorR,
               }) => {

    const handleSubmit = () => {
        if (!errorX && !errorY && !errorR) {
            addAttempt({x: currentEnteredX, y: currentEnteredY, r: currentEnteredR});
        } else {
            if (errorX) {
                alert("X must be a number in range [-3; 5]");
            } else if (errorY) {
                alert("Y must be a number in range [-3; 5]")
            } else{
                alert("R must be a number in range [2; 5]")
            }
        }
    };

    const handleXTextField = (value, event) => {
        if (event.target.value === "") {
            setErrorX(true);
            return;
        }
        if (!isNaN(event.target.value) && event.target.value >= -3 && event.target.value <= 5) {
            setErrorX(false);
            setX(event.target.value);
        } else {
            setErrorX(true);
        }
    }

    const handleYTextField = (value, event) => {
        if (event.target.value === "") {
            setErrorY(true);
            return;
        }
        if (!isNaN(event.target.value) && event.target.value >= -3 && event.target.value <= 5) {
            setErrorY(false);
            setY(event.target.value);
        } else {
            setErrorY(true);
        }
    }

    const handleRTextField = (value, event) => {
        if (event.target.value === "") {
            setErrorR(true);
            return;
        }
        if (!isNaN(event.target.value) && event.target.value >= 2 && event.target.value <= 5) {
            setErrorR(false);
            setR(event.target.value);
        } else {
            setErrorR(true);
        }
    }

    const handleClear = () => {
        deleteAttempts();
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div>
        <div className="cont">
            <div id="graph__style">
                <Canvas/>
            </div>
            <div className="value-picker">
                <form id="form">
                    <div className="form-style">
                        <span className="input__value__label">X</span>
                        <Input type="text" className="value__fields" onChange={handleXTextField}/>
                    </div>
                    <div className="form-style">
                        <span className="input__value__label">Y</span>
                        <Input type="text" className="value__fields" onChange={handleYTextField}/>
                    </div>
                    <div className="form-style">
                        <span className="input__value__label">R</span>
                        <Input type='text' className="value__fields" onChange={handleRTextField}/>
                    </div>
                    <div className="form-style">
                        <Button className="log__out" onMouseUp={handleSubmit} label='Submit'/>
                        <Button className="log__out" onMouseUp={handleClear} label='Clear'/>
                    </div>
                </form>
            </div>
        </div>

            <div style={{ padding: "5%"}}>
                <DataTable/>
            </div>
            <div>
                <Button  className="log__out" onMouseUp={handleLogout} label='Log Out'/>
            </div>
        </div>
    )
}

function mapDispatchToButtonsProps(dispatch) {
    return {
        addAttempt: (attempt) => dispatch(fetchAddAttempts(attempt)),
        setX: (x) => dispatch(setX(x)),
        setY: (y) => dispatch(setY(y)),
        setR: (r) => dispatch(setR(r)),
        setErrorX: (errorX) => dispatch(setErrorX(errorX)),
        setErrorY: (errorY) => dispatch(setErrorY(errorY)),
        setErrorR: (errorR) => dispatch(setErrorR(errorR)),
        deleteAttempts: () => dispatch(fetchDeleteAttempts())
    }
}

function mapButtonStateToFormProps(state) {
    return {
        currentEnteredX: state.x,
        currentEnteredY: state.y,
        currentEnteredR: state.r,
        errorX: state.errorX,
        errorY: state.errorY,
        errorR: state.errorR,
        errorMessageX: state.errorMessageX,
        errorMessageY: state.errorMessageY,
        errorMessageR: state.errorMessageR
    }
}

export default connect(mapButtonStateToFormProps, mapDispatchToButtonsProps)(Graph);


