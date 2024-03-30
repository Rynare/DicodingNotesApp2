// * Custom elements
import { MyNotes } from './app/components/MyNotes.js';
import { NoteList } from './app/components/NoteList.js';
import { NoteItem } from './app/components/NoteItem.js';
import { NoteDetail } from './app/components/NoteDetail.js';
import { SortButton } from './app/components/SortButton.js';
import { SortItemMode } from './app/components/SortItemMode.js';

// * Custom Elements 
customElements.define('my-notes', MyNotes, { extends: 'div' });
customElements.define('note-list', NoteList);
customElements.define('note-item', NoteItem);
customElements.define('note-detail', NoteDetail);
customElements.define('sort-note', SortButton);
customElements.define('sort-mode', SortItemMode);