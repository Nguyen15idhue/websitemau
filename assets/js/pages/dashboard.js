// Dashboard page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Dashboard-specific initialization
    const dashboard = {
        init: function() {
            this.loadDashboardData();
            this.setupEventListeners();
            this.initializeCharts();
        },

        loadDashboardData: function() {
            // Simulate loading dashboard data
            this.updateStatistics({
                totalAccounts: 1254,
                totalRevenue: 24568,
                pendingOrders: 42,
                activeUsers: 856
            });

            this.loadRecentSales();
        },

        updateStatistics: function(data) {
            // Update dashboard statistics
            document.querySelectorAll('[data-stat]').forEach(element => {
                const stat = element.getAttribute('data-stat');
                if (data[stat] !== undefined) {
                    if (stat.includes('total')) {
                        element.textContent = new Intl.NumberFormat('en-US').format(data[stat]);
                    } else if (stat.includes('Revenue')) {
                        element.textContent = new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        }).format(data[stat]);
                    } else {
                        element.textContent = data[stat];
                    }
                }
            });
        },

        loadRecentSales: function() {
            // Simulate loading recent sales data
            const recentSales = [
                {
                    orderId: '#ORD-001',
                    account: 'Premium Netflix',
                    amount: 12.99,
                    status: 'Completed'
                },
                {
                    orderId: '#ORD-002',
                    account: 'Spotify Family',
                    amount: 9.99,
                    status: 'Pending'
                },
                {
                    orderId: '#ORD-003',
                    account: 'YouTube Premium',
                    amount: 11.99,
                    status: 'Completed'
                }
            ];

            this.updateRecentSalesTable(recentSales);
        },

        updateRecentSalesTable: function(sales) {
            const tableBody = document.querySelector('#recent-sales-table tbody');
            if (!tableBody) return;

            tableBody.innerHTML = '';

            sales.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${sale.orderId}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${sale.account}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$${sale.amount.toFixed(2)}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sale.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }">${sale.status}</span>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        },

        setupEventListeners: function() {
            // Add event listeners for dashboard elements
            document.querySelectorAll('[data-dashboard-action]').forEach(element => {
                element.addEventListener('click', (e) => {
                    const action = e.target.getAttribute('data-dashboard-action');
                    this.handleDashboardAction(action);
                });
            });
        },

        handleDashboardAction: function(action) {
            switch (action) {
                case 'refresh':
                    this.loadDashboardData();
                    break;
                case 'export':
                    this.exportDashboardData();
                    break;
                case 'filter':
                    this.showFilterOptions();
                    break;
            }
        },

        exportDashboardData: function() {
            console.log('Exporting dashboard data...');
            // Implement export functionality
        },

        showFilterOptions: function() {
            console.log('Showing filter options...');
            // Implement filter functionality
        },

        initializeCharts: function() {
            // Initialize dashboard charts using the charts component
            if (typeof initCharts === 'function') {
                initCharts();
            }
        },

        // Real-time updates
        startRealtimeUpdates: function() {
            setInterval(() => {
                this.updateRandomStatistic();
            }, 30000); // Update every 30 seconds
        },

        updateRandomStatistic: function() {
            const stats = ['totalAccounts', 'totalRevenue', 'pendingOrders', 'activeUsers'];
            const randomStat = stats[Math.floor(Math.random() * stats.length)];
            const currentValue = parseInt(document.querySelector(`[data-stat="${randomStat}"]`).textContent.replace(/[^0-9]/g, ''));
            const change = Math.floor(Math.random() * 10) - 5; // Random change between -5 and +5
            
            const newData = {};
            newData[randomStat] = currentValue + change;
            this.updateStatistics(newData);
        }
    };

    // Initialize dashboard if we're on the dashboard page
    if (document.querySelector('#dashboard-content')) {
        dashboard.init();
        dashboard.startRealtimeUpdates();
    }
});