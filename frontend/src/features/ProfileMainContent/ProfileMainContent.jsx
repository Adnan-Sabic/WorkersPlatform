import {
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Upload,
  Button,
  message,
} from "antd";
import ImgCrop from "antd-img-crop";
import React, { useEffect, useState } from "react";
import styles from "./ProfileMainContent.module.css";
import { CONTACT_NUMBER, FIRST_NAME_RULES, USER_ID } from "../../constants";
import { findAllCities } from "../../api/cityApi";
import { useMutation, useQuery } from "react-query";
import { editUserById, findUserById } from "../../api/userApi";
import { getFromLocalStorage } from "../../util/localStorageUtil";
import { useLocation } from "react-router";
import { updatePricuteToS3 } from "../../api/s3BucketApi";
import { type } from "@testing-library/user-event/dist/type";
const { Option } = Select;
const { TextArea } = Input;

const ProfileMainContent = () => {
  const userId = getFromLocalStorage(USER_ID);
  const [imageUrl, setImageUrl] = useState();
  const [imageData, setImageData] = useState();
  const [form] = Form.useForm();
  const {
    data: user,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery(["user", userId], () => findUserById(userId));

  useEffect(() => {
    setImageUrl(user?.data?.imageUrl);
  }, [user]);

  const { data: cities, isLoading: isLoadingCities } = useQuery(
    "cities",
    findAllCities
  );

  const { mutate, isLoading } = useMutation(editUserById, {
    onSuccess: (data) => {
      message.success("Uspješno ste ažurirali podatke na profilu");
      if (imageData && data.data.imageUrl) {
        mutateSendPicture({
          presignedUrl: data.data.imageUrl,
          imageData: imageData,
        });
      } else {
        refetch();
      }
    },
    onError: () => {
      message.error("Došlo je do greške");
    },
  });

  const { mutate: mutateSendPicture, isLoading: isLoadingPicture } =
    useMutation(updatePricuteToS3, {
      onSuccess: (data) => {
        refetch();
        message.success("Uspješno ste ažurirali sliku na profilu");
      },
      onError: () => {
        message.error("Došlo je do greške prilikom promjene slike");
      },
    });

  const handleUpdateUser = () => {
    form.validateFields().then(
      () => {
        let editedUser = form.getFieldsValue();
        editedUser.updateImage = imageData != null;
        delete editedUser.username;
        delete editedUser.email;
        mutate(editedUser);
      },
      () => console.log("Nije uspio")
    );
  };

  const handleBefore = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      setImageUrl(e.target.result);
    };
    reader.readAsDataURL(file);
    setImageData(file);

    return false;
  };

  if (isLoadingUser) {
    return <Spin />;
  }

  return (
    <div className={styles.mainContainer}>
      <Row justify="center">
        <Col span={16} className={styles.profileHeader}>
          Uredite profil
        </Col>
      </Row>
      <Form
        layout="vertical"
        name="updateProfileForm"
        autoComplete="off"
        form={form}
        initialValues={{
          username: user?.data?.username,
          email: user?.data?.email,
          firstName: user?.data?.firstName,
          lastName: user?.data?.lastName,
          categoryId: user?.data?.categoryId,
          cityId: user?.data?.city?.id || null,
          contactNumber: user?.data?.contactNumber,
          about: user?.data?.about,
        }}
        onFinish={handleUpdateUser}
      >
        <Row justify="center" align="middle">
          <Col span={8} xs={22} sm={22} md={16} xl={8} xxl={8}>
            <Col span={22} xs={24} sm={24} md={24} xl={22}>
              <Form.Item label="Korisničko ime" name="username">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={22} xs={24} sm={24} md={24} xl={22}>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
            </Col>

            <Row gutter={[16, 0]}>
              <Col span={22} xs={24} sm={12} md={12} xl={11}>
                <Form.Item
                  label="Ime"
                  name="firstName"
                  rules={FIRST_NAME_RULES}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={22} xs={24} sm={12} md={12} xl={11}>
                <Form.Item
                  label="Prezime"
                  name="lastName"
                  rules={FIRST_NAME_RULES}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 0]}>
              <Col span={22} xs={24} sm={12} md={12} xl={11}>
                <Form.Item
                  label="Broj telefona"
                  name="contactNumber"
                  rules={CONTACT_NUMBER}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={22} xs={24} sm={12} md={12} xl={11}>
                <Form.Item label="Grad" name="cityId">
                  <Select
                    allowClear
                    size="middle"
                    showSearch
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {isLoadingCities ? (
                      <Spin />
                    ) : (
                      cities?.data?.map((city) => (
                        <Option key={city.id} value={city.id}>
                          {city.name}
                        </Option>
                      ))
                    )}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Col span={22}></Col>
          </Col>
          <Col span={4} xs={22} sm={22} md={16} xl={8} xxl={8}>
            <Col className={styles.profilImageHeader}>Profilna slika</Col>
            <img className={styles.uploadImage} src={imageUrl} alt="" />
            <Col>
              <ImgCrop>
                <Upload
                  // className={styles.uploadImage}
                  showUploadList={false}
                  beforeUpload={handleBefore}
                  className={styles.uploadButton}
                >
                  <Button type="primary" className={styles.uploadButton}>
                    Upload slike
                  </Button>
                </Upload>
              </ImgCrop>
            </Col>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={4} xs={22} sm={22} md={16} xl={16} xxl={16}>
            <Form.Item label="Detaljnije o Vama" name="about">
              <TextArea
                className={styles.aboutTextArea}
                showCount
                maxLength={1000}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col span={4} offset={8} xs={14} sm={14} md={8}>
            <Form.Item className={styles.sumbitButtonForm}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.sumbitButton}
              >
                Ažuriraj
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProfileMainContent;
