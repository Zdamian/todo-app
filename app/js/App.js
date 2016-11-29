$(function () {
    var model = new ListModel(['PHP', 'JavaScript']),
        view = new ListView(model, {
            'list': $('.app-list'),
            'addButton': $('.app-button'),
            'input': $('.app-input')
        }, {
          'listItem': 'li',
          'deleteButton': '.app-del',
          'itemText': '.app-item'
        }),
        controller = new ListController(model, view);

    view.render();
});