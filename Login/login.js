var app = angular.module("myApp",[]);
app.controller('myControl', function($scope, $http, $window) {
    // get data from server
    var urlAccount = "http://localhost:3000/accounts";

    var accounts = []

    $http.get(urlAccount)
        .then(function(response){
            accounts = response.data;
        })
        .catch(()=>{
            console.log("Error while getting the account details");
        })
    $scope.login = function(){
        if(checkValid()){
            var account = angular.copy($scope.account)
            var acc = {}
            for(var i = 0; i < accounts.length; i++){
                if(accounts[i].username == account.username && accounts[i].password == account.password){
                    acc =  accounts[i];
                    break;
                }else{
                    acc =  null;
                }
            }
            if(acc != null){
                if(accounts[i].role == "1"){
                    window.location.href = "http://127.0.0.1:5501/Assignment2/Admin/index.html#!/";
                }else{
                    window.location.href = "http://127.0.0.1:5501/Assignment2/User/index.html#!/";
                }
                $window.localStorage.setItem('selectedAccount', JSON.stringify(acc));
            } else {
                alert("Invalid username or password!");
            }
        }
    }

    $scope.account = {
        username : "",
        password: ""
    }

    $scope.valid = {
        username: false,
        password: false
    }

    function checkValid(){        
        var check = true;
        //check empty fields
        if(!$scope.account.username ){
            $scope.valid.username = true;
            check = false;
        }

        if(!$scope.account.password){
            $scope.valid.password = true;
            check=false;
        }
            return check;
    }

    $scope.changeUsername = function(){
        if(!$scope.account.username){
            $scope.valid.username = true;
        }else{
            $scope.valid.username = false;
        }
    }

    $scope.changePassword = function(){
        if(!$scope.account.password){
            $scope.valid.password = true;
        }else{
            $scope.valid.password = false;
        }
    }

});