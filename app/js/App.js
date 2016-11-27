$(function () {
    var model = new ListModel(['PHP', 'JavaScript']),
        view = new ListView(model, {
            'list': $('.app-list'),
            'addButton': $('.app-button'),
            'input': $('.app-input')
        }, {
          'item': 'li',
          'del': '.app-del'
        }),
        controller = new ListController(model, view);

    view.render();
});