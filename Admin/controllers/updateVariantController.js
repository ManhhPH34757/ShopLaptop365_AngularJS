window.updateVariantController = function($scope, $http, $routeParams, $window, $location){
    
    var selectedAccount = JSON.parse($window.localStorage.getItem('selectedAccount'));

    function findObjectById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
        }
        return null;
    }

    $scope.variant = {
        images: ['']
    };

    $scope.addInput = function() {
        if($scope.variant.images.length < 5) {
            $scope.variant.images.push('');
        }else{
            alert("Maximum 5 images are allowed.");
        }
    };

    $scope.removeInput = function(index) {
        if($scope.variant.images.length > 1) {
            $scope.variant.images.splice(index, 1);
        }else{
            alert("You can't remove the first input.");
        }
    };

    var urlLaptops = "http://localhost:3000/laptops";
    var urlVariants = "http://localhost:3000/variants";
    var urlUsers = "http://localhost:3000/users";
    
    var listAllVariant = [];
    var listVariantSelected = [];
    var listUser = [];

    $http.get(urlUsers)
        .then(function(response){
            listUser = response.data;
        });

    $http.get(urlVariants)
        .then(function(res){
            listAllVariant = res.data;
            listAllVariant.forEach(variant =>{
                if(variant.idLaptop == $routeParams.idLaptop){
                    variant.accountObject = findObjectById(listUser, variant.account);
                    listVariantSelected.push(variant);
                }
            })
        })
    
    $scope.listVariant = listVariantSelected;

    $http.get(urlLaptops + "/" + $routeParams.idLaptop)
        .then((response) => {
            $scope.laptop = response.data;
        });

    var variantSelected = urlVariants + "/" + $routeParams.id;
    $http.get(variantSelected)
        .then(function (response) {
           $scope.variant = response.data; 
        }, function (error) {
            console.log(error);
        });

    var regNumber = /^\d*$/;

    $scope.validVariant = {
        priceOld : false,
        validPriceOld : false,
        priceNew : false,
        validPriceNew : false,
        sale : false,
        validSale : false,
        quantity : false,
        validQuantity : false,
        images : [],
        cpu : false,
        ram : false,
        disk : false,
        card : false,
        screen : false
    }

    function checkvalid(){
        var check = true;

        if(!$scope.variant.priceOld){
            $scope.validVariant.priceOld  = true;
            $scope.validVariant.validPriceOld = false;
            check = false;
        }else if(!regNumber.test($scope.variant.priceOld)){
            $scope.validVariant.priceOld  = false;
            $scope.validVariant.validPriceOld = true;
            check=false;
        }

        if(!$scope.variant.priceNew){
            $scope.validVariant.priceNew  = true;
            $scope.validVariant.validPriceNew = false;
            check = false;
        }else if(!regNumber.test($scope.variant.priceNew)){
            $scope.validVariant.priceNew  = false;
            $scope.validVariant.validPriceNew = true;
            check=false;
        }

        if(!$scope.variant.sale){
            $scope.validVariant.sale  = true;
            $scope.validVariant.validSale = false;
            $scope.validVariant.saleMax = false;
            check = false;
        }else if(!regNumber.test($scope.variant.sale)){
            $scope.validVariant.sale  = false;
            $scope.validVariant.validSale = true;
            $scope.validVariant.saleMax = false;
            check=false;
        }else if(Number($scope.variant.sale) >= 100){
            $scope.validVariant.sale  = false;
            $scope.validVariant.validSale = false;
            $scope.validVariant.saleMax = true;
            check=false;
        }

        if(!$scope.variant.quantity){
            $scope.validVariant.quantity  = true;
            $scope.validVariant.validQuantity = false;
            check = false;
        }else if(!regNumber.test($scope.variant.quantity)){
            $scope.validVariant.quantity  = false;
            $scope.validVariant.validQuantity = true;
            check=false;
        }

        for(let i = 0; i < $scope.variant.images.length; i ++){
            if($scope.variant.images[i] == ""){
                $scope.validVariant.images[i]  = true;
                check = false;
            }
        }

        if(!$scope.variant.cpu){
            $scope.validVariant.cpu  = true;
            check = false;
        }

        if(!$scope.variant.ram){
            $scope.validVariant.ram  = true;
            check = false;
        }

        if(!$scope.variant.disk){
            $scope.validVariant.disk  = true;
            check = false;
        }

        if(!$scope.variant.card){
            $scope.validVariant.card  = true;
            check = false;
        }

        if(!$scope.variant.screen){
            $scope.validVariant.screen  = true;
            check = false;
        }

        return check;
    }

    $scope.changePriceOld = function(){
        if(!$scope.variant.priceOld){
            $scope.validVariant.priceOld  = true;
            $scope.validVariant.validPriceOld = false;
            return;
        }else if(!regNumber.test($scope.variant.priceOld)){
            $scope.validVariant.priceOld  = false;
            $scope.validVariant.validPriceOld = true;
            return;
        }else{
            $scope.validVariant.priceOld  = false;
            $scope.validVariant.validPriceOld = false;
        }

    }

    $scope.changePriceNew = function(){
        if(!$scope.variant.priceNew){
            $scope.validVariant.priceNew  = true;
            $scope.validVariant.validPriceNew = false;
            return;
        }else if(!regNumber.test($scope.variant.priceNew)){
            $scope.validVariant.priceNew  = false;
            $scope.validVariant.validPriceNew = true;
            return;
        }else{
            $scope.validVariant.priceNew  = false;
            $scope.validVariant.validPriceNew = false;
        }
    }

    $scope.changeSale = function(){
        if(!$scope.variant.sale){
            $scope.validVariant.sale  = true;
            $scope.validVariant.validSale = false;
            $scope.validVariant.saleMax = false;
            return;
        }else if(!regNumber.test($scope.variant.sale)){
            $scope.validVariant.sale  = false;
            $scope.validVariant.validSale = true;
            $scope.validVariant.saleMax = false;
            return;
        }else if(Number($scope.variant.sale) >= 100){
            $scope.validVariant.sale  = false;
            $scope.validVariant.validSale = false;
            $scope.validVariant.saleMax = true;
            return;
        }else{
            $scope.validVariant.sale  = false;
            $scope.validVariant.validSale = false;
            $scope.validVariant.saleMax = false;
        }
    }

    $scope.changeQuantity = function(){
        if(!$scope.variant.quantity){
            $scope.validVariant.quantity  = true;
            $scope.validVariant.validQuantity = false;
            return;
        }else if(!regNumber.test($scope.variant.quantity)){
            $scope.validVariant.quantity  = false;
            $scope.validVariant.validQuantity = true;
            return;
        }else{
            $scope.validVariant.quantity  = false;
            $scope.validVariant.validQuantity = false;
        }
    }

    $scope.changeImage = function(){
        for(let i = 0; i < $scope.variant.images.length; i ++){
            if($scope.variant.images[i] == "" || !$scope.variant.images[i]){
                $scope.validVariant.images[i]  = true;
                return;
            }else{
                $scope.validVariant.images[i]  = false;
            }
        }
    }

    $scope.changeCPU = function(){
        if(!$scope.variant.cpu){
            $scope.validVariant.cpu  = true;
            return;
        }else{
            $scope.validVariant.cpu = false;
        }
    }

    $scope.changeRAM = function(){
        if(!$scope.variant.ram){
            $scope.validVariant.ram  = true;
            return;
        }else{
            $scope.validVariant.ram = false;
        }
    }

    $scope.changeDisk = function(){
        if(!$scope.variant.disk){
            $scope.validVariant.disk  = true;
            return;
        }else{
            $scope.validVariant.disk = false;
        }
    }

    $scope.changeCard = function(){
        if(!$scope.variant.card){
            $scope.validVariant.card  = true;
            return;
        }else{
            $scope.validVariant.card = false;
        }

    }

    $scope.changeScreen = function(){
        if(!$scope.variant.screen){
            $scope.validVariant.screen  = true;
            return;
        }else{
            $scope.validVariant.screen = false;
        }
    }
    
    $scope.updateVariant = function(){
        if(checkvalid()){
            var variant = angular.copy($scope.variant);
            $http.patch(variantSelected, variant)
                .then(() =>{
                    alert("Update thành công");
                    $location.path("/variantManager/"+$routeParams.idLaptop);
                    location.reload(); 
                })
        }
    }

    $scope.deleteVariant = function(){
        let answer = confirm("Bạn có chắc muốn xóa variant này không");
        if(answer){
            $http.delete(variantSelected)
                .then(()=>{
                    alert('Xóa thành công');
                    $location.path("/variantManager/"+$routeParams.idLaptop);
                    location.reload(); 
                });
        }
    }

    $scope.newVariant = function(){
        $location.path("/variantManager/" + $routeParams.idLaptop);
    }

}