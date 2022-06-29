import { Form, Input, Modal, message } from "antd";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { login } from "../../api/authApi";
import Button from "../../components/Button/Button";
import {
  PASSWORD_RULES,
  TOKEN_KEY,
  USERNAME_RULES,
  USER_ID,
} from "../../constants";
import { loginUser } from "../../redux/slices/userSlice";
import { saveToLocalStorage } from "../../util/localStorageUtil";
import styles from "./LoginButton.module.css";

const MODAL_BODY_STYLE = {
  // paddingTop: "3.5rem",
  // borderRadius: "2rem",
};

const LoginButton = ({ className, setLoggedIn }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { mutate, isLoading } = useMutation(login, {
    onSuccess: (data) => {
      saveToLocalStorage(TOKEN_KEY, data.data.accessToken);
      saveToLocalStorage(USER_ID, data.data.userId);
      dispatch(loginUser());
      message.success("Uspješno ste se prijavili");
      setIsModalVisible(false);
    },
    onError: () => {
      message.error("Došlo je do greške");
    },
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogin = () => {
    form.validateFields().then(
      () => {
        mutate(form.getFieldsValue());
      },
      () => console.log("Nije uspio")
    );
  };

  return (
    <div className={className}>
      <Button
        text={"Prijavi se"}
        icon={<ion-icon name="log-in-outline"></ion-icon>}
        onClick={showModal}
        className={styles.loginButton}
      ></Button>
      <Modal
        title="Prijava"
        transitionName=""
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        className={styles.modalPosition}
        bodyStyle={MODAL_BODY_STYLE}
        // mask={false}
      >
        <Form
          name="loginForm"
          autoComplete="off"
          className={styles.form}
          form={form}
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            label="Korisničko ime"
            name="username"
            rules={USERNAME_RULES}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Lozinka" name="password" rules={PASSWORD_RULES}>
            <Input.Password />
          </Form.Item>
          <Button
            text="Prijavi se"
            className={styles.confirmButton}
            onClick={handleLogin}
            clickOnEnter={true}
          ></Button>
        </Form>
      </Modal>
    </div>
  );
};

export default LoginButton;
