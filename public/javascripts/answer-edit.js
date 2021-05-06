window.addEventListener("DOMContentLoaded", (event) => {
    const editAnswer = document.querySelector('.edit-answer')
    const answerContent = document.querySelector('.answer-content')
    const answerFooter = document.querySelector('.answer-footer')
    console.log(editAnswer)
    if (editAnswer !== null) {
        editAnswer.addEventListener('click', async (event) => {
            // answerBox.removeChild(answerFooter)
            console.log("EDIT IS HAPPENING")
            console.log(event.target)
            const answerId = event.target.id
            const answerBox = document.getElementById(answerId)
            const form = document.createElement('form')
            form.style.display = 'flex'
            form.style.flexDirection = 'column'
            answerBox.appendChild(form)
            const textArea = document.createElement('textarea')
            textArea.innerHTML = answerContent.innerHTML
            textArea.style.resize = 'none'
            textArea.style.height = '10%'
            textArea.style.fontSize = '1rem'
            form.appendChild(textArea)
            const submitEditButton = document.createElement('button')
            submitEditButton.style.height = '10%'
            submitEditButton.style.width = '12%'
            submitEditButton.style.marginTop = '2px'
            submitEditButton.style.alignSelf = 'flex-start'
            submitEditButton.setAttribute('type', 'submit')
            submitEditButton.innerHTML = 'Submit Edit'
            form.appendChild(submitEditButton)
            answerBox.removeChild(answerContent)

            submitEditButton.addEventListener('click', async (event) => {
            event.preventDefault()
            const content = { content: textArea.value }

                await fetch(`http://localhost:8080/answers/${answerId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(content),
                })

                window.location.reload()
        })
    })
    }