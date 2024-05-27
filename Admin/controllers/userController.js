window.userController = function ($scope, $http) {

    function findObjectById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
        }
        return null;
    }

    function hashPassword(password) {
        var shaObj = new jsSHA("SHA-256", "TEXT");
        shaObj.update(password);
        return shaObj.getHash("HEX");
    }

    $scope.listUser = [];
    var accounts = [];
    var roles = []

    // get all users from the server and store them in our array
    var urlUser = "http://localhost:3000/users";
    var urlAccount = "http://localhost:3000/accounts";
    var urlRole = "http://localhost:3000/roles";

    $http.get(urlAccount)
        .then(function (response) {
            accounts = response.data;
        })
        .catch(function () {
            console.log("Error")
        });

    $http.get(urlRole)
        .then((response) => {
            roles = response.data;
        });

    $http.get(urlUser)
        .then(function (response) {
            $scope.listUser = response.data;
            for (var i = 0; i < $scope.listUser.length; i++) {
                var user = $scope.listUser[i];
                user.account = findObjectById(accounts, user.account);
                user.account.password = hashPassword(user.account.password)
                if (user.account !== null) {
                    user.account.role = findObjectById(roles, user.account.role);
                }
            }
        })
        .catch(() => {
            console.log("Error getting data");
        })

    $scope.addUser = function () {
        if (checkValidation()) {
            var user = angular.copy($scope.user);
            var account = angular.copy($scope.account)

            var id = String(Number(accounts[accounts.length - 1].id) + 1);
            account.id = id;
            user.id = id;
            user.account = id;

            var check = true;

            for (var i = 0; i < $scope.listUser.length; i++) {
                if (account.username == $scope.listUser[i].account.username) {
                    alert('Username already exists!')
                    check = false;
                    break;
                }
            }
            if (check) {
                $http.post(urlAccount, account)
                $http.post(urlUser, user)
                    .then(() => {
                        alert("Add success");
                        location.reload(); 
                    })
                    .catch((err) => {
                        console.error(err);
                        alert("Fail to add!");
                    });
            }
        }
    }

    $scope.checkValid = {
        name: false,
        age: false,
        address: false,
        gender: false,
        email: false,
        phoneNumber: false,
        username: false,
        password: false,
        role: false,
        validUsername: false,
        validAge: false,
        validEmail : false
    }

    $scope.user = {
        name: "",
        age: "",
        address: "",
        gender: "",
        email: "",
        phoneNumber: ""
    }
    $scope.account = {
        username: "",
        password: "",
        role: ""
    }

    var regPhone = /^(0[35789][0-9]{8}|1[89]00[0-9]{4})$/;
    var regEmail = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    var regAge = /^[1-9]?[0-9]{1}$|^100$/;
    var regUsername = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/;

    function checkValidation() {
        var valid = true;
        if (!$scope.user.name) {
            $scope.checkValid.name = true;
            valid = false;
        }
        if (!$scope.user.age) {
            $scope.checkValid.age = true;
            valid = false;
        }
        if (!$scope.user.address) {
            $scope.checkValid.address = true;
            valid = false;
        }
        if (!$scope.user.gender) {
            $scope.checkValid.gender = true;
            valid = false;
        }
        if (!$scope.user.email) {
            $scope.checkValid.email = true;
            valid = false;
        }
        if (!$scope.user.phoneNumber) {
            $scope.checkValid.phoneNumber = true;
            valid = false;
        }
        if (!$scope.account.username) {
            $scope.checkValid.username = true;
            valid = false;
        }else{
            if(!regUsername.test($scope.account.username)){ 
                $scope.checkValid.validUsername = true;
                valid = false;
            }
        }
        if (!$scope.account.password) {
            $scope.checkValid.password = true;
            valid = false;
        }
        if (!$scope.account.role) {
            $scope.checkValid.role = true;
            valid = false;
        }

        if (!regPhone.test($scope.user.phoneNumber)){
            $scope.checkValid.validPhoneNumber = true;
            valid = false;
        }

        if (!regEmail.test($scope.user.email)){
            $scope.checkValid.validEmail = true;
            valid = false;
        }

        if (!regAge.test($scope.user.age)){
            $scope.checkValid.validAge = true;
            valid = false;
        }
        
        return valid;
    }

    $scope.changeName = function () {
        if (!$scope.user.name) {
            $scope.checkValid.name = true;
            return;
        } else {
            $scope.checkValid.name = false;
        }

    }

    $scope.changeAge = function(){
        if (!$scope.user.age) {
            $scope.checkValid.age = true;
            return;
        } else {
            $scope.checkValid.age = false;
            if (!regAge.test($scope.user.age)) {
                $scope.checkValid.validAge = true;
            }else{
                $scope.checkValid.validAge = false;
            }
        }
    }

    $scope.changeAddress = function(){
        if (!$scope.user.address) {
            $scope.checkValid.address = true;
            return;
        } else {
            $scope.checkValid.address = false;
        } 
    }

    $scope.changeGender = function(){
        if (!$scope.user.gender) {
            $scope.checkValid.gender = true;
            return;
        } else {
            $scope.checkValid.gender = false;
        }
    }

    $scope.changeRole = function(){
        if (!$scope.account.role) {
            $scope.checkValid.role = true;
            return;
        } else {
            $scope.checkValid.role = false;
        }
    }

    $scope.changeSDT = function(){
        if (!$scope.user.phoneNumber) {
            $scope.checkValid.phoneNumber = true;
            return;
        } else {
            $scope.checkValid.phoneNumber = false;
        }
    }

    $scope.changeEmail = function(){
        if (!$scope.user.email) {
            $scope.checkValid.email = true;
            return;

        } else {
            $scope.checkValid.email = false;

        }
    }

    $scope.changeUserName = function(){
        if (!$scope.account.username) {
            $scope.checkValid.username = true;
            return;

        } else {
            $scope.checkValid.username = false;

        }
    }

    $scope.changePassword = function(){
        if (!$scope.account.password) {
            $scope.checkValid.password = true;
            return;
        } else {
            $scope.checkValid.password = false;
        }
    }

    $scope.newUser = function () {
        $scope.user = {
            name: "",
            age: "",
            address: "",
            gender: "",
            email: "",
            phoneNumber: ""
        }
        $scope.account = {
            username: "",
            password: "",
            role: ""
        }
        $scope.checkValid = {
            name: false,
            age: false,
            address: false,
            gender: false,
            email: false,
            phoneNumber: false,
            username: false,
            password: false,
            role: false
        }
    }
}