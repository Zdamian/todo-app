var ListModel = function(items) {
    this._items = items;
    this._selectedIndex = -1;

    // Zdarzenie (Event) emitowany do Widoku, że został dodany nowy element
    this.itemAdded = new Event(this);

    // Zdarzenie (Event) emitowany do Widoku, że został usunięty element
    this.itemRemoved = new Event(this);

    // Zdarzenie (Event) emitowany do Widoku, że został kliknięty element
    this.itemClicked = new Event(this);
}

ListModel.prototype = {
    getItems: function() {

        // Zwraca tablicę elementów
        return [].concat(this._items);
    },

    addItem: function(item) {

        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();
        var hour = today.getHours();
        var minute = today.getMinutes();

        if (hour < 10) hour = "0" + hour;

        if (minute < 10) minute = "0" + minute;

        var date = 'Task added: ' + day + "/" + month + "/" + year + " | " + hour + ":" + minute;

        // Dostawienie nowego elementu do tablicy items
        this._items.push({
            text: item,
            done: false,
            dateAdded: date
        });

        // Wysłanie powiadomienia do Widoku, że został dodany nowy element
        this.itemAdded.notify({
            item: item // Opcjonalne
        });
    },

    removeItemAt: function(index) {
        // var item;

        // Usunięcie wybranego elementu z tablicy items
        // item = this._items[index];
        // this._items.splice(index, 1);

        // Wysłanie powiadomienia do Widoku, że zosatł usunięty element
        this.itemRemoved.notify({
            index: index // Opcjonalne
        });

        // Zerowanie ektywnego indeksu listy
        this.setSelectedIndex(-1);
    },

    doneItem: function() {

        this._items[this._selectedIndex].done = !this._items[this._selectedIndex].done;

        // Wysłanie powiadomienia do Widoku, że element został zaznaczony 
        this.itemClicked.notify({
            done: this._items[this._selectedIndex].done
        });
    },

    getSelectedIndex: function() {

        // Zwrócenie aktywnego indkesu elementu listy
        return this._selectedIndex;
    },

    setSelectedIndex: function(index) {

        // Ustawienie aktywnego indeksu elementu listy
        this._selectedIndex = index;
    }
};