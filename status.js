// URL of the MCStatus API for Rice Network
const baseApiUrl = 'https://api.mcstatus.io/status/java/';

// Function to fetch and update server status for the Rice Network
async function updateServerStatus() {
    try {
        const response = await fetch(`${baseApiUrl}mc.ricenetwork.xyz`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        if (data && data.online !== undefined) {
            const isOnline = data.online;
            const playerCount = data.players.online;
            const maxPlayers = data.players.max;
            const version = data.version.name_clean ? data.version.name_clean : JSON.stringify(data.version);
            const statusElement = document.getElementById('server-status');
            statusElement.textContent = isOnline ? 'Online' : 'Offline';
            statusElement.className = `status ${isOnline ? 'online' : 'offline'}`;
            document.getElementById('player-count').textContent = playerCount;
            document.getElementById('max-players').textContent = maxPlayers;
            document.getElementById('version').textContent = version;
            document.getElementById('recent-activity').textContent = 'No recent activity available';
        } else {
            throw new Error('Unexpected API response structure');
        }
    } catch (error) {
        console.error('Error fetching server status:', error.message);
        document.getElementById('server-status').textContent = 'Error fetching data';
    }
}

// Function to fetch and update status for a given server IP
async function checkServerStatus() {
    const serverIp = document.getElementById('server-ip').value.trim();
    if (!serverIp) {
        document.getElementById('server-result').textContent = 'Please enter a server IP address.';
        return;
    }
    
    try {
        const response = await fetch(`${baseApiUrl}${serverIp}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Server API Response:', data);
        const isOnline = data.online;
        const playerCount = data.players.online;
        const maxPlayers = data.players.max;
        const version = data.version.name_clean ? data.version.name_clean : JSON.stringify(data.version);
        const resultElement = document.getElementById('server-result');
        resultElement.textContent = isOnline ? 
            `Online - ${playerCount}/${maxPlayers} players, Version: ${version}` :
            'Offline';
        resultElement.className = `result ${isOnline ? 'online' : 'offline'}`;
    } catch (error) {
        console.error('Error fetching server status:', error.message);
        document.getElementById('server-result').textContent = 'Error fetching data';
    }
}

// Initial call to update Rice Network status on page load
updateServerStatus();
