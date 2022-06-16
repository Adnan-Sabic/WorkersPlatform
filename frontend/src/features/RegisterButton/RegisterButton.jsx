import { Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { registerUser } from "../../api/userApi";
import successfulGif from "../../assets/succesfulRegistration.gif";
import Button from "../../components/Button/Button";
import {
  CONFIRM_PASSWORD_RULES,
  EMAIL_RULES,
  PASSWORD_RULES,
  USERNAME_RULES,
} from "../../constants";
import styles from "./RegisterButton.module.css";

const MODAL_BODY_STYLE = {
  // paddingTop: "3.5rem",
};

const RegisterButton = ({ className }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [successfulRegistration, setSuccessfulRegistration] = useState(false);

  const { mutate, isLoading } = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log(data);
      setSuccessfulRegistration(true);
    },
    onError: () => {
      alert("there was an error");
    },
  });

  form.resetFields();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSuccessfulRegistration(false);
  };

  const handleRegister = () => {
    form.validateFields().then(
      () => {
        const newUser = form.getFieldsValue();
        delete newUser.confirm;
        console.log(newUser);
        mutate(newUser);
      },
      () => console.log("Nije uspio")
    );
  };

  if (successfulRegistration) {
    return (
      <>
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
          <img src={successfulGif} alt="gif" className={styles.succesfulGif} />
          <div className={styles.successfulText}>Uspješna registracija.</div>
        </Modal>
      </>
    );
  }

  return (
    <div className={className}>
      <Button
        text={"Registruj se"}
        icon={<ion-icon name="newspaper-outline"></ion-icon>}
        onClick={showModal}
      ></Button>
      <Modal
        title="Registracija"
        transitionName=""
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        className={styles.modalPosition}
        bodyStyle={MODAL_BODY_STYLE}
        // mask={false}
      >
        <Form
          layout="vertical"
          name="registerForm"
          autoComplete="off"
          className={styles.form}
          form={form}
        >
          <Form.Item
            label="Korisničko ime"
            name="username"
            rules={USERNAME_RULES}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={EMAIL_RULES}>
            <Input />
          </Form.Item>

          <Form.Item label="Lozinka" name="password" rules={PASSWORD_RULES}>
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Potvrdite lozinku"
            name="confirm"
            dependencies={["password"]}
            rules={CONFIRM_PASSWORD_RULES}
          >
            <Input.Password />
          </Form.Item>
          <Button
            text="Registruj se"
            className={styles.confirmButton}
            onClick={handleRegister}
          ></Button>
        </Form>
      </Modal>
    </div>
  );
};

export default RegisterButton;
