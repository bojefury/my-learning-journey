import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
export const metadata: Metadata = {
  metadataBase: new URL("https://help-store.example"),
  title: {
    default: "Help Store — цифровые товары",
    template: "%s · Help Store",
  },
  description: "Игры, подписки и пополнение аккаунта с прозрачной стоимостью.",
  openGraph: {
    title: "Help Store",
    description: "Цифровые товары для вашей игровой библиотеки",
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
