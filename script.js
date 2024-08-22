const users = {
  "235819": "291740"
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
window.onload = function () {
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

  // ตรวจสอบการเข้าสู่ระบบ
  checkLogin();
};

// เพิ่ม event listeners สำหรับไอคอน
document.getElementById('dark-mode-icon').addEventListener('click', toggleMode);
document.getElementById('light-mode-icon').addEventListener('click', toggleMode);

document.getElementById('login-btn').addEventListener('click', function () {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var error = document.getElementById('login-error');

  if (users[username] && users[username] === password) {
    // จำลองการสร้างไฟล์ user
    localStorage.setItem(username, JSON.stringify({ coins: 10 }));

    // แสดงจำนวน coins
    updateCoins(username);

    // ซ่อนหน้าต่างเข้าสู่ระบบ
    document.querySelector('.login-container').style.display = 'none';
  } else {
    error.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
});

function updateCoins(username) {
  var userData = JSON.parse(localStorage.getItem(username));
  if (userData) {
    document.getElementById('coin-balance').textContent = `Coins: ${userData.coins}`;
  }
}
function checkLogin() {
  var username = getCookie('username');
  if (username && localStorage.getItem(username)) {
    // หากผู้ใช้เข้าสู่ระบบแล้ว ให้ซ่อนหน้าต่างเข้าสู่ระบบและแสดงจำนวน coins
    document.querySelector('.login-container').style.display = 'none';
    updateCoins(username);
  }
}

function updateCoins(username) {
  var userData = JSON.parse(localStorage.getItem(username));
  if (userData) {
    document.getElementById('coin-balance').textContent = `Coins: ${userData.coins}`;
  }
}

document.getElementById('login-btn').addEventListener('click', function () {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var error = document.getElementById('login-error');

  if (users[username] && users[username] === password) {
    // จำลองการสร้างไฟล์ user
    localStorage.setItem(username, JSON.stringify({ coins: 10 }));

    // ตั้งค่าคุกกี้เพื่อจดจำผู้ใช้
    setCookie('username', username, 7);

    // แสดงจำนวน coins
    updateCoins(username);

    // ซ่อนหน้าต่างเข้าสู่ระบบ
    document.querySelector('.login-container').style.display = 'none';
  } else {
    error.textContent = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
  }
});