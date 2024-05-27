window.laptopController = function ($scope, $http, $window) {

    var selectedAccount = JSON.parse($window.localStorage.getItem('selectedAccount'));

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
    $scope.brand = {
        id : "",
        brandName: ""
    }

    $scope.listSeries = [];
    var listAllSeries = [];
    var listSeries = [];
    $scope.series = {
        id: "",
        idBrand: "",
        seriesName: ""
    }

    $scope.listOS = [];
    var listOS = [];

    $scope.listProduct = [];
    var listProduct = [];

    var listUser = [];
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

    $scope.selectBrand = function(){
        listSeries = []
        var idBrand = String($scope.series.idBrand);
        listAllSeries.forEach(series => {
            var idCurrentBrand = String(series.idBrand);
            if(idCurrentBrand === idBrand){
                listSeries.push(series);
            } 
        });
        $scope.listSeries = listSeries;
    }

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
    
    $scope.addlaptop = function(){
        if(checkValid()){
            var laptop = angular.copy($scope.laptop);
            var id = String(Number(listProduct[listProduct.length-1].id) + 1);
            laptop.id=id;
            laptop.account = selectedAccount.id;

            $http.post(urlListProduct, laptop)
                .then(() =>{
                    alert("Add success");
                    location.reload(); 
                })
        }
    }

    $scope.newlaptop = function(){

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

        $scope.series = {
            
        }
    
    }
    
}
