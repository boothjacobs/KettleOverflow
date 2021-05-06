window.addEventListener("DOMContentLoaded", (event) => {
    const editButton = document.querySelector('.edit')
    const questionContent = document.querySelector('.question-content')
    const questionFooter = document.querySelector('.question-footer')
    const questionBox = document.querySelector('#question-box')
    if (editButton !== null) {
        editButton.addEventListener('click', async e => {
            questionBox.removeChild(questionFooter)

            const form = document.createElement('form')
            form.classList.add('edit-form')
            questionBox.appendChild(form)

            const textArea = document.createElement('textarea')
            textArea.classList.add('edit-text-area')
            textArea.innerHTML = questionContent.innerHTML
            form.appendChild(textArea)

            const submitButton = document.createElement('input')
            submitButton.classList.add('edit-submit')
            submitButton.setAttribute('type', 'submit')
            submitButton.setAttribute('value', 'Submit Edit')
            form.appendChild(submitButton)
            
            questionBox.removeChild(questionContent)
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
