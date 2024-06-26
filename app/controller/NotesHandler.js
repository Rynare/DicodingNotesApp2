const endpoint = "https://notes-api.dicoding.dev/v2";

/**
 **Creates a new note.
 * @param {object} data - Data untuk note baru.
 * @param {string} data.title - Data untuk judul note baru.
 * @param {string} data.body - Data untuk isi note baru.
 * @returns {Promise<object>} Function ini mengembalikan promise.
 * @throws {Error} Function ini akan mengembalikan error jika gagal membuat note baru.
 *
 * @example
 * contoh return ketika sukses
 * {
 *  "status": "success",
 *  "message": "Note created",
 *  "data": {
 *      "id": "notes-_O6A6TJcCYUWO7t4",
 *      "title": "Hello, Notes!",
 *      "body": "My new notes.",
 *      "archived": false,
 *      "createdAt": "2022-07-28T10:12:12.396Z"
 *  }
 * }
 */

export function createNote(data) {
  if (!data) {
    throw new Error(
      "Missing param createNote(?): data note baru kosong! harap isi data note baru",
    );
  }
  if (typeof data != "object") {
    throw new Error(
      "Unmatch param createNote(data): data note baru harus berupa object",
    );
  }
  return fetch(`${endpoint}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: data.title,
      body: data.body, // Perbaikan: Menggunakan body: data.body
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json(); // Menunggu response.json()
      if (result.error) {
        throw new Error(`Error Create New Note: ${result.message}`); // Perbaikan: Menggunakan result.error
      } else {
        return result;
      }
    })
    .catch((error) => {
      throw new Error(`Error Create New Note: ${error.message}`);
    }); // Menambahkan pesan error jika fetch gagal
}

/**
 **Get Notes data.
 * @returns {Promise<object>} Function ini mengembalikan promise.
 * @throws {Error} Function ini akan mengembalikan error jika gagal membuat note baru.
 *
 * @example
 * contoh return ketika sukses
 * {
 *   "status": "success",
 *   "message": "Note retrieved",
 *   "data": {
 *       "id": "notes-jT-jjsyz61J8XKiI",
 *       "title": "Welcome to Notes, Dimas!",
 *       "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
 *       "createdAt": "2022-07-28T10:03:12.594Z",
 *       "archived": false
 *   }
 * }
 */

export function getNotes() {
  return fetch(`${endpoint}/notes`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.error) {
        throw new Error(`JSON parse error!: ${result.message}`);
      } else {
        return result;
      }
    })
    .catch((error) => {
      throw new Error("Error fetching notes:", error);
    });
}

/**
 **Get Archive Note.
 * @returns {Promise<object>} Function ini mengembalikan promise.
 * @throws {Error} Function ini akan mengembalikan error jika gagal membuat note baru.
 *
 * @example
 * contoh return ketika sukses
 * {
 *   "status": "success",
 *   "message": "Notes retrieved",
 *   "data": [
 *       {
 *           "id": "notes-jT-jjsyz61J8XKiI",
 *           "title": "Welcome to Notes, Dimas!",
 *           "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
 *           "createdAt": "2022-07-28T10:03:12.594Z",
 *           "archived": true
 *       }
 *   ]
 * }
 */

export function getArchivedNotes() {
  return fetch(`${endpoint}/notes/archived`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = response.json();
      if (result.error) {
        throw new Error(`JSON parse error!: ${result.message}`);
      } else {
        return result;
      }
    })
    .catch((error) => {
      throw new Error("Error fetching archived notes:", error);
    });
}

/**
 **Get Single note by ID.
 * @param {string} note_id - ID note yang ingin di tampilkan/diambil.
 * @returns {Promise<object>} Function ini mengembalikan promise.
 * @throws {Error} Function ini akan mengembalikan error jika gagal membuat note baru.
 *
 * @example
 * contoh return ketika sukses
 * {
 *   "status": "success",
 *   "message": "Note retrieved",
 *   "data": {
 *       "id": "notes-jT-jjsyz61J8XKiI",
 *       "title": "Welcome to Notes, Dimas!",
 *       "body": "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
 *       "createdAt": "2022-07-28T10:03:12.594Z",
 *       "archived": false
 *   }
 * }
 */

export function getNoteById(note_id) {
  if (!note_id) {
    throw new Error(
      "Missing param getNoteById(?): note_id kosong! harap isi note_id",
    );
  }
  return fetch(`${endpoint}/notes/${note_id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = response.json();
      if (result.error) {
        throw new Error(`JSON parse error!: ${result.message}`);
      } else {
        return result;
      }
    })
    .catch((error) => {
      throw new Error(`Error fetching Note [id: ${note_id}]:`, error);
    });
}

