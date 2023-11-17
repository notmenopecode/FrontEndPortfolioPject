const url2 = 'https://api-nba-v1.p.rapidapi.com/teams?id=1';


async function getTeamsById(){


const options = {
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
    const response = await fetch(url, options);

    // Parse response to JSON
    const result = await response.json();

    const teamInfo = result.response;
  }   
    catch (error) {
    console.error(error);
  }
}