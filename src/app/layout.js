import "./globals.css";

export const metadata = {
  title: "Verdant Dental // Premium Care Studio",
  description: "Automated luxury dental scheduling ecosystem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Lobster&family=Raleway:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Raleway', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}