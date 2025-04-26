document.addEventListener('DOMContentLoaded', () => {
    const easternTableBody = document.querySelector('#eastern-standings tbody');
    const westernTableBody = document.querySelector('#western-standings tbody');
    const lastUpdatedElement = document.getElementById('last-updated');

    function renderTeamRow(team) {
        return `
            <tr>
                <td>${team.rank}</td>
                <td>${team.team}</td>
                <td>${team.wins}</td>
                <td>${team.losses}</td>
                <td>${team.pct}</td>
            </tr>
        `;
    }

    function updateStandings() {
        console.log('Fetching standings data...');
        
        // Add timestamp to prevent caching
        fetch('standings.json' + '?t=' + new Date().getTime())
            .then(response => response.json())
            .then(data => {
                // Update Eastern Conference standings
                if (data.eastern && data.eastern.length > 0) {
                    easternTableBody.innerHTML = data.eastern.map(team => renderTeamRow(team)).join('');
                }
                
                // Update Western Conference standings
                if (data.western && data.western.length > 0) {
                    westernTableBody.innerHTML = data.western.map(team => renderTeamRow(team)).join('');
                }
                
                // Update last updated timestamp
                if (data.lastUpdated) {
                    const date = new Date(data.lastUpdated);
                    lastUpdatedElement.textContent = `Last updated: ${date.toLocaleString()}`;
                }
                
                console.log('Standings updated at:', new Date().toLocaleTimeString());
            })
            .catch(error => {
                console.error('Error fetching standings data:', error);
            });
    }

    // Initial update
    updateStandings();
    
    // Set up auto-refresh every 60 seconds
    setInterval(updateStandings, 60000);
});