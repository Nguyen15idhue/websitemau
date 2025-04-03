// Payments page functionality
document.addEventListener('DOMContentLoaded', function() {
    const payments = {
        init: function() {
            this.setupFilterControls();
            this.setupEventListeners();
            this.loadPaymentsData();
            this.initializeDatePicker();
        },

        setupFilterControls: function() {
            const filterForm = document.querySelector('#payment-filters');
            if (!filterForm) return;

            filterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.applyFilters();
            });
        },

        initializeDatePicker: function() {
            // Initialize date range picker
            const dateRangePicker = document.querySelector('#date-range');
            if (!dateRangePicker) return;

            // Implement date picker initialization
            console.log('Initializing date picker...');
        },

        loadPaymentsData: function() {
            // Simulate loading payments data
            const payments = [
                {
                    transactionId: '#TXN-001',
                    date: '2023-06-15',
                    account: 'Netflix Premium',
                    customer: 'John Doe',
                    amount: 12.99,
                    method: 'PayPal',
                    status: 'Completed'
                },
                {
                    transactionId: '#TXN-002',
                    date: '2023-06-14',
                    account: 'Spotify Premium',
                    customer: 'Jane Smith',
                    amount: 9.99,
                    method: 'Credit Card',
                    status: 'Pending'
                },
                {
                    transactionId: '#TXN-003',
                    date: '2023-06-13',
                    account: 'YouTube Premium',
                    customer: 'Mike Johnson',
                    amount: 11.99,
                    method: 'Crypto',
                    status: 'Failed'
                }
            ];

            this.updatePaymentsTable(payments);
            this.updatePaymentStatistics(payments);
        },

        updatePaymentsTable: function(payments) {
            const tableBody = document.querySelector('#payments-table tbody');
            if (!tableBody) return;

            tableBody.innerHTML = '';

            payments.forEach(payment => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${payment.transactionId}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.date}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.account}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.customer}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${payment.amount.toFixed(2)}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${payment.method}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            payment.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }">${payment.status}</span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button class="text-primary-600 hover:text-primary-900" onclick="payments.viewPaymentDetails('${payment.transactionId}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        },

        updatePaymentStatistics: function(payments) {
            // Calculate payment statistics
            const stats = {
                totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
                completed: payments.filter(p => p.status === 'Completed').length,
                pending: payments.filter(p => p.status === 'Pending').length,
                failed: payments.filter(p => p.status === 'Failed').length
            };

            // Update statistics display
            Object.keys(stats).forEach(key => {
                const element = document.querySelector(`[data-stat="${key}"]`);
                if (element) {
                    if (key === 'totalAmount') {
                        element.textContent = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(stats[key]);
                    } else {
                        element.textContent = stats[key];
                    }
                }
            });
        },

        setupEventListeners: function() {
            // Export button
            const exportButton = document.querySelector('#export-payments');
            if (exportButton) {
                exportButton.addEventListener('click', () => this.exportPayments());
            }

            // Filter button
            const filterButton = document.querySelector('#filter-payments');
            if (filterButton) {
                filterButton.addEventListener('click', () => this.showFilterOptions());
            }

            // Pagination controls
            document.querySelectorAll('.pagination-control').forEach(control => {
                control.addEventListener('click', (e) => {
                    const page = e.target.getAttribute('data-page');
                    this.loadPage(page);
                });
            });
        },

        exportPayments: function() {
            console.log('Exporting payments...');
            // Implementation for exporting payments
        },

        showFilterOptions: function() {
            console.log('Showing filter options...');
            // Implementation for showing filter modal
        },

        applyFilters: function() {
            const filters = {
                method: document.querySelector('#payment-method')?.value,
                dateRange: document.querySelector('#date-range')?.value,
                status: document.querySelector('#payment-status')?.value
            };

            console.log('Applying filters:', filters);
            this.loadPaymentsData(); // Reload with filters
        },

        viewPaymentDetails: function(transactionId) {
            console.log('Viewing payment details:', transactionId);
            // Implementation for viewing payment details
        },

        loadPage: function(page) {
            console.log('Loading page:', page);
            this.loadPaymentsData(); // Reload with pagination
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

    // Initialize payments page if we're on the payments page
    if (document.querySelector('#payments-content')) {
        payments.init();
    }
});