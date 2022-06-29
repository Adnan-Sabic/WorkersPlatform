import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Spin,
  Upload,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { findAllCategories } from "../../api/categoriesApi";
import {
  ADVERTISEMENT_CATEGORY_RULES,
  ADVERTISEMENT_TITLE_RULES,
  ADVERTISEMENT_TYPE_OPTIONS,
  ADVERTISEMENT_TYPE_RULES,
} from "../../constants";
import styles from "./AdvertisementMainContent.module.css";
import {
  createNewAdvertisement,
  editAdvertisementById,
  getAdvertisementById,
} from "../../api/advertisementApi";
import { useLocation } from "react-router";

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 22,
      offset: 2,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 22,
      offset: 2,
    },
    sm: {
      span: 22,
      offset: 2,
    },
  },
};

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const AdvertisementMainContent = () => {
  //TODO upload images
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  //TODO upload images

  const [form] = Form.useForm();
  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    "categories",
    findAllCategories
  );
  const { mutate: mutateCreateNewAdv, isLoading } = useMutation(
    createNewAdvertisement,
    {
      onSuccess: (data) => {
        message.success("Uspješno ste dodali novi oglas");
      },
      onError: () => {
        message.error("Desila se greska");
      },
    }
  );

  const { mutate: mutateModifyAdv, isLoading: modLod } = useMutation(
    editAdvertisementById,
    {
      onSuccess: (data) => {
        message.success("Uspješno ažurirali oglas");
        form.setFieldsValue({
          type: data?.data?.type,
          title: data?.data?.title,
          categoryId: data?.data?.category?.id,
          price: data?.data?.price,
          description: data?.data?.description,
        });
      },
      onError: () => {
        message.error("Desila se greska");
      },
    }
  );

  const location = useLocation();
  const [advertisementId, setAdvertisementId] = useState(
    location?.state?.advertisementId
  );

  useEffect(() => {
    if (!location?.state?.advertisementId) {
      setAdvertisementId(null);
    }
  }, [location]);

  const {
    data: advertisement,
    isLoading: isLoadingAdvertisement,
    isRefetching: isRefetchingAdvertisement,
  } = useQuery(
    ["advertisement", advertisementId],
    () => getAdvertisementById(advertisementId),
    {
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
    }
  );

  const handleSumbitButton = () => {
    form.validateFields().then(
      () => {
        if (advertisementId) {
          mutateModifyAdv({ ...form.getFieldsValue(), id: advertisementId });
        } else {
          mutateCreateNewAdv(form.getFieldsValue());
        }
      },
      () => console.log("Nije uspio")
    );
  };

  if (isLoadingAdvertisement || isRefetchingAdvertisement) {
    return <Spin></Spin>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerText}>Nova objava</div>
      <Form
        {...formItemLayout}
        layout={"vertical"}
        className={styles.form}
        name="updateProfileForm"
        autoComplete="off"
        form={form}
        onFinish={handleSumbitButton}
        initialValues={{
          type: advertisement?.data?.type,
          title: advertisement?.data?.title,
          categoryId: advertisement?.data?.category?.id,
          price: advertisement?.data?.price,
          description: advertisement?.data?.description,
        }}
      >
        <Form.Item
          label="Tip oglasa"
          name="type"
          rules={ADVERTISEMENT_TYPE_RULES}
        >
          <Radio.Group
            options={ADVERTISEMENT_TYPE_OPTIONS.filter(
              (a) => a.label !== ADVERTISEMENT_TYPE_OPTIONS[0].label
            )}
            size="large"
            className={styles.radioGruopType}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          label="Naslov"
          name="title"
          rules={ADVERTISEMENT_TITLE_RULES}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kategorija"
          name="categoryId"
          rules={ADVERTISEMENT_CATEGORY_RULES}
        >
          <Select
            allowClear
            size="middle"
            showSearch
            placeholder="Izaberite kategoriju"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {isLoadingCategories ? (
              <Spin />
            ) : (
              categories?.data?.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>
        <Form.Item label="Cijena" name="price" placeholder="Po dogovoru">
          <InputNumber placeholder="Po dogovoru" style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Detaljnije o oglasu" name="description">
          <TextArea
            showCount
            className={styles.aboutTextArea}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item label="Prenesite slike (najviše 5)" name="about">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 5 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </Form.Item>
        <Form.Item className={styles.sumbitButtonForm}>
          {advertisement ? (
            <Button
              type="primary"
              htmlType="submit"
              className={styles.sumbitButton}
            >
              Ažuriraj oglas
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              className={styles.sumbitButton}
            >
              Napravi oglas
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdvertisementMainContent;
