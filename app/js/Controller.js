var ListController = function(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;


    // Item list mouseover event handler
    this._view.listModified.attach(function(sender, args) {

        // Call the Controller method for this event handler with the argument
        // emitted by this event (listModified)
        _this.updateSelected(args.index);
    });

    // Item list clicked addButton event handler
    this._view.addButtonClicked.attach(function(sender, args) {

        // Call the Controller method for this event handler with the argument
        // emitted by this event (addButtonClicked)
        _this.addItem(args.item);
    });

    // Item list clicked enter key event handler
    this._view.inputEnterClicked.attach(function(sender, args) {

        // Call the Controller method for this event handler with the argument
        // emitted by this event (inputEnterClicked)
        _this.addItem(args.item);
    });

    // Item list clicked delButton event handler
    this._view.delButtonClicked.attach(function() {

        // Call the Controller method for this event handler (delButtonClicked)
        _this.delItem();
    });

    // Item list double clicked event handler
    this._view.listItemDblclicked.attach(function() {

        // Call the Controller method for this event handler (listItemDblclick)
        _this.showInput();
    });

    // Item list clicked enter key event handler
    this._view.inputEditEnterClicked.attach(function(sender, args) {

        // Call the Controller method for this event handler with the argument
        // emitted by this event (inputEditEnterClicked)
        _this.EditItem(args.item);
    });

    // Item list clicked event handler
    this._view.listItemClicked.attach(function() {

        // Call the Controller method for this event handler (listItemClicked)
        _this.doneItem();
    });

    // Item list blur event handler
    this._view.inputEditFocusLost.attach(function(sender, args) {

        // Call the Controller method for this event handler with the argument
        // emitted by this event (inputEditFocusLost)
        _this.EditItem(args.item);
    });

}

ListController.prototype = {
    addItem: function(item) {

        if (item) {

            // Call the Model method addItem and send
            // the value of input
            this._model.addItem(item);
        }
    },

    delItem: function() {
        var index;

        // Get and store the active list item index
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Call the Model method removeItemAt and dsend
            // the item list index
            this._model.removeItemAt(index);
        }
    },

    showInput: function() {
        var index;

        // Get and store the active list item index
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Call the Model method showInput and send
            // the item list index
            this._model.showInput(index);
        }
    },

    EditItem: function(item) {
        var index;

        // Get and store the active list item index
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            if (item) {

                // Call the Model method EditItem and send
                // the item list index and the value of input
                this._model.EditItem(item, index);
            }
        }
    },

    doneItem: function() {

        // Call the Model method doneItemAt and send
        // the item list index
        this._model.doneItem();
    },

    updateSelected: function(index) {

        // Call the Model method setSelectedIndex and send
        // the item list index
        this._model.setSelectedIndex(index);
    }
};