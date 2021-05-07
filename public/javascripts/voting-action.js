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
        const url = `/questions/${questionId}/votes`;
        let tally = parseInt(qUpVoteDiv.innerHTML, 10);
        const vote = { vote: true };

        if (qUpvoteButton.clicked !== true) {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });

            qUpVoteDiv.innerHTML = tally + 1;
            qUpvoteButton.clicked = true;
        } else {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });
            qUpVoteDiv.innerHTML = tally - 1;
        }
    });
}

if (qDownvoteButton !== null) {
    qDownvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let questionId = e.target.id;
        const vote = {vote: false};
        const url = `/questions/${questionId}/votes`;
        let tally = parseInt(qDownVoteDiv.innerHTML, 10);

        if (qDownvoteButton.clicked !== true) {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });
            qDownVoteDiv.innerHTML = tally + 1;
            qDownvoteButton.clicked = true;
        } else {
            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });
            qDownVoteDiv.innerHTML = tally - 1;
        }

    });
}

if (aUpvoteButton !== null) {
    aUpvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let answerId = e.target.id;
        const url = `/questions/${answerId}/votes`;
        const vote = { vote: true };
        let tally = parseInt(aUpVoteDiv.innerHTML, 10);

        if (aUpvoteButton.clicked !== true) {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vote),
            });
            aUpVoteDiv.innerHTML = tally + 1;
            aUpvoteButton.clicked = true;
        } else {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vote),
            });
            aUpVoteDiv.innerHTML = tally - 1;
        }
    });
}

if (aDownvoteButton !== null) {
    aDownvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let answerId = e.target.id;
        const url = `/questions/${answerId}/votes`;
        const vote = {vote: false};
        let tally = parseInt(aDownVoteDiv.innerHTML, 10);

        if (aDownvoteButton.clicked !== true) {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vote),
            });
            aDownVoteDiv.innerHTML = tally + 1;
            aDownvoteButton.clicked = true;
        } else {
            await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vote),
            });
            aDownVoteDiv.innerHTML = tally - 1;
        }
    });
}
