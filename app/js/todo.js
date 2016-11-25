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
        var $check = $('<input type="checkbox" class="app-check">');
        var $item = $('<li class="list-group-item"></li>');
        var $todo = $('<span class="app-todo contents"></span>');
        var $edit = $('<span class="app-edit glyphicon glyphicon-pencil"></span>');
        var $del = $('<span class="app-delete glyphicon glyphicon-trash"></span>');

        $todo.text(todo.text);
        $check.prop('checked', todo.checked);
        $item.prepend($check);
        $item.append($todo);
        $item.append($del);
        $item.append($edit);
        if (todo.checked) {
            $item.addClass('checkbox_active');
        }

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

                    var $check = $('<input type="checkbox" class="app-check">');
                    var $item = $('<li class="list-group-item"></li>');
                    var $todo = $('<span class="app-todo contents"></span>');
                    var $edit = $('<span class="app-edit glyphicon glyphicon-pencil"></span>');
                    var $del = $('<span class="app-delete glyphicon glyphicon-trash"></span>');

                    $todo.text(todo);
                    $item.prepend($check);
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

                var $check = $('<input type="checkbox" class="app-check">');
                var $item = $('<li class="list-group-item"></li>');
                var $todo = $('<span class="app-todo contents"></span>');
                var $edit = $('<span class="app-edit glyphicon glyphicon-pencil"></span>');
                var $del = $('<span class="app-delete glyphicon glyphicon-trash"></span>');

                $todo.text(todo);
                $item.prepend($check);
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

    });

    // Funkcja usuwająca wybrany element listy
    DOM.$list.on('click', '.app-delete', function(e) {

        var id = $(this).parent('li').prevAll().length;
        console.log(id);
        todos.splice(id, 1);
        updateLocalStorage();

        $(this).parent('li').remove();

    });

    // Funkcja edytyująca wybrany element listy i wzracająca wynik na poprzednią pozycję w liście
    DOM.$list.on('click', '.app-edit', function(e) {

        var todo = $(this).parent('li').find('.app-todo').text();

        DOM.$input.val(todo);
        DOM.$input.focus();
        DOM.$button.text('Edit').removeClass('btn').addClass('btn_edit');

        editMode = true;
        itemId = $(this).parent('li').prevAll().length;

    });

    // Funkcja dodawająca klase gdy checkbox jest aktywne i usuwająca klase gdy checkbox jest nie aktywne
    DOM.$list.on('click', '.app-check', function(e) {

        if ($(this).prop("checked")) {
            $(this).parent('li').addClass('checkbox_active');

        } else {
            $(this).parent('li').removeClass('checkbox_active');

        }
        var id = $(this).parent('li').prevAll().length;

        todos[id].checked = $(this).prop("checked");
        updateLocalStorage();
        
    });

});