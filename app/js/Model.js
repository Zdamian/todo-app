var ListModel = function(items) {
    this._items = items;
    this._selectedIndex = -1;

    // Emit the Event added the item to the View
    this.itemAdded = new Event(this);

    // Emit the Event edited the item to the View
    this.itemEdited = new Event(this);

    // Emit the Event deleted the item to the View
    this.itemRemoved = new Event(this);

    // Emit the Event clicked the item to the View
    this.itemClicked = new Event(this);

    // Emit the Event clicked the item to the View
    this.inputShow = new Event(this);
}

ListModel.prototype = {
    getItems: function() {

        // Return the array of elements
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

        // Push the new item to the items array
        this._items.push({
            text: item,
            done: false,
            dateAdded: date
        });

        // Notify View that the new item has been added
        this.itemAdded.notify({
            item: item // Optional
        });
    },

    showInput: function(index) {

        // Emit the item list index to the View
        this.inputShow.notify({
            index: index 
        });

        // Reset the active item list index
        this.setSelectedIndex(-1);
    },

    EditItem: function(item, index) {

        var editText = item;

        // Assign a new text 
        this._items[index].text = editText;

        // Emit edited the item list to the View
        this.itemEdited.notify({
            item: item // Optional
        });
    },

    removeItemAt: function(index) {
        var item;

        // Delete selected item from items array
        item = this._items[index];
        this._items.splice(index, 1);

        // Emit the item list index to the View
        this.itemRemoved.notify({
            index: index
        });

        // Reset the active item list index
        this.setSelectedIndex(-1);
    },

    doneItem: function() {

        this._items[this._selectedIndex].done = !this._items[this._selectedIndex].done;

        // Emit, that was selected item to the View
        this.itemClicked.notify({
            done: this._items[this._selectedIndex].done
        });
    },

    getSelectedIndex: function() {

        // Return the active list item index
        return this._selectedIndex;
    },

    setSelectedIndex: function(index) {

        // Set the active list item
        this._selectedIndex = index;
    }
};