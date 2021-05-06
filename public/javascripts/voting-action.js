const qUpvoteButton = document.getElementById("question-up-vote");
const qDownvoteButton = document.getElementById("question-down-vote");
const aUpvoteButton = document.getElementById("answer-up-vote");
const aDownvoteButton = document.getElementById("answer-down-vote");

const qUpVoteDiv = document.getElementById("question-upVoteTally");
const qDownVoteDiv = document.getElementById("question-downVoteTally");
const aUpVoteDiv = document.getElementById("answer-upVoteTally");
const aDownVoteDiv = document.getElementById("answer-downVoteTally");

if (qUpvoteButton !== null) {
    qUpvoteButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const vote = { vote: true };

        const url = window.location.href + "/upvotes";
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vote),
        });
        qUpVoteDiv.innerHTML += 1;
    });
}

if (qDownvoteButton !== null) {
    qDownvoteButton.addEventListener("click", async (e) => {
        const url = window.location.href + "/downvotes";
        const vote = false;

        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(vote),
        });
    });
}

if (aUpvoteButton !== null) {
    aUpvoteButton.addEventListener("click", async (e) => {
        const url = window.location.href + "/upvotes";
        const vote = true;

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vote),
        });
    });
}

if (aDownvoteButton !== null) {
    aDownvoteButton.addEventListener("click", async (e) => {
        const url = window.location.href + "/downvotes";
        const vote = false;

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vote),
        });
    });
}
