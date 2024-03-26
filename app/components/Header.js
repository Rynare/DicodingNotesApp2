const template = document.createElement('template')
template.innerHTML = `
<h3>MyNote</h3>
<div class="header-option">
    <button class="new-note-btn">
        <i class="bi bi-journal-bookmark-fill"></i>
        <span>Baru</span>
    </button>
    <sort-note>
        <sort-mode slot="sort-mode" value="terbaru" icon="bi bi-sort-up" text="Terbaru"></sort-mode>
        <sort-mode slot="sort-mode" value="terlama" icon="bi bi-sort-down-alt" text="Terlama"></sort-mode>
    </sort-note>
</div>
`

export class NoteHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const newTemplate = template.content.cloneNode(true)
        this.appendChild(newTemplate)
        this.runSortChangeEvent()
        this.runNewNoteEvent()
    }

    runSortChangeEvent() {
        const sort_note = document.querySelector('sort-note');
        sort_note.addEventListener('sort-changed', event => {
            document.querySelector('note-list').setAttribute('sort-by', event.detail.sortMode)
        });
    }

    runNewNoteEvent() {
        const btn = this.querySelector('.new-note-btn')
        btn.addEventListener('click', () => {
            document.querySelector('note-detail').setAttribute('note-id', 'new')
        })
    }
}

