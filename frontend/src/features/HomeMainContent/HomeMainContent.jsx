import { Form, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import HomeSideBar from "../HomeSideBar/HomeSideBar";
import { Input } from "antd";

import styles from "./HomeMainContent.module.css";
import { useQuery } from "react-query";
import { findAllAdvertisements } from "../../api/advertisementApi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";

const { Search } = Input;

const HomeMainContent = () => {
  const [filterForm] = Form.useForm();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({ type: "ALL" });

  const {
    data: advertisements,
    isLoading: isLoadingAdvertisements,
    refetch,
  } = useQuery(
    ["advertisements", filter],
    () => findAllAdvertisements(filter),
    {
      refetchOnWindowFocus: false,
      useErrorBoundary: (error) => {
        if (error.response?.status === 403) {
          dispatch(logoutUser());
        }
      },
    }
  );

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleRefresh = () => {
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

  return (
    <div className={styles.mainContainer}>
      <HomeSideBar
        form={filterForm}
        handleRefresh={handleRefresh}
      ></HomeSideBar>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <Search
            placeholder="Pretraga..."
            enterButton="Pretraži"
            size="large"
            className={styles.search}
            onSearch={onSearch}
          />
          {/* <div>How many to show</div> */}
        </div>
        {isLoadingAdvertisements ? (
          <Spin className={styles.spin} size="large"></Spin>
        ) : (
          <>
            {advertisements?.data?.content?.length !== 0 ? (
              <div className={styles.cardContainer}>
                {advertisements?.data?.content?.map((advertisement) => {
                  const showOptions =
                    filterForm.getFieldValue("whichAdvertisement") === "MY"
                      ? true
                      : false;
                  return (
                    <Card
                      key={advertisement.id}
                      id={advertisement.id}
                      title={advertisement.title}
                      type={advertisement.type}
                      category={advertisement.categoryName}
                      price={advertisement.price}
                      city={advertisement.cityName}
                      userId={advertisement.user.id}
                      userName={advertisement.user.username}
                      userNumber={advertisement.user.contactNumber}
                      imagesUrls={advertisement.presignedUrls}
                      daysAgo={advertisement.daysAgo}
                      showOptionButtons={showOptions}
                      refreshAdvertisementsFunction={() => handleRefresh()}
                    ></Card>
                  );
                })}
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
