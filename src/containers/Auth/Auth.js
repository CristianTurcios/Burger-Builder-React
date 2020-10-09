import React , { Component } from 'react';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    state = {
        control: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true
    }
    
    componentDidUpdate() {
        if(this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules && 'required' in rules && rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules && 'minLength' in rules && rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules && 'maxLength' in rules && rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.control,
            [controlName]: {
                ...this.state.control[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.control[controlName].validation),
                touched: true
            }
        };
        this.setState({
            control: updatedControls,
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.control.email.value, this.state.control.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.control) {
            formElementArray.push({
                id: key,
                config: this.state.control[key]
            });
        }

        let form = formElementArray.map(element => (
            <Input 
                key={element.id}
                elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig}
                invalid={!element.config.valid}
                shouldValidated={element.config.validation}
                touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event, element.id)}
            />
            ))

            if(this.props.loading) {
                form = <Spinner/>
            }

            let errorMessage = null;

            if(this.props.error) {
                errorMessage = (
                    <p>{this.props.error.message}</p>
                )
            }

            let authRedirect = null
            if(this.props.isAuthenticated) {
                authRedirect = <Redirect to={this.props.authRedirectPath}/>
            }

            return (
                <div className={classes.Auth}>
                {
                    authRedirect
                }
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    { form }
                    <Button buttonType="Success">Submit</Button>
                    <Button 
                        clicked={this.switchAuthModeHandler}
                        buttonType="Danger"
                    >Switch to {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'} </Button>

                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);