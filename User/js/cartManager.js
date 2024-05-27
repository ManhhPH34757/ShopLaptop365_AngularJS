app.controller("cartControl", function($scope, $window){
    var selectedAccount = JSON.parse($window.localStorage.getItem('selectedAccount'));
    $scope.account = selectedAccount;

})