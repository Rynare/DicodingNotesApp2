import { NoteOptionMenu } from "./NoteOptionMenu.js";
customElements.define("note-option-menu", NoteOptionMenu);

const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <style>
        * {
            box-sizing: border-box !important;
        }

        button.option-btn {
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
            cursor: pointer;
        }

        .note-option-menu {
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
        
        .note-option-menu.active {
            visibility: visible;
            transform: translateY(0);
            opacity: 1;
        }

        ::slotted([slot=option-menu]){
            display:flex;
            gap:6px;
            cursor: pointer;
        }

    </style>
        <div class='option-container'>
            <button class="option-btn">
                <i class="bi bi-three-dots-vertical"></i>
            </button>
            <div class="note-option-menu">
                <slot name="option-menu"></slot>
            </div>
        </div>
`;

export class NoteOption extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const newTemplate = template.content.cloneNode(true);
    newTemplate.querySelector(".option-btn i").style.color = this.style.color;
    this.shadowRoot.appendChild(newTemplate);
    this.runOptionBtnEvent();
  }

  runOptionBtnEvent() {
    this.shadowRoot
      .querySelector(".option-btn")
      .addEventListener("click", (event) => {
        this.shadowRoot
          .querySelector(".note-option-menu")
          .classList.toggle("active");
      });

    this.shadowRoot.addEventListener("note-option-changed", () => {
      this.shadowRoot
        .querySelector(".note-option-menu")
        .classList.remove("active");
    });

    this.shadowRoot.addEventListener("focusout", (event) => {
      event.preventDefault();
      setTimeout(() => {
        this.shadowRoot
          .querySelector(".note-option-menu")
          .classList.remove("active");
      }, 300);
    });
  }
}
