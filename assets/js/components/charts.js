// Chart configuration and utility class
class ChartManager {
    constructor() {
        this.charts = new Map();
        this.defaultOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.colors = {
            primary: '#22c55e',
            secondary: '#3b82f6',
            danger: '#ef4444',
            warning: '#f59e0b',
            purple: '#8b5cf6',
            primaryLight: 'rgba(34, 197, 94, 0.1)'
        };
    }

    // Initialize all charts
    initCharts() {
        this.initAccountTypeChart();
        this.initSalesChart();
        this.initAccountDistributionChart();
        this.initRevenueChart();
        this.setupChartResizing();
    }

    // Account Type Distribution (Pie Chart)
    initAccountTypeChart() {
        const ctx = document.getElementById('accountChart')?.getContext('2d');
        if (!ctx) return;

        // Destroy existing chart if it exists
        if (this.charts.get('accountChart')) {
            this.charts.get('accountChart').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Netflix', 'Spotify', 'YouTube', 'Disney+', 'HBO Max'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        this.colors.primary,
                        this.colors.secondary,
                        this.colors.danger,
                        this.colors.warning,
                        this.colors.purple
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                return `${label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        });

        this.charts.set('accountChart', chart);
    }

    // Monthly Sales Trend (Line Chart)
    initSalesChart() {
        const ctx = document.getElementById('salesChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.get('salesChart')) {
            this.charts.get('salesChart').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Sales',
                    data: [1250, 1900, 1700, 2100, 2400, 2800],
                    backgroundColor: this.colors.primaryLight,
                    borderColor: this.colors.primary,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (context) => {
                                return `Sales: $${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `$${value.toLocaleString()}`
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });

        this.charts.set('salesChart', chart);
    }

    // Account Distribution (Bar Chart)
    initAccountDistributionChart() {
        const ctx = document.getElementById('accountDistributionChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.get('accountDistChart')) {
            this.charts.get('accountDistChart').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Netflix', 'Spotify', 'YouTube', 'Disney+', 'HBO Max'],
                datasets: [{
                    label: 'Active Accounts',
                    data: [124, 98, 87, 45, 32],
                    backgroundColor: [
                        this.colors.primary,
                        this.colors.secondary,
                        this.colors.danger,
                        this.colors.warning,
                        this.colors.purple
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `Accounts: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });

        this.charts.set('accountDistChart', chart);
    }

    // Revenue Chart (Area Chart)
    initRevenueChart() {
        const ctx = document.getElementById('revenueChart')?.getContext('2d');
        if (!ctx) return;

        if (this.charts.get('revenueChart')) {
            this.charts.get('revenueChart').destroy();
        }

        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Revenue',
                    data: [4500, 5200, 4800, 5800],
                    backgroundColor: this.colors.primaryLight,
                    borderColor: this.colors.primary,
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                ...this.defaultOptions,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                return `Revenue: $${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => `$${value.toLocaleString()}`
                        }
                    }
                }
            }
        });

        this.charts.set('revenueChart', chart);
    }

    // Handle chart resizing
    setupChartResizing() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.charts.forEach(chart => {
                    chart.resize();
                });
            }, 250);
        });
    }

    // Update chart data
    updateChartData(chartId, newData) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.data = newData;
            chart.update();
        }
    }

    // Destroy specific chart
    destroyChart(chartId) {
        const chart = this.charts.get(chartId);
        if (chart) {
            chart.destroy();
            this.charts.delete(chartId);
        }
    }

    // Destroy all charts
    destroyAllCharts() {
        this.charts.forEach(chart => {
            chart.destroy();
        });
        this.charts.clear();
    }
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.chartManager = new ChartManager();
    window.chartManager.initCharts();
});

// Export utility functions
function initCharts() {
    if (window.chartManager) {
        window.chartManager.initCharts();
    }
}

function updateChartData(chartId, newData) {
    if (window.chartManager) {
        window.chartManager.updateChartData(chartId, newData);
    }
}

function destroyChart(chartId) {
    if (window.chartManager) {
        window.chartManager.destroyChart(chartId);
    }
}

function destroyAllCharts() {
    if (window.chartManager) {
        window.chartManager.destroyAllCharts();
    }
}

// Export functions for external use
window.initCharts = initCharts;
window.updateChartData = updateChartData;
window.destroyChart = destroyChart;
window.destroyAllCharts = destroyAllCharts;