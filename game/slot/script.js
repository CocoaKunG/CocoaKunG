let coin = 100;
const reelSymbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '⭐'];
const reel1 = document.getElementById('reel1');
const reel2 = document.getElementById('reel2');
const reel3 = document.getElementById('reel3');
const message = document.getElementById('message');
const coinDisplay = document.getElementById('coin');
const spinButton = document.getElementById('spin-button');

function updateCoinDisplay() {
    coinDisplay.textContent = coin;
}

function spinReels() {
    return reelSymbols[Math.floor(Math.random() * reelSymbols.length)];
}

function checkWin(symbol1, symbol2, symbol3) {
    if (symbol1 === symbol2 && symbol2 === symbol3) {
        return 'win';
    } else {
        return 'lose';
    }
}

spinButton.addEventListener('click', function() {
    if (coin <= 0) {
        message.textContent = 'คุณไม่มีเหรียญเหลือ!';
        return;
    }

    coin -= 10;
    updateCoinDisplay();

    const result1 = spinReels();
    const result2 = spinReels();
    const result3 = spinReels();

    reel1.textContent = result1;
    reel2.textContent = result2;
    reel3.textContent = result3;

    const result = checkWin(result1, result2, result3);

    if (result === 'win') {
        coin += 50;
        message.textContent = 'คุณชนะ! รับเหรียญ 50!';
    } else {
        message.textContent = 'คุณแพ้! เสียเหรียญ 10';
    }

    updateCoinDisplay();
});

updateCoinDisplay();