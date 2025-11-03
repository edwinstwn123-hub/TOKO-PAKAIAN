const products = [
  { id: 1, name: "Jaket Kulit", price: 350000, image: "jaket kulit.jpeg" },
  { id: 2, name: "Jaket hoodie", price: 150000, image: "hoodie.jpeg" },
  { id: 3, name: "Work Jaket", price: 300000, image: "work jaket.jpg" },
  { id: 4, name: "T-Shirt", price: 80000, image: "baju.jpg" },
  { id: 5, name: "Long sleeve", price: 130000, image: "baju longsleve.jpeg" },
  { id: 6, name: "Celana Gunung", price:170000, image: "celana gunung.jpeg" },
  { id: 7, name: "Celana Training", price: 100000, image: "celana training.jpeg" },
  { id: 8, name: "Celana Cargo", price: 150000, image: "celana cargo.jpg" },
  
];

const productContainer = document.getElementById("products");
const cartContainer = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const bayarInput = document.getElementById("bayar");
const kembalianEl = document.getElementById("kembalian");

let cart = [];

// 🔹 Tampilkan semua produk
function renderProducts() {
  products.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>Rp ${p.price.toLocaleString()}</p>
      <button onclick="addToCart(${p.id})">Tambah</button>
    `;
    productContainer.appendChild(div);
  });
}

// 🔹 Tambah produk ke keranjang
function addToCart(id) {
  const item = products.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  renderCart();
}

// 🔹 Tampilkan isi keranjang
function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.qty} - Rp ${(item.price * item.qty).toLocaleString()}`;
    cartContainer.appendChild(li);
  });
  totalEl.textContent = `Total: Rp ${total.toLocaleString()}`;
  return total;
}

// 🔹 Proses pembayaran
document.getElementById("checkout").addEventListener("click", () => {
  const total = renderCart();
  const bayar = parseInt(bayarInput.value);

  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  if (isNaN(bayar) || bayar <= 0) {
    alert("Masukkan nominal pembayaran yang valid!");
    return;
  }

  if (bayar < total) {
    alert("Uang anda kurang! Silakan tambahkan nominal pembayaran.");
    kembalianEl.textContent = "";
    return;
  }

  const kembalian = bayar - total;
  kembalianEl.textContent = `Kembalian: Rp ${kembalian.toLocaleString()}`;

  alert("💖 Terima kasih sudah belanja di Warung Madura!");
  cart = [];
  renderCart();
  bayarInput.value = "";
});

renderProducts();
