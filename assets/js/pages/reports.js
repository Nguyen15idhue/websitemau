// Reports page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize reports page specific elements when content is loaded
    if (document.getElementById('reports-content')) {
        initReportsPage();
    }
});

function initReportsPage() {
    // Initialize date range picker for reports
    initReportsDatePicker();
    
    // Setup report type changes
    setupReportTypeHandler();
    
    // Initialize export functionality
    setupExportHandler();
    
    // Initialize report filters
    setupReportFilters();
    
    // Initialize charts
    initReportCharts();
}

function initReportsDatePicker() {
    const dateRangeInput = document.querySelector('input[placeholder="Select date range"]');
    if (dateRangeInput) {
        // Initialize date range picker (implement your preferred date picker library)
        dateRangeInput.addEventListener('click', function() {
            console.log('Date range picker should be initialized here');
        });
    }
}

function setupReportTypeHandler() {
    const reportTypeSelect = document.querySelector('select:contains("Sales Summary")');
    if (reportTypeSelect) {
        reportTypeSelect.addEventListener('change', function(e) {
            updateReportContent(e.target.value);
        });
    }
}

function setupExportHandler() {
    const exportButton = document.querySelector('button:contains("Export")');
    if (exportButton) {
        exportButton.addEventListener('click', exportReport);
    }
}

function setupReportFilters() {
    // Account type filter
    const accountTypeSelect = document.querySelector('select:contains("All Account Types")');
    if (accountTypeSelect) {
        accountTypeSelect.addEventListener('change', function(e) {
            filterReportData('accountType', e.target.value);
        });
    }
}

function initReportCharts() {
    // Sales Chart
    const salesChartCtx = document.getElementById('salesChart')?.getContext('2d');
    if (salesChartCtx) {
        initSalesChart(salesChartCtx);
    }

    // Account Distribution Chart
    const accountDistributionCtx = document.getElementById('accountDistributionChart')?.getContext('2d');
    if (accountDistributionCtx) {
        initAccountDistributionChart(accountDistributionCtx);
    }
}

function initSalesChart(ctx) {
    if (window.salesChart) {
        window.salesChart.destroy();
    }

    window.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Monthly Sales',
                data: [1250, 1900, 1700, 2100, 2400, 2800],
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                borderColor: '#22c55e',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 4]
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initAccountDistributionChart(ctx) {
    if (window.accountDistributionChart) {
        window.accountDistributionChart.destroy();
    }

    window.accountDistributionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Netflix', 'Spotify', 'YouTube', 'Disney+', 'HBO Max'],
            datasets: [{
                label: 'Account Distribution',
                data: [124, 98, 87, 45, 32],
                backgroundColor: [
                    '#22c55e',
                    '#3b82f6',
                    '#ef4444',
                    '#f59e0b',
                    '#8b5cf6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [2, 4]
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateReportContent(reportType) {
    console.log(`Updating report content for type: ${reportType}`);
    // Implement report type specific content updates
}

function exportReport() {
    const reportType = document.querySelector('select:contains("Sales Summary")').value;
    const dateRange = document.querySelector('input[placeholder="Select date range"]').value;
    
    console.log(`Exporting ${reportType} report for date range: ${dateRange}`);
    // Implement report export functionality
}

function filterReportData(filterType, value) {
    console.log(`Filtering report data by ${filterType}: ${value}`);
    // Implement report data filtering
    
    // Update charts with filtered data
    updateChartsWithFilteredData(filterType, value);
}

function updateChartsWithFilteredData(filterType, value) {
    // Update charts based on filtered data
    // This is a placeholder for actual chart data update logic
    if (window.salesChart) {
        // Update sales chart data
        window.salesChart.update();
    }
    
    if (window.accountDistributionChart) {
        // Update account distribution chart data
        window.accountDistributionChart.update();
    }
}

// Export functions for use in other modules if needed
export {
    initReportsPage,
    exportReport,
    filterReportData,
    updateReportContent
};