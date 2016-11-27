var ListView = function (model, elements, selectors) {
    this._model = model;
    this._elements = elements;
    this._selectors = selectors;

    this.listModified = new Event(this);
    this.addButtonClicked = new Event(this);
    this.delButtonClicked = new Event(this);

    var _this = this;

    // attach model listeners
    this._model.itemAdded.attach(function () {
        _this.render();
    });
    this._model.itemRemoved.attach(function () {
        _this.render();
    });

    // attach listeners to HTML controls
    this._elements.list.on('mouseover', this._selectors.item, function () {
        var _self = this;
        _this.listModified.notify({
            index: $(_self).prevAll().length
        });
    });
    this._elements.addButton.on('click', function () {
        _this.addButtonClicked.notify({
            item: _this._elements.input.val().trim()
        });
    });
    this._elements.input.on('keyup', function (e) {
        if (e.keyCode === 13) {
            _this.addButtonClicked.notify({
                item: _this._elements.input.val().trim()
            });
        }
    });
    this._elements.list.on('click', this._selectors.del, function () {
        _this.delButtonClicked.notify();
    });
};

ListView.prototype = {
    render: function () {
        var list, items, key;

        list = this._elements.list;
        list.html('');

        items = this._model.getItems();
        for (key in items) {
            list.append($('<li>' + items[key] + '<i class="app-del"> X </i></li>'));
        }
        this._model.setSelectedIndex(-1);

        this._elements.input.val('').focus();
    }
};
