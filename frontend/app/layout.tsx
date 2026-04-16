import "@/styles/globals.css";
import Topbar from "@/components/layout/Topbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Topbar />
        <main className="animate-fade-in px-6 py-6 max-w-7xl mx-auto">
          {children}
        </main>
      </body>
    </html> 
  );
}



