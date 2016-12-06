var ListView = function(model, elements, selectors) {
    this._model = model;
    this._elements = elements;
    this._selectors = selectors;

    // Event powiadamiający kontroler, gdy kursor
    // znalazł się na elemencie listy (hover)
    this.listModified = new Event(this);

    // Event powiadamiający kontroler, gdy został kliknięty element addButton
    this.addButtonClicked = new Event(this);

    // Event powiadamiający kontroler,
    // gdy został wciśnięty klawisz enter na elemencie input
    this.inputEnterClicked = new Event(this);

    // Event powiadamiający kontroler, gdy został kliknięty element delButton
    this.delButtonClicked = new Event(this);

    // Event powiadamiający kontroler, gdy został kliknięty element listy
    this.listItemClicked = new Event(this);

    // Event powiadamiający kontroler, 
    // gdy został podwójnie kliknięty element listy
    this.listItemDblclicked = new Event(this);

    // Event powiadamiający kontroler,
    // gdy został wciśnięty klawisz enter na elemencie input
    this.inputEditEnterClicked = new Event(this);

    var _this = this;

    // attach model listeners

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal dodany nowy element i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.itemAdded.attach(function() {

        // Odświeżenie widoku
        _this.render('Item added!');
    });

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal usunięty element i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.itemRemoved.attach(function(sender, args) {

        // Odświeżenie widoku
        _this.removedItem('Item removed!', args.index);
    });

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal edytowany element i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.inputShow.attach(function(sender, args) {

        // Odświeżenie widoku
        _this.inputShow(args.index);
    });

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal zaznaczony element i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.itemClicked.attach(function(sender, args) {

        var message = args.done ? 'Task completed!' : 'Task uncompleted!';
        // Odświeżenie widoku
        _this.render(message);
    });

    // attach listeners to HTML controls

    // Przechwycenie zdarzenia najchenia kursora na element listy (hover)
    this._elements.list.on('mouseover', this._selectors.listItem, function() {
        var _self = this;

        // Widok powiadamia (notify) kontroler,
        // że kursor zanalazł się na elemencie listy i w powiadomieniu wysyła
        // indeks tego elementu
        _this.listModified.notify({
            index: $(_self).prevAll().length
        });
    });

    // Przechwycenie zdarzenia kliknięcie na element addButton
    this._elements.addButton.on('click', function() {

        // Widok powiadamia (notify) kontroler,
        // że addButton został kliknięty i w powiadomieniu wysyła
        // wartość input
        _this.addButtonClicked.notify({
            item: _this._elements.input.val().trim()
        });
    });

    // Przechwycenie zdarzenia wciśnięcia klawisza enter na elemencie input
    this._elements.input.on('keyup', function(e) {
        if (e.keyCode === 13) {

            // Widok powiadamia (notify) kontroler,
            // że klawisz enter zastał wciśnięty i w powiadomieniu wysyła
            // wartość elementu input
            _this.inputEnterClicked.notify({
                item: _this._elements.input.val().trim()
            });
        }
    });

    // Przechwycenie zdarzenia kliknięcie na element delButton
    this._elements.list.on('click', this._selectors.deleteButton, function() {

        // Widok powiadamia (notify) kontroler, 
        // ze delButton został klinknięty
        _this.delButtonClicked.notify();
    });

    // Przechwycenie zdarzenia kliknięcie na element listy
    this._elements.list.on('click', this._selectors.itemText, function(e) {
        e.stopPropagation();
        // Widok powiadamia (notify) kontroler, 
        // ze element listy został klinknięty
        _this.listItemClicked.notify();
    });

    // Przechwycenie zdarzenia podwójnego kliknięcie na element listy
    this._elements.list.on('dblclick', this._selectors.itemText, function(e) {
        e.stopPropagation();

        // Widok powiadamia (notify) kontroler, 
        // ze element listy został podwójnie klinknięty
        _this.listItemDblclicked.notify();
    });

    // Przechwycenie zdarzenia wciśnięcia klawisza enter na elemncie input
    this._elements.list.on('keyup', this._selectors.editInput, function(e) {
        if (e.keyCode === 13) {

            // Widok powiadamia (notify) kontroler,
            // że klawisz enter zastał wciśnięty i w powiadomieniu wysyła
            // wartość elementu input
            _this.inputEditEnterClicked.notify({
                item: _this._elements.list.find(_this._selectors.editInput).val().trim()
            });
        }
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