/**
 **Set Archive note.
 * @param {string} note_id - ID note yang ingin diarchive/diarsipkan.
 * @returns {Promise<object>} Function ini mengembalikan promise.
 * @throws {Error} Function ini akan mengembalikan error jika gagal membuat note baru.
 *
 * @example
 * contoh return ketika sukses
 * {
 *  "status": "success",
 *  "message": "Note archived"
 * }
 */

export function setArchiveNote(note_id) {
  if (!note_id) {
    throw new Error(
      "Missing param setArchiveNote(?): note_id kosong! harap isi note_id",
    );
  }
  return fetch(`${endpoint}/notes/${note_id}/archive`, {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = response.json();
      if (result.error) {
        throw new Error(`JSON parse error!: ${result.message}`);
      } else {
        return result;
      }
    })
    .catch((error) => {
      throw new Error(`Error Archive Note [id: ${note_id}]:`, error);
    });
}

/**
 **Unarchive note.
 * @param {string} note_id - ID note yang ingin di keluarkan dari archive/arsip.
 * @returns {Promise<object>} Function ini mengembalikan promise.
 * @throws {Error} Function ini akan mengembalikan error jika gagal membuat note baru.
 *
 * @example
 * contoh return ketika sukses
 * {
 *  "status": "success",
 *  "message": "Note unarchived"
 * }
 */

export function setUnarchiveNote(note_id) {
  if (!note_id) {
    throw new Error(
      "Missing param setUnarchiveNote(?): note_id kosong! harap isi note_id",
    );
  }
  return fetch(`${endpoint}/notes/${note_id}/unarchive`, {
    method: "POST",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = response.json();
      if (result.error) {
        throw new Error(`JSON parse error!: ${result.message}`);
      } else {
        return result;
      }
    })
    .catch((error) => {
      throw new Error(`Error Unarchive Note [id: ${note_id}]:`, error);
    });
}

/**
 **Delete note.
 * @param {string} note_id - ID note yang ingin dihapus.
 * @returns {Promise<object>} Function ini mengembalikan promise.
 * @throws {Error} Function ini akan mengembalikan error jika gagal membuat note baru.
 *
 * @example
 * contoh return ketika sukses
 * {
 *  "status": "success",
 *  "message": "Note deleted"
 * }
 */

export function deleteNote(note_id) {
  if (!note_id) {
    throw new Error(
      "Missing param deleteNote(?): note_id kosong! harap isi note_id",
    );
  }

  return fetch(`${endpoint}/notes/${note_id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((result) => {
      if (result.error) {
        throw new Error(`JSON parse error!: ${result.message}`);
      } else {
        return result;
      }
    })
    .catch((error) => {
      throw new Error(`Error delete Note [id: ${note_id}]:`, error);
    });
}

export function updateNoteById(note_id, new_data) {
  return deleteNote(note_id)
    .then((result) => {
      if (result.status == "success") {
        return createNote(new_data)
          .then((note) => {
            return note;
          })
          .catch((error) => {
            throw new Error(error);
          });
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
}
export function getSortedByCreateAtDesc(folderType) {
  if (folderType == "archive") {
    return getArchivedNotes()
      .then((result) => {
        const sorted = [...result.data];
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      })
      .catch((error) => {
        throw new Error("Error fetching archived notes:", error);
      });
  } else {
    return getNotes()
      .then((result) => {
        const sorted = [...result.data];
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      })
      .catch((error) => {
        throw new Error("Error fetching notes:", error);
      });
  }
}
export function getSortedByCreateAtAsc(folderType) {
  if (folderType == "archive") {
    return getArchivedNotes()
      .then((result) => {
        const sorted = [...result.data];
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      })
      .catch((error) => {
        throw new Error("Error fetching archived notes:", error);
      });
  } else {
    return getNotes()
      .then((result) => {
        const sorted = [...result.data];
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      })
      .catch((error) => {
        throw new Error("Error fetching notes:", error);
      });
  }
}
