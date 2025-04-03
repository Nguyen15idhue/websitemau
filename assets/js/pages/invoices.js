// Invoice page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize invoice page specific elements when content is loaded
    if (document.getElementById('invoices-content')) {
        initInvoicePage();
    }
});

function initInvoicePage() {
    // Initialize date range picker
    initDateRangePicker();
    
    // Add invoice form handlers
    setupInvoiceFormHandlers();
    
    // Initialize invoice filters
    setupInvoiceFilters();
    
    // Setup invoice actions
    setupInvoiceActions();
}

function initDateRangePicker() {
    const dateRangeInput = document.querySelector('input[placeholder="Select date range"]');
    if (dateRangeInput) {
        // Initialize date range picker (implement your preferred date picker library)
        // This is a placeholder for date range picker implementation
        dateRangeInput.addEventListener('click', function() {
            console.log('Date range picker should be initialized here');
        });
    }
}

function setupInvoiceFormHandlers() {
    const createInvoiceButton = document.querySelector('button:contains("Create Invoice")');
    if (createInvoiceButton) {
        createInvoiceButton.addEventListener('click', handleCreateInvoice);
    }
}

function setupInvoiceFilters() {
    // Setup invoice number filter
    const invoiceNumberInput = document.querySelector('input[placeholder="Search by invoice #"]');
    if (invoiceNumberInput) {
        invoiceNumberInput.addEventListener('input', function(e) {
            filterInvoices('number', e.target.value);
        });
    }

    // Setup customer filter
    const customerInput = document.querySelector('input[placeholder="Search by customer"]');
    if (customerInput) {
        customerInput.addEventListener('input', function(e) {
            filterInvoices('customer', e.target.value);
        });
    }

    // Setup status filter
    const statusSelect = document.querySelector('select:contains("All Statuses")');
    if (statusSelect) {
        statusSelect.addEventListener('change', function(e) {
            filterInvoices('status', e.target.value);
        });
    }
}

function setupInvoiceActions() {
    // Setup view invoice action
    document.querySelectorAll('.fa-eye').forEach(icon => {
        icon.closest('button').addEventListener('click', function(e) {
            const invoiceId = getInvoiceIdFromRow(e.target.closest('tr'));
            viewInvoice(invoiceId);
        });
    });

    // Setup print invoice action
    document.querySelectorAll('.fa-print').forEach(icon => {
        icon.closest('button').addEventListener('click', function(e) {
            const invoiceId = getInvoiceIdFromRow(e.target.closest('tr'));
            printInvoice(invoiceId);
        });
    });

    // Setup email invoice action
    document.querySelectorAll('.fa-envelope').forEach(icon => {
        icon.closest('button').addEventListener('click', function(e) {
            const invoiceId = getInvoiceIdFromRow(e.target.closest('tr'));
            emailInvoice(invoiceId);
        });
    });
}

function handleCreateInvoice() {
    // Implement create invoice functionality
    console.log('Create invoice modal should open here');
}

function filterInvoices(filterType, value) {
    const invoiceRows = document.querySelectorAll('#invoices-table tbody tr');
    
    invoiceRows.forEach(row => {
        let showRow = true;
        const rowData = {
            number: row.querySelector('td:first-child').textContent,
            customer: row.querySelector('td:nth-child(2)').textContent,
            status: row.querySelector('td:nth-child(6) span').textContent
        };

        switch (filterType) {
            case 'number':
                showRow = rowData.number.toLowerCase().includes(value.toLowerCase());
                break;
            case 'customer':
                showRow = rowData.customer.toLowerCase().includes(value.toLowerCase());
                break;
            case 'status':
                showRow = value === 'All Statuses' || rowData.status === value;
                break;
        }

        row.style.display = showRow ? '' : 'none';
    });
}

function getInvoiceIdFromRow(row) {
    return row.querySelector('td:first-child').textContent;
}

function viewInvoice(invoiceId) {
    console.log(`Viewing invoice: ${invoiceId}`);
    // Implement view invoice functionality
}

function printInvoice(invoiceId) {
    console.log(`Printing invoice: ${invoiceId}`);
    // Implement print invoice functionality
    window.print();
}

function emailInvoice(invoiceId) {
    console.log(`Emailing invoice: ${invoiceId}`);
    // Implement email invoice functionality
}

// Export functions for use in other modules if needed
export {
    initInvoicePage,
    handleCreateInvoice,
    filterInvoices,
    viewInvoice,
    printInvoice,
    emailInvoice
};