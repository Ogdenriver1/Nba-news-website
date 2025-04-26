document.addEventListener('DOMContentLoaded', () => {
    const bracketContainer = document.getElementById('bracket-content');

    // --- Placeholder Data ---
    // Replace this with an actual API call later OR MANUALLY EDIT THIS DATA
    const placeholderBracketData = {
        east: {
            round1: [
                { matchup: 1, team1: { seed: 1, name: "Cleveland Cavaliers", score: 1, winner: false }, team2: { seed: 8, name: "Miami Heat", score: 0, winner: false } },
                { matchup: 2, team1: { seed: 4, name: "Indiana Pacers", score: 2, winner: false }, team2: { seed: 5, name: "Milwaukee Bucks", score: 0, winner: false } },
                { matchup: 3, team1: { seed: 3, name: "New York Knicks", score: 1, winner: false }, team2: { seed: 6, name: "Detroit Pistons", score: 1, winner: false } },
                { matchup: 4, team1: { seed: 2, name: "Boston Celtics", score: 1, winner: false }, team2: { seed: 7, name: "Orlando Magic", score: 0, winner: false } }
            ],
            round2: [], // Empty until round 1 results are entered
            round3: []  // Empty until round 2 results are entered
        },
        west: {
             round1: [
                { matchup: 8, team1: { seed: 1, name: "Oklahoma City Thunder", score: 1, winner: false }, team2: { seed: 8, name: "Memphis Grizzlies", score: 0, winner: false } },
                { matchup: 9, team1: { seed: 4, name: "Denver Nuggets", score: 1, winner: false }, team2: { seed: 5, name: "LA Clippers", score: 1, winner: false } },
                { matchup: 10, team1: { seed: 3, name: "Los Angeles Lakers", score: 0, winner: false }, team2: { seed: 6, name: "Minnesota Timberwolves", score: 1, winner: false } },
                { matchup: 11, team1: { seed: 2, name: "Houston Rockets", score: 0, winner: false }, team2: { seed: 7, name: "Golden State Warriors", score: 1, winner: false } }
            ],
            round2: [], // Empty until round 1 results are entered
            round3: []  // Empty until round 2 results are entered
        },
        finals: null, // Empty for now
        champion: null // Empty for now
    };
    // --- End Placeholder Data ---

    function renderTeam(teamData) {
        return `
            <div class="team ${teamData.winner ? 'winner' : ''}">
                <span class="team-seed">(${teamData.seed})</span>
                <span class="team-name">${teamData.name}</span>
                <span>${teamData.score}</span>
            </div>
        `;
    }

    function renderMatchup(matchupData) {
        return `
            <div class="matchup">
                ${renderTeam(matchupData.team1)}
                ${renderTeam(matchupData.team2)}
            </div>
        `;
    }

    function renderRound(roundData, title) {
        let matchupsHTML = roundData.map(matchup => renderMatchup(matchup)).join('');
        return `
            <div class="round">
                <div class="round-title">${title}</div>
                ${matchupsHTML}
            </div>
        `;
    }

    function renderBracket(data) {
        bracketContainer.innerHTML = ''; // Clear loading message

        // --- Render East ---
        const eastContainer = document.createElement('div');
        eastContainer.innerHTML = `<div class="conference-title east">Eastern Conference</div>`;
        const eastBracket = document.createElement('div');
        eastBracket.classList.add('bracket');
        
        let eastHtml = '';
        if (data.east.round1 && data.east.round1.length > 0) {
            eastHtml += renderRound(data.east.round1, 'First Round');
        }
        if (data.east.round2 && data.east.round2.length > 0) {
             eastHtml += renderRound(data.east.round2, 'Conference Semifinals');
        } else {
             // Add placeholder for layout if round 2 is empty
             eastHtml += '<div class="round"><div class="round-title">Conference Semifinals</div></div>';
        }
         if (data.east.round3 && data.east.round3.length > 0) {
             eastHtml += renderRound(data.east.round3, 'Conference Finals');
        } else {
             // Add placeholder for layout if round 3 is empty
             eastHtml += '<div class="round"><div class="round-title">Conference Finals</div></div>';
        }
        eastBracket.innerHTML = eastHtml;
        eastContainer.appendChild(eastBracket);
        bracketContainer.appendChild(eastContainer);

        // --- Render West ---
        const westContainer = document.createElement('div');
        westContainer.innerHTML = `<div class="conference-title west">Western Conference</div>`;
        const westBracket = document.createElement('div');
        westBracket.classList.add('bracket');

        let westHtml = '';
        if (data.west.round1 && data.west.round1.length > 0) {
            westHtml += renderRound(data.west.round1, 'First Round');
        }
         if (data.west.round2 && data.west.round2.length > 0) {
             westHtml += renderRound(data.west.round2, 'Conference Semifinals');
        } else {
             // Add placeholder for layout if round 2 is empty
             westHtml += '<div class="round"><div class="round-title">Conference Semifinals</div></div>';
        }
         if (data.west.round3 && data.west.round3.length > 0) {
             westHtml += renderRound(data.west.round3, 'Conference Finals');
        } else {
             // Add placeholder for layout if round 3 is empty
             westHtml += '<div class="round"><div class="round-title">Conference Finals</div></div>';
        }
        westBracket.innerHTML = westHtml;
        westContainer.appendChild(westBracket);
        bracketContainer.appendChild(westContainer);

        // --- Render Finals ---
        const finalsContainer = document.createElement('div');
        finalsContainer.classList.add('finals');
        let finalsHtml = `<div class="finals-title">NBA Finals</div>`;
        if (data.finals) {
            finalsHtml += renderMatchup(data.finals);
        } else {
             finalsHtml += '<div class="matchup"><div class="team"><span class="team-name">TBD</span></div><div class="team"><span class="team-name">TBD</span></div></div>'; // Placeholder
        }
        if (data.champion) {
            finalsHtml += `<div class="champion">2025 NBA Champions: ${data.champion.name}</div>`;
        }
        finalsContainer.innerHTML = finalsHtml;
        bracketContainer.appendChild(finalsContainer);
    }

    renderBracket(placeholderBracketData);
});