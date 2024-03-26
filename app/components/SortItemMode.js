export class SortItemMode extends HTMLElement {
    constructor() {
        super()
    }


    connectedCallback() {
        this.render()
    }

    render() {
        const template = document.createElement('template')
        template.innerHTML = `
            <i class="${this.getAttribute('icon')}"></i>
            <span>${this.getAttribute('text')}</span>
        `
        this.appendChild(template.content.cloneNode(true))

        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('sort-changed', {
                detail: { sortMode: this.getAttribute('value') },
                bubbles: true,
                composed: true
            }));
        })
    }
}