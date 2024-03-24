// Function to close the popup form
function closePopup() {
  const popupForm = document.getElementById('popup-form');
  const overlay = document.getElementById('overlay');
  popupForm.style.display = 'none';
  overlay.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  const orderButtons = document.querySelectorAll('.order-now');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const popupForm = document.getElementById('popup-form');
  const overlay = document.getElementById('overlay');
  const orderForm = document.getElementById('order-form');
  const foodNameField = document.getElementById('food-name');
  const foodPriceField = document.getElementById('food-price');
  const foodNameDisplay = document.getElementById('food-name-display');
  const foodPriceDisplay = document.getElementById('food-price-display');
  const cartButton = document.getElementById('cart-button');
  const cartContainer = document.getElementById('cart-container');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkout-button');
  let cart = [];

  // Function to update the cart UI
  function updateCartUI() {
    cartItemsContainer.innerHTML = ''; // Clear existing cart items
    let total = 0;
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <div>${item.name}</div>
        <div>${item.price}</div>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += parseInt(item.price);
    });
    cartTotal.textContent = `Total: $${total}`;
  }

  // Function to handle adding an item to the cart
  function addToCart(foodName, foodPrice) {
    cart.push({ name: foodName, price: foodPrice });
    updateCartUI();
  }

  // Add event listeners to order buttons
  orderButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.card');
      const foodName = card.getAttribute('data-food-name');
      const foodPrice = card.getAttribute('data-food-price');
      foodNameDisplay.value = foodName;
      foodPriceDisplay.value = foodPrice;
      foodNameField.value = foodName;
      foodPriceField.value = foodPrice;
      popupForm.style.display = 'block';
      overlay.style.display = 'block';
    });
  });

  // Add event listeners to add to cart buttons
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const card = this.closest('.card');
      const foodName = card.getAttribute('data-food-name');
      const foodPrice = card.getAttribute('data-food-price');
      addToCart(foodName, foodPrice);
    });
  });

  // Add event listener to cart button
  cartButton.addEventListener('click', function() {
    cartContainer.style.display = 'block';
    overlay.style.display = 'block';
  });

  // Add event listener to close cart button
  cartContainer.addEventListener('click', function(event) {
    if (event.target === overlay) {
      cartContainer.style.display = 'none';
      overlay.style.display = 'none';
    }
  });

  // Add event listener to checkout button
  checkoutButton.addEventListener('click', function() {
    // Implement checkout functionality here
    // For now, let's just clear the cart
    cart = [];
    updateCartUI();
    cartContainer.style.display = 'none';
    overlay.style.display = 'none';
    alert('Checkout successful!');
  });

  // Submit order form
  orderForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(orderForm);
    fetch('/recomandedItem/submit-order', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (response.ok) {
        popupForm.style.display = 'none';
        overlay.style.display = 'none';
        this.reset(); // Reset the form fields

        alert('Order submitted successfully!');
      } else {
        alert('Error submitting order!');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error submitting order!');
    });
  });
});