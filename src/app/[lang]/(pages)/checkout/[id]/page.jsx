"use client";
import Loading from "@/components/Loading";
import withAuth from "@/app/middleware/withAuth";
import api from "@/redux/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import langs from "@/app/[lang]/dictionaries/langs";
import {
  useStripe,
  useElements,
  Elements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51PPlk3I0y9UNFQrl6pNiLqt5C4ghiWq6ZyLetmBtG2gxeJv1EN9ebQx8o4Jfpe6Dr35RJXtdUqfKQVWvQw940Dqa00glVc4j8Z"
);
const CheckoutPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[3];

  const [shippingCost, setShippingCost] = useState(45);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const loginUser = useSelector((state) => state.auth.loginUser);
  const lang = pathname?.split("/")[1];

  const t = langs[lang]?.checkout;
  const [createOrder, { isLoading: isOrderLoading }] =
    api.adminApis.useCreateOrderMutation();
  const {
    data: product,
    isLoading,
    error,
  } = api.adminApis.useGetProductByIdQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (product) {
      if (product?.shippingOffer && product?.price > 100) {
        setShippingCost(0);
      } else {
        if (loginUser?.shipping) {
          fetchShippingCost();
        } else {
          setShippingCost(45);
        }
      }
    }
  }, [product, loginUser]);

  const fetchShippingCost = async () => {
    try {
      const shippingAddress = loginUser?.shipping;
      if (!shippingAddress || !shippingAddress.city) {
        toast.error("Shipping address is incomplete.");
        setShippingCost(45);
        return;
      }

      const city = shippingAddress?.city;

      const response = await axios.get(
        `https://app.sendit.ma/api/v1/districts?querystring=${city}`,
        {
          headers: {
            Authorization: `Bearer ${"918655|8aXx3OyiaPM3qcm0mHzey0ovoEVwT5Z7CJFF8qx6"}`,
            "Content-Type": "application/json",
          },
        }
      );

      const shippingData = response?.data?.data?.[0];

      if (shippingData) {
        const shippingCostFromAPI = parseFloat(shippingData.price) || 0;
        setShippingCost(shippingCostFromAPI);
      } else {
        toast.error("Could not find shipping cost for the selected city.");
        setShippingCost(45);
      }
    } catch (error) {
      console.error("Error fetching shipping cost:", error);
      toast.error(
        "Failed to fetch shipping cost. Using default shipping cost."
      );
      setShippingCost(45);
    }
  };

  const totalPrice = product
    ? (parseFloat(product.price) + shippingCost).toFixed(2)
    : 0;

  const handleAddressChange = () => {
    router.push(`/${lang}/settings?tab=shipping`);
  };

  const handlePayoutChange = () => {
    router.push(`/${lang}/settings?tab=payments`);
  };

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(
          // "http://localhost:5000/create-payment-intent",
          "https://kiff-new-backend.vercel.app/create-payment-intent",
          { amount: totalPrice * 100 }
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
        toast.error("Error fetching payment details. Please try again.");
      }
    };

    if (paymentMethod === "Card Payment") {
      fetchClientSecret();
    }
  }, [paymentMethod]);

  if (isLoading) return <Loading />;

  const handleCheckout = async () => {
    if (
      !loginUser?.shipping ||
      !loginUser.shipping.fullName ||
      !loginUser.shipping.address ||
      !loginUser.shipping.city ||
      !loginUser.shipping.country ||
      !loginUser.shipping.phone
      // !loginUser?.payoutOptions ||
      // !loginUser.payoutOptions.accountHolderName ||
      // !loginUser.payoutOptions.accountNumber ||
      // !loginUser.payoutOptions.bankName ||
      // !loginUser.payoutOptions.accountType ||
      // !loginUser.payoutOptions.billingAddress ||
      // !loginUser.payoutOptions.billingAddress.fullName ||
      // !loginUser.payoutOptions.billingAddress.address ||
      // !loginUser.payoutOptions.billingAddress.postalCode ||
      // !loginUser.payoutOptions.billingAddress.country
    ) {
      toast.error(t?.completeAddress);

      return;
    }

    const orderData = {
      product: id,
      buyer: loginUser._id,
      seller: product?.userId?._id,
      shippingAddress: loginUser?.shipping,
      paymentMethod: "Cash on Delivery",
      totalPrice,
    };

    try {
      const result = await createOrder(orderData).unwrap();
      if (result?.success) {
        toast.success(t?.orderPlacedSuccess);
        router.push(`/${lang}/checkout/${id}/success`);
      }
    } catch (error) {
      toast.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative   grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-[#FCFBFF] p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4 text-primaryText">
              {t?.order}
            </h2>
            <div className="flex items-center">
              <img
                src={product?.photos?.[0]}
                alt="Product"
                className="w-20 h-20 object-cover mr-4 border rounded-lg"
              />
              <div>
                <h3 className="text-lg font-medium">{product?.title}</h3>
                <p className="text-md text-gray-600">
                  {product?.size} • {product?.condition} • {product?.brand}
                </p>
              </div>
              <div className="ml-auto text-lg">
                <span className="mt-3 -ml-1">
                  {product.price?.toFixed(2)} DH
                </span>
              </div>
            </div>
          </div>
          <div className="bg-[#FCFBFF] p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4 text-primaryText">
              {t?.paymentMethod}
            </h2>
            <div>
              <label>
                <input
                  type="radio"
                  value="Cash on Delivery"
                  className="mr-2"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() => setPaymentMethod("Cash on Delivery")}
                />
                {t?.CashDelivery}
              </label>
              <br />
              <label className="text-gray-400">
                <input
                  type="radio"
                  className="mr-2 "
                  value="Card Payment"
                  disabled
                  checked={paymentMethod === "Card Payment"}
                  onChange={() => setPaymentMethod("Card Payment")}
                />
                {t?.CardPayment} <span>( {t?.comingSoon} )</span>
              </label>
            </div>
          </div>
          <div className="bg-[#FCFBFF] p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4 text-primaryText">
              {langs[lang]?.orderTab.shippingAddress}
            </h2>
            {loginUser?.shipping &&
              (loginUser.shipping.fullName &&
              loginUser.shipping.address &&
              loginUser.shipping.city &&
              loginUser.shipping.phone &&
              loginUser.shipping.country ? (
                <>
                  <p className="text-md text-gray-600">
                    <span className="font-medium">{t?.fullName}: </span>
                    {loginUser.shipping.fullName}
                  </p>
                  <p className="text-md text-gray-600">
                    <span className="font-medium">{t?.homeAddress}: </span>
                    {loginUser.shipping.address}
                  </p>
                  <p className="text-md text-gray-600">
                    <span className="font-medium">
                      {" "}
                      {langs[lang]?.accountSettings.phoneNumberLabel}:{" "}
                    </span>
                    {loginUser.shipping.phone}
                  </p>
                  <p className="text-md text-gray-600">
                    <span className="font-medium">
                      {langs[lang]?.shipping?.postalCodeLabel}:{" "}
                    </span>
                    {loginUser.shipping.city}
                  </p>

                  <p className="text-md text-gray-600">
                    <span className="font-medium">{t?.country}: </span>
                    {loginUser.shipping.country}
                  </p>
                  <button
                    className="mt-2 text-primaryText hover:underline"
                    onClick={handleAddressChange}
                  >
                    {t?.changeAddress}
                  </button>
                </>
              ) : (
                <button
                  className="text-primaryText hover:underline"
                  onClick={handleAddressChange}
                >
                  {t?.addAddress}
                </button>
              ))}
          </div>
          {/*  */}
          {/* <div className="bg-[#FCFBFF] p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4 text-primaryText">
              {t?.paymentDetails}
            </h2>
            {loginUser?.payoutOptions &&
            loginUser.payoutOptions.accountHolderName &&
            loginUser.payoutOptions.accountNumber &&
            loginUser.payoutOptions.bankName &&
            loginUser.payoutOptions.accountType ? (
              <>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.accountHolderName}: </span>
                  {loginUser.payoutOptions.accountHolderName}
                </p>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.accountNumber}: </span>
                  {loginUser.payoutOptions.accountNumber}
                </p>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.bankName}: </span>
                  {loginUser.payoutOptions.bankName}
                </p>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.accountType}: </span>
                  {loginUser.payoutOptions.accountType}
                </p>
                <button
                  className="mt-2 text-primaryText hover:underline"
                  onClick={handlePayoutChange}
                >
                  {t?.changePaymentDetails}
                </button>
              </>
            ) : (
              <button
                className="text-primaryText hover:underline"
                onClick={handlePayoutChange}
              >
                {t?.addPaymentDetails}
              </button>
            )}
          </div>

          <div className="bg-[#FCFBFF] p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4 text-primaryText">
              {t?.billingAddress}
            </h2>
            {loginUser?.payoutOptions?.billingAddress &&
            loginUser.payoutOptions.billingAddress.fullName &&
            loginUser.payoutOptions.billingAddress.address &&
            loginUser.payoutOptions.billingAddress.postalCode &&
            loginUser.payoutOptions.billingAddress.country ? (
              <>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.fullName}: </span>
                  {loginUser.payoutOptions.billingAddress.fullName}
                </p>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.address}: </span>
                  {loginUser.payoutOptions.billingAddress.address}
                </p>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.postalCode}: </span>
                  {loginUser.payoutOptions.billingAddress.postalCode}
                </p>
                <p className="text-md text-gray-600">
                  <span className="font-medium">{t?.country}: </span>
                  {loginUser.payoutOptions.billingAddress.country}
                </p>
                <button
                  className="mt-2 text-primaryText hover:underline"
                  onClick={handlePayoutChange}
                >
                  {t?.changeBillingAddress}
                </button>
              </>
            ) : (
              <button
                className="text-primaryText hover:underline"
                onClick={handlePayoutChange}
              >
                {t?.addBillingAddress}
              </button>
            )}
          </div> */}

          {/*  */}

          <div className="bg-[#FCFBFF] p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-semibold mb-4 text-primaryText">
              {t?.deliveryDetails}
            </h2>
            <p>
              <span className="font-medium">{t?.shippingCost}: </span>
              {/* {product?.shippingCost?.toFixed(2) || 0} */}
              {shippingCost || 0} DH
            </p>
            <p className="text-sm text-gray-500">{t?.homeDelivery}</p>
          </div>
        </div>

        {paymentMethod === "Card Payment" && clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              id={id}
              lang={lang}
              product={product}
              amount={totalPrice}
              loginUser={loginUser}
              t={t}
            />
          </Elements>
        ) : (
          <div
            style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
            className="bg-[#FCFBFF] p-4 rounded-lg shadow-md h-fit md:sticky top-36 "
          >
            <h2 className="text-xl font-semibold mb-4 text-primaryText">
              {t?.orderSummary}
            </h2>
            <div className="flex justify-between mb-2">
              <span>{t?.order}</span>
              <span>{product.price.toFixed(2)} DH</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{t?.shipping}</span>
              {/* <span>{product?.shippingCost?.toFixed(2) || 0} DH</span> */}
              <span>{shippingCost || 0} DH</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>{t?.salesTax}</span>
              <span>{t?.toBeConfirmed}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg text-primaryText">
              <span>{t?.totalToPay}</span>
              <span>{totalPrice} DH</span>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 w-full bg-primaryText text-white py-2 rounded-md hover:bg-primaryText/80 transition duration-300"
            >
              {t?.placeOrder} {totalPrice} DH
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAuth(CheckoutPage);

const CheckoutForm = ({
  amount,
  lang,
  id,
  loginUser,
  product,

  t,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [createOrder, { isLoading: isOrderLoading }] =
    api.adminApis.useCreateOrderMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/${lang}/checkout/${id}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      console.log(error.message);
      toast.error(error.message);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await createOrder({
          product: id,
          buyer: loginUser._id,
          seller: product?.userId?._id,
          shippingAddress: loginUser?.shipping,
          paymentMethod: "Card Payment",
          totalPrice: amount,

          paymentIntentId: paymentIntent.id,
        }).unwrap();

        toast.success(t?.orderPlacedSuccess);
        window.location.href = `/${lang}/checkout/${id}/success`;
      } catch (err) {
        toast.error("Error creating order:", err.message);
      }
    }
  };

  return (
    <div className="bg-[#FCFBFF] p-4 rounded-lg shadow-md h-fit md:sticky top-36 ">
      <form onSubmit={handleSubmit}>
        <div style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
          <h2 className="text-xl font-semibold mb-4 text-primaryText">
            {t?.orderSummary}
          </h2>
          <div className="flex justify-between mb-2">
            <span>{t?.order}</span>
            <span>{product.price.toFixed(2)} DH</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>{t?.shipping}</span>
            {/* <span>{product?.shippingCost?.toFixed(2) || 0} DH</span> */}
            <span>{shippingCost || 0} DH</span>
          </div>

          <hr className="my-2" />
          <div className="flex justify-between font-bold text-lg text-primaryText">
            <span>{t?.totalToPay}</span>
            <span>{amount} DH</span>
          </div>
        </div>
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || isOrderLoading}
          className="mt-4 w-full bg-primaryText text-white py-2 rounded-md hover:bg-primaryText/80 transition duration-300"
        >
          {isOrderLoading ? t?.processing : `${t?.pay}  ${amount} DH`}
        </button>
        <p className="mt-2 text-center text-sm text-gray-500">
          {t?.paymentSecurity}
        </p>
      </form>
    </div>
  );
};
