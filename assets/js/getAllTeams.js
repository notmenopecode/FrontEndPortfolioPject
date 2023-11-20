// function to show a popup for a certain team/index
function showPopup(teamId, index) {
    const popupId = `myPopup-${teamId}-${index}`;
    const popup = document.getElementById(popupId);
  
    if (popup) {
      // close other popups before showing current one
      const allPopups = document.querySelectorAll('.popuptext');
      allPopups.forEach(p => p.classList.remove('show'));
  
      setTimeout(() => {
        // show popup and set a timer to remove it/make it dissappear
        popup.classList.add('show');
        setTimeout(() => {
          popup.classList.remove('show');
        }, 30000); // duration in milliseconds before pop up fades out
      }); 

      // console.logs inside inspect element
      console.log(`Clicked on team with ID: ${teamId}, at index: ${index}`);
    } else {
      console.error(`Popup element with ID '${popupId}' not found.`);
    }
  }



// event listener for when the DOM content is loaded
document.addEventListener('DOMContentLoaded', async function() {

   // async function allows other code to execute while waiting for async function to complete
   // regular function blockes further execution until that function is complete
   // this async function is to get info for all NBA teams
    async function getAllTeams() {
      // assigning API url to a variable
        const url = 'https://api-nba-v1.p.rapidapi.com/teams';
        // assigning API Key & Host to a variable
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b8d6935be0mshc4ec35d8992fb8bp1fa133jsne31b3df61eac',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };

        try {

            // async function allows for the use of await
            // await keyword is used to wait for a promise to resolve or not before finsishing the function
            // fetching team data from the API
            const response = await fetch(url, options);
            const result = await response.json();
            const allTeams = result.response;
            const nbaTeams = allTeams.splice(41);

            // displaying the NBA teams in the "one" section of HTML file
            const teamsSection = document.getElementById('one');
            teamsSection.innerHTML = formatTeams(allTeams);
        } catch (error) {
            console.error(error);
        }
    }

    // function to get info fo a specific NBA team
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
          // fethching team info for a certain team id(whichever is specified)
            const response = await fetch(url2, options2);
            // extracts JSON content
            const result = await response.json();
            const teamInfo = result.response;

            // using .push method to add teamInfo to storeTeamInfo array 
            // spread method is used on teamInfo to add each element to storeTeamInfoArray
            storeTeamInfo.push(...teamInfo);
            
            // using .map method iterating over each element in teamInfo array 
            // applies the function to each element
            // team parameter represents the element and index represents the index of that element
            teamInfo.map((team, index) => {
              // console logs info about the current 'team'
                console.log(team);
                showPopup(team.id, index);
            });
        } catch (error) {
            console.error(error);
        }
    }

    // function to filter out teams in the original array that are not NBA temas
    function formatTeams(teams) {

      // array of non NBA teams assigned to a variable
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

        // .filter method to remove 'teamsToRemove' from original 'teams' array
        // assigned the new list of filtered teams to a variable
        const filteredTeams = teams.filter(team => !teamsToRemove.includes(team.name));

        // .map iterate through new filteredTeams array to get the team and index of team
        // assigned that to teamList variable
        const teamList = filteredTeams.map((team, index) => {
            console.log(team)
            // returning a string template showing HTML structure for each team
            // using interpolation to place elements where i want

            // also used dot notation to get specific informating within the teams that the API provided
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

    // function to handle button click for specific team
    async function handleButtonClick(teamId) {
        await getOneTeam(teamId);
    }

    // call to get all NBA team when the DOM content is loaded
    getAllTeams();
})