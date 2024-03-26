import { addNote, findNoteById, getSortedByCreateAtAsc, updateNoteById } from '../../notes-data.js'

const template = document.createElement('template')
template.innerHTML = `
<form>
    <header>
        <i class="bi bi-arrow-left back-btn"></i>
        <div>
            <button type="submit" id="save-btn"><i class="bi bi-floppy-fill"></i></button>
        </div>
    </header>
    <div id="detail-container">
        <input id="detail-title" required placeholder="Judul" name="title">
        <textarea id="detail-body" placeholder="Isi Catatan" name="body"></textarea>
    </div>
</form>
`

export class NoteDetail extends HTMLElement {

    static observedAttributes = ["note-id"];

    constructor() {
        super()
        const newTemplate = template.content.cloneNode(true)
        this.appendChild(newTemplate)
    }

    connectedCallback() {
        this.render()
        this.runBackEvent()
        this.runSubmitFormEvent()
        this.runTitleInputEvent()
    }


    render(title = '', body = '') {
        const detail_title = this.querySelector('#detail-title')
        const detail_body = this.querySelector('#detail-body')

        detail_title.value = title
        detail_body.value = body
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'note-id':
                newValue = newValue.trim();
                const data = findNoteById(newValue)
                if ((newValue != '' || newValue != null || newValue != undefined) && data) {
                    this.render(data.title, data.body)
                    this.classList.add('active')
                } else {
                    this.render()
                    this.classList.add('active')
                }
                break
            default:
                break;
        }
    }

    runBackEvent() {
        const backBtn = this.querySelector('.back-btn')
        backBtn.addEventListener('click', () => {
            this.setAttribute('note-id', '')
            document.querySelector('note-list').setAttribute('refresh', true)
            this.classList.remove('active')
        })
    }

    runTitleInputEvent() {
        const title = this.querySelector('#detail-title')

        title.addEventListener('input', () => {
            if (title.value.trim().length <= 0) {
                title.setCustomValidity('Tidak boleh kosong')
            } else {
                title.setCustomValidity('')
            }
        })
    }

    runSubmitFormEvent() {
        const form = this.querySelector('form')
        const submitBtn = this.querySelector('#save-btn')
        form.addEventListener('submit', (event) => {
            event.preventDefault()
            console.log(this.getAttribute('note-id'))
            const formData = new FormData(form, submitBtn)
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            if (this.getAttribute('note-id') == 'new' || this.getAttribute('note-id') == '' || this.getAttribute('note-id') == null) {
                const new_note = addNote(data)
                this.setAttribute('note-id', new_note.id)
            } else {
                updateNoteById(this.getAttribute('note-id'), data)
            }
            if (window.innerWidth >= 768) {
                document.querySelector('note-list').setAttribute('refresh', true)
            }
        })
    }
}
