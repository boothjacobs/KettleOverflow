window.addEventListener("DOMContentLoaded", (event) => {
    const editButton = document.querySelector('.edit')
    const questionContent = document.querySelector('.question-content')
    const questionExtra = document.querySelector('.question-extra')
    const question = document.querySelector('.question')
    if (editButton !== null) {
        editButton.addEventListener('click', async e => {
            questionExtra.removeChild(editButton)
            const form = document.createElement('form')
            question.appendChild(form)
            const textArea = document.createElement('textarea')
            textArea.innerHTML = questionContent.innerHTML
            textArea.style.resize = 'none'
            textArea.style.height = '200px'
            textArea.style.width = '200px'
            form.appendChild(textArea)
            const submitButton = document.createElement('input')
            submitButton.setAttribute('type', 'submit')
            submitButton.setAttribute('value', 'Submit Edit')
            form.appendChild(submitButton)
            question.removeChild(questionContent)
            submitButton.addEventListener('click', async e => {
                e.preventDefault()
                const content = { content: textArea.value }

                await fetch(window.location.href, {
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
})
