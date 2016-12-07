var ListController = function(model, view) {
    this._model = model;
    this._view = view;

    var _this = this;


    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // najachenia kursora myszy na element listy (hover)
    this._view.listModified.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (listModified)
        _this.updateSelected(args.index);
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // kliknięcia przycisku addButton
    this._view.addButtonClicked.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (addButtonClicked)
        _this.addItem(args.item);
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // wciśnięcia klawisza enter na elemencie input
    this._view.inputEnterClicked.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (inputEnterClicked)
        _this.addItem(args.item);
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // kliknięcia przycisku delButton
    this._view.delButtonClicked.attach(function() {

        // Wywołanie metody Kontrolera
        // na przechwycone zdarzenie (delButtonClicked)
        _this.delItem();
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // podwójnego kliknięcia elementu listy
    this._view.listItemDblclicked.attach(function() {

        // Wywołanie metody Kontrolera
        // na przechwycone zdarzenie (listItemDblclick)
        _this.showInput();
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // wciśnięcia klawisza enter na elemencie input
    this._view.inputEditEnterClicked.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (inputEditEnterClicked)
        _this.EditItem(args.item);
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // kliknięcia elementu listy
    this._view.listItemClicked.attach(function() {

        // Wywołanie metody Kontrolera
        // na przechwycone zdarzenie (listItemClicked)
        _this.doneItem();
    });

    // Nasłuchiwanie (przechwycenie) zdarzenia (Event) 
    // utraty 'focus' na elemencie input
    this._view.inputEditFocusLost.attach(function(sender, args) {

        // Wywołanie metody Kontrolera na przechwycone zdarzenie z argumentem
        // wemitowanym przez to zdarzenie (inputEditFocusLost)
        _this.EditItem(args.item);
    });

}

ListController.prototype = {
    addItem: function(item) {

        if (item) {

            // Wywołanie metody Modelu addItem i przekazanie jako argument
            // przechwyconej przez Widok wartości inputa
            this._model.addItem(item);
        }
    },

    delItem: function() {
        var index;

        // Przypisanie do zmiennej aktywnego elementu listy
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Wywołanie metody Modelu removeItemAt i przekazanie
            // jako argument indeks elementu
            this._model.removeItemAt(this._model.getSelectedIndex());
        }
    },

    showInput: function() {
        var index;

        // Przypisanie do zmiennej aktywnego elementu listy
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            // Wywołanie metody Modelu showInput i przekazanie
            // jako argument indeks elementu
            this._model.showInput(index);
        }
    },

    EditItem: function(item) {
        var index;

        // Przypisanie do zmiennej aktywnego elementu listy
        index = this._model.getSelectedIndex();
        if (index !== -1) {

            if (item) {

                // Wywołanie metody Modelu EditItem i przekazanie jako argument
                // przechwyconej przez Widok wartości inputa i indeks elementu listy
                this._model.EditItem(item, index);
            }
        }
    },

    doneItem: function() {

        // Wywołanie metody Modelu doneItemAt i przekazanie
        // jako argument indeks elementu
        this._model.doneItem();
    },

    updateSelected: function(index) {

        // Wywołanie metody Modelu setSelectedIndex i przekazanie
        // jako argument indeks elementu listy na jakim był hover
        this._model.setSelectedIndex(index);
    }
};