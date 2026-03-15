import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lộc · IQI Private Office — Tư vấn Bất động sản Quốc tế & Golden Visa",
  description:
    "Senior Advisor tại IQI Global. Tư vấn đầu tư bất động sản quốc tế, Golden Visa EU, CBI — Úc, Dubai, Hy Lạp, Thổ Nhĩ Kỳ, Síp, Grenada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
