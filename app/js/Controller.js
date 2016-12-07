var ListController = function(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;


    // Listening (interception) the event (Event) 
    // mouseover on the element of list (hover)
    this._view.listModified.attach(function(sender, args) {

        // Calling the method Controller on captured event with the argument
        // issued by this event (listModified)
        _this.updateSelected(args.index);
    });

    // Listening (interception) the event (Event) 
    // clicked addButton
    this._view.addButtonClicked.attach(function(sender, args) {

        // Calling the method Controller on captured event with the argument
        // issued by this event (addButtonClicked)
        _this.addItem(args.item);
    });

    // Listening (interception) the event (Event) 
    // clicked enter key on the element input
    this._view.inputEnterClicked.attach(function(sender, args) {

        // Calling the method Controller on captured event with the argument
        // issued by this event (inputEnterClicked)
        _this.addItem(args.item);
    });

    // Listening (interception) the event (Event) 
    // kclicked delButton
    this._view.delButtonClicked.attach(function() {

        // Calling the method Controller on captured event (delButtonClicked)
        _this.delItem();
    });

    // Listening (interception) the event (Event) 
    // double clicked the element of list
    this._view.listItemDblclicked.attach(function() {

        // Calling the method Controller on captured event (listItemDblclick)
        _this.showInput();
    });

    // Listening (interception) the event (Event) 
    // clicked enter key on the element input
    this._view.inputEditEnterClicked.attach(function(sender, args) {

        // Calling the method Controller on captured event with the argument
        // issued by this event (inputEditEnterClicked)
        _this.EditItem(args.item);
    });

    // Listening (interception) the event (Event) 
    // clicked the element of list
    this._view.listItemClicked.attach(function() {

        // Calling the method Controller on captured event (listItemClicked)
        _this.doneItem();
    });

    // Listening (interception) the event (Event) 
    // lost 'focus' on the element input
    this._view.inputEditFocusLost.attach(function(sender, args) {

        // Calling the method Controller on captured event with the argument
        // issued by this event (inputEditFocusLost)
        _this.EditItem(args.item);
    });

}

ListController.prototype = {
    addItem: function(item) {

        if (item) {

            // Calling the method of Model addItem and delivering as an argument
            // the value of input
            this._model.addItem(item);
        }
    },

    delItem: function() {
        var index;

        // The assignment to a variable active list item
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Calling the method of Model removeItemAt and delivering as an argument
            // the index of the element
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    showInput: function() {
        var index;

        // The assignment to a variable active list item
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Calling the method of Model showInput and delivering as an argument
            // the index of the element
            this._model.showInput(index);
        }
    },

    EditItem: function(item) {
        var index;

        // The assignment to a variable active list item
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            if (item) {

                // Calling the method of Model EditItem and delivering as an argument
                // the index of the element and the value of input
                this._model.EditItem(item, index);
            }
        }
    },

    doneItem: function() {

        // Calling the method of Model doneItemAt and delivering as an argument
        // the index of the element
        this._model.doneItem();
    },

    updateSelected: function(index) {

        // Calling the method of Model setSelectedIndex and delivering as an argument
        // the index of the element
        this._model.setSelectedIndex(index);
    }
};