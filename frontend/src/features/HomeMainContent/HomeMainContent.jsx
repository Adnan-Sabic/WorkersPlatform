import { Pagination } from "antd";
import React from "react";
import Card from "../../components/Card/Card";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import { Input } from "antd";

import styles from "./HomeMainContent.module.css";

const { Search } = Input;

const HomeMainContent = () => {
  console.log("mainContent");
  return (
    <div className={styles.mainContainer}>
      <HomeSideBar></HomeSideBar>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div>SortBy</div>
          <Search
            placeholder="Pretraga..."
            allowClear
            enterButton="Search"
            size="large"
            className={styles.search}
            // onSearch={onSearch}
          />
          <div>HowManyToShow</div>
        </div>
        <div className={styles.cardContainer}>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
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
