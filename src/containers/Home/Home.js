import React, { Component } from 'react';

import classes from './Home.css';
// import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { updateObject } from '../../utils/common';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/index';

class Home extends Component {
    state = {
        requestForm: {
            assignedDepartment: {
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
            assignedUser: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'placeholder', displayValue: 'Select User' }
                    ]
                },
                value: 'placeholder',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            message: {
                elementType: 'textarea',
                elementConfig: {
                    rows: "6",
                    placeholder: 'Your Message'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }

        },
        formIsValid: false
    }
    
    componentDidMount() {

        // console.log('prev Props',this.props);
        // console.log('new allDepartments Did Update', this.props);
        let options = [{ value: 'placeholder', displayValue: 'Select Department' }];
        this.props.allDepartments.forEach((dep) => {
            if (dep._id !== this.props.currentDepartmentId) {
                options.push({ value: dep._id, displayValue: dep.name.trim() })
            }
        });

        if (options.length > 1) {

            this.setState((prevState) => {
                let updatedForm = { ...prevState.requestForm };
                const updatedType = { ...updatedForm.assignedDepartment };
                const updatedformConfig = { ...updatedType.elementConfig, options: options };
                updatedType.elementConfig = updatedformConfig;
                updatedForm.assignedDepartment = updatedType;
                // console.log('new allDepartments updatedForm', updatedForm);
                return {
                    requestForm: updatedForm
                }
            })
        }
        // this.props.resetError();
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.allDepartments !== nextProps.allDepartments) {
            // console.log('prev Props',this.props);
            // console.log('new allDepartments', nextProps);

            let options = [{ value: 'placeholder', displayValue: 'Select Department' }];
            nextProps.allDepartments.forEach((dep) => {
                if (dep._id !== this.props.currentDepartmentId) {
                    options.push({ value: dep._id, displayValue: dep.name.trim() })
                }
            });

            this.setState((prevState) => {
                let updatedForm = { ...prevState.requestForm };
                const updatedType = { ...updatedForm.assignedDepartment };
                const updatedformConfig = { ...updatedType.elementConfig, options: options };
                updatedType.elementConfig = updatedformConfig;
                updatedForm.assignedDepartment = updatedType;
                return {
                    requestForm: updatedForm
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

        return isValid;

    }

    inputChangeHandler = (event, inputIndentifier) => {
        // console.log(event.target.value);
        const inputValue = event.target.value
        this.setState((prevState) => {
            const updatedForm = { ...prevState.requestForm };
            const updatedFormElement = updateObject(updatedForm[inputIndentifier], { value: inputValue })
            updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation, updatedFormElement.elementType);
            updatedFormElement.touched = true;
            updatedForm[inputIndentifier] = updatedFormElement;

            let formValid = true;
            for (let inputIndentifier in updatedForm) {
                formValid = updatedForm[inputIndentifier].valid && formValid
            }
            return {
                requestForm: updatedForm,
                formIsValid: formValid
            }
        });

        if (inputIndentifier === 'assignedDepartment') {
            let optionsUsers = [{ value: 'placeholder', displayValue: 'Select User' }];
            this.props.allUsers.forEach((user) => {
                if (user.department === inputValue) {
                    optionsUsers.push({ value: user._id, displayValue: (user.firstName + ' ' + user.lastName).trim() })
                }
            });

            this.setState((prevState) => {
                let updatedFormUser = { ...prevState.requestForm };
                const updatedTypeUser = { ...updatedFormUser.assignedUser };
                const updatedformConfigUser = { ...updatedTypeUser.elementConfig, options: optionsUsers };
                updatedTypeUser.elementConfig = updatedformConfigUser;
                updatedTypeUser.value = 'placeholder';
                updatedFormUser.assignedUser = updatedTypeUser;
                // console.log('new allUsers updatedForm', updatedFormUser);
                return {
                    requestForm: updatedFormUser
                }
            })

        }

    }

    requestSubmitHandler = (event) => {
        event.preventDefault();
        this.props.postRequest(this.props.currentUserId,
            this.state.requestForm.assignedUser.value,
            this.state.requestForm.assignedDepartment.value,
            this.state.requestForm.message.value);

        //clearing state
        const updatedForm = { ...this.state.requestForm };
        const updatedFormElementUser = updateObject(updatedForm.assignedUser, { value: 'placeholder', valid: false, touched: false });
        const updatedFormElementDep = updateObject(updatedForm.assignedDepartment, { value: 'placeholder', valid: false, touched: false })
        const updatedFormElementMsg = updateObject(updatedForm.message, { value: '', valid: false, touched: false })
        updatedForm.assignedUser = updatedFormElementUser;
        updatedForm.assignedDepartment = updatedFormElementDep;
        updatedForm.message = updatedFormElementMsg;
        this.setState({
            requestForm: updatedForm
        })
    }

    render() {
        // console.log(this.state);
        let formElementsArray = [];
        for (let key in this.state.requestForm) {
            formElementsArray.push({
                id: key,
                config: this.state.requestForm[key]
            });
        }
        let form = (

            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)} />
                ))}
                {/* <div className={this.props.error?classes.ErrorVisible:classes.ErrorHide}>
                    {this.props.error ? this.props.error : ''}
                </div> */}
                <Button clicked={this.requestSubmitHandler} disabled={!this.state.formIsValid}>Create Request</Button>
            </form>


        );

        return (
            <>
                <div className={classes.Home}>
                    <div className={classes.FormContainer}>
                        <div className={classes.Form}>
                            <h2 className={classes.FormHeading}>Action Request</h2>
                            {form}
                        </div>
                    </div>
                    <div className={classes.ImageContainer}>
                        <img className={classes.Image} src="https://switchon.io/images/landing-01-02.svg" alt="DepartmentImage" />
                    </div>
                </div>
            </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        allUsers: state.department.users,
        allDepartments: state.department.departments,
        currentUserId: state.auth.userId,
        currentDepartmentId: state.auth.departmentId,
        error: state.department.error
    }
};

const mapDispatchToProps = dispatch => ({

    postRequest: (createdBy, assignedTo, assignedDepartment, message) => dispatch(Actions.postForm(createdBy, assignedTo, assignedDepartment, message)),
    resetError: () => dispatch(Actions.resetError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);