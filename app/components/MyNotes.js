const template = document.createElement('template')
template.innerHTML = `
<note-list sort-by="terbaru"></note-list>
<note-detail></note-detail>
`;

export class MyNotes extends HTMLDivElement {
    static observedAttributes = ["note-data-new"];

    constructor() {
        super()
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const templateNode = template.content.cloneNode('true')
        this.appendChild(templateNode)
    }
}
