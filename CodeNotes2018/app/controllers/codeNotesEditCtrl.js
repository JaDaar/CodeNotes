(function () {
    'use strict';
    var controllerId = 'codeNotesEditCtrl';

    angular.module('codeNotes').controller(controllerId, ['$ocModal', codeNotesEditCtrl]);

    function codeNotesEditCtrl($ocModal) {
        var vm = this;

        vm.data = '';

        vm.sort = 0;

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