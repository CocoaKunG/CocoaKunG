// ======================================
// === CONFIGURATION (ตั้งค่าเริ่มต้น) ===
// ======================================

// ชื่อไฟล์ PDF ที่ต้องการเปิด
// (ไฟล์นี้ควรอยู่ในโฟลเดอร์เดียวกับ index.html)
const PDF_FILE_NAME = "set_operations_mini_book.pdf";

// ======================================
// === UTILITY FUNCTIONS (เครื่องมือเสริม) ===
// ======================================

/**
 * ประกอบ path ของไฟล์ PDF แบบยืดหยุ่น
 * @param {string} fileName - ชื่อไฟล์ PDF
 * @returns {string} - path พร้อมใช้งาน
 */
function buildPdfPath(fileName) {
  // เผื่ออนาคตอาจอยากต่อ path เช่น ./assets/pdf/
  const basePath = "./";
  return basePath + fileName;
}

/**
 * เปิดไฟล์ PDF ในแท็บใหม่
 * โดยใช้ UI viewer ของ browser เอง
 * @param {string} pdfPath - path ของไฟล์ PDF
 */
function openPdfInNewTab(pdfPath) {
  // target = "_blank" คือบังคับให้เปิดอีกแท็บ
  // features = "noopener,noreferrer" คือความปลอดภัย
  window.open(pdfPath, "_blank", "noopener,noreferrer");
}

// ======================================
// === EVENT BINDING (การผูกเหตุการณ์) ===
// ======================================

// หาปุ่มจาก DOM
const openButton = document.getElementById("openBtn");

// ตรวจสอบว่าปุ่มมีจริง
if (openButton) {
  openButton.addEventListener("click", function handleClick(event) {
    console.log("🎯 ผู้ใช้กดปุ่มแล้ว เตรียมเปิด PDF...");

    // สร้าง path ของ PDF จากชื่อไฟล์
    const pdfPath = buildPdfPath(PDF_FILE_NAME);

    // เรียกใช้ฟังก์ชันเปิด PDF
    openPdfInNewTab(pdfPath);

    console.log("✅ PDF ถูกส่งไปเปิดในแท็บใหม่:", pdfPath);
  });
} else {
  console.error("⚠️ ไม่พบปุ่ม id=openBtn ในหน้า HTML");
}
