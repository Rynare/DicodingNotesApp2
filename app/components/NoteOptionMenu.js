export class NoteOptionMenu extends HTMLElement {
    constructor() {
        super()
    }


    connectedCallback() {
        this.render()
    }

    render() {
        this.innerHTML = ''
        const template = document.createElement('template')
        template.innerHTML = `
            <i class="${this.getAttribute('bs-icon')}"></i>
            <span>${this.getAttribute('text')}</span>
        `
        this.appendChild(template.content.cloneNode(true))

        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('note-option-changed', {
                detail: { noteOption: this.getAttribute('value') },
                bubbles: true,
                composed: true
            }));
        })
    }
}