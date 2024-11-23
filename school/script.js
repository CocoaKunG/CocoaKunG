const form = document.getElementById('inputForm');
const resultTable = document.getElementById('resultTable');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const equation = document.getElementById('equation').value.trim();
    const xStart = parseInt(document.getElementById('xStart').value);
    const xEnd = parseInt(document.getElementById('xEnd').value);

    // Regular expression ที่ครอบคลุมสมการในหลายรูปแบบ
    const match = equation.match(/([+-]?\d*\.?\d*)?x\s*([+-]?\s*\d*\.?\d*)?y?\s*=\s*([+-]?\d*\.?\d*)/);

    if (!match) {
        alert("รูปแบบสมการไม่ถูกต้อง! กรุณาใส่ในรูปแบบที่ถูกต้อง เช่น x - y = 2 หรือ x + 2 = y");
        return;
    }

    // ตรวจสอบค่าของ a (หน้า x)
    const a = match[1] ? parseFloat(match[1].replace(/\s+/g, '')) || 1 : 1;

    // ตรวจสอบค่าของ b (หน้า y)
    const b = match[2]
        ? parseFloat(match[2].replace(/\s+/g, '').replace('+-', '-')) || (match[2].includes('-') ? -1 : 1)
        : -1;

    // ตรวจสอบค่าของ c (ค่าคงที่)
    const c = parseFloat(match[3]?.replace(/\s+/g, '')) || 0;

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
        alert("สมการไม่ถูกต้อง หรือไม่สามารถแปลงตัวเลขได้");
        return;
    }

    if (b === 0) {
        alert("สมการไม่สามารถคำนวณค่า y ได้ (b ต้องไม่เท่ากับ 0)");
        return;
    }

    // รีเซ็ตตารางผลลัพธ์
    resultTable.innerHTML = `
        <tr>
            <th>x</th>
            <th>y</th>
        </tr>
    `;

    for (let x = xStart; x <= xEnd; x++) {
        const y = (c - a * x) / b;

        if (!isFinite(y)) {
            alert("ค่า y ไม่สามารถคำนวณได้สำหรับบางค่า x");
            break;
        }

        const row = document.createElement('tr');
        row.innerHTML = `<td>${x}</td><td>${y.toFixed(2)}</td>`;
        resultTable.appendChild(row);
    }
});