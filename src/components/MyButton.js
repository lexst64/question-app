export class MyButton extends HTMLButtonElement {
    constructor() {
        super()
    }

    connectedCallback() {
        // браузер вызывает этот метод при добавлении элемента в документ
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
        this.className = 'mui-btn mui-btn--raised mui-btn--primary'
    }
}
