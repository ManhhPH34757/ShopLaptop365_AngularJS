var list = [
    {
        image: "laptop1.png",
        img1: "laptop1_1.png",
        img2: "laptop1_2.png",
        name: "Laptop Dell Latitude 5400",
        information: "Dell Latitude 5400 (Core i5-8365U, 16GB, 256GB, VGA Intel UHD Graphics 620, 14.0 inch FHD)",
        CPU: "Core i5-8365U",
        RAM: "16GB",
        Disk: "256GB",
        Card: "VGA Intel UHD Graphics 620",
        Screen: "14.0 inch FHD",
        sale: "-25%",
        priceOld: "15.600.000",
        priceNew: "11.700.000"
    },
    {
        image: "laptop2.png",
        img1: "laptop2_1.png",
        img2: "laptop2_2.png",
        name: "Alienware m18 Gaming Laptop",
        information: "Alienware m18 (Intel Core i9-13900HX, 32GB, 1TB, NVIDIA GeForce RTX 4090, 18 inch QHD+)",
        CPU: "Core i9-13900HX",
        RAM: "32GB",
        Disk: "1TB",
        Card: "NVIDIA GeForce RTX 4090",
        Screen: "18 inch QHD+",
        sale: "-20%",
        priceOld: "18.700.000",
        priceNew: "14.960.000"
    },
    {
        image: "laptop3.png",
        img1: "laptop3_1.png",
        img2: "laptop3_2.png",
        name: "Lenovo ThinkBook 14 Gen 4",
        information: "Lenovo ThinkBook 14 Gen 4 (Intel Core i5-1235U, 8GB, 256GB, Intel UHD Graphics, 14 inch FHD)",
        CPU: "Core i5-1235U",
        RAM: "8GB",
        Disk: "256GB",
        Card: "Intel UHD Graphics",
        Screen: "14 inch FHD",
        sale: "-15%",
        priceOld: "10.500.000",
        priceNew: "8.925.000"
    }
];

var list1 = [
    {
        image: "laptop4.png",
        img1: "laptop4_1.png",
        img2: "laptop4_2.png",
        name: "Laptop Lenovo ThinkPad P14s",
        information: "Laptop Lenovo ThinkPad P14s (Core i5-8365U, 16GB, 256GB, VGA Intel UHD Graphics 620, 14.0 inch FHD)",
        CPU: "Core i5-8265U",
        RAM: "16GB",
        Disk: "256GB",
        Card: "VGA Intel UHD Graphics 620",
        Screen: "14.0 inch FHD",
        sale: "-30%",
        priceOld: "14.600.000",
        priceNew: "10.220.000"
    },
    {
        image: "laptop5.png",
        img1: "laptop5_1.png",
        img2: "laptop5_2.png",
        name: "Laptop Asus Zenbook 17 fold oled",
        information: "Laptop Asus Zenbook 17 fold oled (Intel Core i7-10510U, 16GB, 1TB, NVIDIA GeForce RTX 4090, 15.6 inch FHD)",
        CPU: "Core i7-10510U",
        RAM: "16GB",
        Disk: "1TB",
        Card: "NVIDIA GeForce RTX 4090",
        Screen: "15.6 inch FHD",
        sale: "-25%",
        priceOld: "22.600.000",
        priceNew: "16.950.000"
    },
    {
        image: "laptop6.png",
        img1: "laptop6_1.png",
        img2: "laptop6_2.png",
        name: "Lenovo Acer Nitro 5",
        information: "Lenovo Acer Nitro 5 (Intel Core i5-10210U, 8GB, 512GB, Intel UHD Graphics, 14.0 inch FHD)",
        CPU: "Core i5-10210U",
        RAM: "8GB",
        Disk: "512GB",
        Card: "Intel UHD Graphics",
        Screen: "14.0 inch FHD",
        sale: "-20%",
        priceOld: "17.600.000",
        priceNew: "14.080.000"
    }

];

