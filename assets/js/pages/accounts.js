// Accounts page functionality
document.addEventListener('DOMContentLoaded', function() {
    const accounts = {
        init: function() {
            this.setupFormValidation();
            this.setupEventListeners();
            this.loadAccountsData();
        },

        setupFormValidation: function() {
            const form = document.querySelector('#account-registration-form');
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateForm(form)) {
                    this.submitAccountForm(form);
                }
            });
        },

        validateForm: function(form) {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    this.showFieldError(field, 'This field is required');
                } else {
                    this.clearFieldError(field);
                }
            });

            // Validate email format if present
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value && !this.isValidEmail(emailField.value)) {
                isValid = false;
                this.showFieldError(emailField, 'Please enter a valid email address');
            }

            // Validate password strength if present
            const passwordField = form.querySelector('input[type="password"]');
            if (passwordField && passwordField.value && !this.isValidPassword(passwordField.value)) {
                isValid = false;
                this.showFieldError(passwordField, 'Password must be at least 8 characters long with numbers and letters');
            }

            return isValid;
        },

        isValidEmail: function(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },

        isValidPassword: function(password) {
            return password.length >= 8 && /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
        },

        showFieldError: function(field, message) {
            const errorDiv = field.parentElement.querySelector('.error-message') || 
                           document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            errorDiv.textContent = message;
            
            if (!field.parentElement.querySelector('.error-message')) {
                field.parentElement.appendChild(errorDiv);
            }
            
            field.classList.add('border-red-500');
        },

        clearFieldError: function(field) {
            const errorDiv = field.parentElement.querySelector('.error-message');
            if (errorDiv) {
                errorDiv.remove();
            }
            field.classList.remove('border-red-500');
        },

        submitAccountForm: function(form) {
            const formData = new FormData(form);
            const accountData = Object.fromEntries(formData.entries());

            // Simulate API call
            this.saveAccount(accountData)
                .then(() => {
                    this.showNotification('Account successfully registered', 'success');
                    form.reset();
                    this.loadAccountsData(); // Refresh the accounts table
                })
                .catch(error => {
                    this.showNotification('Error registering account: ' + error.message, 'error');
                });
        },

        saveAccount: function(accountData) {
            // Simulate API call
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (Math.random() > 0.1) { // 90% success rate
                        resolve();
                    } else {
                        reject(new Error('Network error'));
                    }
                }, 1000);
            });
        },

        loadAccountsData: function() {
            // Simulate loading accounts data
            const accounts = [
                {
                    id: '#ACC-001',
                    type: 'Netflix Premium',
                    username: 'user1@example.com',
                    price: 12.99,
                    status: 'Active'
                },
                {
                    id: '#ACC-002',
                    type: 'Spotify Premium',
                    username: 'user2@example.com',
                    price: 9.99,
                    status: 'Pending'
                },
                {
                    id: '#ACC-003',
                    type: 'YouTube Premium',
                    username: 'user3@example.com',
                    price: 11.99,
                    status: 'Active'
                }
            ];

            this.updateAccountsTable(accounts);
        },

        updateAccountsTable: function(accounts) {
            const tableBody = document.querySelector('#accounts-table tbody');
            if (!tableBody) return;

            tableBody.innerHTML = '';

            accounts.forEach(account => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${account.id}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${account.type}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${account.username}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">••••••••</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${account.price.toFixed(2)}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }">${account.status}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-primary-600 hover:text-primary-900 mr-2" onclick="accounts.editAccount('${account.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-900" onclick="accounts.deleteAccount('${account.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        },

        setupEventListeners: function() {
            // Add account button
            const addButton = document.querySelector('#add-account-button');
            if (addButton) {
                addButton.addEventListener('click', () => this.showAccountForm());
            }

            // Filter controls
            const filterControls = document.querySelectorAll('[data-filter]');
            filterControls.forEach(control => {
                control.addEventListener('change', () => this.applyFilters());
            });
        },

        showAccountForm: function() {
            // Implementation for showing account form modal
            console.log('Showing account form...');
        },

        editAccount: function(accountId) {
            // Implementation for editing account
            console.log('Editing account:', accountId);
        },

        deleteAccount: function(accountId) {
            if (confirm('Are you sure you want to delete this account?')) {
                // Simulate delete API call
                console.log('Deleting account:', accountId);
                this.showNotification('Account successfully deleted', 'success');
                this.loadAccountsData(); // Refresh the table
            }
        },

        applyFilters: function() {
            // Implementation for filtering accounts
            console.log('Applying filters...');
            this.loadAccountsData(); // Reload with filters
        },

        showNotification: function(message, type = 'success') {
            const notification = document.createElement('div');
            notification.className = `fixed top-4 right-4 p-4 rounded-lg ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`;
            notification.textContent = message;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    };

    // Initialize accounts page if we're on the accounts page
    if (document.querySelector('#accounts-content')) {
        accounts.init();
    }
});