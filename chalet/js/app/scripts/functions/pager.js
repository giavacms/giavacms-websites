'use strict';

function Pager($log, $scope, RsService, overrides, $anchorScroll, $location) {

    // overrides
    var defaults = {
        search: {},
        pageSize: 10,
        autoload: true,
        id: 'id',
        shownPages: 10,
        scrollTo: 'top'
    };

    if (overrides) {
        defaults = angular.extend(defaults, overrides);
    }

    // ordinamento locale
    $scope.predicate = defaults.id;
    $scope.reverse = false;
    var toggleSort = function (f) {
        if (f == $scope.predicate) {
            $scope.reverse = !$scope.reverse;
        }
        else {
            $scope.predicate = f;
            $scope.reverse = false;
        }
    }
    // ordinamento locale
    $scope.pageSort = function (f) {
        toggleSort(f);
        $scope.model = $filter('orderBy')($scope.model, $scope.predicate, $scope.reverse);
    };
    // ordinamento remoto
    $scope.sort = function (f) {
        toggleSort(f);
        $scope.startRow = 0;
        $scope.currentPage = 1;
        $scope.refresh();
    };

    // ricerca
    $scope.search = angular.copy(defaults.search);

    // scaricamento dati
    $scope.pageSize = defaults.pageSize;
    $scope.startRow = 0;
    $scope.currentPage = 1;
    $scope.clear = function () {
        $scope.search = angular.copy(defaults.search);
        $scope.refresh();
    }
    $scope.refresh = function (dontScroll) {
        $log.debug('Ricerca in corso...');
        var orderBy = $scope.predicate + ($scope.reverse ? ' desc' : ' asc')
        RsService.getList($scope.search, $scope.startRow, $scope.pageSize, orderBy).then(
            // successo
            function (data) {
                if (data) {
                    $scope.model = data;
                    // nessun risultato
                    if ($scope.model.length == 0) {
                        $log.debug('Nessun risultato.');
                        $scope.listSize = 0;
                        $scope.pages = [];
                        // solo un sottoinsieme delle pagine verrà mostrato come link diretto nella pagina
                        $scope.subpages = [];
                    }
                    // ci sono dati. calcolo le pagine
                    else {
                        $scope.listSize = RsService.getSize();
                        $log.debug('Totale: ' + $scope.listSize + ' risultat' + ($scope.listSize == 1 ? 'o' : 'i'));
                        $scope.pages = [];
                        var p = 0;
                        for (var i = 1; i <= Number($scope.listSize); i += Number($scope.pageSize)) {
                            p++;
                            $scope.pages.push(p);
                        }

                        // solo un sottoinsieme delle pagine verrà mostrato come link diretto nella pagina
                        $scope.subpages = [];
                        var halfPages = Math.round(defaults.shownPages / 2);
                        for (var s = 1; s <= defaults.shownPages; s++) {
                            var subpage = $scope.currentPage - halfPages + s;
                            if ($scope.pages.indexOf(subpage) >= 0) {
                                $scope.subpages.push(subpage);
                            }
                        }
                        var missing = defaults.shownPages - $scope.subpages.length;
                        if (missing > 0) {
                            if ($scope.subpages[0] == 1) {
                                for (var m = 0; m < missing; m++) {
                                    var lastPage = $scope.subpages[$scope.subpages.length - 1];
                                    if ($scope.pages.indexOf(lastPage + 1) >= 0) {
                                        $scope.subpages.push(lastPage + 1);
                                    }
                                }
                            }
                            else {
                                for (var m = 0; m < missing; m++) {
                                    var firstPage = $scope.subpages[0];
                                    if (firstPage - 1 > 0) {
                                        $scope.subpages.unshift(firstPage - 1);
                                    }
                                }
                            }
                        }
                    }
                    if (!dontScroll) {
                        $location.hash(defaults['scrollTo']);
                        $anchorScroll();
                    }
                }
            },
            // errorre
            function () {
                $log.debug('Dati non disponibili.');
            })
    }

    // paginazione
    $scope.firstPage = function () {
        $scope.goToPage(1);
    }
    $scope.goToPage = function (pageNo) {
        $scope.startRow = (pageNo - 1) * $scope.pageSize;
        $scope.refresh();
        $scope.currentPage = pageNo;
    }
    $scope.lastPage = function () {
        $scope.goToPage($scope.pages.length);
    }
    $scope.rowsPerPage = function (pageSize) {
        $scope.pageSize = pageSize;
        $scope.startRow = 0;
        $scope.refresh();
        $scope.currentPage = 1;
    }


    if (defaults.autoload) {
        $scope.refresh(true);
    }
    else {
        $log.debug('Nessuna ricerca eseguita');
    }


}
