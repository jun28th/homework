const products = [
  {
    name: "Áo thun",
    price: 450000,
    oldPrice: null,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80",
    quantity: 0,
  },
  {
    name: "Quần jean",
    price: 520000,
    oldPrice: null,
    image: "https://4menshop.com/images/thumbs/2022/05/quan-jeans-slimfit-qj048-mau-xanh-16793.JPG",
    quantity: 0,
  },
  {
    name: "Áo khoác",
    price: 300000,
    oldPrice: 550000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&q=80",
    quantity: 0,
  }
];

function formatPrice(n) {
  return n.toLocaleString("vi-VN") + "₫";
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = products.map((p, index) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}">
      </div>
      <div class="product-info">
        <h2>${p.name}</h2>
        <div class="price-row">
          <span class="price">
            ${p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : ""}
            ${formatPrice(p.price)}
          </span>
          <div class="qty-control">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">−</button>
            <span class="qty-value">${p.quantity}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCartItems() {
  const cartItemsEl = document.getElementById("cartItems");
  const selected = products.filter(p => p.quantity > 0);

  if (selected.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Chưa có sản phẩm nào trong giỏ.</p>`;
    return;
  }

  cartItemsEl.innerHTML = selected.map(p => `
    <div class="cart-item-row">
      <div>
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-meta">${formatPrice(p.price)} × ${p.quantity}</div>
      </div>
      <div>${formatPrice(p.price * p.quantity)}</div>
    </div>
  `).join("");
}

function updateCartCount() {
  const totalQty = products.reduce((sum, p) => sum + p.quantity, 0);
  document.getElementById("cartCount").textContent = totalQty;
}

function updateSummary() {
  // Tạm tính = giá gốc (nếu có oldPrice) × số lượng
  let subtotal = 0;
  let discount = 0;

  products.forEach(p => {
    if (p.quantity > 0) {
      const base = p.oldPrice || p.price;
      subtotal += base * p.quantity;
      if (p.oldPrice) {
        discount += (p.oldPrice - p.price) * p.quantity;
      }
    }
  });

  const afterDiscount = subtotal - discount;

  // Ưu đãi thành viên 5%
  const isMember = document.getElementById("isMember").checked;
  const memberDiscount = isMember ? afterDiscount * 0.05 : 0;

  const afterMember = afterDiscount - memberDiscount;

  // Thuế 8%
  const tax = afterMember * 0.08;

  const total = afterMember + tax;

  document.getElementById("sumSubtotal").textContent = formatPrice(subtotal);
  document.getElementById("sumDiscount").textContent = "-" + formatPrice(discount);
  document.getElementById("sumTax").textContent = formatPrice(tax);
  document.getElementById("sumTotal").textContent = formatPrice(total);

  const memberRow = document.getElementById("memberRow");
  if (isMember) {
    memberRow.style.display = "flex";
    document.getElementById("sumMember").textContent = "-" + formatPrice(memberDiscount);
  } else {
    memberRow.style.display = "none";
  }
}

function changeQty(index, delta) {
  const newQty = products[index].quantity + delta;
  if (newQty < 0) return; // không cho số âm
  products[index].quantity = newQty;
  renderProducts(); // render lại để cập nhật số hiển thị
  updateCartCount(); 
  renderCartItems();
  updateSummary();
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("active");
  document.getElementById("cartOverlay").classList.toggle("active");
  renderCartItems();
  updateSummary();
}

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

renderProducts();
updateCartCount(); 

