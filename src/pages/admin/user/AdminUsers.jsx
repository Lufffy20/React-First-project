/**
 * AdminUsers Component
 *
 * Purpose:
 * This component provides the **User Management interface** in the Admin Panel.
 * Admins can view, create, update, and delete users from the system.
 *
 * Features:
 * - Displays users in a table
 * - Add new users via modal form
 * - Edit existing users
 * - Delete users with confirmation
 * - Role visualization using tags
 * - Uses Ant Design UI components
 *
 * Data Source:
 * - useUsers() custom hook handles API calls and state management
 */

import React, { useState } from 'react';
import {
    Card,
    Table,
    Tag,
    Button,
    Modal,
    Form,
    Row,
    Col,
    Input,
    InputNumber,
    Popconfirm
} from 'antd';

import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

import { useUsers } from '../../../hooks/useUsers';



const AdminUsers = () => {

    /**
     * Fetch users and CRUD handlers from hook
     */
    const {
        users,
        loading,
        handleCreateUser,
        handleUpdateUser,
        handleDeleteUser
    } = useUsers();



    /**
     * Modal and editing state
     */
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [form] = Form.useForm();



    /**
     * Open modal
     * If user provided → edit mode
     * Else → create mode
     */
    const showModal = (user = null) => {

        setEditingUser(user);

        if (user) {
            form.setFieldsValue(user);
        } else {
            form.resetFields();
        }

        setIsUserModalOpen(true);

    };



    /**
     * Submit form
     * Handles both create and update
     */
    const handleOk = async () => {

        try {

            const values = await form.validateFields();

            let success = false;

            if (editingUser) {

                success =
                    await handleUpdateUser(
                        editingUser.id,
                        values
                    );

            } else {

                success =
                    await handleCreateUser(values);

            }

            if (success) {
                setIsUserModalOpen(false);
            }

        } catch (error) {

            console.error('Validation error:', error);

        }

    };



    /**
     * Table columns
     */
    const userColumns = [

        {
            title: 'Name',
            key: 'name',
            render: (_, record) =>
                `${record.firstName} ${record.lastName}`
        },

        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },

        {
            title: 'Phone',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },

        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (role) => (
                <Tag color={role === 1 ? 'purple' : 'blue'}>
                    {role === 1 ? 'ADMIN' : 'USER'}
                </Tag>
            )
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (

                <div style={{
                    display: 'flex',
                    gap: '8px'
                }}>

                    <Button
                        icon={<EditOutlined />}
                        onClick={() => showModal(record)}
                        size="small"
                    />

                    <Popconfirm
                        title="Delete User"
                        description="Are you sure to delete this user?"
                        onConfirm={() =>
                            handleDeleteUser(record.id)
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            size="small"
                        />
                    </Popconfirm>

                </div>

            )
        }

    ];



    return (

        <>

            {/* User Table */}
            <Card
                title="User Management"
                extra={

                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => showModal()}
                    >
                        Add User
                    </Button>

                }
                className="recent-activities-card"
            >

                <Table
                    dataSource={users}
                    columns={userColumns}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        placement: 'bottomCenter'
                    }}
                />

            </Card>



            {/* Create / Edit Modal */}
            <Modal
                title={
                    editingUser
                        ? "Edit User"
                        : "Add Direct User"
                }
                open={isUserModalOpen}
                onOk={handleOk}
                onCancel={() =>
                    setIsUserModalOpen(false)
                }
                okText={
                    editingUser
                        ? "Update"
                        : "Create"
                }
            >

                <Form
                    form={form}
                    layout="vertical"
                >

                    <Row gutter={16}>

                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="First Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Last Name"
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                    </Row>



                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                type: 'email'
                            }
                        ]}
                    >
                        <Input disabled={!!editingUser} />
                    </Form.Item>



                    {!editingUser && (

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true }]}
                        >
                            <Input.Password />
                        </Form.Item>

                    )}



                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>



                    <Form.Item
                        name="role"
                        label="Role"
                        initialValue={0}
                    >
                        <InputNumber
                            min={0}
                            max={1}
                            placeholder="0 = User, 1 = Admin"
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                </Form>

            </Modal>

        </>

    );

};



export default AdminUsers;