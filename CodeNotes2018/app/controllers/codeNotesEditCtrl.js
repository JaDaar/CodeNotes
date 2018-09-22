(function () {
    'use strict';
    var controllerId = 'codeNotesEditCtrl';

    angular.module('codeNotes').controller(controllerId, ['$ocModal', '$scope','$rootScope', 'codeNotesService',codeNotesEditCtrl]);

    function codeNotesEditCtrl($ocModal, $scope, $rootScope,codeNotesService) {
        var vm = this;

        vm.data = '';
        vm.Action = 'Create';
        vm.sort = 0;
        vm.VModel = {};

        $scope.$watch('$scope.CodeNotationsId',
            function () {
                if ($scope.CodeNotationsId > 0 && ($scope.NotationName !== null || $scope.NotationName!==undefined)) {
                    vm.VModel = {
                        CodeNotationsId: $scope.CodeNotationsId,
                        NotationName: $scope.NotationName,
                        NotationDescription: $scope.NotationDescription,
                        CodeSnippet: $scope.CodeSnippet,
                        NotationURL: $scope.NotationURL,
                        UpdateDate: moment().format("MM/DD/YYYY"),
                        StatusCode: 'A',
                        Action: $scope.Action
                    }
                    vm.CodeNotationsId =vm.VModel.CodeNotationsId;
                    vm.NotationName =vm.VModel.NotationName !== null &&vm.VModel.NotationName !== undefined ?vm.VModel.NotationName : '';
                    vm.NotationDescription =vm.VModel.NotationDescription !== null &&vm.VModel.NotationDescription !== undefined ?vm.VModel.NotationDescription:'';
                    vm.CodeSnippet =vm.VModel.CodeSnippet !== null &&vm.VModel.CodeSnippet !== undefined ?vm.VModel.CodeSnippet : '';
                    vm.NotationURL = vm.VModel.NotationURL !== null && vm.VModel.NotationURL !== undefined ? vm.VModel.NotationURL : '';
                    vm.Action = vm.VModel.Action;
                }
            });
        vm.init = function () {
            
        }

        $rootScope.$on('routePage', function (event, data) {
            console.log(data);
        });
        $rootScope.$on('rootScope:broadcast', function (event, data) {
            console.log('OBJ2: ' + data.NotationName); // 'Broadcast!'
        });

        vm.save = function (close) {
            vm.SaveChanges("Saved successfully", false);
        }

        vm.saveClose = function (codeNoteValue) {
            console.log(codeNoteValue.CodeNotationsId);
            codeNoteValue.StatusCode = 'A';
            codeNotesService.UpdateCodeNote(codeNoteValue).then(function() {

            });
            vm.SaveChanges("Saved successfully", true);
        }

        vm.SaveChanges = function (msg, action) {

            if (action === true)
                $ocModal.close();
        }

        vm.cancel = function () {
            $ocModal.close();
        }
    };
})();