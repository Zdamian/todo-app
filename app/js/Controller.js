var ListController = function(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;


    // Listening (interception) the event (Event) 
    // mouseover on the element of list (hover)
    this._view.listModified.attach(function(sender, args) {

        // Elicitation the method Controller on intercepted event with the argument
        // emitted by this event (listModified)
        _this.updateSelected(args.index);
    });

    // Listening (interception) the event (Event) 
    // clicked addButton
    this._view.addButtonClicked.attach(function(sender, args) {

        // Elicitation the method Controller on intercepted event with the argument
        // emitted by this event (addButtonClicked)
        _this.addItem(args.item);
    });

    // Listening (interception) the event (Event) 
    // clicked enter key on the element input
    this._view.inputEnterClicked.attach(function(sender, args) {

        // Elicitation the method Controller on intercepted event with the argument
        // emitted by this event (inputEnterClicked)
        _this.addItem(args.item);
    });

    // Listening (interception) the event (Event) 
    // clicked delButton
    this._view.delButtonClicked.attach(function() {

        // Elicitation the method Controller on intercepted event (delButtonClicked)
        _this.delItem();
    });

    // Listening (interception) the event (Event) 
    // double clicked the element of list
    this._view.listItemDblclicked.attach(function() {

        // Elicitation the method Controller on intercepted event (listItemDblclick)
        _this.showInput();
    });

    // Listening (interception) the event (Event) 
    // clicked enter key on the element input
    this._view.inputEditEnterClicked.attach(function(sender, args) {

        // Elicitation the method Controller on intercepted event with the argument
        // emitted by this event (inputEditEnterClicked)
        _this.EditItem(args.item);
    });

    // Listening (interception) the event (Event) 
    // clicked the element of list
    this._view.listItemClicked.attach(function() {

        // Elicitation the method Controller on intercepted event (listItemClicked)
        _this.doneItem();
    });

    // Listening (interception) the event (Event) 
    // lost 'focus' on the element input
    this._view.inputEditFocusLost.attach(function(sender, args) {

        // Elicitation the method Controller on intercepted event with the argument
        // emitted by this event (inputEditFocusLost)
        _this.EditItem(args.item);
    });

}

ListController.prototype = {
    addItem: function(item) {

        if (item) {

            // Elicitation the method of Model addItem and delivering as an argument
            // the value of input
            this._model.addItem(item);
        }
    },

    delItem: function() {
        var index;

        // The ascription to a variable active item of list
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Elicitation the method of Model removeItemAt and delivering as an argument
            // the index of the element
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    showInput: function() {
        var index;

        // The ascription to a variable active item of list
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Elicitation the method of Model showInput and delivering as an argument
            // the index of the element
            this._model.showInput(index);
        }
    },

    EditItem: function(item) {
        var index;

        // The ascription to a variable active item of list
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            if (item) {

                // Elicitation the method of Model EditItem and delivering as an argument
                // the index of the element and the value of input
                this._model.EditItem(item, index);
            }
        }
    },

    doneItem: function() {

        // Elicitation the method of Model doneItemAt and delivering as an argument
        // the index of the element
        this._model.doneItem();
    },

    updateSelected: function(index) {

        // Elicitation the method of Model setSelectedIndex and delivering as an argument
        // the index of the element
        this._model.setSelectedIndex(index);
    }
};