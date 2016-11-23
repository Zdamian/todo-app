$(function() {

	var DOM = {
		$input: $('.app-input'),
		$list: $('.app-list'),
		$button: $('.app-add'),
	};

	var ENTER = 13;
	var editMode = false;
	var itemId;

	DOM.$input.on('keyup', function(e) {

		if (e.keyCode === ENTER) {

			var todo = DOM.$input.val();

			if (editMode) {

				if (todo.trim()) {
					DOM.$list.find('li:eq(' + itemId + ')').find('.app-todo').text(todo);
				}

			} else {

				if (todo.trim()) {

					var $item = $('<li class="list-group-item"></li>');
					var $todo = $('<span class="app-todo"></span>');
					var $edit = $('<span class="app-edit glyphicon glyphicon-pencil"></span>');
					var $del = $('<span class="app-delete glyphicon glyphicon-trash"></span>');

					$todo.text(todo);
					$item.append($todo);
					$item.append($del);
					$item.append($edit);

					DOM.$list.append($item);
				}
			}

			editMode = false;
			DOM.$input.val('');
			DOM.$input.focus();
		}

	});

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

				var $item = $('<li class="list-group-item"></li>');
				var $todo = $('<span class="app-todo"></span>');
				var $edit = $('<span class="app-edit glyphicon glyphicon-pencil"></span>');
				var $del = $('<span class="app-delete glyphicon glyphicon-trash"></span>');

				$todo.text(todo);

				$item.append($todo);
				$item.append($del);
				$item.append($edit);

				DOM.$list.append($item);

			}
		}

		editMode = false;
		DOM.$input.val('');
		DOM.$input.focus();

	});

	DOM.$list.on('click', '.app-delete', function(e) {

		$(this).parent('li').remove();

	});

	DOM.$list.on('click', '.app-edit', function(e) {

		var todo = $(this).parent('li').find('.app-todo').text();

		DOM.$input.val(todo);
		DOM.$input.focus();

		editMode = true;
		itemId = $(this).parent('li').prevAll().length;

	});

});