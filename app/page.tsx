import dynamic from "next/dynamic";

// Dynamic import để tránh lỗi SSR với framer-motion và các browser API
const IQIPrivateOfficeNew = dynamic(
  () => import("./IQIPrivateOffice"),
  { ssr: false }
);

export default function Page() {
  return <IQIPrivateOfficeNew />;
}
