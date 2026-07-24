const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
1
const TAX = 0.08;
let products = [{ name: "Sản phẩm 1", price: 450000 },
            { name: "Sản phẩm 2", price: 520000 },
            { name: "Sản phẩm 3", price: 550000 }];

let cart = [];
productCart();

let isMember = false; 
 
let discount = isMember == true ? 0.05 : 0;

let finalPrice = cart - (cart * discount) + (cart * TAX);  

// console.log("Total price: " + finalPrice);

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
    readline.close();
  });
}

