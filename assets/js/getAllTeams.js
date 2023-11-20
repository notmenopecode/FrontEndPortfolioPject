function showPopup(teamId, index) {
    const popupId = `myPopup-${teamId}-${index}`;
    const popup = document.getElementById(popupId);
  
    if (popup) {
      const allPopups = document.querySelectorAll('.popuptext');
      allPopups.forEach(p => p.classList.remove('show'));
  
      setTimeout(() => {
        popup.classList.add('show');
        setTimeout(() => {
          popup.classList.remove('show');
        }, 30000); // duration in milliseconds before pop up fades out
      }); 
  
      console.log(`Clicked on team with ID: ${teamId}, at index: ${index}`);
    } else {
      console.error(`Popup element with ID '${popupId}' not found.`);
    }
  }




document.addEventListener('DOMContentLoaded', async function() {
    async function getAllTeams() {
        const url = 'https://api-nba-v1.p.rapidapi.com/teams';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b8d6935be0mshc4ec35d8992fb8bp1fa133jsne31b3df61eac',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            const allTeams = result.response;
            const nbaTeams = allTeams.splice(41);

            const teamsSection = document.getElementById('one');
            teamsSection.innerHTML = formatTeams(allTeams);
        } catch (error) {
            console.error(error);
        }
    }

    async function getOneTeam(teamId) {
        const url2 = `https://api-nba-v1.p.rapidapi.com/teams?id=${teamId}`;
        const options2 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b8d6935be0mshc4ec35d8992fb8bp1fa133jsne31b3df61eac',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url2, options2);
            const result = await response.json();
            const teamInfo = result.response;

            storeTeamInfo.push(...teamInfo);

            teamInfo.map((team, index) => {
                console.log(team);
                showPopup(team.id, index);
            });
        } catch (error) {
            console.error(error);
        }
    }

    function formatTeams(teams) {
        const teamsToRemove = [
            'Brisbane Bullets',
            'Guangzhou Long-Lions',
            'Haifa Maccabi Haifa',
            'Melbourne United',
            'Shanghai Sharks',
            'Sydney Kings',
            'Team Team Durant',
            'Team LeBron',
            'Away Team Wilbon',
            'Home Team Stephen A',
            'USA USA'
        ];

        const filteredTeams = teams.filter(team => !teamsToRemove.includes(team.name));

        const teamList = filteredTeams.map((team, index) => {
            console.log(team)
            return `
            <li id="logo">
            <button id="logo-button" data-team-id="${team.id}" onclick="showPopup(${team.id}, ${index})">
              <img src="${team.logo}" alt="${team.name} Logo" class="team-logo">
              <div class="popup">
                <span class="popuptext" id="myPopup-${team.id}-${index}">
                  <strong>${team.name} (${team.code})</strong><br>
                  ${team.leagues.standard.conference}ern Conference<br>
                  ${team.leagues.standard.division} Divison
                  <!-- Add more properties as needed -->
                </span>
              </div>
            </button>
          </li>`;
        }).join('');

        return `<ul id="team-list" style="list-style-type:none;">${teamList}</ul>`;
    }

    async function handleButtonClick(teamId) {
        await getOneTeam(teamId);
    }

    getAllTeams();
})