// Lấy tất cả thẻ <a> trong accordion
var accordionLinks = document.querySelectorAll('#accordionExample .nav-link');

// Gắn sự kiện click cho mỗi thẻ <a>
for (var i = 0; i < accordionLinks.length; i++) {
  accordionLinks[i].addEventListener('click', function(event) {
    // Ngăn chặn hành vi mặc định của thẻ <a>
    event.preventDefault();

    // Tìm accordion-collapse của thẻ <a> này
    var accordionCollapse = this.closest('.accordion-collapse');

    // Đóng accordion
    accordionCollapse.classList.remove('show');
  });
}

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