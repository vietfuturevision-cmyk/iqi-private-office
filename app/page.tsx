import IQIPrivateOfficeNew from "./IQIPrivateOffice";
export default function Page() {
  return <IQIPrivateOfficeNew />;
}
```

---

## BƯỚC 4 — Deploy lên Vercel (3 phút)

1. Vào **vercel.com** → nhấn **"Continue with GitHub"** → đăng nhập
2. Nhấn **"Add New Project"**
3. Tìm repo `iqi-private-office` → nhấn **"Import"**
4. Giữ nguyên mọi cài đặt → nhấn **"Deploy"**
5. Chờ ~2 phút → Vercel tự build

Khi thấy màn hình confetti 🎉 là website đã live tại địa chỉ dạng:
`iqi-private-office.vercel.app`

---

## BƯỚC 5 — Mua domain (5 phút)

Vào **namecheap.com** → tìm tên domain muốn mua.

Gợi ý tên phù hợp với thương hiệu:

| Domain | Ý nghĩa |
|--------|---------|
| `iqiprivateoffice.com` | Thẳng vào thương hiệu |
| `locdv.com` | Tên cá nhân — dễ nhớ |
| `loc-advisory.com` | Chuyên nghiệp |
| `privateoffice.vn` | Đuôi .vn — thân quen |

Giá khoảng **$10–12/năm** (~250.000đ). Thanh toán bằng thẻ Visa/Mastercard hoặc PayPal.

---

## BƯỚC 6 — Gắn domain vào Vercel (5 phút)

**Phần A — Trong Vercel:**
1. Vào project → **Settings** → **Domains**
2. Nhập domain vừa mua (ví dụ `iqiprivateoffice.com`) → **Add**
3. Vercel hiện ra 2 dòng cần copy:
```
Type: A      Host: @      Value: 76.76.21.21
Type: CNAME  Host: www    Value: cname.vercel-dns.com
