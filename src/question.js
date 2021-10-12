const QUESTIONS_URL =
    'https://pure-js-app-5695b-default-rtdb.firebaseio.com/questions.json'

const noQuestionsMessage = `<div class="mui--text-headline">there are no questions yet</div>`

export class Question {
    static create(question) {
        return fetch(QUESTIONS_URL, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                question.id = response.name
                return question
            })
            .then(addQuestionToLocalStorage)
            .then(Question.renderList)
    }

    static fetch(idToken) {
        if (!idToken) {
            return Promise.resolve('<p class="error">id token not passed</p>')
        }
        return fetch(`${QUESTIONS_URL}?auth=${idToken}`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.error)
                    return `<p class="error">invalid id token: ${data.error}</p>`
                return renderAllQuestions(data)
            })
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage()
        const postList = document.getElementById('post-list')

        const html = questions.length
            ? questions.map(createQuestionHTML).join('')
            : noQuestionsMessage

        postList.innerHTML = html
    }
}

function renderAllQuestions(questions) {
    if (questions) {
        const keys = Object.keys(questions)
        const html = keys.length
            ? keys.map((key) => {
                return createQuestionHTML({ ...questions[key], id: key })
            }).join('')
            : noQuestionsMessage
        return html    
    }
    return noQuestionsMessage
}

function createQuestionHTML(question) {
    return `
        <div class="post">
            <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()} |
            ${new Date(question.date).toLocaleTimeString()}
            </div>
            <div>${question.text}</div>
        </div>
    `
}

function addQuestionToLocalStorage(question) {
    const questions = getQuestionsFromLocalStorage()
    questions.push(question)
    localStorage.setItem('questions', JSON.stringify(questions))
}

function getQuestionsFromLocalStorage() {
    const jsonItem = localStorage.getItem('questions')
    if (jsonItem) {
        return JSON.parse(jsonItem)
    }
    return []
}
