import { Form, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
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
  const [filter, setFilter] = useState({ type: "ALL" });

  const {
    data: advertisements,
    isLoading: isLoadingAdvertisements,
    isError,
    error,
    refetch,
  } = useQuery(
    ["advertisements", filter],
    () => findAllAdvertisements(filter),
    {
      refetchOnWindowFocus: false,
      // enabled: false, // disable this query from automatically running
    }
  );

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
    console.log("HANDLE REFRESH", filterForm.getFieldsValue());
    setFilter(filterForm.getFieldsValue());
    refetch();
  };

  const onPageChange = (page) => {
    page = --page;
    setFilter({ ...filter, page: page });
    refetch();
  };

  const onSearch = (value) => {
    setFilter({ ...filter, title: value });
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
            enterButton="Pretraži"
            size="large"
            className={styles.search}
            onSearch={onSearch}
          />
          <div>HowManyToShow</div>
        </div>
        {isLoadingAdvertisements ? (
          <Spin className={styles.spin} size="large"></Spin>
        ) : (
          <>
            {advertisements?.data?.content?.length !== 0 ? (
              <div className={styles.cardContainer}>
                {advertisements?.data?.content?.map((advertisement) => (
                  <Card
                    key={advertisement.id}
                    title={advertisement.title}
                    type={advertisement.type}
                    category={advertisement.categoryName}
                    price={advertisement.price}
                    city={advertisement.cityName}
                    userName={advertisement.user.username}
                    userNumber={advertisement.user.contactNumber}
                    daysAgo={advertisement.daysAgo}
                  ></Card>
                ))}
              </div>
            ) : (
              <div className={styles.noDataMessage}>
                Za odabrane filtere nema rezultata ☹
              </div>
            )}

            <Pagination
              className={styles.paginator}
              total={advertisements?.data?.totalElements}
              pageSize={advertisements?.data?.size}
              onChange={onPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainContent;
