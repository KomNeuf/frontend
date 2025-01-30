import "./globals.css";
import ReduxProvider from "@/Providers/ReduxProvider";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: {
    default: "Achetez et vendez des vêtements neufs et d'occasion au Maroc",
    alternate: "اشتري وبِع الملابس الجديدة والمستعملة في المغرب",
  },
  description: {
    default:
      "Plateforme marocaine dédiée à la vente et l'achat de vêtements neufs et d'occasion. Trouvez les meilleures offres en ligne dès maintenant.",
    alternate:
      "منصة مغربية مخصصة لبيع وشراء الملابس الجديدة والمستعملة. اكتشف أفضل العروض عبر الإنترنت الآن.",
  },
  keywords: [
    "vêtements d'occasion",
    "vêtements neufs",
    "achat vêtements Maroc",
    "Achat Vêtements Casablanca",
    "vente vêtements en ligne",
    "Lingerie Maroc",

    "ملابس مستعملة",
    "ملابس جديدة",
    "شراء ملابس المغرب",
    "بيع ملابس عبر الإنترنت",
    "ملابس داخلية مثيرة",
    "أزياء رخيصة المغرب",

    "حوايج مستعملين",
    "حوايج مستعملين الدار البيضاء",
    "حوايج جداد",
    "شرا حوايج فالمغرب",
    "بيع حوايج أونلاين",
    "موضة رخيصة فالمغرب",

    "Women",
    "Men",
    "Kids",
    "Traditional Wear",
    "How it works",
  ],
};

export default function RootLayout({ children, lang = "fr" }) {
  const isArabic = lang === "ar";
  const pageTitle = isArabic
    ? metadata.title.alternate
    : metadata.title.default;
  const pageDescription = isArabic
    ? metadata.description.alternate
    : metadata.description.default;
  const pageKeywords = metadata.keywords.join(", ");

  return (
    <html lang={lang}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />

        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500&family=Roboto:wght@100;300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.komneuf.ma",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.komneuf.ma/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              mainEntity: {
                "@type": "ItemList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Women",
                    url: "https://www.komneuf.ma/en/searchResult?seeAll=Women",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Men",
                    url: "https://www.komneuf.ma/en/searchResult?seeAll=Men",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Kids",
                    url: "https://www.komneuf.ma/en/searchResult?seeAll=Kids",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Traditional Wear",
                    url: "https://www.komneuf.ma/en/searchResult?seeAll=Traditional%20Wear",
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
        <ToastContainer
          position="bottom-right"
          theme={"dark"}
          autoClose={3000}
        />
      </body>
    </html>
  );
}
