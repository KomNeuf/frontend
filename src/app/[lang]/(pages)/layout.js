import Footer from "@/components/Footer";
import Navbar from "@/components/navbar/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function RootLayout({ children, params }) {
  const { lang } = params;

  return (
    <main>
      <Navbar lang={lang} />
      <div className="min-h-[100vh]">{children}</div>
      <WhatsAppButton />
      <Footer lang={lang} />
    </main>
  );
}
