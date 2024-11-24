let coinCount = 10; // คอยน์เริ่มต้น
const coinDisplay = document.getElementById("coin-count");
let isCooldown = false; // ตัวแปรสำหรับเช็คคูลดาวน์
let cooldownTime = 30; // คูลดาวน์ 30 วินาที
let cooldownTimer; // ตัวแปรสำหรับจัดการการแสดงคูลดาวน์

document.addEventListener("DOMContentLoaded", function () {
    checkUser();
    updateCoinDisplay();
});

function checkUser() {
    const userIp = getUserIp();
    const userData = localStorage.getItem(userIp);

    if (!userData) {
        localStorage.setItem(userIp, JSON.stringify({ coin: 10, lastReset: new Date().toISOString() }));
    } else {
        const user = JSON.parse(userData);
        coinCount = user.coin;
        resetCoinsIfNeeded(user.lastReset);
    }
}

function getUserIp() {
    return "user-ip-example"; // สมมุติว่าใช้ IP แบบเทียม
}

function resetCoinsIfNeeded(lastReset) {
    const currentTime = new Date();
    const resetTime = new Date(lastReset);
    resetTime.setDate(resetTime.getDate() + 1);
    resetTime.setHours(5, 0, 0, 0); 

    if (currentTime >= resetTime) {
        coinCount = 10;
        localStorage.setItem(getUserIp(), JSON.stringify({ coin: coinCount, lastReset: currentTime.toISOString() }));
    }
}

function updateCoinDisplay() {
    coinDisplay.textContent = `คอยน์: ${coinCount}`;
}

function startTask() {
    if (isCooldown) {
        alert(`กรุณารอคูลดาวน์ ${cooldownTime} วินาที`);
        return; // หากกำลังอยู่ในคูลดาวน์ไม่ให้ทำงาน
    }

    if (coinCount > 0) {
        const phoneNumber = document.getElementById("phone-number").value;
        checkLockedPhoneNumber(phoneNumber); // ตรวจสอบว่าเบอร์นี้ถูกล็อคหรือไม่

        if (!isCooldown) {
            coinCount--;
            updateCoinDisplay();
            saveUserData();
        }
    } else {
        alert("คอยน์ของคุณหมด กรุณารอการรีเซ็ตในวันถัดไป");
    }
}

function saveUserData() {
    const userIp = getUserIp();
    localStorage.setItem(userIp, JSON.stringify({ coin: coinCount, lastReset: new Date().toISOString() }));
}

function checkLockedPhoneNumber(phoneNumber) {
    const url = "https://pastebin.com/raw/40yYJcTw"; // URL ที่ให้ไป
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const lockedNumbers = data.split("\n");
            if (lockedNumbers.includes(phoneNumber)) {
                alert("เบอร์นี้ถูกล็อคแล้ว");
                startCooldown(); // เริ่มต้นคูลดาวน์ 30 วินาที
            } else {
                alert("ขอบคุณสำหรับการทดลอง✌️✌️");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function startCooldown() {
    isCooldown = true;
    cooldownTimer = setInterval(() => {
        cooldownTime--;
        if (cooldownTime <= 0) {
            clearInterval(cooldownTimer);
            isCooldown = false;
            cooldownTime = 30; // รีเซ็ตคูลดาวน์เป็น 30 วินาที
        }
    }, 1000); // ลดคูลดาวน์ทุกๆ 1 วินาที
}