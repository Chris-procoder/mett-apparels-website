// Price Calculator - Dynamic pricing based on garment type, fabric, and customizations
class PriceCalculator {
  constructor() {
    this.basePrice = {
      'mens-suit': 800,
      'womens-dress': 600,
      'evening-gown': 1200,
      'casual-wear': 400,
      'business-attire': 700,
      'wedding-dress': 1500,
      'mens-shirt': 200,
      'womens-blouse': 180,
      'trousers': 300,
      'skirt': 250,
      'jacket': 500,
      'coat': 800
    };

    this.fabricPricing = {
      'cotton': { multiplier: 1.0, name: 'Premium Cotton' },
      'wool': { multiplier: 1.3, name: 'Fine Wool' },
      'silk': { multiplier: 1.8, name: 'Pure Silk' },
      'linen': { multiplier: 1.2, name: 'Belgian Linen' },
      'cashmere': { multiplier: 2.5, name: 'Cashmere' },
      'velvet': { multiplier: 1.6, name: 'Luxury Velvet' },
      'satin': { multiplier: 1.4, name: 'Duchess Satin' },
      'tweed': { multiplier: 1.5, name: 'Harris Tweed' }
    };

    this.customizations = {
      'monogram': { price: 50, name: 'Personal Monogram' },
      'lining': { price: 100, name: 'Custom Lining' },
      'buttons': { price: 75, name: 'Designer Buttons' },
      'pockets': { price: 60, name: 'Additional Pockets' },
      'embroidery': { price: 150, name: 'Hand Embroidery' },
      'beading': { price: 200, name: 'Beadwork Detail' },
      'rush-order': { price: 200, name: 'Rush Order (1 week)' },
      'fitting-sessions': { price: 100, name: 'Extra Fitting Session' }
    };

    this.currentCalculation = {
      garmentType: '',
      fabric: '',
      customizations: [],
      basePrice: 0,
      fabricCost: 0,
      customizationCost: 0,
      totalPrice: 0
    };

    this.init();
  }

  init() {
    this.createCalculatorModal();
    this.bindEvents();
  }

