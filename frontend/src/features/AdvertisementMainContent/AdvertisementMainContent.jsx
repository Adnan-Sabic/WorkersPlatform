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
import { updateMultiplePicturesToS3 } from "../../api/s3BucketApi";

const { Option } = Select;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 18,
      offset: 2,
      pull: 0,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 18,
      offset: 0,
      pull: 0,
    },
    sm: {
      span: 20,
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

const AdvertisementMainContent = () => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const location = useLocation();
  const [advertisementId, setAdvertisementId] = useState(
    location?.state?.advertisementId
  );

  const {
    data: advertisement,
    isLoading: isLoadingAdvertisement,
    isRefetching: isRefetchingAdvertisement,
    refetch,
  } = useQuery(
    ["advertisement", advertisementId],
    () => getAdvertisementById(advertisementId),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (!location?.state?.advertisementId) {
      setAdvertisementId(null);
    }
  }, [location.state]);

  useEffect(() => {
    setFileList(advertisement?.data?.imagesWithUid);
    if (advertisementId) {
      form.setFieldsValue({
        type: advertisement?.data?.type,
        title: advertisement?.data?.title,
        categoryId: advertisement?.data?.category?.id,
        price: advertisement?.data?.price,
        description: advertisement?.data?.description,
      });
    }
  }, [advertisement]);

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    "categories",
    findAllCategories
  );

  const { mutate: mutateCreateNewAdv } = useMutation(createNewAdvertisement, {
    onSuccess: (data) => {
      if (fileList.length > 0 && data.data.presignedUrls.length > 0) {
        mutateUpdatePictures({
          presignedUrls: data.data.presignedUrls,
          imagesData: fileList.map((file) => file.originFileObj),
        });
      }
      message.success("Uspješno ste dodali novi oglas");
    },
    onError: () => {
      message.error("Desila se greska");
    },
  });

  const { mutate: mutateModifyAdv } = useMutation(editAdvertisementById, {
    onSuccess: (data) => {
      if (fileList.length > 0 && data.data.presignedUrls.length > 0) {
        mutateUpdatePictures({
          presignedUrls: data.data.presignedUrls,
          imagesData: fileList.map((file) => file.originFileObj),
        });
      }
      refetch();
      message.success("Uspješno ažurirali oglas");
    },
    onError: () => {
      message.error("Desila se greska");
    },
  });

  const { mutate: mutateUpdatePictures } = useMutation(
    updateMultiplePicturesToS3,
    {
      onSuccess: (data) => {
        refetch();
        message.success("Uspješno ste postavili slike");
      },
      onError: () => {
        message.error("Došlo je do greške prilikom postavljanja slika.");
      },
    }
  );

  const handleSumbitButton = () => {
    form.validateFields().then(
      () => {
        let formData = form.getFieldsValue();
        formData.numberOfImages = fileList.length;
        if (advertisementId) {
          formData.imagesUid = fileList.map((file) => file.uid);
          mutateModifyAdv({ ...formData, id: advertisementId });
        } else {
          mutateCreateNewAdv(formData);
        }
      },
      () => console.log("Nije uspio")
    );
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleBefore = (file) => {
    return false;
  };

  if (isLoadingAdvertisement || isRefetchingAdvertisement) {
    return <Spin></Spin>;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerText}>
        {advertisementId ? "Ažuriranje objave" : "Nova objava"}
      </div>
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
            beforeUpload={handleBefore}
          >
            {fileList?.length >= 5 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                paddingTop: "2rem",
                height: "100%",
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </Form.Item>
        <Form.Item className={styles.sumbitButtonForm}>
          {advertisementId ? (
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
