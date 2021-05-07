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
        const vote = { vote: true };

        if (qUpvoteButton.clicked !== true) {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });
            const data = await res.json();
            qUpVoteDiv.innerHTML = data.upvotes;
            qUpvoteButton.clicked = true;
        } else {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });
            const data = await res.json();
            qUpVoteDiv.innerHTML = data.upvotes;
        }
    });
}

if (qDownvoteButton !== null) {
    qDownvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let questionId = e.target.id;
        const vote = {vote: false};
        const url = `/questions/${questionId}/votes`;

        if (qDownvoteButton.clicked !== true) {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });
            const data = await res.json();
            qDownVoteDiv.innerHTML = data.downvotes;
            qDownvoteButton.clicked = true;
        } else {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vote),
            });
            const data = await res.json();
            qDownVoteDiv.innerHTML = data.downvotes;
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

            if (aUpvoteButton.clicked !== true) {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vote),
                });
                const data = await res.json();
                aUpVoteDiv.innerHTML = data.upvotes.length;
                aUpvoteButton.clicked = true;
            } else {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vote),
                });
                const data = await res.json();
                aUpVoteDiv.innerHTML = data.upvotes.length;
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

            if (aDownvoteButton.clicked !== true) {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vote),
                });
                const data = await res.json();
                aDownVoteDiv.innerHTML = data.downvotes.length;
                aDownvoteButton.clicked = true;
            } else {
                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(vote),
                });
                const data = await res.json();
                aDownVoteDiv.innerHTML = data.downvotes.length;
            }
        });
    })
}
