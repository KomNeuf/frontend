"use client";
import CarouselComponent from "@/components/landingPage/carousel/CarouselComponent";
import CategoryCard from "@/components/landingPage/CategoryCard";
import CategoryGoods from "@/components/landingPage/CategoryGoods";

import DiscoverSection from "@/components/landingPage/DiscoverSection";
import Hero from "@/components/landingPage/Hero";
import PopularBrands from "@/components/landingPage/PopularBrands";
import ProductListContainer from "@/components/landingPage/ProductListContainer";
import SoldOutItems from "@/components/landingPage/SoldOutItems";
import SpecialOffers from "@/components/landingPage/specialOffer/SpecialOffers";
import LanguagePopup from "@/components/navbar/LanguagePopup";
import OfferModal from "@/components/OfferModal";
import Benefits from "@/components/product/Benefits";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasSelectedLanguage, setHasSelectedLanguage] = useState(false);
  const [hasSeenDeliveryPopup, setHasSeenDeliveryPopup] = useState(false);

  useEffect(() => {
    const currentTime = new Date().getTime();

    const languageSelectedTime = localStorage.getItem("languageSelectedTime");
    const deliveryPopupSeenTime = localStorage.getItem("deliveryPopupSeenTime");

    if (languageSelectedTime && currentTime - languageSelectedTime < ONE_DAY) {
      setHasSelectedLanguage(true);
      setIsPopupOpen(false);
    } else {
      setIsPopupOpen(true);
      localStorage.removeItem("languageSelectedTime");
    }

    if (
      deliveryPopupSeenTime &&
      currentTime - deliveryPopupSeenTime < ONE_DAY
    ) {
      setHasSeenDeliveryPopup(true);
    } else {
      localStorage.removeItem("deliveryPopupSeenTime");
    }

    const timer = setTimeout(() => {
      if (!hasSeenDeliveryPopup) {
        setIsModalVisible(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [hasSeenDeliveryPopup]);
  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closePopupModal = () => {
    setIsPopupOpen(false);
    localStorage.setItem("languageSelectedTime", new Date().getTime());
    setHasSelectedLanguage(true);
  };

  const closeDeliveryPopup = () => {
    setHasSeenDeliveryPopup(true);
    localStorage.setItem("deliveryPopupSeenTime", new Date().getTime());
    closeModal();
  };
  const { lang } = params;
  return (
    <div>
      <Hero lang={lang} />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <CarouselComponent lang={lang} /> */}
        <CategoryCard lang={lang} />
        <div className="py-8">
          <Benefits lang={lang} />
        </div>
        <SpecialOffers lang={lang} />
        {/* <CategoryGoods lang={lang} /> */}
        <ProductListContainer lang={lang} />
        <SoldOutItems lang={lang} />
        <PopularBrands lang={lang} />
      </div>

      {isPopupOpen && !hasSelectedLanguage && (
        <LanguagePopup isOpen={isPopupOpen} onClose={closePopupModal} />
      )}
      {isModalVisible && !hasSeenDeliveryPopup && (
        <OfferModal
          isVisible={isModalVisible}
          onClose={closeDeliveryPopup}
          lang={lang}
        />
      )}
    </div>
  );
}
