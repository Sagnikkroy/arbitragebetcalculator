function updateOddsInputs() {
    // Default to 4 legs if no or invalid input
    let numLegs = parseInt(document.getElementById('numLegs').value, 10);
    numLegs = isNaN(numLegs) || numLegs < 1 ? 4 : numLegs;
    
    const oddsContainer = document.getElementById('oddsInputs');
    oddsContainer.innerHTML = '';

    // Ensure there are at least 4 legs
    for (let i = 1; i <= Math.max(numLegs, 4); i++) {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        inputGroup.innerHTML = `
            <label for="odds${i}">Odds for Leg ${i}:</label>
            <input class="bet-input" type="number" id="odds${i}" step="0.01" value="2.00">
        `;
        oddsContainer.appendChild(inputGroup);
    }
}

// Initialize inputs when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateOddsInputs(); // Initialize default 4 legs
    document.getElementById('numLegs').addEventListener('input', updateOddsInputs);
});


function calculateOdds() {
    const numLegs = document.getElementById('numLegs').value;
    let decimalOdds = 1;

    for (let i = 1; i <= numLegs; i++) {
        const odds = parseFloat(document.getElementById(`odds${i}`).value);
        decimalOdds *= odds;
    }

    const [numerator, denominator] = decimalToFraction(decimalOdds);
    const americanOdds = decimalOdds >= 2 ? Math.round((decimalOdds - 1) * 100) : Math.round(-100 / (decimalOdds - 1));

    document.getElementById('decimalOdds').innerText = decimalOdds.toFixed(2);
    document.getElementById('fractionalOdds').innerText = `${numerator}/${denominator}`;
    document.getElementById('americanOdds').innerText = americanOdds >= 0 ? `+${americanOdds}` : americanOdds;
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function decimalToFraction(decimal) {
    if (decimal <= 1) {
        return [0, 1];
    }

    const precision = 10000; // Define the precision of the fraction
    const denominator = precision;
    const numerator = Math.round(decimal * precision);
    
    const divisor = gcd(numerator, denominator);
    
    return [numerator / divisor, denominator / divisor];
}

document.getElementById('numLegs').addEventListener('input', updateOddsInputs);
