window.addEventListener("DOMContentLoaded", (event) => {
    const editAnswer = document.querySelectorAll('.edit-answer')
    const answerContentPug = document.querySelector('.answer-content')
    const answerFooter = document.querySelector('.answer-footer')
    const answerBox = document.getElementById("answer-box")

    if (editAnswer !== null) {
        editAnswer.forEach((button) => {
        button.addEventListener('click', async (event) => {
            answerBox.removeChild(answerFooter)

            // console.log("EDIT IS HAPPENING")
            // console.log(event.path[1].children[0].innerHTML)
            // console.log(event.path[1].children)
            const answerContent = event.path[1].children[0]
            const answerId = event.target.id
            const answerBoxNew = document.getElementById(answerId)
            const form = document.createElement('form')
            form.style.display = 'flex'
            form.style.flexDirection = 'column'
            answerBoxNew.appendChild(form)

            const contentSplit = answerContent.innerHTML.split("<")
            // console.log(contentSplit[0])
            // how do i reassign the text inner HTML to specific answer
            const textArea = document.createElement('textarea')
            
            textArea.innerHTML = contentSplit[0]
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
            answerBox.removeChild(answerContentPug)

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
    })
    }
})