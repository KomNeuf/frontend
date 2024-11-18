import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import langs from "../../dictionaries/langs";

export default function AboutUsPage({ params }) {
  const { lang } = params;
  const t = langs[lang]?.about;

  return (
    <div className="max-w-screen-xl mx-auto px-6 sm:px-6 lg:px-8 my-8">
      <div
        style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
        className="space-y-8"
      >
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-primaryText">
            {t?.headerTitle}
          </h1>
          <p className="text-lg text-secondaryText">{t?.headerSubtitle}</p>
        </header>

        {Object.keys(t?.sections || {}).map((key, index) => {
          const section = t.sections[key];
          return (
            <section key={index} className="space-y-4">
              <h2 className="text-2xl font-semibold text-primaryText">
                {section.title}
              </h2>
              <p className="text-lg text-secondaryText">{section.content}</p>

              {section.points && Array.isArray(section.points) && (
                <ul className="list-disc list-outside text-secondaryText">
                  {section.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="mt-2">
                      {typeof point === "string" ? (
                        point
                      ) : (
                        <>
                          <strong>{point.title}</strong>: {point.description}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        <footer className="mt-8">
          <p className="text-md font-semibold text-primaryText">
            {t?.conclusion}
          </p>
        </footer>
      </div>
    </div>
  );
}
