window.updateLaptopController = function($scope, $window, $http, $location, $routeParams){
    
    selectedAccount = JSON.parse($window.localStorage.getItem('selectedAccount'));

    function findObjectById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
        }
        return null;
    }

    var urlBrands = "http://localhost:3000/brands";
    var urlSeries = "http://localhost:3000/series";
    var urlOS = "http://localhost:3000/operatingSystems";
    var urlListProduct = "http://localhost:3000/laptops";
    var urlAccount = "http://localhost:3000/users";

    $scope.listBrand = [];
    var listBrand = [];

    $scope.listSeries = [];
    var listAllSeries = [];
    var listAllSeri = []
    var listSeries = [];

    $scope.listOS = [];
    var listOS = [];

    $scope.listProduct = [];
    var listProduct = [];

    var listUser = [];

    $scope.validLaptop = {
        brand : false,
        series : false,
        OS : false,
        name : false
    }

    $scope.laptop = {
        idSeries: "",
        idOS: "",
        laptopName: "",
        account: ""
    }  

    $http.get(urlAccount)
        .then((res) =>{
            listUser= res.data;
        })

    $http.get(urlBrands)
        .then( function(response){
            $scope.listBrand = response.data;
            listBrand = response.data;
        })

    $http.get(urlSeries)
    .then( function(response){
        listAllSeries = response.data;
    })

    $http.get(urlOS)
        .then((response) =>{
            $scope.listOS = response.data;
            listOS = response.data;
        })

    $http.get(urlListProduct)
        .then((response)=>{
        $scope.listProduct = response.data;
        listProduct = response.data;
        $scope.listProduct.forEach(laptop =>{
            laptop.seriesObject = findObjectById(listAllSeries, laptop.idSeries);
            if (laptop.seriesObject) {
                laptop.seriesObject.brandObject  = findObjectById(listBrand, laptop.seriesObject.idBrand);
            }
            laptop.osObject = findObjectById(listOS, laptop.idOS);
            laptop.accountObject = findObjectById(listUser, laptop.account);
        })
    })  

    function checkValid(){
        var check = true;

        if(!$scope.series.idBrand){
            $scope.validLaptop.brand = true;
            check = false;
        }

        if(!$scope.laptop.idSeries){
            $scope.validLaptop.series = true;
            check = false;
        }

        if(!$scope.laptop.idOS){
            $scope.validLaptop.OS = true;
            check = false;
        }

        if(!$scope.laptop.laptopName){
            $scope.validLaptop.name = true;
            check = false;
        }

        return check;
    }

    var urlProductSelected = urlListProduct + "/" + $routeParams.id;

    $http.get(urlProductSelected)
        .then((response) =>{
            $scope.laptop = response.data
            $scope.series =  findObjectById(listAllSeries, $scope.laptop.idSeries);
            listSeries = [];
            var idBrand = String($scope.series.idBrand);
            listAllSeries.forEach(series => {
                var idCurrentBrand = String(series.idBrand);
                if(idCurrentBrand === idBrand){
                    listSeries.push({... series});
                } 
            });
            $scope.listSeries = listSeries;
        })
    
    $scope.selectBrand = function(){

        listSeries = [];

        var idBrand = String($scope.series.idBrand);
        $http.get(urlSeries)
            .then( function(response){
                listAllSeri = response.data;
                listAllSeri.forEach(series => {
                    var idCurrentBrand = String(series.idBrand);
                    if(idCurrentBrand === idBrand){
                        listSeries.push({... series});
                    } 
                });
        
                $scope.listSeries = listSeries;
            })

    }

    $scope.changeBrand = function(){

        if(!$scope.series.idBrand){
            $scope.validLaptop.brand = true;
            return;
        }else{
            $scope.validLaptop.brand = false;
        }

    }

    $scope.changeSeries = function(){
        if(!$scope.laptop.idSeries){
            $scope.validLaptop.series = true;
            return;
        }else{
            $scope.validLaptop.series = false;
        } 
    }

    $scope.changeOS = function(){
        if(!$scope.laptop.idOS){
            $scope.validLaptop.OS = true;
            return;
        }else{
            $scope.validLaptop.OS = false;
        }
    }

    $scope.changeLaptopName = function(){
        if(!$scope.laptop.laptopName){
            $scope.validLaptop.name = true;
            return;
        }else{
            $scope.validLaptop.name = false;
        }
    }

    $scope.selectBrandAndChange = function(){
        $scope.selectBrand();
        $scope.changeBrand();
    }

    $scope.updatelaptop = function(){
        if(checkValid()){
            let laptop = angular.copy($scope.laptop);
            $http.patch(urlProductSelected, laptop)
                .then(()=>{
                    alert("Update thành công!");
                    $location.path("/productManager");
                    location.reload(); 
                })
        }
    }

    $scope.deletelaptop = function(){
        let answer = confirm("Bạn có chắc muốn xóa laptop không");
        if(answer){
            $http.delete(urlProductSelected)
                .then(()=>{
                    alert('Xóa thành công');
                    $location.path('/productManager');
                    location.reload(); 
                });
        }
    }

    $scope.newlaptop = function(){
        $location.path('/productManager');
    }

    $scope.addVariant = function(){
        $location.path( '/variantManager/'+$routeParams.id );
    }
}