import { Button, Form, Pagination, Spin } from "antd";
import React, { useState } from "react";
import Card from "../../components/Card/Card";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import { Input } from "antd";

import styles from "./HomeMainContent.module.css";
import { useQuery } from "react-query";
import { findAllAdvertisements } from "../../api/advertisementApi";

const { Search } = Input;

const HomeMainContent = () => {
  console.log("mainContent");

  const [filterForm] = Form.useForm();
  const [filter, setFilter] = useState({});

  const {
    data: advertisements,
    isLoading: isLoadingAdvertisements,
    isError,
    error,
    refetch,
  } = useQuery("advertisements", () => findAllAdvertisements(filter), {
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });
  const handleRefresh = () => {
    //TODO create 1 object that combines filter object and search field and sets that object into filter
    console.log("HANDLE REFRESH", filterForm.getFieldsValue());
    setFilter(filterForm.getFieldsValue());
    refetch();
  };

  console.log("data", advertisements?.data);
  console.log("loading", isLoadingAdvertisements);
  console.log("isError", error);

  return (
    <div className={styles.mainContainer}>
      <HomeSideBar
        form={filterForm}
        handleRefresh={handleRefresh}
      ></HomeSideBar>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div>SortBy</div>
          <Search
            placeholder="Pretraga..."
            allowClear
            enterButton="Pretraži"
            size="large"
            className={styles.search}
            // onSearch={onSearch}
          />
          <div>HowManyToShow</div>
        </div>
        <div className={styles.cardContainer}>
          {isError ? (
            <Spin></Spin>
          ) : (
            advertisements?.data?.map((advertisement) => (
              <Card
                title={advertisement.name}
                type={advertisement.type}
                category={advertisement.categoryResponse.name}
                price={advertisement.price}
                city={"ad"}
                userName={advertisement.userResponse.firstName}
                userNumber={advertisement.userResponse.contactNumber}
                daysAgo={advertisement.daysAgo}
              ></Card>
            ))
          )}
          {/* <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card> */}
        </div>
        <Pagination
          className={styles.paginator}
          defaultCurrent={1}
          total={100}
        />
      </div>
    </div>
  );
};

export default HomeMainContent;
