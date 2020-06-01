import React, { Component } from 'react';
import { Table, Tag, Space } from 'antd';
import { connect } from 'react-redux';
import * as Actions from '../../redux/actions/index';


class Pending extends Component {

    componentDidMount() {
        this.props.fetchDepartmentAllForm();
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
        // console.log('12312', this.props.departmentForms);
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
                render: (text, record) => {
                    let act = '';
                    if (record.assignedUserId === this.props.currentUserId) {
                        act = (<>
                            <a key={record.key + '1'} onClick={() => this.approveClickHandler(record.id)}>Approve</a>
                            <a key={record.key + '2'} onClick={() => this.rejectClickHandler(record.id)}>Reject</a>
                        </>);
                    }
                    return (<Space size="middle">
                        {act}

                    </Space>
                    );
                },
            }
        ];
        const pendingList = this.props.departmentForms.filter(form => form.status === 'PENDING')
        const tableData = pendingList.map((form, i) => {
            return {
                id: form._id,
                key: form._id + 'pending',
                createdBy: (form.createdBy.firstName + ' ' + form.createdBy.lastName).trim(),
                assignedDepartment: form.assignedDepartment.name,
                assignedUser: (form.assignedTo.firstName + ' ' + form.assignedTo.lastName).trim(),
                message: form.message,
                status: [form.status],
                assignedUserId: form.assignedTo._id
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
        // currentDepartmentId: state.auth.departmentId,
        departmentForms: state.department.currentDepartmentForms

    }
};

const mapDispatchToProps = dispatch => ({

    fetchDepartmentAllForm: () => dispatch(Actions.fetchDepartmentForm()),
    updateStatusForm: (formId, status) => dispatch(Actions.updateStatusForm(formId, status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Pending);