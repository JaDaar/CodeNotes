app.factory("codeNotesService", ["$http", "$q",
    function ($http, $q) {
        var getCodeNotes = function () {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/api/codenote'
            }).then(function (dataResponse) {
                deferred.resolve(dataResponse);
            }, function () {
                alert("error");
                deferred.reject();
            });
            return deferred.promise;
        };

        var deleteCodeNote = function (data) {
            var deferred = $q.defer();
            $http.delete('/api/codenote/' + data.CodeNotationsId).then(function () {
                deferred.resolve(true);
            }, function () {
                alert("error");
                deferred.reject();
            });
            return deferred.promise;
        }

        var saveCodeNote = function (data) {
            var deferred = $q.defer();
            $http.post('/api/codenote/', data).then(function () {
                deferred.resolve(true);
            }, function () {
                alert("error");
                deferred.reject();
            });
            return deferred.promise;
        }
        return {
            GetCodeNotes: getCodeNotes,
            DeleteCodeNote: deleteCodeNote,
            SaveCodeNotes: saveCodeNote
        }
    }]);