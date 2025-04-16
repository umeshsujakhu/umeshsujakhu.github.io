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
let commandHistory = [];
let historyIndex = -1;
let currentInput = '';

// Toggle terminal visibility
function toggleTerminal() {
    terminalActive = !terminalActive;
    terminalContainer.classList.toggle('active', terminalActive);
    
    if (terminalActive) {
        // Focus on the input when terminal is shown
        setTimeout(() => {
            document.getElementById('terminal-input').focus();
        }, 100);
    }
}

// Show terminal on page load after a delay
setTimeout(() => {
    toggleTerminal();
}, 2000);

// Available commands
const availableCommands = {
    'help': 'Display available commands',
    'about': 'View about information',
    'experience': 'View work experience',
    'skills': 'List skills',
    'projects': 'View projects',
    'contact': 'Display contact information',
    'clear': 'Clear terminal',
    'goto': 'Navigate to section (usage: goto about|experience|skills|projects|contact)'
};

// Execute terminal commands
function executeCommand(command) {
    // Trim the command
    command = command.trim();
    
    // Skip if empty
    if (!command) return;
    
    // Add to history if not empty
    if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command) {
        commandHistory.push(command);
    }
    historyIndex = commandHistory.length;
    
    // Process command
    if (command === 'help') {
        displayHelp();
    } else if (command === 'about' || command === 'cat about.txt') {
        aboutResponse.style.display = 'block';
        scrollToSection('about');
    } else if (command === 'experience' || command === 'cat experience.log') {
        document.getElementById('experience-response').style.display = 'block';
        scrollToSection('experience');
    } else if (command === 'skills' || command === 'ls -la skills/') {
        displaySkills();
        scrollToSection('skills');
    } else if (command === 'projects' || command === 'cat projects.json') {
        displayProjects();
        scrollToSection('projects');
    } else if (command === 'contact' || command === 'contact --info') {
        displayContact();
        scrollToSection('contact');
    } else if (command === 'clear') {
        clearTerminal();
    } else if (command.startsWith('goto ')) {
        const section = command.split(' ')[1];
        if (['about', 'experience', 'skills', 'projects', 'contact'].includes(section)) {
            scrollToSection(section);
            addTerminalResponse(`Navigating to ${section} section...`);
        } else {
            addTerminalResponse(`Unknown section: ${section}. Available sections: about, experience, skills, projects, contact`);
        }
    } else {
        addTerminalResponse(`Command not found: ${command}. Type 'help' for available commands.`);
    }
    
    // Scroll terminal to bottom
    const terminalBody = document.querySelector('.terminal-body');
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Display help in terminal
function displayHelp() {
    let helpText = '<div class="help-content">';
    helpText += '<p>Available commands:</p>';
    helpText += '<ul>';
    
    for (const [cmd, desc] of Object.entries(availableCommands)) {
        helpText += `<li><span class="command-name">${cmd}</span> - ${desc}</li>`;
    }
    
    helpText += '</ul>';
    helpText += '</div>';
    
    addTerminalResponse(helpText);
}

// Clear terminal
function clearTerminal() {
    // Remove all response elements
    const responses = document.querySelectorAll('.terminal-content .response');
    responses.forEach(response => {
        response.style.display = 'none';
    });
    
    // Remove all command lines except the input line
    const lines = document.querySelectorAll('.terminal-content .line:not(.input-line)');
    lines.forEach(line => {
        if (!line.classList.contains('input-line')) {
            line.remove();
        }
    });
}

// Add response to terminal
function addTerminalResponse(content) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'line response';
    responseDiv.innerHTML = content;
    
    // Insert before the input line
    const inputLine = document.querySelector('.input-line');
    document.querySelector('.terminal-content').insertBefore(responseDiv, inputLine);
}

// Add new command line to terminal
function addCommandLine(command) {
    const lineDiv = document.createElement('div');
    lineDiv.className = 'line';
    lineDiv.innerHTML = `<span class="prompt">umesh@portfolio:~$</span><span class="command">${command}</span>`;
    
    // Insert before the input line
    const inputLine = document.querySelector('.input-line');
    document.querySelector('.terminal-content').insertBefore(lineDiv, inputLine);
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

// Display skills in terminal
function displaySkills() {
    skillsResponse.style.display = 'block';
    skillsResponse.innerHTML = `
        <div class="terminal-table">
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">umesh sujakhu</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">frontend/</span>
            </div>
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">umesh sujakhu</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">backend/</span>
            </div>
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">umesh sujakhu</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">database/</span>
            </div>
            <div class="table-row">
                <span class="file-permissions">drwxr-xr-x</span>
                <span class="file-owner">umesh sujakhu</span>
                <span class="file-size">4096</span>
                <span class="file-date">Apr 16 08:42</span>
                <span class="file-name">devops/</span>
            </div>
        </div>
    `;
}

// Display projects in terminal
function displayProjects() {
    projectsResponse.style.display = 'block';
    projectsResponse.innerHTML = `
        <pre>{
  "projects": [
    {
      "name": "High-Performance API Gateway",
      "description": "Kong API Gateway implementation",
      "technologies": ["Kong", "Node.js", "Microservices"],
      "status": "completed"
    },
    {
      "name": "Real-time Search Platform",
      "description": "Elasticsearch integration",
      "technologies": ["Elasticsearch", "Node.js", "Vue.js"],
      "status": "completed"
    },
    {
      "name": "Event-Driven Architecture",
      "description": "RabbitMQ implementation",
      "technologies": ["RabbitMQ", "Node.js", "Microservices"],
      "status": "completed"
    },
    {
      "name": "Chrome Extension",
      "description": "Vue 3-based browser extension",
      "technologies": ["Vue.js", "JavaScript", "Chrome API"],
      "status": "completed"
    }
  ]
}</pre>
    `;
}

// Display contact in terminal
function displayContact() {
    contactResponse.style.display = 'block';
    contactResponse.innerHTML = `
        <pre>{
  "email": "sujakhu.umesh@gmail.com",
  "location": "Bhaktapur, Nepal",
  "social": {
    "github": "https://github.com/umeshsujakhu",
    "linkedin": "https://www.linkedin.com/in/umesh-sujakhu",
    "medium": "https://medium.com/@sujakhu.umesh"
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
            
            // Add command to terminal
            addCommandLine(command);
            
            // Execute command
            executeCommand(command);
        }
    });
});

// Initialize typeable terminal
function initTypeableTerminal() {
    // Create input line
    const inputLine = document.createElement('div');
    inputLine.className = 'line input-line';
    inputLine.innerHTML = `
        <span class="prompt">umesh@portfolio:~$</span>
        <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false">
    `;
    
    // Replace the blinking cursor line with the input line
    const blinkingCursorLine = document.querySelector('.terminal-content .line:last-child');
    blinkingCursorLine.replaceWith(inputLine);
    
    // Focus on input
    const terminalInput = document.getElementById('terminal-input');
    
    // Handle input events
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value;
            
            // Add command to terminal
            addCommandLine(command);
            
            // Execute command
            executeCommand(command);
            
            // Clear input
            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            // Navigate command history (up)
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
                // Move cursor to end of input
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                }, 0);
            }
        } else if (e.key === 'ArrowDown') {
            // Navigate command history (down)
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else if (historyIndex === commandHistory.length - 1) {
                historyIndex = commandHistory.length;
                terminalInput.value = currentInput;
            }
        } else if (e.key === 'Tab') {
            // Command auto-completion
            e.preventDefault();
            const input = terminalInput.value.toLowerCase();
            
            if (input) {
                const matches = Object.keys(availableCommands).filter(cmd => cmd.startsWith(input));
                if (matches.length === 1) {
                    terminalInput.value = matches[0];
                } else if (matches.length > 1) {
                    // Show available completions
                    addCommandLine(input);
                    addTerminalResponse(`<div class="completion-suggestions">${matches.join(', ')}</div>`);
                }
            }
        } else {
            // Store current input for history navigation
            currentInput = terminalInput.value;
        }
    });
    
    // Focus terminal input when clicking on terminal
    terminalContainer.addEventListener('click', () => {
        terminalInput.focus();
    });
    
    // Initial help message
    setTimeout(() => {
        addTerminalResponse('Welcome to Umesh\'s portfolio terminal. Type <span class="command-highlight">help</span> for available commands.');
    }, 4000);
}

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

// Matrix rain effect - Modified to be dimmer and easier on the eyes
function createMatrixRain() {
    const matrixRain = document.createElement('div');
    matrixRain.className = 'matrix-rain';
    document.body.appendChild(matrixRain);
    
    // Reduced character set for better readability
    const characters = '01';
    
    // Significantly increased spacing between columns for reduced density
    const columns = Math.floor(window.innerWidth / 50);
    
    // Create much fewer drops overall
    const dropDensity = 0.5; // Only create 50% of possible columns
    
    for (let i = 0; i < columns; i++) {
        // Skip some columns randomly to reduce density
        if (Math.random() > dropDensity) continue;
        
        const drop = document.createElement('div');
        drop.className = 'matrix-drop';
        drop.style.left = i * 50 + 'px'; // Much wider spacing between columns
        
        // Very slow animation duration (10-20 seconds)
        drop.style.animationDuration = Math.random() * 10 + 10 + 's';
        
        // Very long delays between drops (5-20 seconds)
        drop.style.animationDelay = Math.random() * 15 + 5 + 's';
        
        // Very low opacity for minimal visual strain
        drop.style.opacity = '0.15';
        
        drop.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        matrixRain.appendChild(drop);
    }
    
    // Add CSS for matrix rain effect
    const style = document.createElement('style');
    style.textContent += `
        .matrix-rain {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        }
        
        .matrix-drop {
            position: absolute;
            top: -20px;
            color: rgba(0, 160, 0, 0.25); /* Very soft green with high transparency */
            font-family: var(--font-code), 'Courier New', monospace;
            font-size: 12px; /* Even smaller font size */
            text-shadow: 0 0 1px rgba(0, 160, 0, 0.1); /* Minimal glow */
            animation-name: matrix-fall;
            animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1); /* Smooth easing */
            animation-iteration-count: infinite;
            filter: blur(0.5px); /* Slight blur to reduce harshness */
        }
        
        @keyframes matrix-fall {
            0% {
                transform: translateY(-100px);
                opacity: 0;
            }
            25% { /* Very slow fade in */
                opacity: 0.15;
            }
            75% { /* Extended visible time */
                opacity: 0.15;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
        
        /* Terminal input styling */
        .terminal-input {
            background: transparent;
            border: none;
            color: var(--accent-primary);
            font-family: var(--font-code);
            font-size: 0.9rem;
            caret-color: var(--accent-primary);
            outline: none;
            width: calc(100% - 180px);
            padding: 0;
            margin: 0;
        }
        
        .command-highlight {
            color: var(--accent-primary);
            font-weight: bold;
        }
        
        .help-content ul {
            list-style-type: none;
            margin-left: 1rem;
        }
        
        .help-content .command-name {
            color: var(--accent-primary);
            font-weight: bold;
            margin-right: 0.5rem;
        }
        
        .completion-suggestions {
            color: var(--accent-secondary);
            margin-bottom: 0.5rem;
        }
    `;
    document.head.appendChild(style);
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
            
            // Initialize typeable terminal after initial animation
            setTimeout(initTypeableTerminal, 1000);
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
                addCommandLine('echo "Message sent successfully!"');
                addTerminalResponse('Message sent successfully!');
            }
        }, 2000);
    });
}
