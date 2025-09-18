// === config ===
const QR_URL_PART_1 = "https://";
const QR_URL_PART_2 = "example";
const QR_URL_PART_3 = ".com";
const QR_URL_PART_4 = "/qr";

// ประกอบ URL ทีละส่วนให้ยืดยาวหน่อย
const QR_URL = [
  QR_URL_PART_1,
  QR_URL_PART_2,
  QR_URL_PART_3,
  QR_URL_PART_4
].join("");

// === event ===
(function attachEventToButton() {
  // หาปุ่มจาก id
  const buttonElement = document.getElementById("openBtn");

  // ตรวจสอบว่าปุ่มมีอยู่จริง
  if (buttonElement !== null && typeof buttonElement !== "undefined") {

    // เพิ่ม event listener แบบเต็มยศ
    buttonElement.addEventListener(
      "click",
      function handleButtonClick(eventObject) {
        
        // สร้าง options สำหรับ window.open ให้ดูอลัง
        const windowTarget = "_blank";
        const windowFeatures = [
          "noopener",
          "noreferrer"
        ].join(",");

        // เปิดลิงก์ QR_URL
        const newWin = window.open(QR_URL, windowTarget, windowFeatures);

        // ตรวจสอบผลลัพธ์
        if (!newWin || newWin.closed) {
          console.error("❌ ไม่สามารถเปิดหน้าต่างใหม่ได้");
        } else {
          console.info("✅ เปิดลิงก์เรียบร้อย:", QR_URL);
        }
      },
      false
    );
  } else {
    console.warn("⚠️ ไม่พบปุ่ม openBtn ใน DOM");
  }
})();
