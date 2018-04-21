window.onload = function () {
    
    var x = document.getElementById("note")
    var z = document.getElementById("dude")
    var add = document.getElementById("add")

    //Function to increase and decrease  the size of text box dynamically.
    function increase_size_x(e) {
        e.target.rows += 1;
    }

    function decrease_size_x(e) {
        if (e.target.value.length == 0)
            e.target = 10;
    }
    x.addEventListener("scroll", increase_size_x);
    x.addEventListener("keyup", decrease_size_x);


    //Function to create a new note.

    function new_note() {
        const note_obj = {
            title: document.getElementById("title").value,
            content: document.getElementById("note").value
        }

        
        var note_arr = getNotes();
        note_arr.push(note_obj);
        storeNotes(note_arr);

        addNote(note_obj.title, note_obj.content);
    }

    add.addEventListener("click", new_note);



    function addNote(note_title, content) {

        var card = document.createElement('div');
        card.className = "added_card";
        card.id = "add_card"

        var del = document.createElement('div')
        del.innerHTML = '<a href="#"><i class="fas fa-trash-alt" id="del"></i></a>';

        var title = document.createElement('input');
        title.className = "added_title";
        title.setAttribute('placeholder', 'Title')
        title.id = "add_title"

        var notes = document.createElement('textarea');
        notes.className = "added_notes";
        notes.id = "add_note"
        notes.setAttribute('rows', x.rows);
        notes.setAttribute('cols', 40);
        notes.setAttribute('placeholder', "Enter your note here");

        var erase_but = document.createElement('button');
        erase_but.className = "added_but";
        erase_but.innerHTML = "Erase";


        card.appendChild(del);
        card.appendChild(title);
        card.appendChild(notes);
        card.appendChild(erase_but);
        document.getElementById("created_note").prepend(card);

        title.value = note_title;
        notes.innerHTML = content;

        erase_but.addEventListener("click", function () {
            notes.innerHTML = "";
            title.value = ""
        })
        document.getElementById("title").value = "";
        document.getElementById("note").value = "";


        del.addEventListener("click", function () {
            document.getElementById("created_note").removeChild(card);
        })

    }

    // Function to erase the contents of the note Erase command.
    function erase() {
        document.getElementById("note").value = ""
        document.getElementById("title").value = ""
    }

    var storage_name = "stickynotes007";

    function getNotes() {
        // stores : nothing 
        // returns : a new array or an array containing the stored_notes
        var stored_notes = localStorage.getItem(storage_name);
        if (stored_notes == "" || stored_notes == null)
            return new Array();
        return JSON.parse(stored_notes);
    }


    function storeNotes(note_arr) {
        //returns : nothing 
        //work : storing the newnotes created into the local storage 
        var stringified_note = JSON.stringify(note_arr)
        localStorage.setItem(storage_name, stringified_note);

    }

    function count_numberof_Notes() {

    }

    //Function to initialize 
    function init() {
        var note_arr = getNotes();
        for (var i = 0; i < note_arr.length; i++) {
            note = note_arr[i];
            no_title = note.title;
            content = note.content;
            addNote(no_title, content)
        }
    }
    init();
}