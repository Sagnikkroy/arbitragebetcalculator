document.getElementById('numBets').addEventListener('change', function() {
    const numBets = parseInt(this.value, 10);
    const container = document.getElementById('betsContainer');
    container.innerHTML = '';

    for (let i = 0; i < numBets; i++) {
        container.innerHTML += `
            
            <label for="odds${i}"><h3>Bet ${i + 1}</h3> Odds </label>
            <input type="number" id="odds${i}" step="0.01" class="bet-input" min="1"/>
        `;
    }
});

function calculateArbitrage() {
    const numBets = parseInt(document.getElementById('numBets').value, 10);
    const totalStake = parseFloat(document.getElementById('totalStake').value);
    
    let odds = [];
    let stakes = [];
    let totalOdds = 0;

    for (let i = 0; i < numBets; i++) {
        odds[i] = parseFloat(document.getElementById(`odds${i}`).value);
        totalOdds += 1 / odds[i];
    }

    for (let i = 0; i < numBets; i++) {
        stakes[i] = (totalStake / totalOdds) * (1 / odds[i]);
    }

    const payout = stakes[0] * odds[0];
    let totalPayout = 0;
    let totalProfit = 0;
    
    let stakeResults = '';
    for (let i = 0; i < numBets; i++) {
        stakeResults += `<b>Bet ${i + 1} Stake:</b> $${stakes[i].toFixed(2)}<br>`;
        totalPayout = payout; // All payouts are the same
    }

    totalPayout = payout;
    totalProfit = totalPayout - totalStake;
    const roi = (totalProfit / totalStake) * 100;

    document.getElementById('stakeResults').innerHTML = stakeResults;
    document.getElementById('totalPayout').innerHTML = ` $${totalPayout.toFixed(2)}`;
    document.getElementById('totalProfit').innerHTML = ` $${totalProfit.toFixed(2)}`;
    document.getElementById('roi').innerHTML = ` ${roi.toFixed(2)}%`;
}
