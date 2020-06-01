import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/index';


class Approved extends Component {

    componentDidMount() {
        this.props.fetchAssignedRequest();
    }

    render() {
        // console.log('12312', this.props.requestedForms);
        const columns = [
            {
                title: 'Created By',
                dataIndex: 'createdBy',
                key: 'createdBy'
            },
            {
                title: 'Assigned Department',
                dataIndex: 'assignedDepartment',
                key: 'assignedDepartment',
            },
            {
                title: 'Assigned User',
                dataIndex: 'assignedUser',
                key: 'assignedUser',
            },
            {
                title: 'Message',
                dataIndex: 'message',
                key: 'message',
            },
            {
                title: 'Status',
                key: 'status',
                dataIndex: 'status',
                render: status => (
                    <>
                        {status.map(tag => {
                            let color = tag === 'APPROVED' ? 'green' : tag === 'REJECTED' ? 'volcano' : 'geekblue';
                            return (
                                <Tag color={color} key={tag}>
                                    {tag.toUpperCase()}
                                </Tag>
                            );
                        })}
                    </>
                ),
            }
        ];
        const pendingList = this.props.assignedForms.filter(form=>form.status==='APPROVED')
        const tableData = pendingList.map((form, i) => {
            return {
                key: form._id+'approved',
                createdBy: (form.createdBy.firstName + ' ' + form.createdBy.lastName).trim(),
                assignedDepartment: form.assignedDepartment.name,
                assignedUser: (form.assignedTo.firstName + ' ' + form.assignedTo.lastName).trim(),
                message: form.message,
                status: [form.status]
            }
        })
        return (
            <div>
                <Table columns={columns} dataSource={tableData} />
            </div>

        );


    }
}

const mapStateToProps = (state) => {
    return {
        // allUsers: state.department.users,
        // allDepartments: state.department.departments,
        currentUserId: state.auth.userId,
        currentDepartmentId: state.auth.departmentId,
        requestedForms: state.department.currentUsersRequestedForms,
        assignedForms: state.department.currentUsersAssignedForms,

    }
};

const mapDispatchToProps = dispatch => ({

    fetchAssignedRequest: () => dispatch(Actions.fetchUserAssignedForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(Approved);