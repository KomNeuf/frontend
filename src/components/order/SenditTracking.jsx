import React, { useState } from "react";
import axios from "axios";
import langs from "@/app/[lang]/dictionaries/langs";

const SenditTracking = ({ lang }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);
  const [error, setError] = useState("");
  const t = langs[lang]?.senditTracking;

  const handleTracking = async () => {
    setError("");
    try {
      const response = await axios.get(
        `https://app.sendit.ma/api/v1/deliveries/${trackingNumber}`,
        {
          headers: {
            Authorization: `Bearer 919054|xQ7VDx5lt2OENh8LkUH0uf0OPR6L2tpBzbetCvnf`,
            "Content-Type": "application/json",
          },
        }
      );
      setTrackingInfo(response.data.data);
    } catch (err) {
      setError(
        "Error fetching data. Please check the tracking number and try again."
      );
      console.error(err);
    }
  };

  return (
    <div className="mx-auto p-4 border border-gray-200 rounded-lg">
      <h1 className="text-xl font-bold">{t.title}</h1>
      <p className="text-sm my-2">{t.description}</p>
      <input
        type="text"
        placeholder={t.placeholder}
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        className="border p-2 mt-4 w-full"
      />
      <button
        onClick={handleTracking}
        className="bg-primaryText text-white rounded-md p-2 mt-4"
      >
        {t.button}
      </button>

      {error && <p className="text-red-500">{t.error}</p>}
      {trackingInfo && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">{t.trackingInfo.title}</h2>
          <p>
            <strong>{t.trackingInfo.status}:</strong> {trackingInfo.status}
          </p>
          <p>
            {/* <strong>{t.trackingInfo.fee}:</strong> {trackingInfo.fee} */}
          </p>
          <p>
            <strong>{t.trackingInfo.recipientName}:</strong> {trackingInfo.name}
          </p>
          <p>
            <strong>{t.trackingInfo.phone}:</strong> {trackingInfo.phone}
          </p>
          <p>
            <strong>{t.trackingInfo.address}:</strong> {trackingInfo.address}
          </p>
          <p>
            <strong>{t.trackingInfo.amount}:</strong> {trackingInfo.amount} MAD
          </p>
          <p>
            <strong>{t.trackingInfo.comment}:</strong>{" "}
            {trackingInfo.comment || t.trackingInfo.noComment}
          </p>

          <div className="mt-2">
            <h3 className="font-semibold">
              {t.trackingInfo.districtInfo.title}
            </h3>
            <p>
              <strong>{t.trackingInfo.districtInfo.city}:</strong>{" "}
              {trackingInfo.district.ville}
            </p>
            <p>
              <strong>{t.trackingInfo.districtInfo.districtName}:</strong>{" "}
              {trackingInfo.district.name}
            </p>
            <p>
              <strong>{t.trackingInfo.districtInfo.deliveryTime}:</strong>{" "}
              {trackingInfo.district.delais}
            </p>
          </div>

          {/* {trackingInfo.audits && trackingInfo.audits.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">
                {t.trackingInfo.lastTrackingUpdate.title}
              </h3>
              <p>
                <strong>{t.trackingInfo.lastTrackingUpdate.event}:</strong>{" "}
                {trackingInfo.audits[0].event}
              </p>
              <p>
                <strong>{t.trackingInfo.lastTrackingUpdate.updatedBy}:</strong>{" "}
                {trackingInfo.audits[0].user}
              </p>
              <p>
                <strong>{t.trackingInfo.lastTrackingUpdate.updatedAt}:</strong>{" "}
                {trackingInfo.audits[0].created_at}
              </p>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
};

export default SenditTracking;