  createCalculatorModal() {
    const modal = document.createElement('div');
    modal.id = 'price-calculator-modal';
    modal.className = 'calculator-modal';
    modal.innerHTML = `
      <div class="calculator-modal-content">
        <div class="calculator-header">
          <h2>Price Calculator</h2>
          <button class="close-calculator" id="close-calculator">&times;</button>
        </div>

        <div class="calculator-content">
          <div class="calculator-step active">
            <h3>1. Select Garment Type</h3>
            <div class="garment-grid">
              <div class="garment-option" data-type="mens-suit">
                <img src="https://placehold.co/150x200/f0f0f0/333?text=Men's+Suit" alt="Men's Suit">
                <h4>Men's Suit</h4>
                <p>Starting at $800</p>
              </div>
              <div class="garment-option" data-type="womens-dress">
                <img src="https://placehold.co/150x200/f0f0f0/333?text=Women's+Dress" alt="Women's Dress">
                <h4>Women's Dress</h4>
                <p>Starting at $600</p>
              </div>
              <div class="garment-option" data-type="evening-gown">
                <img src="https://placehold.co/150x200/f0f0f0/333?text=Evening+Gown" alt="Evening Gown">
                <h4>Evening Gown</h4>
                <p>Starting at $1,200</p>
              </div>
              <div class="garment-option" data-type="casual-wear">
                <img src="https://placehold.co/150x200/f0f0f0/333?text=Casual+Wear" alt="Casual Wear">
                <h4>Casual Wear</h4>
                <p>Starting at $400</p>
              </div>
              <div class="garment-option" data-type="business-attire">
                <img src="https://placehold.co/150x200/f0f0f0/333?text=Business+Attire" alt="Business Attire">
                <h4>Business Attire</h4>
                <p>Starting at $700</p>
              </div>
              <div class="garment-option" data-type="wedding-dress">
                <img src="https://placehold.co/150x200/f0f0f0/333?text=Wedding+Dress" alt="Wedding Dress">
                <h4>Wedding Dress</h4>
                <p>Starting at $1,500</p>
              </div>
            </div>
          </div>

          <div class="calculator-step" id="fabric-selection" style="display: none;">
            <h3>2. Choose Fabric</h3>
            <div class="fabric-grid">
              <div class="fabric-option" data-fabric="cotton">
                <div class="fabric-swatch cotton-swatch"></div>
                <h4>Premium Cotton</h4>
                <p>Base Price</p>
              </div>
              <div class="fabric-option" data-fabric="wool">
                <div class="fabric-swatch wool-swatch"></div>
                <h4>Fine Wool</h4>
                <p>+30%</p>
              </div>
              <div class="fabric-option" data-fabric="silk">
                <div class="fabric-swatch silk-swatch"></div>
                <h4>Pure Silk</h4>
                <p>+80%</p>
              </div>
              <div class="fabric-option" data-fabric="linen">
                <div class="fabric-swatch linen-swatch"></div>
                <h4>Belgian Linen</h4>
                <p>+20%</p>
              </div>
              <div class="fabric-option" data-fabric="cashmere">
                <div class="fabric-swatch cashmere-swatch"></div>
                <h4>Cashmere</h4>
                <p>+150%</p>
              </div>
              <div class="fabric-option" data-fabric="velvet">
                <div class="fabric-swatch velvet-swatch"></div>
                <h4>Luxury Velvet</h4>
                <p>+60%</p>
              </div>
            </div>
          </div>

          <div class="calculator-step" id="customization-selection" style="display: none;">
            <h3>3. Add Customizations</h3>
            <div class="customization-grid">
              <div class="customization-option" data-custom="monogram">
                <div class="custom-icon"><i class="fas fa-font"></i></div>
                <h4>Personal Monogram</h4>
                <p>+$50</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
              <div class="customization-option" data-custom="lining">
                <div class="custom-icon"><i class="fas fa-tshirt"></i></div>
                <h4>Custom Lining</h4>
                <p>+$100</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
              <div class="customization-option" data-custom="buttons">
                <div class="custom-icon"><i class="fas fa-circle"></i></div>
                <h4>Designer Buttons</h4>
                <p>+$75</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
              <div class="customization-option" data-custom="pockets">
                <div class="custom-icon"><i class="fas fa-square"></i></div>
                <h4>Additional Pockets</h4>
                <p>+$60</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
              <div class="customization-option" data-custom="embroidery">
                <div class="custom-icon"><i class="fas fa-leaf"></i></div>
                <h4>Hand Embroidery</h4>
                <p>+$150</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
              <div class="customization-option" data-custom="beading">
                <div class="custom-icon"><i class="fas fa-gem"></i></div>
                <h4>Beadwork Detail</h4>
                <p>+$200</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
              <div class="customization-option" data-custom="rush-order">
                <div class="custom-icon"><i class="fas fa-clock"></i></div>
                <h4>Rush Order (1 week)</h4>
                <p>+$200</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
              <div class="customization-option" data-custom="fitting-sessions">
                <div class="custom-icon"><i class="fas fa-user-check"></i></div>
                <h4>Extra Fitting Session</h4>
                <p>+$100</p>
                <input type="checkbox" class="custom-checkbox">
              </div>
            </div>
          </div>

          <div class="price-summary" id="price-summary" style="display: none;">
            <h3>Price Breakdown</h3>
            <div class="summary-details">
              <div class="summary-row">
                <span class="summary-label">Base Price:</span>
                <span class="summary-value" id="base-price-display">$0</span>
              </div>
              <div class="summary-row">
                <span class="summary-label">Fabric Cost:</span>
                <span class="summary-value" id="fabric-cost-display">$0</span>
              </div>
              <div class="summary-row" id="customization-row" style="display: none;">
                <span class="summary-label">Customizations:</span>
                <span class="summary-value" id="customization-cost-display">$0</span>
              </div>
              <div class="summary-row total-row">
                <span class="summary-label">Total Price:</span>
                <span class="summary-value" id="total-price-display">$0</span>
              </div>
            </div>
            <div class="price-actions">
              <button class="btn btn-primary" id="add-to-cart-btn">Add to Cart</button>
              <button class="btn btn-primary" id="book-consultation">Book Consultation</button>
              <button class="btn btn-outline" id="save-quote">Save Quote</button>
              <button class="btn btn-outline" id="share-quote">Share Quote</button>
            </div>
            <div class="price-note">
              <p><i class="fas fa-info-circle"></i> Final price may vary based on specific requirements and measurements. This is an estimate for planning purposes.</p>
            </div>
          </div>
        </div>

        <div class="calculator-navigation">
          <button class="btn btn-outline" id="calc-prev-step" style="display: none;">Previous</button>
          <button class="btn btn-primary" id="calc-next-step" style="display: none;">Next</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  bindEvents() {
    // Open calculator
    document.addEventListener('click', (e) => {
      if (e.target.matches('#price-calculator-btn') || e.target.closest('#price-calculator-btn')) {
        this.openCalculator();
      }
    });

    // Close calculator
    document.addEventListener('click', (e) => {
      if (e.target.matches('#close-calculator')) {
        this.closeCalculator();
      }
      if (e.target.matches('.calculator-modal') && !e.target.closest('.calculator-modal-content')) {
        this.closeCalculator();
      }
    });

    // Garment selection
    document.addEventListener('click', (e) => {
      if (e.target.closest('.garment-option')) {
        this.selectGarment(e.target.closest('.garment-option'));
      }
    });

    // Fabric selection
    document.addEventListener('click', (e) => {
      if (e.target.closest('.fabric-option')) {
        this.selectFabric(e.target.closest('.fabric-option'));
      }
    });

    // Customization selection
    document.addEventListener('change', (e) => {
      if (e.target.matches('.custom-checkbox')) {
        this.toggleCustomization(e.target);
      }
    });

    // Navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('#calc-next-step')) {
        this.nextStep();
      } else if (e.target.matches('#calc-prev-step')) {
        this.prevStep();
      }
    });

    // Actions
    document.addEventListener('click', (e) => {
      if (e.target.matches('#add-to-cart-btn')) {
        this.addToCart();
      } else if (e.target.matches('#book-consultation')) {
        this.bookConsultation();
      } else if (e.target.matches('#save-quote')) {
        this.saveQuote();
      } else if (e.target.matches('#share-quote')) {
        this.shareQuote();
      }
    });
  }

  openCalculator() {
    const modal = document.getElementById('price-calculator-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      console.log('Price calculator opened');
    } else {
      console.error('Price calculator modal not found');
    }
  }

  closeCalculator() {
    document.getElementById('price-calculator-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  selectGarment(element) {
    // Remove previous selection
    document.querySelectorAll('.garment-option').forEach(opt => opt.classList.remove('selected'));
    
    // Add selection
    element.classList.add('selected');
    
    // Store selection
    this.currentCalculation.garmentType = element.dataset.type;
    this.currentCalculation.basePrice = this.basePrice[element.dataset.type];
    
    // Show fabric selection
    const fabricSection = document.getElementById('fabric-selection');
    if (fabricSection) {
      fabricSection.style.display = 'block';
    }
    
    this.updatePriceSummary();
    console.log('Garment selected:', this.currentCalculation.garmentType);
  }

  selectFabric(element) {
    // Remove previous selection
    document.querySelectorAll('.fabric-option').forEach(opt => opt.classList.remove('selected'));
    
    // Add selection
    element.classList.add('selected');
    
    // Store selection
    this.currentCalculation.fabric = element.dataset.fabric;
    
    // Show customization selection
    const customSection = document.getElementById('customization-selection');
    if (customSection) {
      customSection.style.display = 'block';
    }
    
    this.updatePriceSummary();
    console.log('Fabric selected:', this.currentCalculation.fabric);
  }

  toggleCustomization(checkbox) {
    const customType = checkbox.closest('.customization-option').dataset.custom;
    
    if (checkbox.checked) {
      if (!this.currentCalculation.customizations.includes(customType)) {
        this.currentCalculation.customizations.push(customType);
      }
      checkbox.closest('.customization-option').classList.add('selected');
    } else {
      this.currentCalculation.customizations = this.currentCalculation.customizations.filter(c => c !== customType);
      checkbox.closest('.customization-option').classList.remove('selected');
    }
    
    this.updatePriceSummary();
  }

  updatePriceSummary() {
    if (!this.currentCalculation.garmentType) return;

    // Calculate fabric cost
    const fabricMultiplier = this.currentCalculation.fabric ? 
      this.fabricPricing[this.currentCalculation.fabric].multiplier : 1.0;
    
    this.currentCalculation.fabricCost = this.currentCalculation.basePrice * (fabricMultiplier - 1);

    // Calculate customization cost
    this.currentCalculation.customizationCost = this.currentCalculation.customizations.reduce((total, custom) => {
      return total + this.customizations[custom].price;
    }, 0);

    // Calculate total
    this.currentCalculation.totalPrice = this.currentCalculation.basePrice + 
      this.currentCalculation.fabricCost + this.currentCalculation.customizationCost;

    // Update display elements if they exist
    const basePriceEl = document.getElementById('base-price-display');
    const fabricCostEl = document.getElementById('fabric-cost-display');
    const customCostEl = document.getElementById('customization-cost-display');
    const totalPriceEl = document.getElementById('total-price-display');
    const priceSummaryEl = document.getElementById('price-summary');

    if (basePriceEl) basePriceEl.textContent = `$${this.currentCalculation.basePrice.toLocaleString()}`;
    if (fabricCostEl) fabricCostEl.textContent = `$${Math.round(this.currentCalculation.fabricCost).toLocaleString()}`;
    if (customCostEl) customCostEl.textContent = `$${this.currentCalculation.customizationCost.toLocaleString()}`;
    if (totalPriceEl) totalPriceEl.textContent = `$${Math.round(this.currentCalculation.totalPrice).toLocaleString()}`;

    // Show/hide customization row
    const customRow = document.getElementById('customization-row');
    if (customRow) {
      if (this.currentCalculation.customizationCost > 0) {
        customRow.style.display = 'flex';
      } else {
        customRow.style.display = 'none';
      }
    }

    // Show price summary
    if (priceSummaryEl) {
      priceSummaryEl.style.display = 'block';
    }

    console.log('Price updated:', this.currentCalculation);
  }

  nextStep() {
    // Logic for step navigation if needed
    console.log('Next step');
  }

  prevStep() {
    // Logic for step navigation if needed
    console.log('Previous step');
  }

  bookConsultation() {
    // Save current quote
    this.saveQuote();
    
    // Close calculator
    this.closeCalculator();
    
    // Scroll to appointment form
    document.getElementById('appointment-form').scrollIntoView({ behavior: 'smooth' });
    
    // Pre-fill service type
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      serviceSelect.value = 'made-to-measure';
    }
  }

  saveQuote() {
    const quote = {
      ...this.currentCalculation,
      timestamp: new Date().toISOString(),
      id: Date.now()
    };
    
    // Save to localStorage
    const savedQuotes = JSON.parse(localStorage.getItem('mett-quotes') || '[]');
    savedQuotes.push(quote);
    localStorage.setItem('mett-quotes', JSON.stringify(savedQuotes));
    
    this.showMessage('Quote saved successfully!', 'success');
  }

  addToCart() {
    if (!this.currentCalculation.garmentType) {
      this.showMessage('Please complete the price calculation first!', 'error');
      return;
    }

    const garmentName = this.currentCalculation.garmentType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const fabricName = this.currentCalculation.fabric ? 
      this.fabricPricing[this.currentCalculation.fabric].name : 'Standard';
    
    const item = {
      id: Date.now(),
      name: `Custom ${garmentName}`,
      type: this.currentCalculation.garmentType,
      fabric: fabricName,
      price: this.currentCalculation.totalPrice,
      quantity: 1,
      customizations: this.currentCalculation.customizations.map(c => this.customizations[c].name),
      image: `https://placehold.co/100x120/f0f0f0/333?text=${garmentName.replace(' ', '+')}`
    };

