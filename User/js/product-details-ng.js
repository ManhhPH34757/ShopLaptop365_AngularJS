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

app.controller('ProductDetailsController', function($scope,$window) {
    $scope.selectedProduct = JSON.parse($window.localStorage.getItem('selectedProduct'));
    $scope.listProduct = list1;
});
