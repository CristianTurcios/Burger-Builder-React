import React, { Component, useState } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

// const Layout = (props) => {
//     const [showSideDrawer, setShowSideDrawer] = useState(true);

//     const sideDrawerCloserHandler = () => {
//         setShowSideDrawer(false);
//     }

//     const sideDrawerTogglerHandler = () => {
//         setShowSideDrawer(!showSideDrawer);
//     }

//     return (
//         <Aux>
//             <Toolbar drawerToggleClicked={sideDrawerTogglerHandler}/>
//             <SideDrawer closed={sideDrawerCloserHandler} open={showSideDrawer}/>
//             <main className={classes.Content}>
//                 {props.children}
//             </main>
//         </Aux>
//     )
// }

// export default Layout;

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerCloserHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerTogglerHandler = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            }
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerCloserHandler}/>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideDrawerCloserHandler} open={this.state.showSideDrawer}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);