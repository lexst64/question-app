export class MyComponent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        // браузер вызывает этот метод при добавлении элемента в документ
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
        this.innerHTML = `
            <div class="mui-dropdown">
                <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown">
                    Dropdown
                    <span class="mui-caret"></span>
                </button>
                <ul class="mui-dropdown__menu">
                    <li><a href="#">Option 1</a></li>
                    <li><a href="#">Option 2</a></li>
                    <li><a href="#">Option 3</a></li>
                    <li><a href="#">Option 4</a></li>
                </ul>
            </div>
        `
        const optionLinkHandler = event => {
            event.preventDefault()
        }

        document.querySelectorAll('.mui-dropdown__menu li > a')
            .forEach(a => a.addEventListener('click', optionLinkHandler))
    }

    disconnectedCallback() {
        // браузер вызывает этот метод при удалении элемента из документа
        // (может вызываться много раз, если элемент многократно добавляется/удаляется)
    }

    static get observedAttributes() {
        return [
            /* массив имён атрибутов для отслеживания их изменений */
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // вызывается при изменении одного из перечисленных выше атрибутов
    }

    adoptedCallback() {
        // вызывается, когда элемент перемещается в новый документ
        // (происходит в document.adoptNode, используется очень редко)
    }

    // у элемента могут быть ещё другие методы и свойства
}
