const endpoint = 'https://notes-api.dicoding.dev/v2';

export function getNotes() {
    return fetch(`${endpoint}/notes`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = response.json()
            if (result.error) {
                throw new Error(`JSON parse error!: ${result.message}`)
            } else {
                return result
            }
        })
        .catch(error => { throw new Error('Error fetching notes:', error) })
}

export function getArchivedNotes() {
    return fetch(`${endpoint}/notes/archived`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = response.json()
            if (result.error) {
                throw new Error(`JSON parse error!: ${result.message}`)
            } else {
                return result
            }
        })
        .catch(error => { throw new Error('Error fetching archived notes:', error) })
}

export function getNoteById(note_id) {
    if (!note_id) {
        throw new Error('Missing param getNoteById(?): note_id kosong! harap isi note_id')
    }
    return fetch(`${endpoint}/notes/${note_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = response.json()
            if (result.error) {
                throw new Error(`JSON parse error!: ${result.message}`)
            } else {
                return result
            }
        })
        .catch(error => { throw new Error(`Error fetching Note [id: ${note_id}]:`, error) })
}

export function setArchiveNote(note_id) {
    if (!note_id) {
        throw new Error('Missing param setArchiveNote(?): note_id kosong! harap isi note_id')
    }
    return fetch(`${endpoint}/notes/${note_id}/archive`, {
        method: 'POST'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = response.json()
            if (result.error) {
                throw new Error(`JSON parse error!: ${result.message}`)
            } else {
                return result.message
            }
        })
        .catch(error => { throw new Error(`Error Archieve Note [id: ${note_id}]:`, error) })
}

export function setUnarchiveNote(note_id) {
    if (!note_id) {
        throw new Error('Missing param setUnarchiveNote(?): note_id kosong! harap isi note_id')
    }
    return fetch(`${endpoint}/notes/${note_id}/unarchive`, {
        method: 'POST'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const result = response.json()
            if (result.error) {
                throw new Error(`JSON parse error!: ${result.message}`)
            } else {
                return result.message
            }
        })
        .catch(error => { throw new Error(`Error Unarchieve Note [id: ${note_id}]:`, error) })
}

export function deleteNote(note_id) {
    if (!note_id) {
        throw new Error('Missing param deleteNote(?): note_id kosong! harap isi note_id')
    }

    return fetch(`${endpoint}/notes/${note_id}`, {
        method: 'DELETE'
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = response.json()
        if (result.error) {
            throw new Error(`JSON parse error!: ${result.message}`)
        } else {
            return result.message
        }
    })
        .catch(error => { throw new Error(`Error delete Note [id: ${note_id}]:`, error) });
}

export function createNote(data) {
    if (!data) {
        throw new Error('Missing param createNote(?): data note baru kosong! harap isi data note baru')
    }
    if (typeof data != 'object') {
        throw new Error('Unmatch param createNote(data): data note baru harus berupa object')
    }
    return fetch(`${endpoint}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: data.title,
            author: data.body
        })
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result = response.json()
        if (result.error) {
            throw new Error(`JSON parse error!: ${result.message}`)
        } else {
            return result
        }
    })
        .catch(error => { throw new Error(`Error Create New Note:`, error) });
}