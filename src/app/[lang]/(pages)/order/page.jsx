import OderSideBar from "@/components/order/OderSideBar";
import React from "react";

const OrderPage = ({ params }) => {
  const { lang } = params;
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <OderSideBar lang={lang} />
    </div>
  );
};

export default OrderPage;
