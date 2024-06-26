// Hàm đặt đánh giá
function setRating(rating) {
  currentRating = rating;
  var stars = document.querySelectorAll("#rating span");
  stars.forEach(function (star, index) {
    if (index < rating) {
      star.style.color = "orange";
    } else {
      star.style.color = "gray";
    }
  });
}

// Hàm gửi bình luận và đánh giá
function submitComment() {
  var name = document.getElementById("name").value;
  var comment = document.getElementById("comment").value;

  var newComment = { name: name, comment: comment, rating: currentRating };

  // Lấy danh sách bình luận từ Local Storage (nếu có)
  var comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(newComment);

  // Lưu danh sách bình luận và đánh giá vào Local Storage
  localStorage.setItem("comments", JSON.stringify(comments));

  displayComments();

  var successMessage = document.getElementById("success-message");
  successMessage.style.display = "block";

  setTimeout(function () {
    successMessage.style.display = "none";
  }, 2000);

  // Reset các trường input
  document.getElementById("name").value = "";
  document.getElementById("comment").value = "";
  setRating(0); // Reset đánh giá về mặc định
}

// Hàm hiển thị danh sách bình luận
function displayComments() {
  var commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = "";

  // Lấy danh sách bình luận từ Local Storage (nếu có)
  var comments = JSON.parse(localStorage.getItem("comments")) || [];

  if (comments.length === 0) {
    var noCommentsMessage = document.createElement("div");
    noCommentsMessage.textContent = "Chưa có đánh giá nào.";
    commentsDiv.appendChild(noCommentsMessage);
  } else {
    comments.forEach(function (comment) {
      var commentElement = document.createElement("div");
      commentElement.innerHTML =
        "<b>" +
        comment.name +
        ":</b> " +
        comment.comment +
        " - Đánh giá: " +
        comment.rating +
        " sao";
      commentsDiv.appendChild(commentElement);
    });
  }
}

// Gọi hàm displayComments() khi trang web được tải
window.onload = function () {
  displayComments();
};