var list2 = [
    {
        image: "laptop7.png",
        img1: "laptop7_1.png",
        img2: "laptop7_2.png",
        name: "HP Elitebook 840 G7",
        information: "HP Elitebook 840 G7 (Intel Core i3-10110U, 16GB, 256GB, VGA Intel UHD Graphics 620, 13.3 inch HD)",
        CPU: "Core i3-10110U",
        RAM: "16GB",
        Disk: "256GB",
        Card: "VGA Intel UHD Graphics 620",
        Screen: "13.3 inch HD",
        sale: "-15%",
        priceOld: "11.500.000",
        priceNew: "9.775.000"
    },
    {
        image: "laptop8.png",
        img1: "laptop8_1.png",
        img2: "laptop8_2.png",
        name: "Laptop MSI Sword 16 HX",
        information: "Laptop MSI Sword 16 HX (Intel Core i5-1035G1, 16GB, 512GB, NVIDIA GeForce RTX 4090, 16 inch QHD+)",
        CPU: "Core i5-1035G1",
        RAM: "16GB",
        Disk: "512GB",
        Card: "NVIDIA GeForce RTX 4090",
        Screen: "16 inch QHD+",
        sale: "-30%",
        priceOld: "15.600.000",
        priceNew: "10.920.000"
    },
    {
        image: "laptop9.png",
        img1: "laptop9_1.png",
        img2: "laptop9_2.png",
        name: "Laptop Lenovo Legion 5",
        information: "Laptop Lenovo Legion 5 (Intel Core i7-1065G7, 16GB, 1TB, VGA Intel UHD Graphics 620, 15.6 inch FHD)",
        CPU: "Core i7-1065G7",
        RAM: "16GB",
        Disk: "1TB",
        Card: "VGA Intel UHD Graphics 620",
        Screen: "15.6 inch FHD",
        sale: "-25%",
        priceOld: "23.600.000",
        priceNew: "17.700.000"
    }

];

// ListProduct Controller
app.controller('ListProductController', function ($scope) {
    $scope.listProduct = list;
    $scope.listProduct1 = list1;
    $scope.listProduct2 = list2;

    $scope.laptop = {
        image: "",
        img1: "",
        img2: "",
        name: "",
        information: "",
        CPU: "",
        RAM: "",
        Disk: "",
        Card: "",
        Screen: "",
        sale: "",
        priceOld: "",
        priceNew: ""
    };

    $scope.index = -1;

    // Add laptop
    $scope.addlaptop = function () {
        if ($scope.index === -1) {
            var files = document.getElementById('fileInput').files;
            if (files.length === 3) {
                $scope.laptop.image = files[0].name;
                $scope.laptop.img1 = files[1].name;
                $scope.laptop.img2 = files[2].name;
                $scope.listProduct.push(angular.copy($scope.laptop));
                $scope.newlaptop();
            }else{
                alert("Vui lòng chọn đủ 3 ảnh!");
            }
        }
    };

    //Update laptop
    $scope.updatelaptop = function () {
        if ($scope.index !== -1) {
            var files = document.getElementById('fileInput').files;
            if (files.length === 3) {
                $scope.laptop.image = files[0].name;
                $scope.laptop.img1 = files[1].name;
                $scope.laptop.img2 = files[2].name;
                $scope.listProduct[$scope.index] = angular.copy($scope.laptop);
                $scope.newlaptop();
            }else{
                alert("Vui lòng chọn đủ 3 ảnh!");
            }
        }
    };

    // Delete laptop
    $scope.deletelaptop = function () {
        if ($scope.index !== -1) {
            $scope.listProduct.splice($scope.index, 1);
            $scope.newlaptop();
        }
    };

    //New laptop
    $scope.newlaptop = function () {
        $scope.laptop = {
            image: "",
            img1: "",
            img2: "",
            name: "",
            information: "",
            CPU: "",
            RAM: "",
            Disk: "",
            Card: "",
            Screen: "",
            sale: "",
            priceOld: "",
            priceNew: ""
        };
        angular.element(document.querySelector('#fileInput')).val(null);
        $scope.index = -1;
    };

    // Get selected laptop
    $scope.edit = function (index) {
        $scope.index = index;
        $scope.laptop = angular.copy($scope.listProduct[index]);
    };
});