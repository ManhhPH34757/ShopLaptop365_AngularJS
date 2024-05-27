window.productController = function($scope, $http, $window){

    $scope.listProduct = [];

    function findObjectById(array, id) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return array[i];
            }
        }
        return null;
    }
    
    // Get API data for products
    var urlLaptop = "http://localhost:3000/laptops";
    var urlProduct = "http://localhost:3000/variants";

    var listLaptop = [];
    $http.get(urlLaptop)
        .then(function(res){
            listLaptop = res.data;
        })

    $http.get(urlProduct)
    .then((response)=>{
        $scope.listProduct = response.data;
        $scope.listProduct.forEach(laptop =>{
            laptop.laptopObject = findObjectById(listLaptop, laptop.idLaptop);
        })
    })
    .catch(()=>{
        console.log("Error");
    })

}