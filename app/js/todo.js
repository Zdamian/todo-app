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
        var $inputEdit = $('<input type="text" class="app-inputEdit inputEdit form-control">');
        var $check = $('<span class="app-check glyphicon glyphicon-unchecked check"></span>');
        var $item = $('<li class="list-group-item"></li>');
        var $todo = $('<span class="app-todo contents"></span>');
        var $edit = $('<span class="app-edit glyphicon glyphicon-pencil edit" data-toggle="tooltip" data-placement="top" title="Edit"></span>');
        var $del = $('<span class="app-delete glyphicon glyphicon-trash delete" data-toggle="tooltip" data-placement="top" title="Delete"></span>');


        if (todo.checked) {
            $item.addClass('checkbox_active');
            $todo.addClass('content_decoration');
            $check.removeClass('glyphicon-unchecked').addClass('glyphicon-check').css('color', '#7dbb00');

        }

        $todo.text(todo.text);
        $item.append($check);
        $item.append($todo);
        $item.append($del);
        $item.append($edit);

        DOM.$list.append($item);

    });

    // Obsługa zdarzenia wciśnięcia 'enter' na którym jest dodawany nowy element listy
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
                        dateAdded: new Date(),
                        text: todo,
                        checked: false
                    });
                    updateLocalStorage();

                    var $check = $('<span class="app-check glyphicon glyphicon-unchecked check"></span>');
                    var $item = $('<li class="list-group-item"></li>');
                    var $todo = $('<span class="app-todo contents"></span>');
                    var $edit = $('<span class="app-edit glyphicon glyphicon-pencil edit" data-toggle="tooltip" data-placement="top" title="Edit"></span>');
                    var $del = $('<span class="app-delete glyphicon glyphicon-trash delete" data-toggle="tooltip" data-placement="top" title="Delete"></span>');

                    var a = todos[todos.length - 1].dateAdded.getDate();
                    console.log(a);

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

            $(function() {
                $('[data-toggle="tooltip"]').tooltip()
            });

        }

    });

    // Obsługa zdarzenia kliknięcia na którym jest dodawany nowy element listy
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
                var $edit = $('<span class="app-edit glyphicon glyphicon-pencil edit" data-toggle="tooltip" data-placement="top" title="Edit"></span>');
                var $del = $('<span class="app-delete glyphicon glyphicon-trash delete" data-toggle="tooltip" data-placement="top" title="Delete"></span>');

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

        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        });

    });

    DOM.$list.on('blur', '.app-inputEdit', function(e) {

        var todo = $(this).val();
        itemId = $(this).parent('li').prevAll().length;

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

            }
        }

        editMode = false;

        $(this).parent('li').find('.app-todo').show();
        $(this).parent('li').find('.app-check').show();
        $(this).hide();

        DOM.$input.focus();

    });

    // Obsługa zdarzenia wciśnięcia 'enter' na którym jest dodany edytyowany tekst do elementu listu
    DOM.$list.on('keyup', '.app-inputEdit', function(e) {

        if (e.keyCode === ENTER) {

            var todo = $(this).val();
            itemId = $(this).parent('li').prevAll().length;

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

                }
            }

            editMode = false;

            $(this).parent('li').find('.app-todo').show();
            $(this).parent('li').find('.app-check').show();
            $(this).hide();

            DOM.$input.focus();
        }

    });

    // Obsługa zdarzenia kliknięcia na którym jest usuwany element listy
    DOM.$list.on('click', '.app-delete', function(e) {

        var id = $(this).parent('li').prevAll().length;
        todos.splice(id, 1);
        updateLocalStorage();

        $(this).parent('li').remove();

    });

    // Obsługa zdarzenia kliknięcia na którym jest edytyowany element listy
    DOM.$list.on('click', '.app-edit', function(e) {
        e.stopPropagation();

        var todo = $(this).parent('li').find('.app-todo').text();

        DOM.$input.val(todo);
        DOM.$input.focus();
        DOM.$button.text('Edit').removeClass('btn-primary').addClass('btn-success');

        editMode = true;
        itemId = $(this).parent('li').prevAll().length;

    });

    // Obsługa zdarzenia kliknięcia na którym ustawiamy element jako aktywny lub nie aktywny
    DOM.$list.on('click', '.list-group-item', function(e) {

        var id = $(this).prevAll().length;

        $(this).find('.contents').toggleClass('content_decoration');

        if ($(this).find('.app-check').hasClass("glyphicon-unchecked")) {
            $(this).addClass('checkbox_active');
            $(this).find('.app-check').removeClass('glyphicon-unchecked').addClass('glyphicon-check').css('color', '#7dbb00');

            todos[id].checked = true;
        } else {
            $(this).removeClass('checkbox_active');
            $(this).find('.app-check').removeClass('glyphicon-check').addClass('glyphicon-unchecked').css('color', '#595959');

            todos[id].checked = false;
        }

        updateLocalStorage();

    });

    // Obsługa zdarzenia podwójnego kliknięcia na którym wyświetlane jest okno edycji danego elementu listy
    DOM.$list.on('dblclick', '.list-group-item', function(e) {

        var todo = $(this).find('.app-todo').text();

        var $inputEdit = $('<input type="text" class="app-inputEdit inputEdit form-control">');

        $(this).find('.app-todo').hide();
        $(this).append($inputEdit);
        $(this).find('.app-check').hide();
        $inputEdit.focus().val(todo);

        editMode = true;
        itemId = $(this).prevAll().length;

    });

    $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    });

});