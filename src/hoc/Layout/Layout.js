import React, { useState } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(true);

    const sideDrawerCloserHandler = () => {
        setShowSideDrawer(false);
    }

    const sideDrawerTogglerHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerTogglerHandler}/>
            <SideDrawer closed={sideDrawerCloserHandler} open={showSideDrawer}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;