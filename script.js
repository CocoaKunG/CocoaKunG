function ngl(nglLink, message) {
    const headers = {
        'Host': 'ngl.link',
        'sec-ch-ua': '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
        'accept': '*/*',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'x-requested-with': 'XMLHttpRequest',
        'sec-ch-ua-mobile': '?0',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
        'sec-ch-ua-platform': '"Windows"',
        'origin': 'https://ngl.link',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': `https://ngl.link/${nglLink}`,
        'accept-language': 'th-TH,th;q=0.9'
    };

    const data = {
        'username': nglLink,
        'question': message,
        'deviceId': '0',
        'gameSlug': '',
        'referrer': '',
    };

    fetch('https://ngl.link/api/submit', {
        method: 'POST',
        headers: headers,
        body: new URLSearchParams(data),
    })
    .then(response => response.ok ? document.getElementById('messageStatus').innerText = "ข้อความส่งแล้ว!" : document.getElementById('messageStatus').innerText = "เกิดข้อผิดพลาดในการส่งข้อความ")
    .then(() => {
        setTimeout(() => {
            window.location.href = "https://www.instagram.com/_sitthiph0n?igsh=MTh0bXVsYzZqaDJtYw==";
        }, 2000);
    })
    .catch(() => {
        document.getElementById('messageStatus').innerText = "เกิดข้อผิดพลาดในการส่งข้อความ";
    });
}
