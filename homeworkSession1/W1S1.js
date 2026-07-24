const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const TAX = 0.08;
let products = [{ name: "Sản phẩm 1", price: 450000 },
            { name: "Sản phẩm 2", price: 520000 },
            { name: "Sản phẩm 3", price: 550000 }];

let cart = [];
let isMember = false; 

checkMember();

function productList() {
  console.log("\n--- DANH SÁCH SẢN PHẨM ---");
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.name} - ${product.price.toLocaleString()} VND`);
  });
  console.log("--------------------------");
}

function productCart() {
  productList();

  readline.question('Nhập số sản phẩm bạn muốn mua (VD: 1,3): ', (answer) => {
    const customerChoice = answer.split(',').map(s => s.trim());

    customerChoice.forEach((so) => {
      const index = parseInt(so) - 1; 
      if (index >= 0 && index < products.length) {
        cart.push(products[index].price);
        console.log(`Đã thêm: ${products[index].name}`);
      } else {
        console.log(`Số "${so}" không hợp lệ, bỏ qua.`);
      }
    });
    totalPrice();
  });
}

function checkMember() {
  readline.question('Bạn có phải là thành viên không? (Y/N): ', (answer) => {
    if (answer === 'Y') {
      isMember = true;
      productCart();
    } else if (answer === 'N') {
      isMember = false;
      productCart();
    } else {
      console.log("Vui lòng nhập Y hoặc N.");
      checkMember();
    }
  });
}

function totalPrice() {
    const subtotal = cart.reduce((total, price) => total + price, 0);
    let discount = isMember == true ? 0.05 : 0;
    let finalPrice = subtotal - (subtotal * discount) + (subtotal * TAX);  
    console.log("Tổng tiền: " + subtotal.toLocaleString() + " VND");
    console.log("Giảm giá thành viên: " + discount*100 + "%");
    console.log(`Thuế: ${(TAX * 100)}%`);
    console.log("Số tiền cần thanh toán: " + finalPrice);  
    askContinue();
}

function askContinue() {
  readline.question('Bạn có muốn mua thêm không? (Y/N): ', (answer) => {
    if (answer === 'Y') {
        cart = [];
        productCart();
    } else if (answer === 'N') {
        console.log("Cảm ơn bạn đã mua hàng!");
        readline.close();
    } else {
        console.log("Vui lòng nhập Y hoặc N.");
        askContinue();
    }
  });
}