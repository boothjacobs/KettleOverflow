window.addEventListener("DOMContentLoaded", (event) => {

    const deleteButton = document.querySelectorAll(".delete-answer")

    deleteButton.addEventListener("click", (event) => {
        const answerId = event.target.id

        await fetch(`http://localhost:8080/answers/${answerId}`, {
                    method: 'DELETE'
                })

                window.location.reload()
    })

})