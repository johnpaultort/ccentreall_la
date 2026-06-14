// cart.js
// handles all cart logic via localStorage

const CART_KEY = "brand_cart";ba

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(productId, size) {
  const product = products.find(p => p.id === productId);
  if (!product || product.soldOut) return false;

  const cart = getCart();
  const existing = cart.find(i => i.id === productId && i.size === size);

  if (existing) {
    existing.qty = Math.min(existing.qty + 1, 5); // max 5 per item
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      qty: 1
    });
  }

  saveCart(cart);
  showCartToast(product.name);
  return true;
}

function removeFromCart(productId, size) {
  let cart = getCart();
  cart = cart.filter(i => !(i.id === productId && i.size === size));
  saveCart(cart);
}

function updateQty(productId, size, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId && i.size === size);
  if (item) {
    if (qty <= 0) {
      removeFromCart(productId, size);
      return;
    }
    item.qty = Math.min(qty, 5);
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

// UI Cart functions

function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (badge) {
    const count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
  }
}

function showCartToast(productName) {
  let toast = document.getElementById("cart-toast");
  if (!toast) return;
  toast.textContent = `${productName} added to cart`;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

document.addEventListener("DOMContentLoaded", updateCartCount);