import { Divider, Form, Radio, Select, Spin } from "antd";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { findAllCategories } from "../../api/categoriesApi";
import { findAllCities } from "../../api/cityApi";
import Button from "../../components/Button/Button";
import {
  ADVERTISEMENT_TO_SHOW_OPTIONS,
  ADVERTISEMENT_TYPE_OPTIONS,
} from "../../constants";
import styles from "./HomeSideBar.module.css";

const { Option } = Select;

const HomeSideBar = ({ form, handleRefresh }) => {

  const loggedIn = useSelector((state) => state.user.isLoggedIn);

  const { data: cities, isLoading: isLoadingCities } = useQuery(
    "cities",
    findAllCities
  );

  const { data: categories, isLoading: isLoadingCategories } = useQuery(
    "categories",
    findAllCategories
  );

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerText}>Filteri</div>
      <Form
        name="filterForm"
        autoComplete="off"
        className={styles.form}
        form={form}
        layout="vertical"
        // initialValues={{
        //   type: ADVERTISEMENT_TYPE_OPTIONS[0].value,
        //   whichAdvertisement: ADVERTISEMENT_TO_SHOW_OPTIONS[0].value,
        // }}
      >
        {loggedIn && (
          <>
            <Form.Item label="Oglasi" name="whichAdvertisement">
              <Radio.Group
                options={ADVERTISEMENT_TO_SHOW_OPTIONS}
                size="large"
                className={styles.radioButtonOne}
                optionType="button"
                buttonStyle="solid"
              />
            </Form.Item>
            <Divider className={styles.divider} />
          </>
        )}

        <Form.Item label="Tip oglasa" name="type">
          <Radio.Group
            options={ADVERTISEMENT_TYPE_OPTIONS}
            size="large"
            className={styles.radioGruopType}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item label="Kategorija" name="categoryId">
          <Select
            allowClear
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
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Form.Item label="Grad" name="cityId">
          <Select
            allowClear
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
                <Option key={city.id} value={city.id}>
                  {city.name}
                </Option>
              ))
            )}
          </Select>
        </Form.Item>

        <Button
          text="Osvježi rezultate"
          className={styles.sumbitButton}
          onClick={handleRefresh}
        ></Button>
      </Form>
    </div>
  );
};

export default HomeSideBar;
