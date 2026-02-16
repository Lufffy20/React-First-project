import React, { useState, useMemo } from "react";
import {
    Table,
    Button,
    Space,
    Modal,
    Form,
    Input,
    Descriptions,
    Popconfirm,
    message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
    deleteUser,
    updateUser,
    addUser,
} from "../../redux/counter/userSlice";

const UserList = () => {
    const users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();

    const [modalType, setModalType] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const [form] = Form.useForm();

    // ---------------- VIEW ----------------
    const handleView = (record) => {
        setSelectedUser(record);
        setModalType("view");
    };

    // ---------------- EDIT ----------------
    const handleEdit = (record) => {
        setSelectedUser(record);
        form.setFieldsValue(record);
        setModalType("edit");
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();

            dispatch(
                updateUser({
                    id: selectedUser.id,
                    updatedData: values,
                })
            );

            message.success("User updated successfully");
            setModalType(null);
        } catch (error) { }
    };

    // ---------------- ADD ----------------
    const handleAdd = async () => {
        try {
            const values = await form.validateFields();

            dispatch(
                addUser({
                    id: Date.now(),
                    ...values,
                })
            );

            message.success("User added successfully");
            form.resetFields();
            setModalType(null);
        } catch (error) { }
    };

    // ---------------- DELETE ----------------
    const handleDelete = (id) => {
        dispatch(deleteUser(id));
        message.success("User deleted");
    };

    // ---------------- TABLE COLUMNS ----------------
    const columns = useMemo(
        () => [
            {
                title: "Name",
                render: (_, record) =>
                    `${record.firstName} ${record.lastName}`,
            },
            {
                title: "Email",
                dataIndex: "email",
            },
            {
                title: "Company",
                dataIndex: "companyName",
            },
            {
                title: "Action",
                render: (_, record) => (
                    <Space>
                        <Button onClick={() => handleView(record)}>
                            View
                        </Button>

                        <Button onClick={() => handleEdit(record)}>
                            Edit
                        </Button>

                        <Popconfirm
                            title="Are you sure to delete?"
                            onConfirm={() => handleDelete(record.id)}
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ],
        [users]
    );

    return (
        <div
            className="user-list-container"
            style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "30px",
            }}
        >
            <h2>User List</h2>
            <hr />

            <div style={{ textAlign: "right", marginBottom: 20 }}>
                <Button
                    type="primary"
                    onClick={() => {
                        form.resetFields();
                        setModalType("add");
                    }}
                >
                    + Add User
                </Button>
            </div>

            <Table columns={columns} dataSource={users} rowKey="id" />

            {/* ---------------- VIEW MODAL ---------------- */}
            <Modal
                title="User Details"
                open={modalType === "view"}
                footer={null}
                onCancel={() => setModalType(null)}
            >
                {selectedUser && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="First Name">
                            {selectedUser.firstName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Last Name">
                            {selectedUser.lastName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {selectedUser.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Company">
                            {selectedUser.companyName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone">
                            {selectedUser.phoneNumber}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* ---------------- ADD & EDIT MODAL ---------------- */}
            <Modal
                title={modalType === "edit" ? "Edit User" : "Add User"}
                open={modalType === "edit" || modalType === "add"}
                onOk={modalType === "edit" ? handleUpdate : handleAdd}
                onCancel={() => setModalType(null)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input />
                    </Form.Item>

                    {modalType === "add" && (
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: "Required" },
                                { type: "email", message: "Invalid email" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    )}

                    <Form.Item name="companyName" label="Company">
                        <Input />
                    </Form.Item>

                    <Form.Item name="phoneNumber" label="Phone">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserList;
