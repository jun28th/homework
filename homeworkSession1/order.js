function handleCheckout() {
  const hasProducts = products.some(p => p.quantity > 0);

  if (!hasProducts) {
    alert("Vui lòng lựa chọn sản phẩm");
  }

  else alert("Đặt hàng thành công!");

  // Reset toàn bộ giỏ hàng về 0
  products.forEach(p => p.quantity = 0);

  // Reset form
  document.getElementById("customerName").value = "";
  document.getElementById("customerAddress").value = "";
  document.getElementById("isMember").checked = false;

  // Render lại toàn bộ giao diện
  renderProducts();
  updateCartCount();
  renderCartItems();
  updateSummary();

  // Đóng sidebar giỏ hàng lại
  document.getElementById("cartSidebar").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
}