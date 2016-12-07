var ListModel = function(items) {
    this._items = items;
    this._selectedIndex = -1;

    // The event (Event) emitting to the view, that was added the new element
    this.itemAdded = new Event(this);

    // The event (Event) emitting to the view, that was edited the new element
    this.itemEdited = new Event(this);

    // The event (Event) emitting to the view, that was deleted the element
    this.itemRemoved = new Event(this);

    // The event (Event) emitting to the view, that was clicked the element
    this.itemClicked = new Event(this);

    // The event (Event) emitting to the view, that was clicked the element
    this.inputShow = new Event(this);
}

ListModel.prototype = {
    getItems: function() {

        // Return an array of elements
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

        // Delivering the new element to the array of items
        this._items.push({
            text: item,
            done: false,
            dateAdded: date
        });

        // Sending notifications, that was added the new element
        this.itemAdded.notify({
            item: item // Optional
        });
    },

    showInput: function(index) {

        // Sending the index of item of the list to the View
        this.inputShow.notify({
            index: index 
        });

        // Resetting the active item of list
        this.setSelectedIndex(-1);
    },

    EditItem: function(item, index) {

        var editText = item;

        // Ascription a new text 
        this._items[index].text = editText;

        // Sending notifications to the View, that was added
        // edited item of list
        this.itemEdited.notify({
            item: item // Optional
        });
    },

    removeItemAt: function(index) {
        var item;

        // Deleting the selected item from an array of items
        item = this._items[index];
        this._items.splice(index, 1);

        // Sending the index of item of the list to the View
        this.itemRemoved.notify({
            index: index
        });

        // Resetting the active item of list
        this.setSelectedIndex(-1);
    },

    doneItem: function() {

        this._items[this._selectedIndex].done = !this._items[this._selectedIndex].done;

        // Sending notifications to the View, that was selected item 
        this.itemClicked.notify({
            done: this._items[this._selectedIndex].done
        });
    },

    getSelectedIndex: function() {

        // Return the index of the active element
        return this._selectedIndex;
    },

    setSelectedIndex: function(index) {

        // Setting the index of the active element
        this._selectedIndex = index;
    }
};