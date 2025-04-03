// Main application functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initApp();
    
    // Load default content (dashboard)
    loadContent('dashboard');
    
    // Setup global event listeners
    setupGlobalEventListeners();
    
    // Start background tasks
    startBackgroundTasks();
});

function initApp() {
    // Load components
    loadComponents();
    
    // Initialize notifications
    initNotifications();
    
    // Check authentication
    checkAuthentication();
}

function loadComponents() {
    // Load sidebar
    fetch('components/sidebar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('sidebar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading sidebar:', error));
    
    // Load header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadContent(contentId) {
    // Hide all content sections
    document.querySelectorAll('#content-container > div').forEach(div => {
        div.classList.add('hidden');
    });
    
    // Load and show requested content
    fetch(`pages/${contentId}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('content-container').innerHTML = data;
            
            // Update page title
            updatePageTitle(contentId);
            
            // Initialize page specific functionality
            initPageSpecific(contentId);
        })
        .catch(error => console.error(`Error loading ${contentId} content:`, error));
}

function updatePageTitle(contentId) {
    const pageTitle = document.getElementById('page-title');
    const titles = {
        'dashboard': 'Dashboard',
        'accounts': 'Register Accounts',
        'payments': 'Payments',
        'invoices': 'Invoices',
        'reports': 'Reports',
        'settings': 'Settings'
    };
    pageTitle.textContent = titles[contentId] || 'Dashboard';
}

function initPageSpecific(contentId) {
    switch(contentId) {
        case 'dashboard':
        case 'reports':
            initCharts();
            break;
        case 'accounts':
            // Initialize accounts page
            break;
        case 'payments':
            // Initialize payments page
            break;
        case 'invoices':
            // Initialize invoices page
            break;
        case 'settings':
            // Initialize settings page
            break;
    }
}

function setupGlobalEventListeners() {
    // Handle sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar button');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Handle notifications
    const notificationBell = document.querySelector('.fa-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', toggleNotifications);
    }
    
    // Handle user menu
    const userMenu = document.querySelector('.fa-user').closest('div');
    if (userMenu) {
        userMenu.addEventListener('click', toggleUserMenu);
    }
}

function initNotifications() {
    // Initialize notification system
    console.log('Initializing notifications...');
    
    // Check for new notifications periodically
    setInterval(checkNewNotifications, 60000); // Check every minute
}

function checkNewNotifications() {
    // Implement notification check logic
    console.log('Checking for new notifications...');
}

function toggleNotifications() {
    console.log('Toggling notifications panel');
    // Implement notifications panel toggle
}

function toggleUserMenu() {
    console.log('Toggling user menu');
    // Implement user menu toggle
}

function checkAuthentication() {
    // Check if user is authenticated
    const user = getCurrentUser();
    if (!user) {
        // Redirect to login page
        window.location.href = '/login.html';
    }
}

function getCurrentUser() {
    // Get current user from session/local storage
    return JSON.parse(localStorage.getItem('currentUser'));
}

function startBackgroundTasks() {
    // Start database connection check
    setInterval(() => {
        checkDatabaseConnection();
    }, 5000);
    
    // Start session keep-alive
    setInterval(() => {
        keepSessionAlive();
    }, 300000); // Every 5 minutes
}

function checkDatabaseConnection() {
    console.log('Database connection active');
}

function keepSessionAlive() {
    console.log('Keeping session alive');
    // Implement session keep-alive logic
}

// Export functions for use in other modules
export {
    loadContent,
    toggleSidebar,
    initNotifications,
    checkAuthentication,
    getCurrentUser
};