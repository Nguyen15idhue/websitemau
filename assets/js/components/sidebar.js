// Sidebar functionality
class SidebarManager {
    constructor() {
        this.sidebar = document.querySelector('.sidebar');
        this.collapseButton = document.querySelector('.sidebar button');
        this.menuItems = document.querySelectorAll('.sidebar ul li a');
        this.init();
    }

    init() {
        // Initialize event listeners
        this.collapseButton.addEventListener('click', () => this.toggleSidebar());
        this.menuItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleMenuItemClick(e));
        });

        // Check for saved state
        this.loadSidebarState();

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('collapsed');
        // Save state
        localStorage.setItem('sidebarCollapsed', this.sidebar.classList.contains('collapsed'));
        // Update main content margin
        this.updateMainContentMargin();
    }

    handleMenuItemClick(event) {
        // Remove active class from all items
        this.menuItems.forEach(item => {
            item.classList.remove('active', 'bg-primary-50', 'text-primary-600');
        });
        
        // Add active class to clicked item
        event.currentTarget.classList.add('active', 'bg-primary-50', 'text-primary-600');

        // On mobile, collapse sidebar after selection
        if (window.innerWidth <= 768) {
            this.sidebar.classList.add('collapsed');
            this.updateMainContentMargin();
        }
    }

    loadSidebarState() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            this.sidebar.classList.add('collapsed');
        }
        this.updateMainContentMargin();
    }

    handleResize() {
        if (window.innerWidth <= 768) {
            this.sidebar.classList.add('collapsed');
        } else {
            // Restore saved state on desktop
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (!isCollapsed) {
                this.sidebar.classList.remove('collapsed');
            }
        }
        this.updateMainContentMargin();
    }

    updateMainContentMargin() {
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.marginLeft = this.sidebar.classList.contains('collapsed') ? '70px' : '250px';
        }
    }
}

// Sidebar active state tracker
class SidebarStateTracker {
    constructor() {
        this.currentPath = window.location.pathname;
        this.menuItems = document.querySelectorAll('.sidebar ul li a');
        this.init();
    }

    init() {
        // Set active state based on current path
        this.setActiveItem();
        
        // Listen for navigation events
        window.addEventListener('popstate', () => this.setActiveItem());
    }

    setActiveItem() {
        const path = window.location.pathname;
        this.menuItems.forEach(item => {
            const itemPath = item.getAttribute('href');
            if (itemPath === path) {
                item.classList.add('active', 'bg-primary-50', 'text-primary-600');
            } else {
                item.classList.remove('active', 'bg-primary-50', 'text-primary-600');
            }
        });
    }
}

// Initialize sidebar functionality
document.addEventListener('DOMContentLoaded', () => {
    const sidebarManager = new SidebarManager();
    const stateTracker = new SidebarStateTracker();

    // Export for external use
    window.sidebarManager = sidebarManager;
    window.sidebarStateTracker = stateTracker;
});

// Utility functions
function toggleSidebar() {
    if (window.sidebarManager) {
        window.sidebarManager.toggleSidebar();
    }
}

function updateSidebarState(path) {
    if (window.sidebarStateTracker) {
        window.sidebarStateTracker.setActiveItem(path);
    }
}

// Export utility functions
window.toggleSidebar = toggleSidebar;
window.updateSidebarState = updateSidebarState;