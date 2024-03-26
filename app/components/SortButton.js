const template = document.createElement('template')
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        * {
            box-sizing: border-box !important;
        }

        button.sort-btn {
            color: white;
            background-color: transparent;
            height: fit-content;
            border: none;
            outline: none;
            border-radius: 4px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            -ms-border-radius: 4px;
            -o-border-radius: 4px;
            font-size: 16px;
            position:relative;
        }

        .sort-menu {
            position: absolute;
            color: black;
            flex-direction: column;
            right: 10px;
            background-color: white;
            padding: 5px 7px;
            margin-top: 10px;
            box-shadow: 0px 2px 3px 0px grey;
            border-radius: 5px;
            gap: 6px;
            transform: translateY(-10px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
            display:flex;
            visibility: hidden;
        }
        
        .sort-menu.active {
            visibility: visible;
            transform: translateY(0);
            opacity: 1;
        }

        ::slotted([slot=sort-mode]){
            display:flex;
            gap:6px;
        }

    </style>
        <div class='sort-container'>
            <button class="sort-btn">
                <i class="bi bi-funnel-fill"></i>
            </button>
            <div class="sort-menu">
                <slot name="sort-mode"></slot>
            </div>
        </div>
`

export class SortButton extends HTMLElement {

    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const newTemplate = template.content.cloneNode(true)
        this.shadowRoot.appendChild(newTemplate)
        this.runSortBtnEvent()
    }

    runSortBtnEvent() {
        this.shadowRoot.querySelector('.sort-btn').addEventListener('click', (event) => {
            this.shadowRoot.querySelector('.sort-menu').classList.toggle('active')
        });

        this.shadowRoot.addEventListener('sort-changed', () => {
            this.shadowRoot.querySelector('.sort-menu').classList.remove('active')
        });

        this.shadowRoot.addEventListener('focusout', (event) => {
            event.preventDefault()
            setTimeout(() => {
                this.shadowRoot.querySelector('.sort-menu').classList.remove('active');
            }, 300);
        });

    }
}
