//Get the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// Khi người dùng nhấp vào nút, cuộn lên đầu trang
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function displayImage(img) {
    var displayBox = document.getElementById('displayBox');
    displayBox.innerHTML = "";
    var newImg = document.createElement('img');
    newImg.style.height = '270px';
    newImg.src = img.src;
    displayBox.appendChild(newImg);
}

// Đặt thời gian đếm ngược là 24 giờ 2 ngày sau từ thời điểm hiện tại
var now = new Date();
var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
var countDownDate = tomorrow.getTime();

// Cập nhật bộ đếm ngược sau mỗi 1 giây
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    // Tính toán số ngày, giờ, phút và giây còn lại
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị kết quả trên trang
    document.getElementById("countdown").innerHTML = days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây ";

    // Nếu bộ đếm ngược kết thúc, hiển thị thông báo
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "Đã hết giờ!";
    }
}, 1000);
