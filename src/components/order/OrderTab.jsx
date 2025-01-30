import api from "@/redux/api";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import langs from "@/app/[lang]/dictionaries/langs";

const OrderTab = ({ type, orders, refetch }) => {
  const [activeTab, setActiveTab] = useState("all");
  const pathname = usePathname();
  const lang = pathname?.split("/")[1];

  const t = langs[lang]?.orderTab;
  const loginUser = useSelector((state) => state.auth.loginUser);
  const relevantOrders = orders.filter((order) =>
    type === "sold"
      ? order?.seller?._id === orders[0]?.seller?._id
      : order?.buyer?._id === orders[0]?.buyer?._id
  );

  const filterOrders = (status) =>
    relevantOrders.filter((order) => order.status === status);

  const [updateOrderStatus] = api.adminApis.useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId, event) => {
    const newStatus = event.target.value;

    try {
      const res = await updateOrderStatus({ orderId, newStatus }).unwrap();
      if (res.success) {
        toast.success(`Order status updated to ${newStatus}`);
        refetch();
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const OrderItem = ({ order }) => {
    const [selectedStatus, setSelectedStatus] = useState(order.status);

    const handleStatusChangeForOrder = (event) => {
      const newStatus = event.target.value;

      if (type === "bought") {
        if (order.buyer._id === loginUser?._id && newStatus !== "Cancelled") {
          toast.error("You can only cancel the order.");
          return;
        }
      }

      if (type === "sold" && order.seller._id !== loginUser?._id) {
        toast.error(
          "You are not authorized to change the status of this order."
        );
        return;
      }

      setSelectedStatus(newStatus);
      handleStatusChange(order._id, event);
    };
    if (!orders) {
      return <Loading />;
    }
    return (
      <div key={order._id} className="mb-4">
        <div className="flex flex-col items-center bg-[#FCFBFF] border border-gray-200 rounded-lg shadow-md w-full">
          <div className="flex flex-col md:flex-row w-full">
            <img
              className="object-contain w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src={order?.product?.photos[0]}
              alt={order?.product?.title}
            />

            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <div className="bg-gray-100 flex justify-between  text-gray-700 text-md font-semibold p-1 mb-2 rounded-lg w-full text-center">
                <span>
                  {t?.trackingNo}: {order?.senditDelivery?.code}
                </span>
                <span>
                  {t?.orderStatus}: {order.senditDelivery?.status}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <Link
                  className="text-2xl font-bold text-gray-900"
                  href={`/${lang}/product/${order?.product?._id}`}
                >
                  {order?.product?.title}
                </Link>

                {/* <select
                  id="status"
                  value={selectedStatus}
                  onChange={handleStatusChangeForOrder}
                  className="border border-gray-300 rounded-md py-1 px-2"
                >
                  {type === "bought" ? (
                    <>
                      <option>{t?.changeStatus}</option>
                      <option value="Cancelled">{t?.cancelled}</option>
                    </>
                  ) : (
                    <>
                      <option value="In Progress">{t?.progress}</option>
                      <option value="Shipped">{t?.shipped}</option>
                      <option value="Delivered">{t?.delivered}</option>
                      <option value="Cancelled">{t?.cancelled}</option>
                      <option value="Completed">{t?.completed}</option>
                    </>
                  )}
                </select> */}
              </div>

              {/* Product Description */}
              <p className="mb-3 text-gray-700">
                {order?.product?.description}
              </p>
              <p className="mb-3 text-gray-700">
                {order?.product?.referenceNumber}
              </p>
              <div className="flex flex-wrap justify-between mb-4 space-y-4 md:space-y-0 md:mb-6">
                {/* Buyer Information */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md w-full md:w-[48%]">
                  <img
                    src={order?.buyer?.avatar}
                    alt={order?.buyer?.name}
                    className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
                  />
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {t?.buyer}: {order?.buyer?.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {t?.email}: {order?.buyer?.email}
                    </p>
                    <p className="text-gray-600 text-sm capitalize">
                      {t?.country}: {order?.buyer?.country}
                    </p>
                    <p className="text-gray-600 text-sm capitalize">
                      {langs[lang]?.accountSettings.phoneNumberLabel}:{" "}
                      {order?.buyer?.phoneNumber}
                    </p>
                  </div>
                </div>

                {/* Seller Information */}
                <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md w-full md:w-[48%] border-t-2 md:border-t-0 md:border-l-2 md:border-gray-300">
                  <img
                    src={order?.seller?.avatar}
                    alt={order?.seller?.name}
                    className="w-12 h-12 object-cover rounded-full border-2 border-gray-300"
                  />
                  <div className="space-y-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {t?.seller}: {order?.seller?.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {t?.email}: {order?.seller?.email}
                    </p>
                    <p className="text-gray-600 text-sm capitalize">
                      {t?.country}: {order?.seller?.country}
                    </p>
                    <p className="text-gray-600 text-sm capitalize">
                      {langs[lang]?.accountSettings.phoneNumberLabel}:{" "}
                      {order?.seller?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping Address and Payment Method */}
              <div className="mb-2">
                <h6 className="font-semibold">{t?.shippingAddress}</h6>
                <p>{order?.shippingAddress?.fullName}</p>
                <p>{order?.shippingAddress?.address}</p>
                <p>
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.country}
                </p>
                <p>{order?.shippingAddress?.phone}</p>
              </div>

              <div className="mb-2">
                <h6 className="font-semibold">{t?.paymentMethod}</h6>
                <p>{order?.paymentMethod}</p>
              </div>

              <div className="flex justify-between">
                <p className="mb-2">
                  {t?.createdAt}: {new Date(order?.createdAt).toLocaleString()}
                </p>

                <div>
                  <p className=" font-medium text-gray-800 ">
                    {t?.totalQuantity}: {order?.quantity || 0}
                  </p>
                  <p className=" font-medium text-gray-800">
                    {t?.totalPrice}: {order?.totalPrice} DH
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <ul className="flex gap-2 border-b border-gray-200 flex-wrap">
        {[
          "all",
          "progress",
          "shipped",
          "delivered",
          "cancelled",
          "completed",
        ].map((tab) => (
          <li
            key={tab}
            className={`p-3 cursor-pointer hover:bg-gray-200 ${
              activeTab === tab
                ? "border-b-2 border-primaryText bg-gray-200"
                : "border-b-2 border-transparent"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {t?.[tab]}
          </li>
        ))}
      </ul>

      <div className="mt-4">
        {activeTab === "all" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {type === "sold" ? t?.soldOrders : t?.boughtOrders}
            </h3>
            {relevantOrders.length > 0 ? (
              relevantOrders.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))
            ) : (
              <p>{t?.noOrders}</p>
            )}
          </div>
        )}
        {activeTab === "progress" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t?.progress} {type === "sold" ? t?.soldOrders : t?.boughtOrders}
            </h3>
            {filterOrders("In Progress").length > 0 ? (
              filterOrders("In Progress").map((order) => (
                <OrderItem key={order._id} order={order} />
              ))
            ) : (
              <p>{t?.noInProgress}</p>
            )}
          </div>
        )}
        {activeTab === "shipped" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t?.shipped} {type === "sold" ? t?.soldOrders : t?.boughtOrders}
            </h3>
            {filterOrders("Shipped").length > 0 ? (
              filterOrders("Shipped").map((order) => (
                <OrderItem key={order._id} order={order} />
              ))
            ) : (
              <p>{t?.noShipped}</p>
            )}
          </div>
        )}
        {activeTab === "delivered" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t?.delivered} {type === "sold" ? t?.soldOrders : t?.boughtOrders}
            </h3>
            {filterOrders("Delivered")?.length > 0 ? (
              filterOrders("Delivered").map((order) => (
                <OrderItem key={order._id} order={order} />
              ))
            ) : (
              <p>{t?.noDelivered}</p>
            )}
          </div>
        )}
        {activeTab === "cancelled" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t?.cancelled} {type === "sold" ? t?.soldOrders : t?.boughtOrders}
            </h3>
            {filterOrders("Cancelled").length > 0 ? (
              filterOrders("Cancelled").map((order) => (
                <OrderItem key={order._id} order={order} />
              ))
            ) : (
              <p>{t?.noCancelled}</p>
            )}
          </div>
        )}
        {activeTab === "completed" && (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              {t?.completed} {type === "sold" ? t?.soldOrders : t?.boughtOrders}
            </h3>
            {filterOrders("Completed").length > 0 ? (
              filterOrders("Completed").map((order) => (
                <OrderItem key={order._id} order={order} />
              ))
            ) : (
              <p>{t?.noCompleted}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTab;
