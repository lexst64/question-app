const API_KEY = 'AIzaSyAIYgaFZHx8k_gVVfmPA8KDXqpvX2TokbU'

export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
                <input
                    type="email"
                    id="email-input"
                    requierd
                />
                <label for="email-input">E-mail</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input
                    type="password"
                    id="password-input"
                    requierd
                />
                <label for="password-input">Password</label>
            </div>
            <button 
                type="submit" 
                id="auth-submit" 
                class="mui-btn mui-btn--raised mui-btn--primary"
            >
                Submit
            </button>
        </form>
    `
}

export async function authWithEmailAndPassword(email = '', password = '') {
    const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
        {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify({ email, password, returnSecureToken: true }),
        }
    )
    const data = await response.json()
    return data.error ? data.error : data.idToken
}
