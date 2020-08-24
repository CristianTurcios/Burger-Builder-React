import React from 'react'
import classes from './input.module.css';

const Input = (props) => {
    let inputElement = null;
    let validationError = null;
    const inputClasses = [classes.InputElement];

    if(props.invalid && props.shouldValidated && props.touched) {
        inputClasses.push(classes.Invalid);
        validationError = <p>Please enter a valid value!</p>;
    }

    switch (props.elementType) {
        case 'input':
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            break;
        case 'textarea':
            inputElement = <textarea 
                className={classes.InputElement} 
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                />
            break;
        case 'select':
            inputElement = (
                <select 
                    className={classes.InputElement} 
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                >
                    {
                        props.elementConfig.options.map((element) => {
                            return <option key={element.value} value={element.value}>{element.displayValue}</option>
                        })

                    }
                </select>
            )
            break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig}
                value={props.value}
                />
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {
                inputElement
            }
            {
                validationError
            }
        </div>
    )
} 


export default Input;