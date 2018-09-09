var app = angular.module('codeNotes',
    [
        'ngRoute',
        //'toastr',
        'ui.grid',
        'ui.grid.pinning',
        'ui.grid.edit',
        'ui.grid.cellNav',
        'ui.grid.treeView',
        'ui.grid.selection',
        'ui.grid.resizeColumns',
        'oc.modal'
    ]);

app.config([
    '$routeProvider', function ($routeProvider) {

        $routeProvider.when('/list',
            {
                templateUrl: 'app/views/codeNotes.html',
                controller: 'codeNotesCtrl'
            }).otherwise({
                redirectTo: '/list'
            });

    }
])