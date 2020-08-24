import React from 'react';
import Classes from './BuildControl.module.css';
import classes from './BuildControl.module.css';

const BuildControl = (props) => {
    return ( 
        <div className={Classes.BuildControl}>
            <div className={classes.label}>{props.label}</div>
            <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
        </div>
    )
}

export default BuildControl;