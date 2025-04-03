// Settings page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize settings page specific elements when content is loaded
    if (document.getElementById('settings-content')) {
        initSettingsPage();
    }
});

function initSettingsPage() {
    // Initialize form handlers
    setupGeneralSettingsForm();
    setupPaymentSettingsForm();
    setupLogoUpload();
    
    // Initialize system update checker
    setupSystemUpdateChecker();
}

function setupGeneralSettingsForm() {
    const generalSettingsForm = document.querySelector('.bg-white form:first-of-type');
    if (generalSettingsForm) {
        generalSettingsForm.addEventListener('submit', handleGeneralSettingsSubmit);
        
        // Setup currency change handler
        const currencySelect = document.querySelector('select:contains("USD ($)")');
        if (currencySelect) {
            currencySelect.addEventListener('change', handleCurrencyChange);
        }
        
        // Setup timezone change handler
        const timezoneSelect = document.querySelector('select:contains("UTC")');
        if (timezoneSelect) {
            timezoneSelect.addEventListener('change', handleTimezoneChange);
        }
    }
}

function setupPaymentSettingsForm() {
    const paymentSettings = document.querySelectorAll('input[type="checkbox"]');
    paymentSettings.forEach(checkbox => {
        checkbox.addEventListener('change', handlePaymentMethodToggle);
    });
}

function setupLogoUpload() {
    const fileInput = document.querySelector('input[type="file"]');
    const dropZone = document.querySelector('.border-dashed');
    
    if (fileInput && dropZone) {
        // File input change handler
        fileInput.addEventListener('change', handleFileSelect);
        
        // Drag and drop handlers
        dropZone.addEventListener('dragover', handleDragOver);
        dropZone.addEventListener('dragleave', handleDragLeave);
        dropZone.addEventListener('drop', handleDrop);
    }
}

function setupSystemUpdateChecker() {
    const updateButton = document.querySelector('button:contains("Check for Updates")');
    if (updateButton) {
        updateButton.addEventListener('click', checkForUpdates);
    }
}

function handleGeneralSettingsSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const settings = {
        storeName: formData.get('storeName'),
        storeEmail: formData.get('storeEmail'),
        currency: formData.get('currency'),
        timezone: formData.get('timezone')
    };
    
    console.log('Saving general settings:', settings);
    // Implement API call to save settings
}

function handleCurrencyChange(e) {
    console.log('Currency changed to:', e.target.value);
    // Implement currency change logic
}

function handleTimezoneChange(e) {
    console.log('Timezone changed to:', e.target.value);
    // Implement timezone change logic
}

function handlePaymentMethodToggle(e) {
    const method = e.target.nextElementSibling.textContent.trim();
    const enabled = e.target.checked;
    
    console.log(`Payment method ${method} ${enabled ? 'enabled' : 'disabled'}`);
    // Implement payment method toggle logic
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        uploadLogo(file);
    }
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('border-primary-500');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary-500');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('border-primary-500');
    
    const file = e.dataTransfer.files[0];
    if (file) {
        uploadLogo(file);
    }
}

function uploadLogo(file) {
    // Validate file
    if (!validateLogoFile(file)) {
        console.error('Invalid file type or size');
        return;
    }
    
    console.log('Uploading logo file:', file);
    // Implement logo upload logic
    
    // Update preview
    updateLogoPreview(file);
}

function validateLogoFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
}

function updateLogoPreview(file) {
    const reader = new FileReader();
    const preview = document.querySelector('.w-32.h-32 i');
    
    reader.onload = function(e) {
        // Replace icon with image
        const img = document.createElement('img');
        img.src = e.target.result;
        img.classList.add('w-full', 'h-full', 'object-cover');
        preview.parentNode.replaceChild(img, preview);
    };
    
    reader.readAsDataURL(file);
}

function checkForUpdates() {
    console.log('Checking for system updates...');
    // Implement update check logic
    
    // Mock update check
    setTimeout(() => {
        const updateAvailable = Math.random() > 0.5;
        if (updateAvailable) {
            console.log('Update available!');
            // Show update notification
        } else {
            console.log('System is up to date');
        }
    }, 1000);
}

// Export functions for use in other modules if needed
export {
    initSettingsPage,
    handleGeneralSettingsSubmit,
    handlePaymentMethodToggle,
    uploadLogo,
    checkForUpdates
};