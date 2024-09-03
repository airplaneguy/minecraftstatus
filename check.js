document.addEventListener('DOMContentLoaded', function() {
    const checkButton = document.getElementById('check-server');
    const serverAddressInput = document.getElementById('server-address');
    const resultDiv = document.getElementById('result');

    checkButton.addEventListener('click', function() {
        const serverAddress = serverAddressInput.value.trim();

        if (serverAddress) {
            fetch(`https://api.mcstatus.io/status/java/${serverAddress}`)
                .then(response => response.json())
                .then(data => {
                    const status = data.online ? 'Online' : 'Offline';
                    const version = data.version ? data.version.name_clean : 'Unknown';
                    const playerCount = data.players ? data.players.online : 'Unknown';
                    const maxPlayers = data.players ? data.players.max : 'Unknown';

                    resultDiv.innerHTML = `
                        <p><strong>Status:</strong> ${status}</p>
                        <p><strong>Version:</strong> ${version}</p>
                        <p><strong>Player Count:</strong> ${playerCount}</p>
                        <p><strong>Max Players:</strong> ${maxPlayers}</p>
                    `;

                    // Apply styling based on server status
                    resultDiv.style.backgroundColor = data.online ? '#4caf50' : '#f44336';
                })
                .catch(error => {
                    resultDiv.innerHTML = '<p style="color: #f44336;">Error fetching data. Please check the server address and try again.</p>';
                    resultDiv.style.backgroundColor = '#f44336';
                });
        } else {
            resultDiv.innerHTML = '<p style="color: #f44336;">Please enter a server address.</p>';
            resultDiv.style.backgroundColor = '#f44336';
        }
    });
});
