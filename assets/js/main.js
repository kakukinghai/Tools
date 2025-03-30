// Tool Data Structure
const tools = {
    'image-tools': [
        {
            id: 'image-to-png',
            name: 'Image to PNG Converter',
            description: 'Convert your images to PNG format with high quality.',
            icon: 'fa-image',
            category: 'image-tools',
            url: '/tools/image-tools/image-to-png.html'
        },
        // Add more image tools...
    ],
    'seo-tools': [
        {
            id: 'meta-tag-generator',
            name: 'Meta Tag Generator',
            description: 'Generate SEO-friendly meta tags for your website.',
            icon: 'fa-search',
            category: 'seo-tools',
            url: '/tools/seo-tools/meta-tag-generator.html'
        },
        // Add more SEO tools...
    ],
    // Add more categories...
};

// Load Header and Footer
document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    fetch('/components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));

    // Load Footer
    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));

    // Initialize Tool Grid
    initializeToolGrid();
});

// Initialize Tool Grid
function initializeToolGrid() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;

    // Flatten all tools into a single array
    const allTools = Object.values(tools).flat();

    // Create tool cards
    allTools.forEach(tool => {
        const toolCard = createToolCard(tool);
        toolsGrid.appendChild(toolCard);
    });
}

// Create Tool Card
function createToolCard(tool) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4 mb-4';
    
    col.innerHTML = `
        <div class="tool-card">
            <div class="icon-wrapper mb-3">
                <i class="fas ${tool.icon}"></i>
            </div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <a href="${tool.url}" class="btn btn-primary">Use Tool</a>
        </div>
    `;

    return col;
}

// Search Functionality
const searchInput = document.getElementById('toolSearch');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const toolName = card.querySelector('h3').textContent.toLowerCase();
            const toolDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (toolName.includes(searchTerm) || toolDesc.includes(searchTerm)) {
                card.closest('.col-md-6').style.display = '';
            } else {
                card.closest('.col-md-6').style.display = 'none';
            }
        });
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Add your newsletter subscription logic here
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Ad Loading Function
function loadAds() {
    // Add your AdSense or other ad loading logic here
    const adSpaces = document.querySelectorAll('.ad-space');
    adSpaces.forEach(space => {
        // Example ad placeholder
        space.innerHTML = `
            <div class="ad-placeholder">
                <p>Advertisement Space</p>
            </div>
        `;
    });
}

// Initialize Ads
document.addEventListener('DOMContentLoaded', loadAds);

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile Menu Toggle
const navbarToggler = document.querySelector('.navbar-toggler');
if (navbarToggler) {
    navbarToggler.addEventListener('click', function() {
        document.querySelector('.navbar-collapse').classList.toggle('show');
    });
}

// Category Filter
function filterToolsByCategory(category) {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        const toolCategory = card.dataset.category;
        if (category === 'all' || toolCategory === category) {
            card.closest('.col-md-6').style.display = '';
        } else {
            card.closest('.col-md-6').style.display = 'none';
        }
    });
}

// Add category filter event listeners
document.querySelectorAll('.category-filter').forEach(filter => {
    filter.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.dataset.category;
        filterToolsByCategory(category);
        
        // Update active state
        document.querySelectorAll('.category-filter').forEach(f => f.classList.remove('active'));
        this.classList.add('active');
    });
}); 