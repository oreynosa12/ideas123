//cover util
const util = require("util");
const fs = require("fs");
const uuid = require("uuid/v1");

//cover promisify
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")  //tells the read function what character set to use?
    }
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note))
    }

    addNote(note) {
        const { title, text } = note
        
        if(!title || !text) {
            throw new Error("title and text cannot be blank")
        }

        const newNote = { title, text, id: uuid()}

        return this.getNotes()
        .then(notes => [...notes, newNote]) //what's the spread operator doing?
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => this.newNote)
    }

    getNotes() {
        return this.read()
        .then(notes => {
            return JSON.parse(notes) || [];
        })
    }
    removeNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id)) // why no curly brackets?
        .then(keptNotes => this.write(keptNotes))
    }
}

module.exports = new Store();