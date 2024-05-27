window.orderController = function($scope, $http, $routeParams, $window){
    var selectedAccount = JSON.parse($window.localStorage.getItem('selectedAccount'));
    $scope.account = selectedAccount;
    console.log(selectedAccount);

    var urlOrders = "http://localhost:3000/orders";
    var urlProduct = "http://localhost:3000/variants";
    var listCart = [];
    var listAllCart = [];
    var listProduct = [];
    var listProductInCart = [];
    var listProductInCarts = [];

    $http.get(urlOrders)
        .then(function(res){
            listAllCart = res.data;
            listAllCart.forEach(cart => {
                if(cart.account == selectedAccount.id){
                    listCart.push(cart);
                }
            });
        });
    
    $http.get(urlProduct)
        .then(function(res){
            listProduct = res.data;
        for (let i = 0; i < listCart.length; i++) {
            for (let j = 0; j < listProduct.length; j++) {
                if(listCart[i].idVariant === listProduct[j].id){
                    var productNew = Object.assign({}, listProduct[j]); // Tạo bản sao của listProductInCart[index]
                    var cartNew = Object.assign({}, listCart[i]); // Tạo bản sao của listProductInCart[index]
                    productNew.quantity = cartNew.quantity;
                    productNew.status = cartNew.status;
                    productNew.idOrder = cartNew.id;
                    listProductInCart.push(productNew);
                }
            }
            
        }

        for (let index = 0; index < listProductInCart.length; index++) {
            var productNew = Object.assign({}, listProductInCart[index]); // Tạo bản sao của listProductInCart[index]
            productNew.id = String(index+1);
            listProductInCarts.push(productNew);
        }
            

            $scope.listProducts = listProductInCarts;
            console.log(listProduct);
            console.log(listCart);
            console.log(listProductInCarts);


            
        })

        $scope.cancelOrder = function(product){
            var check = confirm("Bạn có chắc muốn hủy đơn hàng này?");
            if (check) {
                $http.get(urlOrders + "/" + product.idOrder)
                .then(function(response){
                    var order = response.data;
                    order.status = "Đã hủy";
                    return $http.patch(urlOrders + "/" + product.idOrder, order);
                })
                .catch(function(error) {
                    console.log('Error updating order:', error);
                });
            }

        }

        $scope.Order = function(product){

            $http.get(urlOrders + "/" + product.idOrder)
            .then(function(response){
                var order = response.data;
                order.status = "Chờ xác nhận";
                return $http.patch(urlOrders + "/" + product.idOrder, order);
            })
            .catch(function(error) {
                console.log('Error updating order:', error);
            });

        }
        

}