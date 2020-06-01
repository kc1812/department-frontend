import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Login.css';
import * as ActionCreators from '../../redux/actions/index';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { updateObject } from '../../utils/common';


class Login extends Component {
    state = {
        registForm: {
            department: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'placeholder', displayValue: 'Select Department' }
                    ]
                },
                value: 'placeholder',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            firstName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your FirstName'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            lastName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your LastName'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            emailId: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true,
                    emailCheck: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }


        },
        loginForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    emailCheck: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        loginFormIsValid: false,
        registerFormIsValid: false
    }

    componentDidMount() {

        let options = [{ value: 'placeholder', displayValue: 'Select Department' }];
        this.props.allDepartments.forEach((dep) => {
            options.push({ value: dep._id, displayValue: dep.name.trim() })
        });

        if (options.length > 1) {
            this.setState((prevState) => {
                let updatedForm = { ...prevState.registForm };
                const updatedType = { ...updatedForm.department };
                const updatedformConfig = { ...updatedType.elementConfig, options: options };
                updatedType.elementConfig = updatedformConfig;
                updatedForm.department = updatedType;
                return {
                    registForm: updatedForm
                }
            })
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.allDepartments !== nextProps.allDepartments) {
            let options = [{ value: 'placeholder', displayValue: 'Select Department' }];
            nextProps.allDepartments.forEach((dep) => {
                options.push({ value: dep._id, displayValue: dep.name.trim() })
            });

            this.setState((prevState) => {
                let updatedForm = { ...prevState.registForm };
                const updatedType = { ...updatedForm.department };
                const updatedformConfig = { ...updatedType.elementConfig, options: options };
                updatedType.elementConfig = updatedformConfig;
                updatedForm.department = updatedType;
                return {
                    registForm: updatedForm
                }
            })
        }
    }

    checkValidity = (value, rules, type = 'input') => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            if (type === 'select') {
                isValid = (value.trim() !== 'placeholder') && isValid;
            } else {
                isValid = (value.trim() !== '') && isValid;
            }

        }
        if (rules.emailCheck) {
            isValid = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) && isValid;
        }

        return isValid;

    }

    inputChangedHandler = (event, inputIndentifier) => {
        // console.log(event.target.value);
        const inputValue = event.target.value

        this.setState((prevState) => {
            const currentForm = this.props.showRegisterForm ? 'registForm' : 'loginForm'
            const updatedForm = { ...prevState[currentForm] };
            const updatedFormElement = updateObject(updatedForm[inputIndentifier], { value: inputValue });
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, updatedFormElement.elementType);
            updatedFormElement.touched = true;
            updatedForm[inputIndentifier] = updatedFormElement;
            let formValid = true;
            for (let inputIndentifier in updatedForm) {
                formValid = updatedForm[inputIndentifier].valid && formValid
            }
            return {
                [currentForm]: updatedForm,
                [this.props.showRegisterForm ? 'registerFormIsValid' : 'loginFormIsValid']: formValid
            }
        })
    }
    formTypeHandler = () => {
        let currentForm = this.props.showRegisterForm ? 'registForm' : 'loginForm';
        if (currentForm === 'loginForm') {
            //clearing state
            this.setState((prevState) => {
                const updatedForm = { ...prevState.loginForm };
                const updatedFormElementEmail = updateObject(updatedForm.email, { value: '', valid: false, touched: false });
                const updatedFormElementPass = updateObject(updatedForm.password, { value: '', valid: false, touched: false })
                updatedForm.email = updatedFormElementEmail;
                updatedForm.password = updatedFormElementPass;
                return {
                    loginForm: updatedForm
                }
            })
        } else {
            //clearing state
            this.setState((prevState) => {
                const updatedForm = { ...prevState.registForm };
                const updatedFormElementDep = updateObject(updatedForm.department, { value: 'placeholder' });
                const updatedFormElementFN = updateObject(updatedForm.firstName, { value: '', valid: false, touched: false })
                const updatedFormElementLN = updateObject(updatedForm.lastName, { value: '', valid: false, touched: false });
                const updatedFormElementEmail = updateObject(updatedForm.emailId, { value: '', valid: false, touched: false })
                const updatedFormElementPass = updateObject(updatedForm.password, { value: '', valid: false, touched: false });
                updatedForm.department = updatedFormElementDep;
                updatedForm.firstName = updatedFormElementFN;
                updatedForm.lastName = updatedFormElementLN;
                updatedForm.emailId = updatedFormElementEmail;
                updatedForm.password = updatedFormElementPass;
                return {
                    registForm: updatedForm
                    // showRegisterForm: !prevState.showRegisterForm
                }
            });
        }
        this.props.toggleLogin();
    }
    formSubmitHandler = (event) => {
        event.preventDefault();
        let currentForm = this.props.showRegisterForm ? 'registForm' : 'loginForm';
        if (currentForm === 'loginForm') {
            this.props.authenticate(this.state.loginForm.email.value,
                this.state.loginForm.password.value
            );

            // //clearing state
            // this.setState((prevState) => {
            //     const updatedForm = { ...prevState.loginForm };
            //     const updatedFormElementEmail = updateObject(updatedForm.email, { value: '' });
            //     const updatedFormElementPass = updateObject(updatedForm.password, { value: '' })
            //     updatedForm.email = updatedFormElementEmail;
            //     updatedForm.password = updatedFormElementPass;
            //     return {
            //         loginForm: updatedForm
            //     }
            // })
        } else {
            this.props.register(this.state.registForm.department.value,
                this.state.registForm.firstName.value,
                this.state.registForm.lastName.value,
                this.state.registForm.emailId.value,
                this.state.registForm.password.value
            );
            //clearing state
            // this.setState((prevState) => {
            //     const updatedForm = { ...prevState.registForm };
            //     const updatedFormElementDep = updateObject(updatedForm.department, { value: 'placeholder' });
            //     const updatedFormElementFN = updateObject(updatedForm.firstName, { value: '' })
            //     const updatedFormElementLN = updateObject(updatedForm.lastName, { value: '' });
            //     const updatedFormElementEmail = updateObject(updatedForm.emailId, { value: '' })
            //     const updatedFormElementPass = updateObject(updatedForm.password, { value: '' });
            //     updatedForm.department = updatedFormElementDep;
            //     updatedForm.firstName = updatedFormElementFN;
            //     updatedForm.lastName = updatedFormElementLN;
            //     updatedForm.emailId = updatedFormElementEmail;
            //     updatedForm.password = updatedFormElementPass;
            //     return {
            //         registForm: updatedForm
            //         // showRegisterForm: !prevState.showRegisterForm
            //     }
            // });
        }

    }
    render() {
        let formElementsArray = [];
        let currentForm = this.props.showRegisterForm ? 'registForm' : 'loginForm';
        const buttonDisabled = this.props.showRegisterForm ? !this.state.registerFormIsValid : !this.state.loginFormIsValid;
        for (let key in this.state[currentForm]) {
            formElementsArray.push({
                id: key,
                config: this.state[currentForm][key]
            });
        }
        let form = (

            <form className={classes.LoginForm}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                {/* <div className={this.props.showRegisterForm ?
                    this.props.errorRegister ? classes.ErrorVisible : classes.ErrorHide
                    : this.props.error ? classes.ErrorVisible : classes.ErrorHide}>
                    {this.props.showRegisterForm ?
                        this.props.errorRegister ? this.props.errorRegister : ''
                        : this.props.error ? this.props.error : ''}
                </div> */}
                <Button clicked={this.formSubmitHandler}
                    disabled={buttonDisabled}>
                    {this.props.showRegisterForm ? 'SignUp' : 'Login'}
                </Button>
                <div onClick={this.formTypeHandler} className={classes.ChangeFormType}>
                    {this.props.showRegisterForm ? 'Login' : 'SignUp'}</div>
            </form>

        );
        let redirection = null;
        if (this.props.isAuthenticated) {
            redirection = <Redirect to='/' />
        }

        let loader = null;
        if (this.props.isLoading) {
            loader = <Loader />
        }
        return (
            <>
                {redirection}
                {loader}
                <div className={classes.LoginContainer}>
                    <div className={[classes.LoginFormContainer, this.props.showRegisterForm ? classes.RegisterHeight : classes.LoginHeight].join(' ')}>
                        <div className={classes.ImageContainer}>
                            <img className={classes.Image} src="https://www.switchon.io/mern/static/media/Logo_switchon.437ac5be.png" />
                        </div>
                        <div className={classes.Heading}>{this.props.showRegisterForm ? 'Register' : 'Login'} to Switchon Assignment</div>
                        {form}
                    </div>

                </div>
            </>

        );


    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
        isLoading: state.auth.loading,
        // error: state.auth.error,
        // errorRegister: state.auth.errorRegister,
        showRegisterForm: state.auth.showRegisterForm,
        allDepartments: state.department.departments,
    }
};

const mapDispatchToProps = dispatch => ({

    authenticate: (email, password) => dispatch(ActionCreators.auth(email, password)),
    register: (department, firstName, lastName, emailId, password) => dispatch(ActionCreators.register(department, firstName, lastName, emailId, password)),
    toggleLogin: () => dispatch(ActionCreators.toggleLogin())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);