document.addEventListener('DOMContentLoaded', function () {
  const generateBtn = document.getElementById('generateBtn');
  const dogImageContainer = document.getElementById('dogImageContainer');
  const playerInfoContainer = document.getElementById('playerInfoContainer');

  generateBtn.addEventListener('click', function () {
    // Make a fetch request to the NBA Players API
    fetch('https://free-nba.p.rapidapi.com/teams', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
        'X-RapidAPI-Key': 'b8d6935be0mshc4ec35d8992fb8bp1fa133jsne31b3df61eac',  // Replace with your actual API key
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Display player information
        displayPlayerInfo(data.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  function displayPlayerInfo(players) {
    playerInfoContainer.innerHTML = ''; // Clear previous content

    players.forEach(player => {
      const playerElement = document.createElement('div');
      playerElement.innerHTML = `
        <p>Name: ${player.first_name} ${player.last_name}</p>
        <p>Position: ${player.position}</p>
        <hr>
      `;
      playerInfoContainer.appendChild(playerElement);
    });
  }
});
