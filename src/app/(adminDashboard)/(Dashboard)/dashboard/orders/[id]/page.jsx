"use client";
import Loading from "@/components/Loading";
import api from "@/redux/api";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderDetail = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const id = pathname.split("/")[3];

  const {
    data: order,
    isLoading,
    error,
  } = api.adminApis.useGetOrderByIdQuery(id, {
    skip: !id,
  });
  const [updateOrderStatus, { isLoading: isUpdating }] =
    api.adminApis.useUpdateOrderStatusMutation();

  const [updatedOrder, setUpdatedOrder] = useState({
    status: "",
  });

  useEffect(() => {
    if (order) {
      setUpdatedOrder({
        status: order.status || "",
      });
    }
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateOrderStatus({
        orderId: id,
        newStatus: updatedOrder.status,
      }).unwrap();

      if (res?.success) {
        toast.success("Order updated successfully");
      }
    } catch (error) {
      toast.error("Error updating order: " + error.message);
    }
  };
  if (isLoading || isUpdating) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) return <p>Error loading order details.</p>;

  return (
    <div className="p-8 my-8">
      {action === "update" ? (
        <>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Update Order Status
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={updatedOrder.status}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
                <option value="">Select Status</option>
                <option value="Cancelled">Cancelled</option>
                <option value="In Progress">In Progress</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-6 px-4 py-2 bg-primaryText text-white rounded"
            >
              Save Changes
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Order Details
          </h1>
          <div>
            <div className="flex justify-between">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                  Product Ref No: {order?.product?.referenceNumber}
                </h3>
              </div>
              <div>
                <p>
                  Order Status:{" "}
                  <span className="text-md font-bold text-gray-800">
                    {order?.senditDelivery?.status}
                  </span>
                </p>

                <p>
                  Total Price:{" "}
                  <span className="text-md font-bold text-gray-800">
                    {order?.totalPrice} MAD
                  </span>
                </p>
              </div>
            </div>

            <div className="flex gap-8 mb-4">
              <div className="flex flex-col">
                <img
                  src={
                    order?.buyer?.avatar ||
                    "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                  }
                  alt={order?.buyer?.name}
                  className="w-10 h-10 object-cover rounded-full mb-2"
                />
                <p className="font-medium text-gray-800">
                  Buyer: {order?.buyer?.name}
                </p>
                <p className="text-gray-600">Email: {order?.buyer?.email}</p>
                <p className="text-gray-600 capitalize">
                  Country: {order?.buyer?.country}
                </p>
                <p className="text-gray-600 capitalize">
                  Phone No: {order?.buyer?.phoneNumber}
                </p>
                {/* <div className="mt-4">
                  <h6 className="font-semibold text-gray-800">
                    Buyer Payout Options
                  </h6>
                  <p className="text-gray-600">
                    <span className="font-medium">Account Holder Name:</span>{" "}
                    {order?.buyer?.payoutOptions?.accountHolderName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Account Number:</span>{" "}
                    {order?.buyer?.payoutOptions?.accountNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Bank Name:</span>{" "}
                    {order?.buyer?.payoutOptions?.bankName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Account Type:</span>{" "}
                    {order?.buyer?.payoutOptions?.accountType}
                  </p>
                </div>

                <div className="mt-4">
                  <h6 className="font-semibold text-gray-800">
                    Buyer Billing Address
                  </h6>
                  <p className="text-gray-600">
                    <span className="font-medium">Full Name:</span>{" "}
                    {order?.buyer?.payoutOptions?.billingAddress?.fullName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {order?.buyer?.payoutOptions?.billingAddress?.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Postal Code:</span>{" "}
                    {order?.buyer?.payoutOptions?.billingAddress?.postalCode}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Country:</span>{" "}
                    {order?.buyer?.payoutOptions?.billingAddress?.country}
                  </p>
                </div> */}
              </div>
              <div className="flex flex-col">
                <img
                  src={
                    order?.seller?.avatar ||
                    "https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png?ssl=1"
                  }
                  alt={order?.seller?.name}
                  className="w-10 h-10 object-cover rounded-full mb-2"
                />
                <p className="font-medium text-gray-800">
                  Seller: {order?.seller?.name}
                </p>
                <p className="text-gray-600">Email: {order?.seller?.email}</p>
                <p className="text-gray-600 capitalize">
                  Country: {order?.seller?.country}
                </p>
                <p className="text-gray-600 capitalize">
                  Phone No: {order?.seller?.phoneNumber}
                </p>

                {/* <div className="mt-4">
                  <h6 className="font-semibold text-gray-800">
                    Seller Payout Options
                  </h6>
                  <p className="text-gray-600">
                    <span className="font-medium">Account Holder Name:</span>{" "}
                    {order?.seller?.payoutOptions?.accountHolderName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Account Number:</span>{" "}
                    {order?.seller?.payoutOptions?.accountNumber}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Bank Name:</span>{" "}
                    {order?.seller?.payoutOptions?.bankName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Account Type:</span>{" "}
                    {order?.seller?.payoutOptions?.accountType}
                  </p>
                </div>

                <div className="mt-4">
                  <h6 className="font-semibold text-gray-800">
                    Seller Billing Address
                  </h6>
                  <p className="text-gray-600">
                    <span className="font-medium">Full Name:</span>{" "}
                    {order?.seller?.payoutOptions?.billingAddress?.fullName}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Address:</span>{" "}
                    {order?.seller?.payoutOptions?.billingAddress?.address}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Postal Code:</span>{" "}
                    {order?.seller?.payoutOptions?.billingAddress?.postalCode}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Country:</span>{" "}
                    {order?.seller?.payoutOptions?.billingAddress?.country}
                  </p>
                </div> */}
              </div>
            </div>
            <div className="mt-2">
              <h6 className="font-semibold text-gray-800">Shipping Address</h6>
              <p>{order?.shippingAddress?.fullName}</p>
              <p>{order?.shippingAddress?.address}</p>
              <p>
                {order?.shippingAddress?.city},{" "}
                {order?.shippingAddress?.country}
                {order?.shippingAddress?.phone}
              </p>
            </div>
            <div className="mt-2">
              <h6 className="font-semibold text-gray-800">Payment Method</h6>
              <p>{order?.paymentMethod}</p>
              {order?.paymentIntentId && (
                <p>
                  Payment Intent Id:{" "}
                  <span className="font-medium text-gray-800">
                    {order?.paymentIntentId}
                  </span>
                </p>
              )}
            </div>

            <div className="mt-4">
              <h6 className="font-semibold text-gray-800">
                Delivery Information
              </h6>
              <p>Name: {order?.senditDelivery?.name}</p>
              <p>Phone: {order?.senditDelivery?.phone}</p>
              <p>Status: {order?.senditDelivery?.status}</p>
              <p>Delivery Fee: {order?.senditDelivery?.fee} MAD</p>
              <p>Delivery Code: {order?.senditDelivery?.code}</p>
            </div>
            <div className="mt-2 text-gray-700">
              <p>
                Created At:{" "}
                <span className="font-medium text-gray-800">
                  {new Date(order?.createdAt).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
