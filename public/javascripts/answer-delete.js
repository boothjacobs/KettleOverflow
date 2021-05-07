window.addEventListener("DOMContentLoaded", (event) => {

    const deleteButton = document.querySelector(".delete-answer")

    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault()
        const answerId = event.target.id
        await fetch(`http://localhost:8080/answers/${answerId}`, {
                    method: 'DELETE'
                })

                window.location.reload()
    })

})