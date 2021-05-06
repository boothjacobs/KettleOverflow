const qUpvoteButton = document.getElementById("question-up-vote")
const qDownvoteButton = document.getElementById("question-down-vote")
const aUpvoteButton = document.getElementById("answer-up-vote")
const aDownvoteButton = document.getElementById("answer-down-vote")

if (!res.locals.authenticated) {
    qUpvoteButton.disabled = true;
    qDownvoteButton.disabled = true;
    aUpvoteButton.disabled = true;
    aDownvoteButton.disabled = true;
};

qUpvoteButton.addEventListener("click", async (e) => {
    const vote = true;
    try {
        const res = await fetch("/questions/:id/upVotes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(vote),
        });

        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        alert(err.message)
    }
});

qDownvoteButton.addEventListener("click", async (e) => {
    const vote = false;
    try {
        const res = await fetch("/questions/:id/upVotes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(vote),
        });

        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        alert(err.message)
    }
});

aUpvoteButton.addEventListener("click", async (e) => {
    const vote = true;
    try {
        const res = await fetch("/answers/:id/upVotes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(vote),
        });

        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        alert(err.message)
    }
});

aDownvoteButton.addEventListener("click", async (e) => {
    const vote = false;
    try {
        const res = await fetch("/answers/:id/upVotes", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
            },
        body: JSON.stringify(vote),
        });

        if (!res.ok) {
          throw res;
        }
    } catch (err) {
        alert(err.message)
    }
});
