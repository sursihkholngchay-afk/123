// Color mapping for bands
const colorMap = {
    '0': '#000000',   // ดำ
    '1': '#8B4513',   // น้ำตาล
    '2': '#FF0000',   // แดง
    '3': '#FFA500',   // ส้ม
    '4': '#FFFF00',   // เหลือง
    '5': '#00AA00',   // เขียว
    '6': '#0000FF',   // น้ำเงิน
    '7': '#9400D3',   // ม่วง
    '8': '#808080',   // เทา
    '9': '#FFFFFF'    // ขาว
};

const multiplierColorMap = {
    '1': '#000000',      // ดำ
    '10': '#8B4513',     // น้ำตาล
    '100': '#FF0000',    // แดง
    '1000': '#FFA500',   // ส้ม
    '10000': '#FFFF00',  // เหลือง
    '100000': '#00AA00', // เขียว
    '1000000': '#0000FF' // น้ำเงิน
};

const toleranceColorMap = {
    '1': '#8B4513',   // น้ำตาล
    '2': '#FF0000',   // แดง
    '5': '#FFD700',   // ทอง
    '10': '#C0C0C0'   // เงิน
};

function updateDisplay() {
    const band1Value = document.getElementById('band1').value;
    const band2Value = document.getElementById('band2').value;
    const band3Value = document.getElementById('band3').value;
    const multiplierValue = document.getElementById('multiplier').value;
    const toleranceValue = document.getElementById('tolerance').value;
    const bandMode = document.getElementById('band-mode').value;

    // Update band 1 color
    document.getElementById('display-band1').style.fill = colorMap[band1Value];

    // Update band 2 color
    document.getElementById('display-band2').style.fill = colorMap[band2Value];

    // Update band 3 color (only for 5-band mode)
    if (bandMode === '5') {
        document.getElementById('display-band3').style.fill = colorMap[band3Value];
    }

    // Update multiplier color
    document.getElementById('display-multiplier').style.fill = multiplierColorMap[multiplierValue];

    // Update tolerance color
    document.getElementById('display-tolerance').style.fill = toleranceColorMap[toleranceValue];
}

function calculateResistance() {
    const band1 = parseInt(document.getElementById('band1').value);
    const band2 = parseInt(document.getElementById('band2').value);
    const bandMode = document.getElementById('band-mode').value;
    const multiplier = parseInt(document.getElementById('multiplier').value);
    const tolerance = parseInt(document.getElementById('tolerance').value);

    let resistance;

    if (bandMode === '4') {
        resistance = (band1 * 10 + band2) * multiplier;
    } else {
        const band3 = parseInt(document.getElementById('band3').value);
        resistance = (band1 * 100 + band2 * 10 + band3) * multiplier;
    }

    // Calculate range
    const minValue = resistance * (1 - tolerance / 100);
    const maxValue = resistance * (1 + tolerance / 100);

    // Display results
    document.getElementById('resistance-value').textContent = resistance.toLocaleString('th-TH');
    document.getElementById('tolerance-value').textContent = tolerance;
    document.getElementById('range-value').textContent = `${minValue.toLocaleString('th-TH')} - ${maxValue.toLocaleString('th-TH')} Ω`;
}

document.getElementById('band-mode').addEventListener('change', function() {
    const band3Select = document.getElementById('band3-select');
    if (this.value === '5') {
        band3Select.removeAttribute('hidden');
    } else {
        band3Select.setAttribute('hidden', '');
    }
    updateDisplay();
});

// Initialize display on page load
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});