$(function() {

    var DOM = {
        $input: $('.app-input'),
        $list: $('.app-list'),
        $button: $('.app-add'),
    };

    var ENTER = 13;
    var editMode = false;
    var itemId;

    // Funkcja dodawająca nowy element listy na wciśnięcie klawisza 'enter'
    DOM.$input.on('keyup', function(e) {

        if (e.keyCode === ENTER) {

            var todo = DOM.$input.val();

            if (editMode) {

                if (todo.trim()) {
                    DOM.$list.find('li:eq(' + itemId + ')').find('.app-todo').text(todo);
                }

            } else {

                if (todo.trim()) {

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
            }

        } else {

            if (todo.trim()) {

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
            $(this).parents('li').addClass('checkbox_active');

        } else {
            $(this).parents('li').removeClass('checkbox_active');

        }
        
    });

});