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
import React, { useState } from "react";
import styles from "./ProfileMainContent.module.css";
import { CONTACT_NUMBER, FIRST_NAME_RULES, USER_ID } from "../../constants";
import { findAllCities } from "../../api/cityApi";
import { useMutation, useQuery } from "react-query";
import { editUserById, findUserById } from "../../api/userApi";
import { getFromLocalStorage } from "../../util/localStorageUtil";
import { useLocation } from "react-router";
const { Option } = Select;
const { TextArea } = Input;

const ProfileMainContent = () => {

  const location = useLocation();

  const [imageUrl, setImageUrl] = useState(
    "https://yt3.ggpht.com/ytc/AKedOLTFonjbt3zMbyY3XlcSF1ahTGVeBPercEXgKbiJ=s900-c-k-c0x00ffffff-no-rj"
  );

  const [form] = Form.useForm();

  const { data: cities, isLoading: isLoadingCities } = useQuery(
    "cities",
    findAllCities
  );

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery(`user${getFromLocalStorage(USER_ID)}`, findUserById);

  const { mutate, isLoading } = useMutation(editUserById, {
    onSuccess: (data) => {
      refetch();
      message.success("Uspješno ste ažurirali podatke na profilu");
      console.log(data, "----------");
    },
    onError: () => {
      message.error("Došlo je do greške");
    },
  });

  const handleUpdateUser = () => {
    form.validateFields().then(
      () => {
        let editedUser = form.getFieldsValue();
        delete editedUser.username;
        delete editedUser.email;
        mutate(editedUser);
      },
      () => console.log("Nije uspio")
    );
  };

  const onChange = ({ fileList: newFileList }) => {
    setImageUrl(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  if (isLoadingUser) {
    return <Spin />;
  }

  return (
    <div className={styles.mainContainer}>
      <Row justify="center">
        <Col span={12} className={styles.profileHeader}>
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
          cityId: user?.data?.cityId,
          contactNumber: user?.data?.contactNumber,
          about: user?.data?.about,
        }}
        onFinish={handleUpdateUser}
      >
        <Row justify="center">
          <Col span={8} xs={22} sm={8}>
            <Col span={22}>
              <Form.Item label="Korisničko ime" name="username">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={22}>
              <Form.Item label="Email" name="email">
                <Input disabled />
              </Form.Item>
            </Col>

            <Row gutter={[16, 0]}>
              <Col span={11}>
                <Form.Item
                  label="Ime"
                  name="firstName"
                  rules={FIRST_NAME_RULES}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
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
              <Col span={11}>
                <Form.Item
                  label="Broj telefona"
                  name="contactNumber"
                  rules={CONTACT_NUMBER}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
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
          <Col span={4} xs={22} sm={4}>
            <Col className={styles.profilImageHeader}>Profilna slika</Col>
            <img className={styles.uploadImage} src={imageUrl} alt="" />
            <Col>
              <ImgCrop>
                <Upload
                  listType="picture"
                  // className={styles.uploadImage}
                  showUploadList={false}
                  // beforeUpload={beforeUpload}
                  onChange={onChange}
                  onPreview={onPreview}
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
          <Col span={12} xs={22} sm={12}>
            <Form.Item label="Detaljnije o Vama" name="about">
              <TextArea showCount maxLength={1000} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" align="middle">
          <Col span={4} offset={8} xs={14} sm={4}>
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
