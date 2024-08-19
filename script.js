// ฟังก์ชันเพื่อดึง IP และข้อมูลระบบปฏิบัติการ
async function fetchIpAndSystemInfo() {
  // ดึง IP จาก ipify API
  const ip = await fetch('https://api.ipify.org?format=json').then(res => res.json()).then(data => data.ip);
  
  // ข้อมูลเบราว์เซอร์และระบบปฏิบัติการ
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  return { ip, userAgent, platform };
}

// ฟังก์ชันเพื่อส่งข้อมูลไปยัง Discord Webhook
async function sendToDiscord(ip, userAgent, platform) {
  const webhookUrl = 'https://discord.com/api/webhooks/1175658007833612348/4igS6PbQGK8byXd0G1DwCPrjQL9ROHBrfgkZNsJ5e3zRcGPtzXbrXzWDOiIXmwzxKuP_';
  const message = {
    content: "ข้อมูลการเข้าใช้งาน",
    embeds: [{
      title: "การเข้าถึงต้องสงสัย",
      color: 16711680, // สีแดงใน discord
      fields: [
        { name: "IP", value: ip, inline: true },
        { name: "User-Agent", value: userAgent, inline: false },
        { name: "Platform", value: platform, inline: true }
      ]
    }]
  };

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
}

// ฟังก์ชันการแสดงหน้าล็อกและการเช็ค
async function checkUser() {
  document.getElementById('lock-screen').classList.remove('hidden');

  const { ip, userAgent, platform } = await fetchIpAndSystemInfo();
  
  // ส่งข้อมูลไปยัง Discord Webhook
  await sendToDiscord(ip, userAgent, platform);

  // เช็ค IP เพื่อบล็อกบาง IP
  const blockedIps = ['BLOCKED_IP_1', 'BLOCKED_IP_2']; // กำหนด IP ที่ต้องการบล็อก
  if (blockedIps.includes(ip)) {
    alert("คุณถูกบล็อกจากการใช้งานเว็บไซต์นี้");
    return;
  }

  // เมื่อทำงานเสร็จสิ้น ให้ปิดหน้าล็อก
  setTimeout(() => {
    document.getElementById('lock-screen').classList.add('hidden');
  }, 3000); // เวลาในการแสดงหน้าล็อก
}

// เรียกใช้ฟังก์ชันนี้เมื่อโหลดหน้าเว็บ
window.onload = function() {
  checkUser();
};
// ฟังก์ชันเพื่อตั้งค่าคุกกี้
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// ฟังก์ชันเพื่อดึงค่าจากคุกกี้
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// ฟังก์ชันเพื่อเปิดโหมด Dark หรือ Light
function toggleMode() {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    setCookie('theme', 'light', 7); // ตั้งค่าคุกกี้เป็น 'light'
    document.getElementById('dark-mode-icon').classList.remove('hidden');
    document.getElementById('light-mode-icon').classList.add('hidden');
  } else {
    document.body.classList.add('dark-mode');
    setCookie('theme', 'dark', 7); // ตั้งค่าคุกกี้เป็น 'dark'
    document.getElementById('light-mode-icon').classList.remove('hidden');
    document.getElementById('dark-mode-icon').classList.add('hidden');
  }
}

// ตรวจสอบคุกกี้เมื่อโหลดหน้าเว็บ
window.onload = function() {
  var theme = getCookie('theme');
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    document.getElementById('light-mode-icon').classList.remove('hidden');
    document.getElementById('dark-mode-icon').classList.add('hidden');
  } else {
    document.body.classList.remove('dark-mode');
    document.getElementById('dark-mode-icon').classList.remove('hidden');
    document.getElementById('light-mode-icon').classList.add('hidden');
  }
};

// เพิ่ม event listeners สำหรับไอคอน
document.getElementById('dark-mode-icon').addEventListener('click', toggleMode);
document.getElementById('light-mode-icon').addEventListener('click', toggleMode);
