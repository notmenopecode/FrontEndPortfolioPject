document.addEventListener('DOMContentLoaded', function() {
    const clickedElement = event.target;

    // Check if the clicked element is a button with the id 'logo-button'
    if (clickedElement.tagName === 'BUTTON' && clickedElement.id === 'logo-button') {
        // Prevent the default behavior of the button
        event.preventDefault();

        // Get the teamId from the clicked button's data-team-id attribute
        teamId = clickedElement.getAttribute('data-team-id');

        // Call the getOneTeam function with the selected team ID
        getOneTeam(teamId);
    }
});


let teamId = 0;
// function that takes array of teams as it's parameter
function formatTeams(teams) {

   // create a variable for all the non- nba teams to be removed from the filtered list of 41
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

     // .filter method creates a new array with teams that are not in the removal list(Only NBA teams)
     const filteredTeams = teams.filter(team => !teamsToRemove.includes(team.name));



   // .map method iterates thru filteredTeams and creates a HTML list item for each team containing the team's logo and name
   const teamList = filteredTeams.map((team) => {

       teamId = team.id
       
       return `
   <li id="logo">
   <button id="logo-button" data-team-id="${team.id}" onclick="handleButtonClick(${team.id})">
   <img src="${team.logo}" alt="${team.name} Logo" class="team-logo">
</button>
  </li>`;

       
       // joining the array of list items into a string
   }).join('');

  
   
   // returning HTML as a string 
   return `<ul id="team-list"style="list-style-type:none;">${teamList}</ul>`;
}


function singleTeam(teamInfo) {
    // Check if teamInfo is an array
    if (Array.isArray(teamInfo)) {
        // If it's an array, iterate through each team
        const teamListHTML = teamInfo.map((team) => {
            const { city, code, leagues, logo, name } = team;
            return `
                <li id="logo">
                    <a id="logo-button" href="generic.html" data-team-id="${team}">
                        <img src="${team.logo}" alt="${team.name} Logo" class="team-logo">
                    </a>
                    <h3>${team.id}</h3>
                </li>`;
        }).join('');

        // Returning the HTML for the list of teams
        return `<ul id="team-list" style="list-style-type:none;">${teamListHTML}</ul>`;
    } else {
        // If it's not an array (single team), handle it accordingly
        //const { city, code, leagues, logo, name } = teamInfo;
        return `
            <ul id="team-list" style="list-style-type:none;">
                <li id="logo">
                    <a id="logo-button" href="generic.html" data-team-id="${teamInfo.id}">
                        <img src="${teamInfo.logo}" alt="${teamInfo.name} Logo" class="team-logo">
                    </a>
                    <h3>${teamInfo.id}</h3>
                </li>
            </ul>`;
    }
}


// this async function allows computer/program to continue executing other operations while waiting for it to complete. 
// Hence the term async short for asynchronously aka independently
async function getAllTeams() {
    
    // creating variable for the API url
    const url = 'https://api-nba-v1.p.rapidapi.com/teams';
    // Create variable for API request called 'options'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b8d6935be0mshc4ec35d8992fb8bp1fa133jsne31b3df61eac',
            'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
        }
    };
          // code that might generate an error is placed inside 'try{}'
          try {

            // 'await' pauses execution of function until the promise is settled(resolved or rejected)
            // 'await' can only be used in an async function
            // In this case, getAllTeams function is paused and won't continue until (url, options) gets fetched
            const response = await fetch(url, options);

            // Parse response to JSON
            const result = await response.json();
            
            // Taking relevant data from the API
            const allTeams = result.response;

            // using .splice method to filter the data to include only the first 41 teams
            const nbaTeams = allTeams.splice(41);
            
            // Logging 'allTeams' to console
            console.log(allTeams);
            
            // Getting the DOM elements for teams and logos
            const teamsSection = document.getElementById('one');
            

            // Update HTML of 'teamsSection' using 'formatTeams' function
            teamsSection.innerHTML = formatTeams(allTeams); 
        // catch method is called if/when the Promise is rejected aka there is an error
          } catch (error) {
            console.error(error);
          }
 }




async function getOneTeam(teamId){
    //console.log(teamId)
        const url2 = `https://api-nba-v1.p.rapidapi.com/teams?id=${teamId}`;
        
        const options2 = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'b8d6935be0mshc4ec35d8992fb8bp1fa133jsne31b3df61eac',
                'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
            }
        };
        
        
        
        try {
            // 'await' pauses execution of function until the promise is settled(resolved or rejected)
            // 'await' can only be used in an async function
            // In this case, getAllTeams function is paused and won't continue until (url, options) gets fetched
            const response = await fetch(url2, options2);
            
            // Parse response to JSON
            const result = await response.json();

            console.log(result)

            const teamInfo = result.response;
            


    }catch (error) {
            console.error(error);
        }
    }

    
    async function handleButtonClick(teamId) {
        // Call the getOneTeam function with the selected team ID
        await getOneTeam(teamId);
        window.location.href = `generic.html`;
    }
    //console.log(teamId)
    
    
    // calling the getAllTeams function
    getAllTeams();
    getOneTeam();
    