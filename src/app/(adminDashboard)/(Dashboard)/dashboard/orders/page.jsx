"use client";

import React, { useEffect, useState } from "react";
import api from "@/redux/api";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";
import TableLoader from "@/components/dashoard/TableLoader";
import ErrorBlock from "@/components/dashoard/ErrorBlock";
import DeleteModal from "@/components/dashoard/DeleteModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { truncateText } from "@/utils/myFuc";

const List = styled("div")({
  padding: "1.5rem 0",
  margin: 0,
  display: "flex",
  listStyle: "none",
  alignSelf: "end",
});

export default function Contact() {
  const pathname = usePathname();
  const [searchData, setSearchData] = useState({
    location: "",
    program: "",
    from: "",
    to: "",
    name: "",
    cursor: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ id: "", name: "" });
  const [allOrders, setAllOrders] = useState([]);

  const {
    isFetching,
    data: orders,
    refetch,
    isLoading,
    error,
  } = api.adminApis.useGetAllOrdersQuery("");

  useEffect(() => {
    if (orders) {
      setAllOrders(orders?.data);
    }
  }, [orders]);

  useEffect(() => {
    refetch();
  }, [pathname]);
  const [
    deleteTrigger,
    {
      isLoading: isDeleting,
      error: deleteError,
      isSuccess: isDeleteSuccess,
      reset,
    },
  ] = api.adminApis.useDeleteUserMutation();

  const handleFilterTextInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const initiateDelete = (item) => {
    setItemToDelete({ id: item?._id, name: `${item?.name}` });
    setIsDeleteModalOpen(true);
  };
  const handleDelete = (id) => {
    deleteTrigger(id);
    setAllOrders(allOrders.filter((item) => item._id !== id));
  };

  const [page, setPage] = useState(1);

  const handleChange = (event, newPage) => {
    setPage(newPage);
  };

  const rowsPerPage = 6;
  const { items } = usePagination({
    count: Math.ceil(allOrders?.length / rowsPerPage),
    onChange: (event, page) => handleChange(event, page),
    page: page,
  });

  const filterData = (allOrders, searchQuery) => {
    if (!searchQuery) return allOrders;
    return allOrders.filter((item) => {
      return (
        item?.product?.status
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item?.buyer?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.seller?.email
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item?.paymentMethod
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item?.product?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  };
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <main className="p-3 md:p-3 lg:p-4 xl:p-6">
      <section className="flex flex-row gap-3  max-md:flex-wrap">
        <div className="right flex flex-col gap-3 lg:gap-4 w-full">
          <div className="flex w-full flex-col lg:flex-row gap-x-4 md:gap-3  lg:gap-4 h-max lg:items-center justify-between">
            <label htmlFor="name" className="lg:w-[60%] relative max-h-max">
              <span className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="rgba(129, 129, 129, 1)"
                  className={"w-6 h-6 absolute left-3 my-auto top-0 bottom-0"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <input
                  id="name"
                  name="name"
                  value={searchData.name}
                  onChange={handleFilterTextInput}
                  type="text"
                  placeholder="Search By Buyer Email, Seller Email,Product Title, Payment Method or Status"
                  className="text-neutral-500 w-full text-md leading-5 placeholder:text-sm px-12 placeholder:text-neutral-400 whitespace-nowrap border border-stone-300 focus:outline focus:outline-2 outline-offset-1 outline-slate-400/90 justify-center mt-1  py-3 rounded-md items-start"
                />
              </span>
            </label>
          </div>

          <div className="flex w-full flex-row gap-x-4 md:gap-3 lg:gap-4 h-max"></div>
        </div>
      </section>

      <section className="mt-5">
        <p style={{ color: "#424750", marginBottom: 2, fontSize: 12 }}>
          *The highlighted option indicates that the selected payment method is
          a card.
        </p>
        <div className="table_container overflow-auto max-w-[1030px] relative max-h-[calc(100vh-210px)]">
          <TableContainer component={Paper}>
            <Table className="w-full" cellPadding={14}>
              <TableHead className="w-full sticky top-0 border-b bg-white border-y-zinc-200">
                <TableRow className="text-stone-600 font-[700]">
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    S/N
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Buyer Email
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Seller Email
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Product Title
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Payment Method
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Total Price
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Status
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Created At
                  </TableCell>
                  <TableCell className="text-stone-600 font-semibold single-line-text">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              {isFetching ? (
                <TableLoader cols={9} />
              ) : (
                <TableBody>
                  {filterData(allOrders, searchData.name)
                    ?.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    .map((each, index) => (
                      <TableRow
                        key={index}
                        className={`text-slate-500 font-semi-bold single-line-text ${
                          each.paymentMethod === "Card Payment"
                            ? "bg-red-100"
                            : ""
                        }`}
                      >
                        <TableCell>
                          {(page - 1) * rowsPerPage + index + 1}
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium single-line-text">
                          {each.buyer?.email}
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium single-line-text">
                          {each.seller?.email}
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium single-line-text">
                          {truncateText(each.product?.title, 15)}
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium single-line-text">
                          {each.paymentMethod}
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium single-line-text">
                          {each.totalPrice} DH
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium single-line-text">
                          {each.status}
                        </TableCell>
                        <TableCell className="text-zinc-600 tracking-wide font-medium single-line-text">
                          {formatDate(each.createdAt)}
                        </TableCell>

                        <TableCell className="gap-1.5 lg:gap-2 xl:gap-2.5 single-line-text">
                          {/* {
                            each.paymentMethod === "Card Payment" && (
                              // each.status === "complete" && (
                              <button
                                // onClick={() => handlePayment(each.id)}
                                className="ml-2 bg-blue-500 text-white px-3 py-1 rounded"
                              >
                                Pay Now
                              </button>
                            )
                            // )
                          } */}
                          <Link
                            href={`/dashboard/orders/${each._id}?action=view`}
                            className="!inline mx-1"
                          >
                            <svg
                              clipRule="evenodd"
                              fillRule="evenodd"
                              fill="#818181"
                              strokeLinejoin="round"
                              strokeMiterlimit="2"
                              className="w-6 h-6 !inline"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
                                fillRule="nonzero"
                              />
                            </svg>
                          </Link>
                          <Link
                            href={`/dashboard/orders/${each._id}?action=update`}
                            className="!inline mx-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              className="!inline"
                            >
                              <path
                                d="M3.06337 15.0973C3.10165 14.7527 3.1208 14.5804 3.17293 14.4194C3.21918 14.2765 3.28453 14.1405 3.3672 14.0152C3.46038 13.8739 3.58296 13.7513 3.82811 13.5061L14.8334 2.5009C15.7538 1.58043 17.2462 1.58043 18.1667 2.5009C19.0872 3.42138 19.0872 4.91376 18.1667 5.83424L7.16144 16.8395C6.91629 17.0846 6.79371 17.2072 6.65241 17.3004C6.52704 17.383 6.39108 17.4484 6.2482 17.4946C6.08717 17.5468 5.91488 17.5659 5.57031 17.6042L2.75 17.9176L3.06337 15.0973Z"
                                stroke="#818181"
                                stroke-width="1.66667"
                                stroke-linecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                          {/* <button
                            onClick={() => initiateDelete(each)}
                            className="!inline mx-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="21"
                              height="20"
                              viewBox="0 0 21 20"
                              fill="none"
                              className="!inline"
                            >
                              <path
                                d="M14.0003 4.99935V4.33268C14.0003 3.39926 14.0003 2.93255 13.8187 2.57603C13.6589 2.26243 13.4039 2.00746 13.0903 1.84767C12.7338 1.66602 12.2671 1.66602 11.3337 1.66602H10.0003C9.0669 1.66602 8.60019 1.66602 8.24367 1.84767C7.93007 2.00746 7.6751 2.26243 7.51531 2.57603C7.33366 2.93255 7.33366 3.39926 7.33366 4.33268V4.99935M9.00033 9.58268V13.7493M12.3337 9.58268V13.7493M3.16699 4.99935H18.167M16.5003 4.99935V14.3327C16.5003 15.7328 16.5003 16.4329 16.2278 16.9677C15.9882 17.4381 15.6057 17.8205 15.1353 18.0602C14.6005 18.3327 13.9005 18.3327 12.5003 18.3327H8.83366C7.43353 18.3327 6.73346 18.3327 6.19868 18.0602C5.72828 17.8205 5.34583 17.4381 5.10614 16.9677C4.83366 16.4329 4.83366 15.7328 4.83366 14.3327V4.99935"
                                stroke="#818181"
                                strokeWidth="1.66667"
                                stroke-linecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button> */}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          <div className=" !w-full">
            <List className="!flex-1 first-letter:flex items-center max-md:max-w-[calc(100vw-2.2rem)] w-[500px] bottom-4  mb-4 ml-auto  md:max-w-max rounded-md  mt-8 p-1">
              {items.map(({ page, type, selected, ...item }, index) => {
                let children = null;

                if (type === "start-ellipsis" || type === "end-ellipsis") {
                  children = "…";
                } else if (type === "page") {
                  children = (
                    <button
                      type="button"
                      style={{
                        fontWeight: selected ? "bold" : undefined,
                        padding: "0.5rem 1rem",
                        width: "100%",
                      }}
                      {...item}
                    >
                      {page}
                    </button>
                  );
                } else {
                  children =
                    type === "previous" ? (
                      <button
                        {...item}
                        disabled={item.disabled}
                        className={`${selected ? "font-bold" : undefined} ${
                          item.disabled === false
                            ? "text-stone-700"
                            : "text-stone-300"
                        } border md:mr-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-3 pr-4 max-md:pl-2 max-md:pr-3 py-1`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                          />
                        </svg>
                        {type}
                      </button>
                    ) : (
                      <button
                        {...item}
                        disabled={item.disabled}
                        className={`${selected ? "font-bold" : undefined} ${
                          item.disabled === false
                            ? "text-stone-700"
                            : "text-stone-300"
                        }  border md:ml-4 border-slate-400/80 flex gap-x-1 items-center bg-primary-pale/30 rounded-md text-primary/90 pl-4 pr-3 max-md:pl-3 max-md:pr-2 py-1`}
                      >
                        {type}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    );
                }

                return <div key={index}>{children}</div>;
              })}
            </List>
          </div>

          {!(isLoading || isFetching) && allOrders?.length === 0 && (
            <div className="px-2 py-4 text-center">
              <h2 className="text-xl font-semibold">No result found</h2>
            </div>
          )}
          <ErrorBlock error={error} />
        </div>
      </section>

      <DeleteModal
        modalOpen={isDeleteModalOpen}
        setModalOpen={setIsDeleteModalOpen}
        handleDelete={handleDelete}
        itemToDelete={itemToDelete}
        loading={isDeleting}
        isSucessful={isDeleteSuccess}
        reset={reset}
      />
    </main>
  );
}
