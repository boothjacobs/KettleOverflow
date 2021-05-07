const qUpvoteButton = document.querySelector(".question-up-vote");
const qDownvoteButton = document.querySelector(".question-down-vote");
const aUpvoteButton = document.querySelectorAll(".answer-up-vote");
const aDownvoteButton = document.querySelectorAll(".answer-down-vote");

const qUpVoteDiv = document.querySelector('.qUpVoteTally');
const qDownVoteDiv = document.querySelector('.qDownVoteTally');

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
            if (tally > 0) qUpVoteDiv.innerHTML = tally - 1;
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
            if (tally > 0) qDownVoteDiv.innerHTML = tally - 1;
        }

    });
}

if (aUpvoteButton !== null) {
    aUpvoteButton.forEach((button) => {

        button.addEventListener("click", async (e) => {
            e.preventDefault();
            let answerId = e.target.id;
            const aUpVoteDiv = document.querySelector(`.tally${answerId}`);
            const url = `/answers/${answerId}/votes`;
            const vote = { vote: true };
            let tally = parseInt(aUpVoteDiv.innerHTML, 10);

            // console.log(tally, aUpVoteDiv)

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
                if (tally > 0) aUpVoteDiv.innerHTML = tally - 1;
            }
        });
    })
}

if (aDownvoteButton !== null) {
    aDownvoteButton.forEach((button) => {

        button.addEventListener("click", async (e) => {
            e.preventDefault();
            let answerId = e.target.id;
            const aDownVoteDiv = document.querySelector(`.tallyDown${answerId}`);
            const url = `/answers/${answerId}/votes`;
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
                if (tally > 0) aDownVoteDiv.innerHTML = tally - 1;
            }
        });
    })
}
