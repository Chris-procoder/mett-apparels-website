// Shopping Cart System
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('mett-cart') || '[]');
    this.init();
    this.updateCartCount();
  }

  init() {
    this.createCartModal();
    this.bindEvents();
  }

  createCartModal() {
    const modal = document.createElement('div');
    modal.id = 'cart-modal';
    modal.className = 'cart-modal';
    modal.innerHTML = `
      <div class="cart-modal-content">
        <div class="cart-header">
          <h2>Shopping Cart</h2>
          <button class="close-cart" id="close-cart">&times;</button>
        </div>
        
        <div class="cart-content">
          <div id="cart-items" class="cart-items">
            <!-- Cart items will be populated here -->
          </div>
          
          <div id="cart-empty" class="cart-empty" style="display: none;">
            <div class="empty-cart-icon">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <h3>Your cart is empty</h3>
            <p>Add some beautiful custom garments to get started!</p>
            <button class="btn btn-primary" id="browse-collections">Browse Collections</button>
          </div>
        </div>
        
        <div class="cart-footer" id="cart-footer">
          <div class="cart-summary">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span id="cart-subtotal">$0</span>
            </div>
            <div class="summary-row">
              <span>Tax (8.5%):</span>
              <span id="cart-tax">$0</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span id="cart-total">$0</span>
            </div>
          </div>
          <div class="cart-actions">
            <button class="btn btn-outline" id="clear-cart">Clear Cart</button>
            <button class="btn btn-primary" id="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  bindEvents() {
    // Open cart
    document.addEventListener('click', (e) => {
      if (e.target.closest('.cart-icon a')) {
        e.preventDefault();
        this.openCart();
      }
    });

    // Close cart
    document.addEventListener('click', (e) => {
      if (e.target.matches('#close-cart') || e.target.matches('.cart-modal')) {
        this.closeCart();
      }
    });

    // Cart actions
    document.addEventListener('click', (e) => {
      if (e.target.matches('#clear-cart')) {
        this.clearCart();
      } else if (e.target.matches('#checkout-btn')) {
        this.checkout();
      } else if (e.target.matches('#browse-collections')) {
        this.closeCart();
        document.getElementById('collections').scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Item actions
    document.addEventListener('click', (e) => {
      if (e.target.matches('.remove-item')) {
        this.removeItem(e.target.dataset.itemId);
      } else if (e.target.matches('.quantity-btn')) {
        this.updateQuantity(e.target.dataset.itemId, e.target.dataset.action);
      }
    });

    // Add to cart from price calculator
    document.addEventListener('click', (e) => {
      if (e.target.matches('#add-to-cart-btn')) {
        this.addFromCalculator();
      }
    });
  }

  openCart() {
    this.renderCart();
    document.getElementById('cart-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  addItem(item) {
    const existingItem = this.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += item.quantity || 1;
    } else {
      this.items.push({
        id: item.id || Date.now(),
        name: item.name,
        type: item.type,
        fabric: item.fabric,
        price: item.price,
        quantity: item.quantity || 1,
        customizations: item.customizations || [],
        image: item.image || 'https://placehold.co/100x120/f0f0f0/333?text=Garment'
      });
    }
    
    this.saveCart();
    this.updateCartCount();
    this.showMessage(`${item.name} added to cart!`, 'success');
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id != itemId);
    this.saveCart();
    this.updateCartCount();
    this.renderCart();
  }

  updateQuantity(itemId, action) {
    const item = this.items.find(i => i.id == itemId);
    if (!item) return;

    if (action === 'increase') {
      item.quantity++;
    } else if (action === 'decrease' && item.quantity > 1) {
      item.quantity--;
    }

    this.saveCart();
    this.updateCartCount();
    this.renderCart();
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.items = [];
      this.saveCart();
      this.updateCartCount();
      this.renderCart();
    }
  }

  renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');

    if (this.items.length === 0) {
      cartItems.style.display = 'none';
      cartEmpty.style.display = 'block';
      cartFooter.style.display = 'none';
      return;
    }

    cartItems.style.display = 'block';
    cartEmpty.style.display = 'none';
    cartFooter.style.display = 'block';

    cartItems.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <div class="item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="item-details">
          <h4>${item.name}</h4>
          <p class="item-type">${item.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          <p class="item-fabric">Fabric: ${item.fabric}</p>
          ${item.customizations.length > 0 ? `
            <div class="item-customizations">
              <small>Customizations: ${item.customizations.join(', ')}</small>
            </div>
          ` : ''}
        </div>
        <div class="item-quantity">
          <button class="quantity-btn" data-item-id="${item.id}" data-action="decrease">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" data-item-id="${item.id}" data-action="increase">+</button>
        </div>
        <div class="item-price">
          <span class="price">$${(item.price * item.quantity).toLocaleString()}</span>
          <button class="remove-item" data-item-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    this.updateCartSummary();
  }

  updateCartSummary() {
    const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.085;
    const total = subtotal + tax;

    document.getElementById('cart-subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('cart-tax').textContent = `$${tax.toLocaleString()}`;
    document.getElementById('cart-total').textContent = `$${total.toLocaleString()}`;
  }

  updateCartCount() {
    const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = count;
      cartCountElement.style.display = count > 0 ? 'inline' : 'none';
    }
  }

  addFromCalculator() {
    // Get current calculation from price calculator
    const calculator = window.priceCalculatorInstance;
    if (!calculator || !calculator.currentCalculation.garmentType) {
      this.showMessage('Please complete the price calculation first!', 'error');
      return;
    }

    const calc = calculator.currentCalculation;
    const garmentName = calc.garmentType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const fabricName = calc.fabric ? calculator.fabricPricing[calc.fabric].name : 'Standard';
    
    const item = {
      id: Date.now(),
      name: `Custom ${garmentName}`,
      type: calc.garmentType,
      fabric: fabricName,
      price: calc.totalPrice,
      quantity: 1,
      customizations: calc.customizations.map(c => calculator.customizations[c].name),
      image: `https://placehold.co/100x120/f0f0f0/333?text=${garmentName.replace(' ', '+')}`
    };

    this.addItem(item);
    
    // Close calculator
    document.getElementById('price-calculator-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  checkout() {
    if (this.items.length === 0) return;

    // Create checkout summary
    const checkoutData = {
      items: this.items,
      subtotal: this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      tax: this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.085,
      total: this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.085,
      timestamp: new Date().toISOString()
    };

    // Save checkout data
    localStorage.setItem('mett-checkout', JSON.stringify(checkoutData));

    // Close cart
    this.closeCart();

    // Redirect to appointment booking with pre-filled information
    document.getElementById('appointment-form').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill the message field with order details
    const messageField = document.getElementById('message');
    if (messageField) {
      const orderSummary = this.items.map(item => 
        `${item.name} (${item.fabric}) - $${(item.price * item.quantity).toLocaleString()}`
      ).join('\n');
      
      messageField.value = `I would like to proceed with the following order:\n\n${orderSummary}\n\nTotal: $${checkoutData.total.toLocaleString()}\n\nPlease contact me to schedule fittings and finalize the order.`;
    }

    this.showMessage('Redirected to booking form. Please complete your appointment!', 'success');
  }

  saveCart() {
    localStorage.setItem('mett-cart', JSON.stringify(this.items));
  }

  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `cart-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      font-weight: 500;
      z-index: 10001;
      animation: slideIn 0.3s ease;
    `;

    if (type === 'success') messageDiv.style.background = '#27ae60';
    else if (type === 'error') messageDiv.style.background = '#e74c3c';
    else messageDiv.style.background = '#3498db';

    document.body.appendChild(messageDiv);

    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Public methods
  getCartItems() {
    return this.items;
  }

  getCartTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}

// Initialize Shopping Cart
document.addEventListener('DOMContentLoaded', () => {
  window.shoppingCartInstance = new ShoppingCart();
});
