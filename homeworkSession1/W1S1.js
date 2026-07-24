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

productCart();
 
let discount = isMember == true ? 0.05 : 0;

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
    checkMember();
  });
}

function checkMember() {
  readline.question('Bạn có phải là thành viên không? (Y/N): ', (answer) => {
    if (answer === 'Y') {
      isMember = true;
      readline.close();
      totalPrice();
    } else if (answer === 'N') {
      isMember = false;
      readline.close();
      totalPrice();
    } else {
      console.log("Vui lòng nhập Y hoặc N.");
      checkMember();
    }
  });
}

function totalPrice() {
    let finalPrice = cart - (cart * discount) + (cart * TAX);  
    console.log("Tổng tiền: " + cart + " VND");
    console.log("Giảm giá thành viên: " + discount*10 + " %");
    console.log(`Thuế: ${(TAX * 100)}%`);
    console.log("Số tiền cần thanh toán: " + finalPrice);  
}