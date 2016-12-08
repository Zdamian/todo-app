var ListView = function(model, elements, selectors) {
    this._model = model;
    this._elements = elements;
    this._selectors = selectors;

    // Emit the Event, when the cursor
    // was on the item to the Controller
    this.listModified = new Event(this);

    // Emit the Event, when was clicked
    // the item to the Controller
    this.addButtonClicked = new Event(this);

    // Emit the Event, when was clicked 'Enter'
    // on the item to the Controller
    this.inputEnterClicked = new Event(this);

    // Emit the Event, when was clicked 
    // the item to the Controller
    this.delButtonClicked = new Event(this);

    // Emit the Event, when was clicked
    // the item to the Controller
    this.listItemClicked = new Event(this);

    // Emit the Event, when was double clicked
    // the item to the Controller
    this.listItemDblclicked = new Event(this);

    // Emit the Event, when was clicked
    // the item to the Controller
    this.inputEditEnterClicked = new Event(this);

    // Emit the Event, when was blur
    // on the item to the Controller
    this.inputEditFocusLost = new Event(this);

    var _this = this,
        DELAY = 300,
        clicks = 0,
        timer = null;

    // attach model listeners

    // Emitted the event by Model, that was added the new element and attach
    // function for this event
    this._model.itemAdded.attach(function() {

        // Refresh view
        _this.render('Item added!');
    });

    // Emitted the event by Model, that was edited the element and attach
    // function for this event
    this._model.itemEdited.attach(function() {

        // Refresh view
        _this.render('Item edited!');
    });

    // Emitted the event by Model, that was deleted the element and attach
    // function for this event
    this._model.itemRemoved.attach(function(sender, args) {

        // Refresh view
        _this.removedItem('Item removed!', args.index);
    });

    // Emitted the event by Model, that was edited the element and attach
    // function for this event
    this._model.inputShow.attach(function(sender, args) {

        // Refresh view
        _this.inputShow(args.index);
    });

    // Emitted the event by Model, that was selected the element and attach
    // function for this event
    this._model.itemClicked.attach(function(sender, args) {

        var message = args.done ? 'Task completed!' : 'Task uncompleted!';

        // Refresh view
        _this.render(message);
    });

    // attach listeners to HTML controls

    // Item list mouseover event handler
    this._elements.list.on('mouseover', this._selectors.listItem, function() {
        var _self = this;

        // Notify Controller, that cursor was on the element of list
        // and in the notification send the item list index
        _this.listModified.notify({
            index: $(_self).prevAll().length
        });
    });

    // Item list clicked addButton event handler
    this._elements.addButton.on('click', function() {

        // Notify Controller, that addButton was clicked
        // and in the notification send the value of input
        _this.addButtonClicked.notify({
            item: _this._elements.input.val().trim()
        });
    });

    // Item list clicked enter key event handler
    this._elements.input.on('keyup', function(e) {
        if (e.keyCode === 13) {

            // Notify Controller, that enter key was clicked
            // and in the notification sending the value of input
            _this.inputEnterClicked.notify({
                item: _this._elements.input.val().trim()
            });
        }
    });

    // Item list clicked delButton event handler
    this._elements.list.on('click', this._selectors.deleteButton, function() {

        // Notify Controller, 
        // that delButton was clicked
        _this.delButtonClicked.notify();
    });

    // Item list clicked event handler
    this._elements.list.on('click', this._selectors.itemText, function(e) {

        clicks++;

        if (clicks === 1) {

            timer = setTimeout(function() {
                _this.listItemClicked.notify();
                clicks = 0;
            }, DELAY);
        } else {

            clearTimeout(timer);
            clicks = 0;
        }

        // Item list double clicked event handler
    }).on('dblclick', this._selectors.itemText, function(e) {
        e.preventDefault();

        // Notify Controller, 
        // that was double clicked the list item
        _this.listItemDblclicked.notify();
    });

    // Item list clicked enter key event handler
    this._elements.list.on('keyup', this._selectors.editInput, function(e) {
        if (e.keyCode === 13) {

            // Notify Controller, that enter key was clicked
            // and in the notification send the value of input
            _this.inputEditEnterClicked.notify({
                item: _this._elements.list.find(_this._selectors.editInput).val().trim()
            });
        }
    });

    // Item list blur event handler
    this._elements.list.on('blur', this._selectors.editInput, function(e) {

        // Notify Controller, that was blur and
        // in the notification send the value of input
        _this.inputEditFocusLost.notify({
            item: _this._elements.list.find(_this._selectors.editInput).val().trim()
        });
    });

};

ListView.prototype = {
    render: function(notice) {
        var list, items, key, alert;

        list = this._elements.list;
        alert = this._elements.message;
        list.html('');

        items = this._model.getItems();
        for (key in items) {

            var $item = $('<li class="list-group-item"></li>');
            var $todo = $('<span class="app-item item-text"></span>');
            var $date = $('<span class="app-date date-added glyphicon glyphicon-time" data-toggle="tooltip" data-placement="top" title="' + items[key].dateAdded + '"></span>');
            var $del = $('<span class="app-del glyphicon glyphicon-trash delete" data-toggle="tooltip" data-placement="top" title="Delete"></span>');

            $todo.text(items[key].text);

            if (items[key].done) {
                $todo.addClass('done');
                $item.addClass('completed');
            }

            $item.append($todo);
            $item.append($date);
            $item.append($del);
            list.append($item);
            alert.text(notice).addClass('active');

            $(function() {
                $('[data-toggle="tooltip"]').tooltip()
            });

        }
        this._model.setSelectedIndex(-1);

        this._elements.input.val('').focus();

        setTimeout(function() {
            alert.removeClass('active');
        }, 1500);
    },

    removedItem: function(notice, index) {
        var alert;

        list = this._elements.list;
        alert = this._elements.message;

        var itemDel = list.find(this._selectors.listItem + ':eq(' + index + ')');

        itemDel.addClass('removing');
        alert.text(notice).addClass('active');

        setTimeout(function() {
            alert.removeClass('active');
        }, 1500);

        setTimeout(function() {
            itemDel.remove();
        }, 300);
    },

    inputShow: function(index) {

        list = this._elements.list;

        var $editInput = $('<input type="text"class="app-edit-input"/>');
        var $itemDate = list.find(this._selectors.itemDateAdded + ':eq(' + index + ')');
        var $itemEdit = list.find(this._selectors.itemText + ':eq(' + index + ')');
        var itemEditText = $itemEdit.text();

        $itemDate.hide();
        $editInput.val(itemEditText);
        $itemEdit.replaceWith($editInput);

        this._elements.list.find(this._selectors.editInput).focus();
    },
};