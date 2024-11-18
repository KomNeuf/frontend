"use client";
import Image from "next/image";
import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+212 774-605047";
  const message = "Hello, I would like to contact you";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="fixed bottom-4 right-3 cursor-pointer bg-primaryText z-50  rounded-full h-14 w-14 animate-pulse-orange  text-white flex justify-center items-center shadow-lg"
      onClick={handleWhatsAppClick}
    >
      <Image
        src={"/whatsapp.png"}
        alt="komNeuf Whatsapp"
        height={34}
        width={34}
      />
    </div>
  );
};

export default WhatsAppButton;