    // Add to cart using the shopping cart instance
    if (window.shoppingCartInstance) {
      window.shoppingCartInstance.addItem(item);
    }
    
    this.showMessage(`${item.name} added to cart!`, 'success');
  }

  shareQuote() {
    const garmentName = this.currentCalculation.garmentType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
    const fabricName = this.currentCalculation.fabric ? 
      this.fabricPricing[this.currentCalculation.fabric].name : 'Standard';
    
    const shareText = `Check out this custom ${garmentName} quote from Mett-Apperals:\n\n` +
      `Garment: ${garmentName}\n` +
      `Fabric: ${fabricName}\n` +
      `Total Price: $${this.currentCalculation.totalPrice.toLocaleString()}\n\n` +
      `Get your custom quote at mettapperals.com`;

    if (navigator.share) {
      navigator.share({
        title: 'My Custom Garment Quote',
        text: shareText,
        url: window.location.href
      });
    } else {
      // Fallback to copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        this.showMessage('Quote copied to clipboard!', 'success');
      });
    }
  }

  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `calculator-message ${type}`;
    messageDiv.textContent = message;
    
    document.querySelector('.calculator-modal-content').appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Public method to get saved quotes
  static getSavedQuotes() {
    return JSON.parse(localStorage.getItem('mett-quotes') || '[]');
  }
}

// Initialize Price Calculator
document.addEventListener('DOMContentLoaded', () => {
  window.priceCalculatorInstance = new PriceCalculator();
});
