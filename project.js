let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    saveCart();
    updateCart();
    showNotification(`${product} added to cart!`); // Add notification
}

function removeFromCart(product) {
    cart = cart.filter(item => item.product !== product);
    saveCart();
    updateCart();
    showNotification(`${product} removed from cart!`); // Add notification
}

function clearCart() {
    cart = [];
    saveCart();
    updateCart();
    showNotification("Cart cleared!"); // Add notification
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    const cartList = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.cart-total');
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.product} (x${item.quantity}) - ₹${item.price * item.quantity}`;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.style.marginLeft = "10px";
        removeBtn.onclick = () => removeFromCart(item.product);

        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });

    totalElement.textContent = `Total: ₹${total}`;
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add some products first.");
        return;
    }
    alert(`Thank you for your purchase! Your total is ₹${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}`);
    clearCart();
    showNotification("Checkout successful!"); // Add notification
}

// Notification Function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = '#4CAF50';
    notification.style.color = 'white';
    notification.style.padding = '10px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove after 3 seconds
}

// Function to Toggle Cart Visibility.
function toggleCart() {
    const cartSection = document.querySelector('.cart');
    cartSection.style.display = cartSection.style.display === 'block' ? 'none' : 'block';
}

// Function to handle Search (Placeholder)
function handleSearch() {
    const searchTerm = prompt("Enter your search term:");
    if (searchTerm) {
        alert(`Searching for: ${searchTerm}`);
        //Implement search logic here.
    }
}

// Event Listener for Search Icon
document.querySelector('.search-icon').addEventListener('click', handleSearch);

// Initial cart update
updateCart();