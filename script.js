// ===============================================
// === CONFIGURATION SECTION =====================
// ===============================================

// ไฟล์ PDF ที่เราจะเปิดแสดงแทนลิงก์
// 👉 เปลี่ยนชื่อไฟล์ได้ตามต้องการ (ต้องอยู่ในโฟลเดอร์เดียวกับไฟล์ html)
const PDF_FILE_NAME = "set_operations_mini_book.pdf";

// ===============================================
// === HELPER FUNCTIONS ==========================
// ===============================================

/**
 * ฟังก์ชันสร้าง <iframe> สำหรับแสดง PDF
 * @param {string} src - path ของไฟล์ PDF
 * @returns {HTMLIFrameElement} - iframe ที่ถูกสร้างขึ้น
 */
function createPdfViewer(src) {
  const iframe = document.createElement("iframe");
  iframe.src = src;

  // ตั้งค่า style ให้เต็มหน้าจอและสวยงาม
  iframe.style.width = "100%";
  iframe.style.height = "600px";
  iframe.style.border = "1px solid #ccc";
  iframe.style.borderRadius = "12px";
  iframe.style.marginTop = "20px";
  iframe.setAttribute("title", "Mini Book PDF Viewer");

  return iframe;
}

/**
 * ฟังก์ชันที่ใช้แทนที่ container ด้วย PDF viewer
 */
function showPdf() {
  const container = document.querySelector(".container");

  if (!container) {
    console.error("ไม่เจอ .container ใน DOM");
    return;
  }

  // ลบเนื้อหาทั้งหมดออกก่อน
  container.innerHTML = "";

  // เพิ่มหัวเรื่องใหม่
  const title = document.createElement("h1");
  title.textContent = "📖 เปิดอ่าน Mini Book: เซต";
  title.style.marginBottom = "16px";
  title.style.fontSize = "1.5rem";
  title.style.color = "#4B0082";

  // สร้าง viewer
  const pdfViewer = createPdfViewer(PDF_FILE_NAME);

  // ใส่กลับเข้า container
  container.appendChild(title);
  container.appendChild(pdfViewer);
}

// ===============================================
// === EVENT HANDLING SECTION ====================
// ===============================================

// หา element ปุ่ม
const qrButtonElement = document.getElementById("openBtn");

// ถ้ามีปุ่มจริง
if (qrButtonElement) {
  qrButtonElement.addEventListener("click", function onClickHandler() {
    console.log("🎯 ผู้ใช้กดปุ่ม เปิด PDF แล้ว");
    showPdf();
  });
} else {
  console.warn("⚠️ ไม่เจอปุ่มที่มี id=openBtn");
}
