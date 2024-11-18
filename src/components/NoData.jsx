import langs from "@/app/[lang]/dictionaries/langs";
import React from "react";

const NoData = ({ lang }) => {
  const t = langs[lang]?.noData;
  return (
    <div className="flex  justify-center">
      <div className="flex  flex-col items-center p-10 bg-card rounded-lg shadow-xl  shadow-primaryText/60 transition-transform transform ">
        <div className="flex items-center justify-center mb-6">
          <div className="w-28 h-28 border-2 border-primaryText rounded-full flex items-center justify-center animate-bounce">
            <img
              aria-hidden="true"
              alt={t?.title}
              src="https://static.vecteezy.com/system/resources/thumbnails/010/856/652/small/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg"
              className="w-16 h-16"
            />
          </div>
        </div>
        <h2 className="text-3xl font-extrabold mb-2 text-center">{t?.title}</h2>
        <p className="text-muted-foreground mb-6 text-center text-lg">
          {t?.description}
        </p>
      </div>
    </div>
  );
};

export default NoData;
