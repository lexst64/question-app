import { isValidValue, createModal, createLoadingModal } from './utils'
import { Question } from './question'
import { getAuthForm, authWithEmailAndPassword } from './auth'
import { MyComponent } from './components/MyComponent'
import { MyButton } from './components/MyButton'
import './app.css'
import './loading.css'

const form = document.getElementById('question-form')
const input = form.querySelector('#question-input')
const submit = form.querySelector('#question-submit')
const seeAllBtn = document.getElementById('see-all-btn')

customElements.define('my-component', MyComponent)
customElements.define('my-button', MyButton, { extends: 'button' })

window.onload = Question.renderList

const submitFormHandler = (event) => {
    event.preventDefault()
    if (isValidValue(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON(),
        }
        Question.create(question).then(() => {
            submit.disabled = true
            input.value = ''
            input.className = ''
        })
    }
}

const inputHandler = () => {
    submit.disabled = !isValidValue(input.value)
}

const authFormHandler = (event) => {
    event.preventDefault()
    const form = event.target
    const email = form.querySelector('#email-input').value
    const password = form.querySelector('#password-input').value
    authWithEmailAndPassword(email, password)
        .then(response => {
            createLoadingModal()
            return Question.fetch(response)
        })
        .then(html => createModal({content: html}))
}

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', inputHandler)
seeAllBtn.addEventListener('click', () => {
    createModal({
        title: 'Log-in',
        content: `${getAuthForm()}`,
    })
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, { once: true })
})
