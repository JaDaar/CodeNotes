(function () {
    'use strict';
    var controllerId = 'codeNotesCtrl';
    angular.module('codeNotes').controller(controllerId,
        [
            '$scope',
            '$http',
            '$location',
            'uiGridConstants',
            'codeNotesService',
            '$ocModal',
            //'toastr',
            codeNotesCtrl]);

    function codeNotesCtrl($scope, $http, $location, uiGridConstants, codeNotesService, $ocModal) {
        var vm = this;
        vm.data = codeNotesService;
        vm.sort = 0;
        vm.currentSort = '';
        vm.moduleTitle = 'CodeNotation List';
        vm.codenotes = [];
        vm.isActive = false;
        vm.ViewModel = {
            CodeNotationsId: 0,
            NotationName: '',
            NotationDescription: '',
            CodeSnippet: '',
            NotationURL: '',
            UpdateDate: moment().format("MM/DD/YYYY"),
            StatusCode: 'A'
        }
        vm.selectedCodeNotationsId = 0;
        vm.gridOptionsCodeNotes = {};

        vm.gridOptionsCodeNotes =
            {
                columnDefs: [
                    {
                        name: 'CodeNotationsId',
                        visible: false
                    }, {
                        name: 'NotationName',
                        displayName: 'Name',
                        enableCellEdit: true,
                        cellTooltip: 'The programming source code notation name.',
                        width: '20%',
                        cellClass: 'tbone',
                        cellTemplate:
                            '<div class="ui-grid-cell-contents"  ng-click="grid.appScope.vm.setSelectedField(row.entity)">{{COL_FIELD}}</div>'
                    }, {
                        name: 'NotationDescription',
                        displayName: 'Description',
                        enableCellEdit: true,
                        cellTooltip:
                            'A description of what the code notation covers, is in regard to.  A concise description mitigates duplicate code notes.',
                        width: '50%'
                    }, {
                        name: 'NotationURL',
                        displayName: 'Link',
                        enableCellEdit: true,
                        cellTemplate:
                            '<div class="ui-grid-cell-contents" style="text-align:left;"><a href="{{COL_FIELD}}" target="_blank">{{COL_FIELD}}</a></div>',
                        cellTooltip:
                            'For those code notes that have an external URL reference, that information is stored in this field.',
                        width: '20%'
                    }, {
                        name: 'CodeSnippet',
                        displayName: 'Snippet',
                        enableCellEdit: true,
                        cellTooltip: 'The programming source code.',
                        width: '20%',
                        visible: false
                    }, {
                        name: 'StatusCode',
                        visible: false
                    }, {
                        name: 'UpdateDate',
                        visible: false
                    },
                    {
                        name: 'editNote',
                        displayName: '',
                        enableCellEdit: false,
                        enableFiltering: false,
                        enableSorting: false,
                        width: '3%',
                        cellTemplate:
                            '<div class="text-center"><div class="glyphicon glyphicon-edit" style="color: blue; cursor:pointer;" data-ng-click="grid.appScope.vm.editCodeNote(row.entity)"></div></div>'

                    },
                    {
                        name: 'deleteNote',
                        displayName: '',
                        enableCellEdit: false,
                        enableFiltering: false,
                        enableSorting: false,
                        width: '3%',
                        cellTemplate:
                            '<div class="text-center"><div class="glyphicon glyphicon-trash" style="color: #660000; cursor:pointer;" data-ng-click="grid.appScope.vm.deleteCodeNote(row.entity)"></div></div>'

                    }
                ],
                onRegisterApi: function (gridApi) { vm.gridOptionsCodeNotes.gridApi = gridApi; }
            }


        vm.init = function () {
            //var toast = toastr.info('page loaded', 'Information');

            //toastr.refreshTimer(toast, 5000);
            //console.log(toast);
            vm.loadData();
            vm.setupGrid();
        };

        vm.addEditCodeNotesOcModal = function (codeNoteRecord) {
            if (codeNoteRecord !== null) {
                vm.ViewModel.NotationName = codeNoteRecord.NotationName;
                vm.ViewModel.NotationDescription = codeNoteRecord.NotationDescription;
                vm.ViewModel.CodeSnippet = codeNoteRecord.CodeSnippet;
                vm.ViewModel.NotationURL = codeNoteRecord.NotationURL;
                vm.ViewModel.UpdateDate = moment().format("MM/DD/YYYY");
                vm.ViewModel.StatusCode = 'A';

                $ocModal.open({
                    //url: 'app/codenotes/popupViews/editCodesNote.html',
                    template: '<div class="text-center modal-body"><button class="btn btn-danger" oc-modal-close="\'Text from close btn\'">{{ testVar }}</button></div>',
                    //controller:'codeNotesEditCtrl',
                    cls: 'slide-down',
                    onClose: function () {
                        console.log('Just closed !');
                    },
                    init: {
                        testVar: 'Close this or wait 5s'
                    }
                });
            }

        }
        vm.setupGrid = function () {

        }
        vm.loadData = function () {
            vm.codenotes = {};
            vm.ViewModel = {};
            //var dlg = bootbox.dialog({
            //    message: '<div class="text-center"><i class="fa fa-spin fa-spinner"></i> Loading...</div>'
            //});
            //dlg.init(function () {
            //    setTimeout(function () {
            //        dlg.modal('hide');
            //    }, 3000);

            //    vm.data.GetCodeNotes().then(function (data) {
            //        vm.codenotes = data;
            //        vm.gridOptionsCodeNotes.data = vm.codenotes.data;
            //    });
            //});
        }

        vm.addNew = function () {
            vm.showModal2();
        }

        vm.showModal2 = function () {
            $ocModal.open({
                url: 'app/views/codeNotesEdit.html',
                controller: 'codeNotesEditCtrl'
            });
        }

        vm.yes = function (codeNoteRecord) {
            vm.data.DeleteCodeNote(codeNoteRecord).then(function (results) {
                if (results === true) {
                    vm.loadData();
                    vm.gridOptionsCodeNotes.gridApi.core.notifyDataChange(uiGridConstants.dataChange.ALL);
                } else {
                    //toastr.error('An error has occured deleting the record: ');
                }
            });
        };

        vm.no = function () {
            //toastr.info('CodeNote not deleted.');
        };


        vm.deleteCodeNote = function (codeNoteRecord) {
            //toastr.success("<br /><br /><button type='button' id='confirmationRevertYes' class='btn clear'>Yes</button>&nbsp;&nbsp;<button type='button' id='deleteButtonNo' class='btn clear'>No</button>",
            //    'Delete CodeNotation?<br/> <div style="color:#FFCC66;"><i>' + codeNoteRecord.NotationName + '</i></div>',
            //  {
            //      closeButton: false,
            //      allowHtml: true,
            //      onShown: function (toast) {
            //          angular.element(toast.el[0]).find("button")[1].onclick = vm.yes(codeNoteRecord);
            //          angular.element(toast.el[0]).find("button")[0].onclick = vm.no;

            //      },
            //      onTap: function () {
            //          //alert("You Clicked Dialog!!");
            //      }
            //  });
            //bootbox.confirm("Delete CodeNote " + codeNoteRecord.NotationName, function (result) {
            //    if (result === true) {
            //        vm.yes(codeNoteRecord);
            //    } else {
            //        vm.no();
            //    }
            //});
        }

        vm.editCodeNote = function (value) {
            console.log('Edit: ' + value.NotationName);
        }
        vm.setSelectedField = function (value) {
            vm.ViewModel.CodeNotationsId = value.CodeNotationsId;
            vm.ViewModel.NotationName = value.NotationName;
            vm.ViewModel.NotationDescription = value.NotationDescription;
            vm.ViewModel.CodeSnippet = value.CodeSnippet;
            vm.ViewModel.NotationURL = value.NotationURL;
            vm.ViewModel.UpdateDate = moment(value.UpdateDate).format("MM/DD/YYYY");
            vm.ViewModel.StatusCode = 'A';
            console.log(vm.ViewModel);
            angular.copy(vm.ViewModel.CodeNotationsId, vm.selectedCodeNotationsId);
        }

        vm.addEditCodeNotes = function (codeNoteRecord) {
            if (codeNoteRecord !== null) {
                vm.ViewModel.NotationName = codeNoteRecord.NotationName;
                vm.ViewModel.NotationDescription = codeNoteRecord.NotationDescription;
                vm.ViewModel.CodeSnippet = codeNoteRecord.CodeSnippet;
                vm.ViewModel.NotationURL = codeNoteRecord.NotationURL;
                vm.ViewModel.UpdateDate = moment().format("MM/DD/YYYY");
                vm.ViewModel.StatusCode = 'A';
                vm.data.SaveCodeNotes(vm.ViewModel).then(function (results) {
                    if (results === true) {
                        vm.loadData();
                        //toastr.info('Record Saved.');
                    } else {
                        //toastr.error('An error has occured saving the new record: ');
                    }
                });
            }
        };

        vm.openBase = function () {
            $location.path('/list');
        }

        vm.GetStatus = function (data) {
            if (data.StatusCode === 'A')
                vm.isActive = true;
            vm.isActive = false;
        };
    }
}
)();