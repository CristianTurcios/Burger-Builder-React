import React from 'react';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationITems from '../NavigationItems/NavigationITems';
import Logo from '../../../components/Logo/Logo';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];

    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationITems/>
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer;