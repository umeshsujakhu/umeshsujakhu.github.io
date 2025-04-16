// Main JavaScript file for portfolio

// DOM Elements
const cursor = document.querySelector('.cursor');
const terminalContainer = document.querySelector('.terminal-container');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const progressBars = document.querySelectorAll('.progress-bar');
const statValues = document.querySelectorAll('.stat-value');
const typingText = document.getElementById('typing-text');
const blinkingCursor = document.getElementById('blinking-cursor');
const skillsResponse = document.getElementById('skills-response');
const projectsResponse = document.getElementById('projects-response');
const contactResponse = document.getElementById('contact-response');
const aboutResponse = document.getElementById('about-response');

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Custom cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.borderColor = 'var(--accent-secondary)';
});

document.addEventListener('mouseup', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.borderColor = 'var(--accent-primary)';
});

// Links and buttons hover effect for cursor
const links = document.querySelectorAll('a, button, .hamburger, .project-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.borderWidth = '1px';
        cursor.style.backgroundColor = 'rgba(0, 255, 65, 0.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.borderWidth = '2px';
        cursor.style.backgroundColor = 'transparent';
    });
});

// Mobile navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Terminal functionality
let terminalActive = false;

// Toggle terminal visibility
function toggleTerminal() {
    terminalActive = !terminalActive;
    terminalContainer.classList.toggle('active', terminalActive);
}

// Show terminal on page load after a delay
setTimeout(() => {
    toggleTerminal();
}, 2000);

// Execute terminal commands
function executeCommand(command) {
    switch(command) {
        case 'cat about.txt':
            aboutResponse.style.display = 'block';
            break;
        case 'ls -la skills/':
            displaySkills();
            break;
        case 'cat projects.json':
            displayProjects();
            break;
        case 'contact --info':
            displayContact();
            break;
        default:
            return;
    }
    
    // Scroll terminal to bottom
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Display skills in terminal
function displaySkills() {
    skillsResponse.innerHTML = `
        <div class="terminal-table">
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">developer developer</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">frontend/</span>
            </div>
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">developer developer</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">backend/</span>
            </div>
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">developer developer</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">database/</span>
            </div>
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">developer developer</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">devops/</span>
            </div>
        </div>
    `;
}

// Display projects in terminal
function displayProjects() {
    projectsResponse.innerHTML = `
        <pre>{
  "projects": [
    {
      "name": "E-Commerce Platform",
      "description": "Full-stack e-commerce solution",
      "technologies": ["React", "Node.js", "MongoDB"],
      "status": "completed"
    },
    {
      "name": "Task Management App",
      "description": "Collaborative task management",
      "technologies": ["Angular", "Express", "PostgreSQL"],
      "status": "completed"
    },
    {
      "name": "Weather Forecast App",
      "description": "Real-time weather forecasts",
      "technologies": ["JavaScript", "API", "CSS3"],
      "status": "completed"
    },
    {
      "name": "Social Media Dashboard",
      "description": "Social media management",
      "technologies": ["Vue.js", "Python", "Firebase"],
      "status": "completed"
    }
  ]
}</pre>
    `;
}

// Display contact in terminal
function displayContact() {
    contactResponse.innerHTML = `
        <pre>{
  "email": "contact@example.com",
  "location": "San Francisco, CA",
  "social": {
    "github": "github.com/developer",
    "linkedin": "linkedin.com/in/developer",
    "twitter": "twitter.com/developer"
  },
  "availability": "Open to new opportunities"
}</pre>
    `;
}

// Nav links terminal command execution
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const command = item.getAttribute('data-command');
        if (command) {
            // Show terminal if it's not already visible
            if (!terminalActive) {
                toggleTerminal();
            }
            
            // Clear previous command and set new one
            typingText.textContent = '';
            blinkingCursor.style.display = 'none';
            
            // Simulate typing
            let i = 0;
            const typing = setInterval(() => {
                typingText.textContent += command.charAt(i);
                i++;
                if (i >= command.length) {
                    clearInterval(typing);
                    setTimeout(() => {
                        executeCommand(command);
                        blinkingCursor.style.display = 'inline';
                    }, 500);
                }
            }, 100);
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Observer for sections
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
            
            // Animate progress bars if in skills section
            if (entry.target.id === 'skills') {
                animateProgressBars();
            }
            
            // Animate stat counters if in about section
            if (entry.target.id === 'about') {
                animateStatCounters();
            }
        }
    });
}, observerOptions);

// Add hidden class to all sections and observe them
sections.forEach(section => {
    section.classList.add('hidden');
    sectionObserver.observe(section);
});

// Animate progress bars
function animateProgressBars() {
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = level + '%';
        }, 200);
    });
}

// Animate stat counters
function animateStatCounters() {
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const interval = Math.floor(duration / target);
        
        const counter = setInterval(() => {
            count++;
            stat.textContent = count;
            if (count >= target) {
                clearInterval(counter);
            }
        }, interval);
    });
}

// Matrix rain effect
function createMatrixRain() {
    const matrixRain = document.createElement('div');
    matrixRain.className = 'matrix-rain';
    document.body.appendChild(matrixRain);
    
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$><=!?';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const drop = document.createElement('div');
        drop.className = 'matrix-drop';
        drop.style.left = i * 20 + 'px';
        drop.style.animationDuration = Math.random() * 3 + 2 + 's';
        drop.style.animationDelay = Math.random() * 5 + 's';
        drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        matrixRain.appendChild(drop);
    }
}

// Create matrix rain with a delay
setTimeout(createMatrixRain, 3000);

// Typing effect for hero section
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Initial typing animation for terminal
setTimeout(() => {
    typeWriter(typingText, 'whoami', 100, () => {
        setTimeout(() => {
            document.getElementById('name-response').style.display = 'block';
        }, 500);
    });
}, 3000);

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS for elements created in JS
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--accent-primary);
        color: var(--bg-primary);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        z-index: 99;
    }
    
    .scroll-top-btn.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .scroll-top-btn:hover {
        background-color: var(--accent-secondary);
        box-shadow: 0 0 15px var(--accent-secondary);
    }
    
    .terminal-table {
        font-family: var(--font-code);
        font-size: 0.8rem;
    }
    
    .table-row {
        display: flex;
        margin-bottom: 5px;
    }
    
    .file-permissions {
        color: var(--accent-primary);
        margin-right: 10px;
    }
    
    .file-owner {
        color: var(--accent-secondary);
        margin-right: 10px;
    }
    
    .file-size {
        color: var(--text-secondary);
        margin-right: 10px;
    }
    
    .file-date {
        color: var(--text-secondary);
        margin-right: 10px;
    }
    
    .file-name {
        color: var(--text-primary);
    }
    
    #name-response, #about-response, #skills-response, #projects-response, #contact-response {
        display: none;
    }
`;
document.head.appendChild(style);

// Preload animations
window.addEventListener('load', () => {
    // Add initial animations to hero section
    const heroContent = document.querySelector('.hero-content');
    const heroElements = heroContent.children;
    
    for (let i = 0; i < heroElements.length; i++) {
        heroElements[i].classList.add('fade-in');
        heroElements[i].classList.add(`delay-${i+1}`);
    }
    
    // Initialize AOS-like scroll animations
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .stat-item, .contact-item');
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        element.classList.add('hidden');
        elementObserver.observe(element);
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<span class="button-text">Sending...</span>';
        submitButton.disabled = true;
        
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            submitButton.innerHTML = '<span class="button-text">Message Sent!</span><span class="button-icon"><i class="fas fa-check"></i></span>';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 3000);
            
            // Add success message to terminal
            if (terminalActive) {
                const newLine = document.createElement('div');
                newLine.className = 'line';
                newLine.innerHTML = `<span class="prompt">developer@portfolio:~$</span><span class="command">echo "Message sent successfully!"</span>`;
                
                const newResponse = document.createElement('div');
                newResponse.className = 'line response';
                newResponse.textContent = 'Message sent successfully!';
                
                const terminalContent = document.querySelector('.terminal-content');
                terminalContent.insertBefore(newLine, document.getElementById('blinking-cursor').parentNode);
                terminalContent.insertBefore(newResponse, document.getElementById('blinking-cursor').parentNode);
                
                // Scroll terminal to bottom
                const terminalBody = document.querySelector('.terminal-body');
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        }, 2000);
    });
}

// Add active state to nav links based on scroll position
function setActiveNavLink() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Add active class style
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--accent-primary);
    }
    
    .nav-link.active::before {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Update active nav link on scroll
window.addEventListener('scroll', setActiveNavLink);

// Initialize active nav link on page load
setActiveNavLink();

// Add parallax effect to background
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const backgroundSvg = document.querySelector('.background-svg');
    
    if (backgroundSvg) {
        backgroundSvg.style.transform = `translateY(${scrollPosition * 0.1}px)`;
    }
});

// Add terminal toggle button
const terminalToggleBtn = document.createElement('button');
terminalToggleBtn.className = 'terminal-toggle-btn';
terminalToggleBtn.innerHTML = '<i class="fas fa-terminal"></i>';
document.body.appendChild(terminalToggleBtn);

// Add terminal toggle button style
const terminalBtnStyle = document.createElement('style');
terminalBtnStyle.textContent = `
    .terminal-toggle-btn {
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--accent-primary);
        color: var(--bg-primary);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 99;
        transition: background-color 0.3s, box-shadow 0.3s;
    }
    
    .terminal-toggle-btn:hover {
        background-color: var(--accent-secondary);
        box-shadow: 0 0 15px var(--accent-secondary);
    }
`;
document.head.appendChild(terminalBtnStyle);

// Terminal toggle button functionality
terminalToggleBtn.addEventListener('click', toggleTerminal);

// Add typing animation to section titles
function animateSectionTitles() {
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('typing');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
}

// Initialize section title animations
animateSectionTitles();

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = 'var(--glow)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Loading<span class="loader-dots">...</span></div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Add loader styles
    const loaderStyle = document.createElement('style');
    loaderStyle.textContent = `
        .loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s, visibility 0.5s;
        }
        
        .loader-content {
            text-align: center;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(0, 255, 65, 0.3);
            border-radius: 50%;
            border-top-color: var(--accent-primary);
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
        .loader-text {
            font-family: var(--font-code);
            font-size: 1.2rem;
            color: var(--accent-primary);
        }
        
        .loader-dots {
            animation: dots 1.5s infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        @keyframes dots {
            0%, 20% { content: '.'; }
            40% { content: '..'; }
            60%, 100% { content: '...'; }
        }
        
        .loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(loaderStyle);
    
    // Hide loader after page is fully loaded
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
});
