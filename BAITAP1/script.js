// HÀM IN RA MÀN HÌNH 
const output = document.getElementById("output");
function print(text = "") {
  output.textContent += text + "\n";
}

// CÂU 1
// Khai báo constructor function Product
function Product(id, name, price, quantity, category, isAvailable) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.quantity = quantity;
  this.category = category;
  this.isAvailable = isAvailable;
}

print("Câu 1: Đã khai báo constructor Product");
print("");

// CÂU 2 
// Khởi tạo mảng products (ít nhất 6 sản phẩm, >= 2 danh mục)
const products = [
  new Product(1, "iPhone 15", 35000000, 10, "Electronics", true),
  new Product(2, "Samsung S24", 28000000, 5, "Electronics", true),
  new Product(3, "AirPods Pro", 6500000, 0, "Accessories", true),
  new Product(4, "Apple Watch", 12000000, 8, "Accessories", false),
  new Product(5, "Laptop Dell", 25000000, 3, "Electronics", true),
  new Product(6, "Chuột Logitech", 900000, 15, "Accessories", true)
];

print("Câu 2: Danh sách sản phẩm");
products.forEach(p => {
  print(`${p.id} - ${p.name} - ${p.category}`);
});
print("");

// CÂU 3
// Mảng mới chỉ chứa name, price
print("Câu 3: name + price");
products
  .map(p => ({ name: p.name, price: p.price }))
  .forEach(p => print(`${p.name} - ${p.price}`));
print("");

// CÂU 4 
// Lọc sản phẩm còn hàng (quantity > 0)
print("Câu 4: Sản phẩm còn hàng");
products
  .filter(p => p.quantity > 0)
  .forEach(p => print(p.name));
print("");

// CÂU 5 
// Kiểm tra có sản phẩm giá > 30.000.000 không
print("Câu 5: Có sản phẩm > 30.000.000 ?");
print(products.some(p => p.price > 30000000));
print("");

// CÂU 6 
// Kiểm tra tất cả Accessories có đang bán không
print("Câu 6: Accessories đang bán?");
print(
  products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable === true)
);
print("");

//  CÂU 7
// Tính tổng giá trị kho (price * quantity)
print("Câu 7: Tổng giá trị kho");
const totalValue = products.reduce(
  (sum, p) => sum + p.price * p.quantity,
  0
);
print(totalValue);
print("");

// CÂU 8 
// Dùng for...of duyệt mảng
print("Câu 8:");
for (const p of products) {
  print(`${p.name} - ${p.category} - ${p.isAvailable ? "Đang bán" : "Ngừng bán"}`);
}
print("");

// CÂU 9 
// Dùng for...in in tên thuộc tính và giá trị
print("Câu 9:");
for (const key in products[0]) {
  print(`${key}: ${products[0][key]}`);
}
print("");

// CÂU 10 
// Danh sách tên sản phẩm đang bán và còn hàng
print("Câu 10: Sản phẩm đang bán và còn hàng");
products
  .filter(p => p.isAvailable === true && p.quantity > 0)
  .forEach(p => print(p.name));
