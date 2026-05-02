import "./globals.css";
import ClientLayout from "@/client-layout";
import TopBar from "@/components/TopBar/TopBar";

export const metadata = {
  title: "Eco Homes | Luxury Lagos Real Estate",
  description:
    "Private luxury real estate advisory for high-value homes, estates, and investment properties across Lagos, Nigeria.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          <TopBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
