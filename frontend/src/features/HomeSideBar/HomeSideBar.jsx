import { Form, Radio, Select, Spin } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { findAllCategories } from "../../api/categoriesApi";
import { findAllCities } from "../../api/cityApi";
import Button from "../../components/Button/Button";
import { ADVERTISEMENT_TYPE_OPTIONS } from "../../constants";
import styles from "./HomeSideBar.module.css";

const { Option } = Select;

const HomeSideBar = () => {
  console.log("SideBar");
  const request = findAllCities();
  console.log("adooooooooooooo", request);

  const { data: cities, isLoading: isLoadingCities } = useQuery(
    "cities",
    findAllCities,
    {
      // retry: false,
      // enabled: false, //when will it run Boolean(_id) when it has id it will start
    }
  );

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    "categories",
    findAllCategories
  );

  console.log("dataaaaa", cities?.data);

  const [form] = Form.useForm();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerText}>Filteri</div>
      <Form
        name="filterForm"
        autoComplete="off"
        className={styles.form}
        form={form}
        layout="vertical"
      >
        <Form.Item label="Tip oglasa" name="type">
          <Radio.Group
            options={ADVERTISEMENT_TYPE_OPTIONS}
            size="large"
            className={styles.radioGruopType}
            // defaultValue={ADVERTISEMENT_TYPE_OPTIONS[0].value}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item label="Kategorija" name="category">
          <Select
            size="large"
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
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Grad" name="city">
          <Select
            size="large"
            showSearch
            placeholder="Izaberite grad"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                <Option key={city._id} value={city._id}>
                  {city.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Button
          text="Osvježi rezultate"
          className={styles.sumbitButton}
          // onClick={handleLogin}
        ></Button>
      </Form>
    </div>
  );
};

export default HomeSideBar;
