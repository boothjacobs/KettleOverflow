const qUpvoteButton = document.querySelector(".question-up-vote");
const qDownvoteButton = document.querySelector(".question-down-vote");
const aUpvoteButton = document.querySelector(".answer-up-vote");
const aDownvoteButton = document.querySelector(".answer-down-vote");

const qUpVoteDiv = document.querySelector('.qUpVoteTally');
const qDownVoteDiv = document.querySelector('.qDownVoteTally');
const aUpVoteDiv = document.querySelector('.aUpVoteTally');
const aDownVoteDiv = document.querySelector('.aDownVoteTally');

if (qUpvoteButton !== null) {
    qUpvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let questionId = e.target.id;
        const vote = { vote: true };
        const url = `/questions/${questionId}/votes`;

        console.log(questionId);

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vote),
        });
        let tally = parseInt(qUpVoteDiv.innerHTML, 10);
        qUpVoteDiv.innerHTML = tally + 1;
    });
}

if (qDownvoteButton !== null) {
    qDownvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let questionId = e.target.id;
        const vote = {vote: false};
        const url = `/questions/${questionId}/votes`;

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vote),
        });
        let tally = parseInt(qDownVoteDiv.innerHTML, 10);
        qDownVoteDiv.innerHTML = tally + 1;
    });
}

if (aUpvoteButton !== null) {
    aUpvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let answerId = e.target.id;
        const url = `/questions/${answerId}/votes`;
        const vote = { vote: true };

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vote),
        });
        let tally = parseInt(aUpVoteDiv.innerHTML, 10);
        aUpVoteDiv.innerHTML = tally + 1;
    });
}

if (aDownvoteButton !== null) {
    aDownvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let answerId = e.target.id;
        const url = `/questions/${answerId}/votes`;
        const vote = {vote: false};

        console.log(answerId)

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vote),
        });
        let tally = parseInt(aDownVoteDiv.innerHTML, 10);
        aDownVoteDiv.innerHTML = tally + 1;
    });
}
