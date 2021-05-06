window.addEventListener("DOMContentLoaded", (event) => {
    const editButton = document.querySelector('.edit')
    const questionContent = document.querySelector('.question-content')
    const questionFooter = document.querySelector('.question-footer')
    const questionBox = document.querySelector('#question-box')
    const createdBy = document.querySelector('.created-by')
    if (editButton !== null) {
        editButton.addEventListener('click', async e => {
            questionBox.removeChild(questionFooter)
            const form = document.createElement('form')
            form.style.display = 'flex'
            form.style.flexDirection = 'column'
            questionBox.appendChild(form)
            const textArea = document.createElement('textarea')
            textArea.innerHTML = questionContent.innerHTML
            textArea.style.resize = 'none'
            textArea.style.height = '10%'
            textArea.style.fontSize = '1rem'
            form.appendChild(textArea)
            const submitButton = document.createElement('input')
            submitButton.style.height = '10%'
            submitButton.style.width = '12%'
            submitButton.style.marginTop = '2px'
            submitButton.style.alignSelf = 'flex-start'
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
