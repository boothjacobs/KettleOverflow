window.addEventListener("DOMContentLoaded", (event) => {

    const deleteButton = document.querySelector(".delete-answer")

    if (deleteButton !== null) {
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault()
        const answerId = event.target.id
        await fetch(`/answers/${answerId}`, {
                    method: 'DELETE'
                })

                window.location.reload()
    })
}

})
