// Virtual Fitting Room - 3D Body Measurement Tool
class VirtualFittingRoom {
  constructor() {
    this.measurements = {
      chest: 0,
      waist: 0,
      hips: 0,
      shoulders: 0,
      armLength: 0,
      inseam: 0,
      height: 0,
      weight: 0
    };
    this.currentStep = 1;
    this.totalSteps = 8;
    this.init();
  }

  init() {
    this.createFittingRoomModal();
    this.bindEvents();
  }

  createFittingRoomModal() {
    const modal = document.createElement('div');
    modal.id = 'virtual-fitting-modal';
    modal.className = 'fitting-modal';
    modal.innerHTML = `
      <div class="fitting-modal-content">
        <div class="fitting-header">
          <h2>Virtual Fitting Room</h2>
          <button class="close-fitting" id="close-fitting">&times;</button>
        </div>
        
        <div class="fitting-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: 12.5%"></div>
          </div>
          <span class="progress-text">Step 1 of 8</span>
        </div>

        <div class="fitting-content">
          <div class="measurement-step active" data-step="1">
            <div class="step-visual">
              <div class="body-diagram">
                <img src="https://placehold.co/300x400/f0f0f0/333?text=Body+Diagram" alt="Body Measurement Guide">
                <div class="measurement-point chest-point" title="Chest Measurement"></div>
              </div>
            </div>
            <div class="step-form">
              <h3>Chest Measurement</h3>
              <p>Measure around the fullest part of your chest, keeping the tape horizontal.</p>
              <div class="input-group">
                <input type="number" id="chest" min="30" max="60" step="0.5" placeholder="36">
                <select class="unit-selector">
                  <option value="inches">inches</option>
                  <option value="cm">cm</option>
                </select>
              </div>
              <div class="measurement-tips">
                <h4>Tips for accurate measurement:</h4>
                <ul>
                  <li>Wear a well-fitting bra or undergarment</li>
                  <li>Keep the tape measure level and snug but not tight</li>
                  <li>Take the measurement at the end of a normal exhale</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="measurement-step" data-step="2">
            <div class="step-visual">
              <div class="body-diagram">
                <img src="https://placehold.co/300x400/f0f0f0/333?text=Body+Diagram" alt="Body Measurement Guide">
                <div class="measurement-point waist-point" title="Waist Measurement"></div>
              </div>
            </div>
            <div class="step-form">
              <h3>Waist Measurement</h3>
              <p>Measure around your natural waistline, typically the narrowest part of your torso.</p>
              <div class="input-group">
                <input type="number" id="waist" min="24" max="50" step="0.5" placeholder="28">
                <select class="unit-selector">
                  <option value="inches">inches</option>
                  <option value="cm">cm</option>
                </select>
              </div>
            </div>
          </div>

          <div class="measurement-step" data-step="3">
            <div class="step-visual">
              <div class="body-diagram">
                <img src="https://placehold.co/300x400/f0f0f0/333?text=Body+Diagram" alt="Body Measurement Guide">
                <div class="measurement-point hips-point" title="Hip Measurement"></div>
              </div>
            </div>
            <div class="step-form">
              <h3>Hip Measurement</h3>
              <p>Measure around the fullest part of your hips, typically 7-9 inches below your waist.</p>
              <div class="input-group">
                <input type="number" id="hips" min="30" max="55" step="0.5" placeholder="38">
                <select class="unit-selector">
                  <option value="inches">inches</option>
                  <option value="cm">cm</option>
                </select>
              </div>
            </div>
          </div>

          <div class="measurement-step" data-step="4">
            <div class="step-visual">
              <div class="body-diagram">
                <img src="https://placehold.co/300x400/f0f0f0/333?text=Body+Diagram" alt="Body Measurement Guide">
                <div class="measurement-point shoulders-point" title="Shoulder Measurement"></div>
              </div>
            </div>
            <div class="step-form">
              <h3>Shoulder Width</h3>
              <p>Measure from the edge of one shoulder to the edge of the other across your back.</p>
              <div class="input-group">
                <input type="number" id="shoulders" min="14" max="22" step="0.5" placeholder="17">
                <select class="unit-selector">
                  <option value="inches">inches</option>
                  <option value="cm">cm</option>
                </select>
              </div>
            </div>
          </div>

          <div class="measurement-step" data-step="5">
            <div class="step-visual">
              <div class="body-diagram">
                <img src="https://placehold.co/300x400/f0f0f0/333?text=Body+Diagram" alt="Body Measurement Guide">
                <div class="measurement-point arm-point" title="Arm Length"></div>
              </div>
            </div>
            <div class="step-form">
              <h3>Arm Length</h3>
              <p>Measure from your shoulder point to your wrist bone with your arm slightly bent.</p>
              <div class="input-group">
                <input type="number" id="armLength" min="20" max="28" step="0.5" placeholder="24">
                <select class="unit-selector">
                  <option value="inches">inches</option>
                  <option value="cm">cm</option>
                </select>
              </div>
            </div>
          </div>

          <div class="measurement-step" data-step="6">
            <div class="step-visual">
              <div class="body-diagram">
                <img src="https://placehold.co/300x400/f0f0f0/333?text=Body+Diagram" alt="Body Measurement Guide">
                <div class="measurement-point inseam-point" title="Inseam Measurement"></div>
              </div>
            </div>
            <div class="step-form">
              <h3>Inseam Length</h3>
              <p>Measure from your crotch to your ankle bone along the inside of your leg.</p>
              <div class="input-group">
                <input type="number" id="inseam" min="26" max="38" step="0.5" placeholder="32">
                <select class="unit-selector">
                  <option value="inches">inches</option>
                  <option value="cm">cm</option>
                </select>
              </div>
            </div>
          </div>

          <div class="measurement-step" data-step="7">
            <div class="step-visual">
              <div class="body-diagram">
                <img src="https://placehold.co/300x400/f0f0f0/333?text=Full+Body" alt="Height Measurement">
              </div>
            </div>
            <div class="step-form">
              <h3>Height & Weight</h3>
              <p>Your height and weight help us ensure the perfect proportions.</p>
              <div class="input-group">
                <label>Height:</label>
                <input type="number" id="height" min="4.5" max="7" step="0.1" placeholder="5.8">
                <select class="unit-selector">
                  <option value="feet">feet</option>
                  <option value="cm">cm</option>
                </select>
              </div>
              <div class="input-group">
                <label>Weight:</label>
                <input type="number" id="weight" min="90" max="300" step="1" placeholder="150">
                <select class="unit-selector">
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>
              </div>
            </div>
          </div>

          <div class="measurement-step" data-step="8">
            <div class="step-visual">
              <div class="measurement-summary">
                <h3>Your Measurements</h3>
                <div class="summary-grid">
                  <div class="summary-item">
                    <span class="label">Chest:</span>
                    <span class="value" id="summary-chest">--</span>
                  </div>
                  <div class="summary-item">
                    <span class="label">Waist:</span>
                    <span class="value" id="summary-waist">--</span>
                  </div>
                  <div class="summary-item">
                    <span class="label">Hips:</span>
                    <span class="value" id="summary-hips">--</span>
                  </div>
                  <div class="summary-item">
                    <span class="label">Shoulders:</span>
                    <span class="value" id="summary-shoulders">--</span>
                  </div>
                  <div class="summary-item">
                    <span class="label">Arm Length:</span>
                    <span class="value" id="summary-armLength">--</span>
                  </div>
                  <div class="summary-item">
                    <span class="label">Inseam:</span>
                    <span class="value" id="summary-inseam">--</span>
                  </div>
                  <div class="summary-item">
                    <span class="label">Height:</span>
                    <span class="value" id="summary-height">--</span>
                  </div>
                  <div class="summary-item">
                    <span class="label">Weight:</span>
                    <span class="value" id="summary-weight">--</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="step-form">
              <h3>Perfect! Your Virtual Profile is Ready</h3>
              <p>We'll use these measurements to recommend the perfect fit for all our garments.</p>
              <div class="profile-actions">
                <button class="btn btn-primary" id="save-measurements">Save My Profile</button>
                <button class="btn btn-outline" id="email-measurements">Email Measurements</button>
              </div>
            </div>
          </div>
        </div>

        <div class="fitting-navigation">
          <button class="btn btn-outline" id="prev-step" disabled>Previous</button>
          <button class="btn btn-primary" id="next-step">Next</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  bindEvents() {
    // Open fitting room
    document.addEventListener('click', (e) => {
      if (e.target.matches('#virtual-fitting-btn') || e.target.closest('#virtual-fitting-btn')) {
        this.openFittingRoom();
      }
    });

    // Close fitting room
    document.addEventListener('click', (e) => {
      if (e.target.matches('#close-fitting') || e.target.matches('.fitting-modal')) {
        this.closeFittingRoom();
      }
    });

    // Navigation
    document.addEventListener('click', (e) => {
      if (e.target.matches('#next-step')) {
        this.nextStep();
      } else if (e.target.matches('#prev-step')) {
        this.prevStep();
      }
    });

    // Save measurements
    document.addEventListener('click', (e) => {
      if (e.target.matches('#save-measurements')) {
        this.saveMeasurements();
      } else if (e.target.matches('#email-measurements')) {
        this.emailMeasurements();
      }
    });

    // Input validation
    document.addEventListener('input', (e) => {
      if (e.target.matches('.measurement-step input[type="number"]')) {
        this.validateInput(e.target);
      }
    });
  }

  openFittingRoom() {
    document.getElementById('virtual-fitting-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  closeFittingRoom() {
    document.getElementById('virtual-fitting-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      // Validate current step
      if (this.validateCurrentStep()) {
        this.currentStep++;
        this.updateStep();
      }
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStep();
    }
  }

  updateStep() {
    // Hide all steps
    document.querySelectorAll('.measurement-step').forEach(step => {
      step.classList.remove('active');
    });

    // Show current step
    document.querySelector(`[data-step="${this.currentStep}"]`).classList.add('active');

    // Update progress
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    const progress = (this.currentStep / this.totalSteps) * 100;
    
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Step ${this.currentStep} of ${this.totalSteps}`;

    // Update navigation buttons
    const prevBtn = document.getElementById('prev-step');
    const nextBtn = document.getElementById('next-step');
    
    prevBtn.disabled = this.currentStep === 1;
    
    if (this.currentStep === this.totalSteps) {
      nextBtn.style.display = 'none';
      this.updateSummary();
    } else {
      nextBtn.style.display = 'inline-block';
      nextBtn.textContent = 'Next';
    }
  }

