(function () {
    'use strict';
    var controllerId = 'codeNotesEditCtrl';

    angular.module('codeNotes').controller(controllerId, ['$ocModal', '$scope',codeNotesEditCtrl]);

    function codeNotesEditCtrl($ocModal, $scope) {
        var vm = this;

        vm.data = '';

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
                        StatusCode: 'A'
                    }
                    vm.CodeNotationsId =vm.VModel.CodeNotationsId;
                    vm.NotationName =vm.VModel.NotationName !== null &&vm.VModel.NotationName !== undefined ?vm.VModel.NotationName : '';
                    vm.NotationDescription =vm.VModel.NotationDescription !== null &&vm.VModel.NotationDescription !== undefined ?vm.VModel.NotationDescription:'';
                    vm.CodeSnippet =vm.VModel.CodeSnippet !== null &&vm.VModel.CodeSnippet !== undefined ?vm.VModel.CodeSnippet : '';
                    vm.NotationURL =vm.VModel.NotationURL !== null &&vm.VModel.NotationURL !== undefined ?vm.VModel.NotationURL : '';
                }
            });
        vm.init = function () {
            
        }

        vm.save = function (close) {
            vm.SaveChanges("Saved successfully", false);
        }

        vm.saveClose = function () {
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