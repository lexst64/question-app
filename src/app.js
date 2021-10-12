import {
    isValidValue,
    createModal,
    createLoadingModal,
    validateEmail,
    validatePassword,
} from './utils'
import { Question } from './question'
import { getAuthForm, authWithEmailAndPassword } from './auth'
import { MyComponent } from './components/MyComponent'
import { MyButton } from './components/MyButton'
import './style/app.css'
import './style/loading.css'

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
        submit.disabled = true
        Question.create(question).then(() => {
            input.value = ''
            input.className = ''
        })
    }
}

const inputHandler = () => {
    submit.disabled = !isValidValue(input.value)
}

const authFormHandler = (event, email, password) => {
    event.preventDefault()
    authWithEmailAndPassword(email, password)
        .then((response) => {
            createLoadingModal()
            return Question.fetch(response)
        })
        .then((html) => createModal({ content: html }))
}

const authEmailHandler = (event, btnEl) => {
    if (validateEmail(event.target.value)) {
        return (btnEl.disabled = false)
    }
    return (btnEl.disabled = true)
}

const authPasswordHandler = (event, btnEl) => {
    if (validatePassword(event.target.value)) {
        return (btnEl.disabled = false)
    }
    return (btnEl.disabled = true)
}

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', inputHandler)
seeAllBtn.addEventListener('click', () => {
    createModal({
        title: 'Log-in',
        content: `${getAuthForm()}`,
    })
    const form = document.getElementById('auth-form')
    const emailInput = form.querySelector('#email-input')
    const passwordInput = form.querySelector('#password-input')
    const btn = form.querySelector('#auth-submit')

    emailInput.addEventListener('input', (event) =>
        authEmailHandler(event, btn)
    )
    passwordInput.addEventListener('input', (event) =>
        authPasswordHandler(event, btn)
    )
    form.addEventListener(
        'submit',
        (event) => {
            authFormHandler(event, emailInput.value, passwordInput.value)
        },
        { once: true }
    )
})
