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

    var _this = this;

    // attach model listeners

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal dodany nowy element i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.itemAdded.attach(function() {

        // Odświeżenie widoku
        _this.render('item added');
    });

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal usunięty element i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.itemRemoved.attach(function() {

        // Odświeżenie widoku
        _this.render();
    });

    // Nasłuchiwanie na Zdarzenie (Event) emitowane przez model,
    // że zostal zaznaczony element i dowiązanie (attach)
    // funkcji na to zdarzenie
    this._model.itemClicked.attach(function() {

        // Odświeżenie widoku
        _this.render();
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
    this._elements.list.on('click', this._selectors.itemText, function() {

        // Widok powiadamia (notify) kontroler, 
        // ze element listy został klinknięty
        _this.listItemClicked.notify();
    });
};

ListView.prototype = {
    render: function() {
        var list, items, key;

        list = this._elements.list;
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
            }

            $item.append($todo);
            $item.append($date);
            $item.append($del);
            list.append($item);

            $(function() {
                $('[data-toggle="tooltip"]').tooltip()
            });

        }
        this._model.setSelectedIndex(-1);

        this._elements.input.val('').focus();
    }
};