import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/index';


class Approval extends Component {

    componentDidMount() {
        this.props.fetchAssignedRequest();
    }

    approveClickHandler = (formId) => {
        // console.log('formId', formId);
        this.props.updateStatusForm(formId, 'APPROVED');
    }
    rejectClickHandler = (formId) => {
        // console.log('formId', formId);
        this.props.updateStatusForm(formId, 'REJECTED')
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
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a key={record.key + '1'} onClick={() => this.approveClickHandler(record.id)}>Approve</a>
                        <a key={record.key + '2'} onClick={() => this.rejectClickHandler(record.id)}>Reject</a>
                    </Space>
                ),
            }
        ];
        const pendingList = this.props.assignedForms.filter(form => form.status === 'PENDING')
        const tableData = pendingList.map((form, i) => {
            return {
                id: form._id,
                key: form._id + 'approval',
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
        // currentUserId: state.auth.userId,
        // currentDepartmentId: state.auth.departmentId,
        // requestedForms: state.department.currentUsersRequestedForms,
        assignedForms: state.department.currentUsersAssignedForms,

    }
};

const mapDispatchToProps = dispatch => ({

    fetchAssignedRequest: () => dispatch(Actions.fetchUserAssignedForm()),
    updateStatusForm: (formId, status) => dispatch(Actions.updateStatusForm(formId, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Approval);