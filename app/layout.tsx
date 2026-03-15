export const metadata = {
  title: "Lộc · IQI Private Office",
  description: "Tư vấn bất động sản quốc tế & Golden Visa",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
