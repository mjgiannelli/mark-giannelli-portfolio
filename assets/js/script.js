const repoUrl = 'https://api.github.com/users/mjgiannelli/repos';
const contributionsUrl = 'https://api.github.com/repos/mjgiannelli/';

async function getContributionsTotal() {
    let reposArray = [];
    let contributionsArray = [];
    let sum = 0;

    const reposResponse = await fetch(repoUrl);

    const reposData = await reposResponse.json();

    for (let i = 0; i < reposData.length; i++) {
        reposArray.push((reposData[i].name));
    }

    for (let i = 0; i < reposArray.length; i++) {

        if (reposArray[i] === 'augur') {
            contributionsArray.push(32);
        } else {
            const contributionResponse = await fetch(contributionsUrl + reposArray[i] + '/contributors');

            const contributionsData = await contributionResponse.json();

            contributionsArray.push(contributionsData[0].contributions);
        }

    }

    for (let i = 0; i < contributionsArray.length; i++) {
        sum += contributionsArray[i];
    }
    
    console.log(sum);
}

getContributionsTotal();