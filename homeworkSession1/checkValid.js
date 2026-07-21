function validateName() {
  const nameInput = document.getElementById("customerName");
  const errorEl = document.getElementById("nameError");
  const value = nameInput.value;

  // Regex: chỉ cho phép chữ cái (có dấu tiếng Việt) và khoảng trắng
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]*$/;

  if (!nameRegex.test(value)) {
    errorEl.textContent = "Họ tên chỉ được nhập chữ, không được nhập số hoặc ký tự đặc biệt.";
    errorEl.classList.add("active");
    nameInput.classList.add("invalid");
    return false;
  } else {
    errorEl.textContent = "";
    errorEl.classList.remove("active");
    nameInput.classList.remove("invalid");
    return true;
  }
}