  validateCurrentStep() {
    const currentStepElement = document.querySelector(`[data-step="${this.currentStep}"]`);
    const inputs = currentStepElement.querySelectorAll('input[type="number"]');
    
    for (let input of inputs) {
      if (!input.value || input.value <= 0) {
        input.style.borderColor = '#e74c3c';
        input.focus();
        return false;
      } else {
        input.style.borderColor = '#ddd';
      }
    }
    
    return true;
  }

  validateInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (value < min || value > max) {
      input.style.borderColor = '#e74c3c';
    } else {
      input.style.borderColor = '#27ae60';
    }
  }

  updateSummary() {
    // Collect all measurements
    this.measurements.chest = document.getElementById('chest').value;
    this.measurements.waist = document.getElementById('waist').value;
    this.measurements.hips = document.getElementById('hips').value;
    this.measurements.shoulders = document.getElementById('shoulders').value;
    this.measurements.armLength = document.getElementById('armLength').value;
    this.measurements.inseam = document.getElementById('inseam').value;
    this.measurements.height = document.getElementById('height').value;
    this.measurements.weight = document.getElementById('weight').value;

    // Update summary display
    Object.keys(this.measurements).forEach(key => {
      const summaryElement = document.getElementById(`summary-${key}`);
      if (summaryElement) {
        summaryElement.textContent = this.measurements[key] + '"';
      }
    });
  }

  saveMeasurements() {
    // Save to localStorage
    localStorage.setItem('mett-measurements', JSON.stringify(this.measurements));
    
    // Show success message
    this.showMessage('Your measurements have been saved successfully!', 'success');
    
    // Close modal after delay
    setTimeout(() => {
      this.closeFittingRoom();
    }, 2000);
  }

  emailMeasurements() {
    const measurementText = Object.entries(this.measurements)
      .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}"`)
      .join('\n');
    
    const subject = 'My Virtual Fitting Room Measurements';
    const body = `Hello,\n\nHere are my measurements from the Virtual Fitting Room:\n\n${measurementText}\n\nBest regards`;
    
    window.location.href = `mailto:info@mettapperals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  showMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `fitting-message ${type}`;
    messageDiv.textContent = message;
    
    document.querySelector('.fitting-modal-content').appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.remove();
    }, 3000);
  }

  // Public method to get saved measurements
  static getSavedMeasurements() {
    const saved = localStorage.getItem('mett-measurements');
    return saved ? JSON.parse(saved) : null;
  }
}

// Initialize Virtual Fitting Room
document.addEventListener('DOMContentLoaded', () => {
  new VirtualFittingRoom();
});
