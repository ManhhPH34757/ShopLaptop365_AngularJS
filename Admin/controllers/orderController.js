window.orderController = function($scope, $routeParams, $http) {
    
    function findObjectById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
        }
        return null;
    }

    var urlUser = "http://localhost:3000/users";
    var urlVariant = "http://localhost:3000/variants";
    var urlOrder = "http://localhost:3000/orders";

    var listUser = [];
    $http.get(urlUser)
        .then(function(res){
            listUser = res.data;
        });

    var listVariant = [];
    $http.get(urlVariant)
        .then(function(res){
            listVariant = res.data;
        });

    var litsOrder = [];
    $http.get(urlOrder)
        .then(function(res){
            litsOrder = res.data;
            litsOrder.forEach(element => {
                element.acc = findObjectById(listUser, element.account);
                element.variant = findObjectById(listVariant, element.idVariant);
            });
            $scope.listOrders = litsOrder;
        });

    $scope.orderSuccess = function(order){
        var orderSample = {};
        orderSample.id = order.id;
        orderSample.account = order.account;
        orderSample.idVariant = order.idVariant;
        orderSample.quantity = order.quantity;
        orderSample.status = 'Đã xác nhận';

        $http.patch(urlOrder + "/" + order.id, orderSample)
            .then(function(){
                alert("Đơn hàng đã xác nhận!");
                location.reload(); 
            });
    }

    $scope.orderCancel = function(order){
        var confirm = confirm("Bạn chắc chắn muốn hủy đơn hàng?");
        if(confirm){
            var orderSample = {};
            orderSample.id = order.id;
            orderSample.account = order.account;
            orderSample.idVariant = order.idVariant;
            orderSample.quantity = order.quantity;
            orderSample.status = 'Đã hủy';

            $http.patch(urlOrder + "/" + order.id, orderSample)
                .then(function(){
                    alert("Đã hủy đơn hàng!");
                    location.reload(); 
                });
        }
    }

    
}