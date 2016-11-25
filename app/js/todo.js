$(function() {

    var todos = localStorage.getItem('todos');
    todos = todos ? JSON.parse(todos) : [];

    var DOM = {
        $input: $('.app-input'),
        $list: $('.app-list'),
        $button: $('.app-add'),
    };

    var ENTER = 13;
    var editMode = false;
    var itemId;

    function updateLocalStorage() {
        localStorage.removeItem('todos');
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Dodaj todos z localStorage
    _(todos).each(function(todo) {
        var $check = $('<span class="app-check glyphicon glyphicon-unchecked check"></span>');
        var $item = $('<li class="list-group-item"></li>');
        var $todo = $('<span class="app-todo contents"></span>');
        var $edit = $('<span class="app-edit glyphicon glyphicon-pencil edit"></span>');
        var $del = $('<span class="app-delete glyphicon glyphicon-trash delete"></span>');


        if (todo.checked) {
            $item.addClass('checkbox_active');
            $check.removeClass('glyphicon-unchecked').addClass('glyphicon-check');

        }

        $todo.text(todo.text);
        $item.append($check);
        $item.append($todo);
        $item.append($del);
        $item.append($edit);

        DOM.$list.append($item);

    });

    // Funkcja dodawająca nowy element listy na wciśnięcie klawisza 'enter'
    DOM.$input.on('keyup', function(e) {

        if (e.keyCode === ENTER) {

            var todo = DOM.$input.val();

            if (editMode) {

                if (todo.trim()) {
                    DOM.$list.find('li:eq(' + itemId + ')').find('.app-todo').text(todo);

                    todos[itemId].text = todo;
                    updateLocalStorage();
                }

            } else {

                if (todo.trim()) {
                    todos.push({
                        dateAdded: +new Date(),
                        text: todo,
                        checked: false
                    });
                    updateLocalStorage();

                    var $check = $('<span class="app-check glyphicon glyphicon-unchecked check"></span>');
                    var $item = $('<li class="list-group-item"></li>');
                    var $todo = $('<span class="app-todo contents"></span>');
                    var $edit = $('<span class="app-edit glyphicon glyphicon-pencil edit"></span>');
                    var $del = $('<span class="app-delete glyphicon glyphicon-trash delete"></span>');

                    $todo.text(todo);
                    $item.append($check);
                    $item.append($todo);
                    $item.append($del);
                    $item.append($edit);

                    DOM.$list.append($item);
                }
            }

            editMode = false;
            DOM.$input.val('');
            DOM.$input.focus();
            DOM.$button.text('Add');
            DOM.$button.removeClass('btn_edit').addClass('btn');
        }

    });

    // Funkcja dodawająca nowy element listy na kliknięcię przycisku
    DOM.$button.on('click', function(e) {

        var todo = DOM.$input.val();

        if (editMode) {
            if (todo.trim()) {
                DOM.$list
                    .find('li:eq(' + itemId + ')')
                    .find('.app-todo')
                    .text(todo);

                todos[itemId].text = todo;
                updateLocalStorage();
            }

        } else {

            if (todo.trim()) {
                todos.push({
                    dateAdded: +new Date(),
                    text: todo,
                    checked: false
                });
                updateLocalStorage();

                var $check = $('<span class="app-check glyphicon glyphicon-unchecked check"></span>');
                var $item = $('<li class="list-group-item"></li>');
                var $todo = $('<span class="app-todo contents"></span>');
                var $edit = $('<span class="app-edit glyphicon glyphicon-pencil edit"></span>');
                var $del = $('<span class="app-delete glyphicon glyphicon-trash delete"></span>');

                $todo.text(todo);
                $item.append($check);
                $item.append($todo);
                $item.append($del);
                $item.append($edit);

                DOM.$list.append($item);

            }
        }

        editMode = false;
        DOM.$input.val('');
        DOM.$input.focus();
        DOM.$button.text('Add');
        DOM.$button.removeClass('btn-success').addClass('btn-primary');

    });

    // Funkcja usuwająca wybrany element listy
    DOM.$list.on('click', '.app-delete', function(e) {

        var id = $(this).parent('li').prevAll().length;
        todos.splice(id, 1);
        updateLocalStorage();

        $(this).parent('li').remove();

    });

    // Funkcja edytyująca wybrany element listy i wzracająca wynik na poprzednią pozycję w liście
    DOM.$list.on('click', '.app-edit', function(e) {

        var todo = $(this).parent('li').find('.app-todo').text();

        DOM.$input.val(todo);
        DOM.$input.focus();
        DOM.$button.text('Edit').removeClass('btn-primary').addClass('btn-success');

        editMode = true;
        itemId = $(this).parent('li').prevAll().length;

    });

    // Funkcja dodawająca klase gdy checkbox jest aktywne i usuwająca klase gdy checkbox jest nie aktywne
    DOM.$list.on('click', '.list-group-item', function(e) {

        var id = $(this).prevAll().length;

        if ($(this).find('.app-check').hasClass("glyphicon-unchecked")) {
            $(this).addClass('checkbox_active');
            $(this).find('.app-check').removeClass('glyphicon-unchecked').addClass('glyphicon-check');

            todos[id].checked = true;
        } else {
            $(this).removeClass('checkbox_active');
            $(this).find('.app-check').removeClass('glyphicon-check').addClass('glyphicon-unchecked');

            todos[id].checked = false;
        }

        updateLocalStorage();

    });

});