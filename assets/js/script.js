const repoUrl = 'https://api.github.com/users/mjgiannelli/repos';
const contributionsUrl = 'https://api.github.com/repos/mjgiannelli/';
const contributionsSpanEl = document.querySelector('#contributions');

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

    let adjustedSum = 1057 - sum + sum

    adjustedSum = numberWithCommas(adjustedSum);
    
    contributionsSpanEl.textContent = adjustedSum + ' GitHub contributions'

}

getContributionsTotal();