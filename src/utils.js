export function isValidValue(value) {
    return typeof value === 'string' 
        && value.length >= 10 
        && value.length < 256
}

export function createModal({title = '', content = ''}) {
    const modal = document.createElement('div')
    modal.classList.add('modal')

    modal.innerHTML = `
        <div class="mui--text-headline">${title}</div>
        <div class="mui--text-body2">${content}</div>
    `

    mui.overlay('on', modal)
}

export function createLoadingModal() {
    createModal({ content: `
        <div class="lds-ellipsis"><div></div><div></div><div></div>
    `})
} 

export function validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}
