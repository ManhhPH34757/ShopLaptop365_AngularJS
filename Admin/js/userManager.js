function hashPassword(password) {
    var shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(password);
    return shaObj.getHash("HEX");
}

var userList = [
    {
        name: "Nguyễn Văn A",
        age: "30",
        gender: "male",
        address: "Hà Nội, Việt Nam",
        phone: "0123456789",
        email: "nguyenvana@example.com",
        username: "nguyenvana",
        password: hashPassword("password1"),
        role: "admin"
    },
    {
        name: "Trần Thị B",
        age: "25",
        gender: "female",
        address: "TP Hồ Chí Minh, Việt Nam",
        phone: "0987654321",
        email: "tranb@example.com",
        username: "tranb",
        password: hashPassword("password2"),
        role: "user"
    },
    {
        name: "Lê Văn C",
        age: "35",
        gender: "male",
        address: "Đà Nẵng, Việt Nam",
        phone: "0123456789",
        email: "levanc@example.com",
        username: "levanc",
        password: hashPassword("password3"),
        role: "user"
    }
];


// ListProduct Controller
app.controller('UserManagerController', function ($scope) {
    $scope.listUser = userList;

    $scope.user = {
        name: "",
        age: "",
        gender: "",
        address: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        role: ""
    };

    $scope.index = -1;

    // Add user
    $scope.adduser = function () {
        if ($scope.index === -1) {
            var user = angular.copy($scope.user);
            user.password = hashPassword(user.password);
            $scope.listUser.push(user);
            $scope.newuser();
        }
    };

    //Update user
    $scope.updateuser = function () {
        if ($scope.index !== -1) {
            $scope.listUser[$scope.index] = angular.copy($scope.user);
            $scope.newuser();
        }
    };

    // Delete user
    $scope.deleteuser = function () {
        if ($scope.index !== -1) {
            $scope.listUser.splice($scope.index, 1);
            $scope.newuser();
        }
    };

    //New user
    $scope.newuser = function () {
        document.getElementById('password').disabled = false;
        $scope.user = {
            name: "",
            age: "",
            gender: "",
            address: "",
            phone: "",
            email: "",
            username: "",
            password: "",
            role: ""
        };
        $scope.index = -1;
    };

    // Get selected user
    $scope.edit = function (index) {
        $scope.index = index;
        $scope.user = angular.copy($scope.listUser[index]);
        // Set disabled input pasword
        document.getElementById('password').disabled = true;
    };
});

