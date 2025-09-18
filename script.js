// ============================================================
// === CONFIGURATION AREA =====================================
// ============================================================

// กำหนดชื่อไฟล์ PDF ที่ต้องการให้เปิด
// (ไฟล์นี้ควรอยู่โฟลเดอร์เดียวกับ index.html)
// ถ้าอยู่คนละที่ ก็ใส่ path แบบเต็ม เช่น "assets/books/set_operations_mini_book.pdf"
const PDF_FILE_NAME = "set_operations_mini_book.pdf";

// ============================================================
// === FUNCTION DEFINITIONS ===================================
// ============================================================

/**
 * ฟังก์ชันนี้ใช้สำหรับ "เปิด PDF" โดยตรง
 * โดยไม่ใช่การสร้าง iframe หรือ embed
 * แต่เป็นการเปลี่ยนเส้นทางของหน้า (redirect) ไปที่ไฟล์ PDF เลย
 * @param {string} fileName - ชื่อหรือ path ของไฟล์ PDF
 */
function openPdfDirectly(fileName) {
  // ตรวจสอบก่อนว่าค่าที่ส่งมาเป็น string ไหม
  if (typeof fileName !== "string" || fileName.trim().length === 0) {
    console.error("❌ ชื่อไฟล์ PDF ไม่ถูกต้อง");
    return;
  }

  // รวม path ไฟล์เป็น URL สุดท้าย
  const targetUrl = fileName;

  // แสดง log เพื่อ debug
  console.log("🎯 เตรียมเปิดไฟล์ PDF:", targetUrl);

  // ใช้การเปลี่ยนหน้าไปยัง PDF
  // เบราว์เซอร์ส่วนใหญ่จะแสดง PDF โดยตรง
  window.location.href = targetUrl;
}

// ============================================================
// === EVENT BINDING ==========================================
// ============================================================

// หา element ของปุ่มจาก id="openBtn"
const openButton = document.getElementById("openBtn");

// ตรวจสอบว่ามีปุ่มจริง ๆ ไหม
if (openButton) {
  console.log("✅ พบปุ่มแล้ว: openBtn, เตรียมผูก event");

  // ผูก event แบบเต็มยศ
  openButton.addEventListener("click", function handleOpenButtonClick(event) {
    console.log("🔔 ปุ่มถูกกดแล้ว!", event);

    // เรียกใช้ฟังก์ชันเปิด PDF โดยตรง
    openPdfDirectly(PDF_FILE_NAME);
  });
} else {
  console.warn("⚠️ ไม่พบปุ่มที่มี id=openBtn ใน DOM");
}
