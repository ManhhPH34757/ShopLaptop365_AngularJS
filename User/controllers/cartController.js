window.cartController = function($scope, $http, $routeParams, $window){
    var selectedAccount = JSON.parse($window.localStorage.getItem('selectedAccount'));
    $scope.account = selectedAccount;
    console.log(selectedAccount);

    var urlCart = "http://localhost:3000/cart";
    var urlProduct = "http://localhost:3000/variants";
    var listCart = [];
    var listAllCart = [];
    var listProduct = [];
    var listProductInCart = [];

    $http.get(urlCart)
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
            listProduct.forEach(product =>{
                listCart.forEach(cart =>{
                    if(cart.idVariant == product.id){
                        product.quantity = cart.quantity;
                        product.idCart = cart.id;
                        listProductInCart.push(product);
                    }
                })
            })
            $scope.listProducts = listProductInCart;
            console.log(listProductInCart)
            $scope.priceTotal = 0;
            listProductInCart.forEach(item =>{
                $scope.priceTotal += Number(item.priceNew) * Number(item.quantity); 
            })
        })
    
    $scope.deleteProductInCart = function(product){
        let answer = confirm("Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng không?");
        if (answer){
            $http.delete(urlCart + "/" + product.idCart)
                .then(function(){
                    alert("Đã xóa sản phẩm khỏi giỏ hàng") 
                }, function(){
                    alert("Error al eliminar el producto")
                })
        }
    }

    $scope.giam = function(product){
        if(product.quantity  > 1 ){
            product.quantity = String(Number(product.quantity)-1);
            var newProduct = {
                "id": product.id,
                "account": selectedAccount.id,
                "idVariant": product.idVariant,
                "quantity": product.quantity
            }
            $http.patch(urlCart + "/" + product.idCart, newProduct)
        }
    }

    $scope.tang = function(product){
        product.quantity = String(Number(product.quantity)+1);
        var newProduct = {
            "id": product.id,
            "account": selectedAccount.id,
            "idVariant": product.idVariant,
            "quantity": product.quantity
        }
        $http.patch(urlCart + "/" + product.idCart, newProduct)
    }

    var urlOrders = "http://localhost:3000/orders";
    var listOrder = [];

    $http.get(urlOrders)
        .then(function(res){
            listOrder = res.data;
        })
    $scope.buyAllNow = function(){
        var lastOrderId = Number(listOrder[listOrder.length - 1].id);
        var promises = listProductInCart.map(function(product) {
            var productOrder = {
                "id": String(++lastOrderId),
                "account": selectedAccount.id,
                "idVariant": product.id,
                "quantity": product.quantity,
                "status": "Chờ xác nhận"
            }
            return $http.post(urlOrders, productOrder)
                .then(function() {
                    // Cập nhật lại listOrder sau khi thêm một đơn hàng mới
                    return $http.get(urlOrders)
                        .then(function(res){
                            listOrder = res.data;
                        })
                });
        });
    
        Promise.all(promises)
            .then(function() {
                alert("Đặt hàng thành công!");
            })
            .catch(function(error) {
                console.error("Error:", error);
            });

        listCart.forEach(item =>{
            $http.delete(urlCart + '/' + item.id);
        })
    }
        
}