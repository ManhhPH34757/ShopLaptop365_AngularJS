window.ProductDetailsController = function($scope, $window, $http, $routeParams, $location){

    var selectedAccount = JSON.parse($window.localStorage.getItem('selectedAccount'));
    $scope.account = selectedAccount;

    function findObjectById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
        }
        return null;
    }
    var urlLaptop = "http://localhost:3000/laptops";
    var urlProduct = "http://localhost:3000/variants";
    var urlCart = "http://localhost:3000/cart";
    var urlOrder = "http://localhost:3000/orders"

    var listLaptop = [];
    $http.get(urlLaptop)
        .then(function(res){
            listLaptop = res.data;
        })

    var urlProductSelected = urlProduct + "/" + $routeParams.id;

    $http.get(urlProductSelected)
        .then(function (response) {
            $scope.selectedProduct = response.data;
            $scope.selectedProduct.laptopObject = findObjectById(listLaptop, $scope.selectedProduct.idLaptop);
        })
        .catch(function (error) {
            console.log("Error en la petición de producto", error);
        });
    
    var listAllCart = [];
    var listCart = [];
    $http.get(urlCart)
        .then(function(res){
            listAllCart = res.data;
            listAllCart.forEach(cart => {
                if(cart.account == selectedAccount.id){
                    listCart.push(cart);
                }
            });
        })

    var listOrder = []
    $http.get(urlOrder)
        .then(function(orderList){
            listOrder = orderList.data;
        })

    $scope.addToCart = function(){
        var carts = {
            "id" : "",
            "account" : selectedAccount.id,
            "idVariant" : "",
            "quantity" : "1"
        }
        if(listAllCart.length > 0){
            carts.id = String(Number(listAllCart[listAllCart.length - 1].id) + 1);
        }else{
            carts.id = "1";
        }
        carts.idVariant = $scope.selectedProduct.id;
        var check = true;
        for (var i=0;i<listCart.length;i++){
            if (carts.idVariant == listCart[i].idVariant) {
                listCart[i].quantity = String(Number(listCart[i].quantity) + 1);
                carts = listCart[i];
                check = false;
                break;
            }
        };
    
        if(check){
            $http.post(urlCart, carts)
                .then(() =>{
                    alert("Thêm sản phẩm vào giỏ hàng thành công");
                    $location.path("/cart/" + selectedAccount.id);
                });
        }else{
            $http.put(urlCart + '/' + carts.id , carts )
                .then(() =>{
                    alert("Thêm sản phẩm vào giỏ hàng thành công");
                    $location.path("/cart/" + selectedAccount.id);
                });
        }
    }

    
    $scope.buyNow = function(){
        var order = {
            "id" : "",
            "account" : selectedAccount.id,
            "idVariant" : $routeParams.id,
            "quantity" : "1",
            "status" : "Chờ xác nhận"
        }
        var orderExits = {}
        var check = true;
        for (let index = 0; index < listOrder.length; index++) {
            if(order.account ==  listOrder[index].account && order.idVariant == listOrder[index].idVariant && listOrder[index].status == "Chờ xác nhận"){
                orderExits = listOrder[index];
                orderExits.quantity = String(Number(listOrder[index].quantity) + 1);
                check = false;
                break;
            }
        }
        if(check){
            if(listOrder.length > 0){
                order.id = String(Number(listOrder[listOrder.length - 1].id) + 1);
            }else{
                order.id = "1";
            }
            $http.post(urlOrder, order)
                .then(()=>{
                    alert("Đặt hàng thành công")
                    $location.path("/order/"+selectedAccount.id)
                })
        }else{
            $http.patch(urlOrder+'/'+orderExits.id, orderExits)
                .then(()=>{
                    alert("Đặt hàng thành công")
                    $location.path("/order/"+selectedAccount.id)
                })
        }
    }

}