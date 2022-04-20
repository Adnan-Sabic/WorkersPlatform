import { Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import styles from "./RegisterButton.module.css";

const MODAL_BODY_STYLE = {
  paddingTop: "3.5rem",
};

const RegisterButton = ({ className }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  form.resetFields();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogin = () => {
    form.validateFields().then(
      () => console.log(form.getFieldsValue()),
      () => console.log("Nije uspio")
    );
  };
  return (
    <div className={className}>
      <Button
        text={"Registruj se"}
        icon={<ion-icon name="newspaper-outline"></ion-icon>}
        onClick={showModal}
      ></Button>
      <Modal
        transitionName=""
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        className={styles.modalPosition}
        bodyStyle={MODAL_BODY_STYLE}
        // mask={false}
      >
        <Form
          name="basic"
          autoComplete="off"
          className={styles.form}
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            text="Registruj se"
            className={styles.confirmButton}
            onClick={handleLogin}
          ></Button>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterButton;
