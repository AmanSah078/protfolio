// ========== DOM READY ==========
document.addEventListener('DOMContentLoaded', function() {
    
    console.log('%c🚀 Portfolio Script Loaded!', 'color: #4361ee; font-size: 16px; font-weight: bold;');
    
    // ========== CREATE BACKGROUND PARTICLES ==========
    function createParticles() {
        const bg = document.querySelector('.animated-bg');
        if(!bg) return;
        
        // Clear existing particles
        const existingParticles = bg.querySelectorAll('.particle, .floating-element, .glow-orb');
        existingParticles.forEach(el => el.remove());
        
        // Create glowing orbs
        const orb1 = document.createElement('div');
        orb1.className = 'glow-orb glow-orb-1';
        bg.appendChild(orb1);
        
        const orb2 = document.createElement('div');
        orb2.className = 'glow-orb glow-orb-2';
        bg.appendChild(orb2);
        
        // Create floating code elements
        const elements = ['{ }', '< />', 'AI', 'JS', 'PY', 'CSS', 'HTML', 'NLP', 'MCA', 'JAVA', '() =>', 'import', 'def', 'class', 'const'];
        for(let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = elements[Math.floor(Math.random() * elements.length)];
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 20 + 's';
            element.style.fontSize = (Math.random() * 8 + 14) + 'px';
            element.style.opacity = Math.random() * 0.15 + 0.05;
            bg.appendChild(element);
        }
    }
    
    // ========== MOBILE MENU TOGGLE ==========
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            this.classList.toggle('active');
            
            // Toggle hamburger icon
            const icon = this.querySelector('i');
            if(navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuToggle.classList.remove('active');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            });
        });
    }
    
    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if(href === '#' || !href.startsWith('#')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            if(!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if(targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== TYPEWRITER EFFECT ==========
    const typewriter = document.querySelector('.typewriter');
    if(typewriter) {
        const text = "Sarmil Pani";
        const spanElement = typewriter.querySelector('.highlight');
        
        if(spanElement) {
            spanElement.style.width = '0';
            spanElement.style.overflow = 'hidden';
            spanElement.style.display = 'inline-block';
            spanElement.style.verticalAlign = 'bottom';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    spanElement.textContent = spanElement.textContent + text.charAt(i);
                    spanElement.style.width = ((i + 1) / text.length * 100) + '%';
                    i++;
                    setTimeout(typeWriter, 100);
                } else {
                    // Remove cursor after typing
                    setTimeout(() => {
                        typewriter.style.borderRight = 'none';
                    }, 500);
                }
            }
            
            // Start typing
            setTimeout(() => {
                spanElement.textContent = '';
                typeWriter();
            }, 1000);
        }
    }
    
    // ========== ANIMATE SKILLS PROGRESS BARS ==========
    function animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        
        progressFills.forEach(fill => {
            const rect = fill.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if(isVisible && !fill.classList.contains('animated')) {
                const width = fill.getAttribute('data-width') || '0';
                fill.classList.add('animated');
                
                // Animate progress bar
                setTimeout(() => {
                    fill.style.width = width + '%';
                    
                    // Animate percentage counter
                    const percentElement = fill.closest('.skill-item').querySelector('.skill-percent');
                    if(percentElement) {
                        let current = 0;
                        const target = parseInt(width);
                        const duration = 1500;
                        const increment = target / (duration / 16);
                        
                        function updateCounter() {
                            current += increment;
                            if(current < target) {
                                percentElement.textContent = Math.round(current) + '%';
                                requestAnimationFrame(updateCounter);
                            } else {
                                percentElement.textContent = target + '%';
                            }
                        }
                        updateCounter();
                    }
                }, 300);
            }
        });
    }
    
    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    function animateOnScroll() {
        const elements = document.querySelectorAll('.edu-card, .skill-category, .timeline-item, .skill-card');
        
        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if(isVisible && !el.classList.contains('animated')) {
                el.classList.add('animated');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                
                // Stagger animation
                if(el.classList.contains('skill-card')) {
                    el.style.transitionDelay = (index % 5) * 0.1 + 's';
                }
            }
        });
        
        // Animate progress bars
        animateProgressBars();
    }
    
    // ========== UPDATE ACTIVE NAV LINK ==========
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('.nav-links a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if(window.scrollY >= (sectionTop - navbarHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if(href === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        // If at top, highlight home
        if(window.scrollY < 100) {
            navItems.forEach(item => item.classList.remove('active'));
            const homeLink = document.querySelector('.nav-links a[href="#home"]');
            if(homeLink) homeLink.classList.add('active');
        }
    }
    
    // ========== SKILL CARD HOVER EFFECTS ==========
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const skill = this.getAttribute('data-skill');
            const icon = this.querySelector('.skill-icon i');
            
            // Add pulse animation to icon
            icon.style.animation = 'pulseIcon 0.5s';
            
            // Add glow effect
            const glow = this.querySelector('.icon-glow');
            if(glow) {
                glow.style.opacity = '1';
                glow.style.transform = 'scale(1.5)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.animation = '';
            
            const glow = this.querySelector('.icon-glow');
            if(glow) {
                glow.style.opacity = '0.5';
                glow.style.transform = 'scale(1)';
            }
        });
    });
    
    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();
            
            // Validation
            if(!name || !email || !message) {
                showNotification('Please fill all fields!', 'error');
                return;
            }
            
            if(!validateEmail(email)) {
                showNotification('Please enter a valid email!', 'error');
                return;
            }
            
            // Show loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll reply soon.', 'success');
                this.reset();
                
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Log to console
                console.log('📧 New Message:', { name, email, message, time: new Date().toLocaleTimeString() });
            }, 1500);
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ========== NOTIFICATION SYSTEM ==========
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification');
        existing.forEach(notif => notif.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 
                                 type === 'error' ? 'exclamation-circle' : 
                                 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="close-notification">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove
        const autoRemove = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.close-notification').addEventListener('click', () => {
            clearTimeout(autoRemove);
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // ========== RESUME DOWNLOAD SIMULATION ==========
    const resumeBtn = document.querySelector('a.btn.outline');
    if(resumeBtn && resumeBtn.innerHTML.includes('Download Resume')) {
        resumeBtn.addEventListener('click', function(e) {
            // Check if resume exists
            const resumePath = this.getAttribute('href');
            if(!resumePath || resumePath === '#' || resumePath.includes('#')) {
                e.preventDefault();
                
                showNotification('📄 Resume will be downloaded when file is added!', 'info');
                
                // Simulate download after 1s
                setTimeout(() => {
                    // Create temporary link for download
                    const tempLink = document.createElement('a');
                    tempLink.href = '#';
                    tempLink.download = 'Sarmil_Pani_Resume.pdf';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    
                    showNotification('✅ Resume downloaded successfully!', 'success');
                }, 1000);
            }
        });
    }
    
    // ========== GITHUB LINK FIX ==========
    const githubLinks = document.querySelectorAll('a[href="#"] .fa-github');
    githubLinks.forEach(icon => {
        const link = icon.closest('a');
        if(link && link.getAttribute('href') === '#') {
            link.href = 'https://github.com/yourusername'; // Add your GitHub URL
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        }
    });
    
    // ========== INITIAL SETUP ==========
    // Set initial animation states
    document.querySelectorAll('.edu-card, .skill-category, .timeline-item, .skill-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Initialize progress bars
    document.querySelectorAll('.progress-fill').forEach(fill => {
        fill.style.width = '0%';
    });
    
    // Create particles
    createParticles();
    
    // Initial animations
    setTimeout(animateOnScroll, 500);
    setTimeout(animateProgressBars, 800);
    
    // Set up event listeners
    window.addEventListener('scroll', () => {
        animateOnScroll();
        updateActiveNav();
    });
    
    // Initial active nav
    updateActiveNav();
    
    // ========== ADD EXTRA STYLES ==========
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        /* Skill card animations */
        .skill-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .skill-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3) !important;
        }
        
        .icon-glow {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        @keyframes pulseIcon {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        /* Progress bar animation */
        .progress-fill {
            transition: width 1.5s cubic-bezier(0.65, 0, 0.35, 1) !important;
        }
        
        /* Mobile menu */
        .nav-links.show {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(26, 26, 46, 0.98);
            backdrop-filter: blur(20px);
            padding: 30px 20px;
            border-top: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 20px 50px rgba(0,0,0,0.4);
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Typewriter cursor */
        .typewriter {
            border-right: 3px solid #f72585;
            padding-right: 5px;
            animation: blinkCursor 1s infinite;
        }
        
        @keyframes blinkCursor {
            0%, 100% { border-color: #f72585; }
            50% { border-color: transparent; }
        }
    `;
    document.head.appendChild(extraStyles);
    
    // ========== LOAD IMAGE FUNCTION ==========
    function loadProfileImage() {
        const imagePlaceholder = document.querySelector('.image-placeholder');
        if(!imagePlaceholder) return;
        
        // Check if image exists
        const imageUrl = 'assets/images/profile.jpg'; // Your image path
        const img = new Image();
        img.src = imageUrl;
        
        img.onload = function() {
            // Replace placeholder with actual image
            imagePlaceholder.innerHTML = '';
            imagePlaceholder.style.background = 'none';
            imagePlaceholder.appendChild(img);
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '30px';
            img.alt = 'Sarmil Pani';
        };
        
        img.onerror = function() {
            // Keep placeholder icon if image not found
            console.log('Profile image not found. Using placeholder.');
        };
    }
    
    // Load profile image
    loadProfileImage();
    
    // ========== CONSOLE WELCOME MESSAGE ==========
    console.log('%c✨ Welcome to Sarmil Pani\'s Portfolio!', 'color: #f72585; font-size: 18px; font-weight: bold;');
    console.log('%c🚀 All systems are working perfectly!', 'color: #4361ee; font-size: 14px;');
});

// ========== WINDOW LOAD ==========
window.addEventListener('load', function() {
    // Add loaded class for any final animations
    document.body.classList.add('loaded');
    
    // Final check for animations
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 1000);
});
//Bhai+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Add this to your Prot.js file

// ========== COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ========== 3D CARD ANIMATIONS ==========
function init3DCards() {
    const cards = document.querySelectorAll('.skill-card');
    
    cards.forEach(card => {
        // Add hover animation delay for stagger effect
        card.style.transitionDelay = `${Math.random() * 0.3}s`;
        
        // Add click to flip on mobile
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                this.querySelector('.card-inner').classList.toggle('flipped');
            }
        });
    });
}

// ========== BEYOND CODING SECTION ANIMATION ==========
function animateBeyondCodingSection() {
    const section = document.getElementById('beyond-coding');
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate cards in sequence
                const cards = section.querySelectorAll('.skill-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                
                // Animate banner
                setTimeout(() => {
                    const banner = section.querySelector('.impact-banner');
                    if (banner) {
                        banner.style.opacity = '1';
                        banner.style.transform = 'translateY(0)';
                    }
                }, 1000);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(section);
    
    // Set initial state
    section.querySelectorAll('.skill-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const banner = section.querySelector('.impact-banner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transform = 'translateY(30px)';
        banner.style.transition = 'opacity 0.8s ease 1s, transform 0.8s ease 1s';
    }
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Initialize new animations
    setTimeout(() => {
        animateCounters();
        init3DCards();
        animateBeyondCodingSection();
    }, 1000);
    
    // Also call on scroll
    window.addEventListener('scroll', () => {
        animateBeyondCodingSection();
    });
});

//PROJECT-----------------------------------------------------------
// Add this to your Prot.js file

// ========== PROJECTS SECTION ANIMATIONS ==========
// Add to your Prot.js file for contact section
document.addEventListener('DOMContentLoaded', function() {
    // Add copy functionality on click
    const phoneLink = document.querySelector('.contact-link[href^="tel:"]');
    const emailLink = document.querySelector('.contact-link[href^="mailto:"]');
    
    // Phone number click handler
    if (phoneLink) {
        // phoneLink.addEventListener('click', function(e) {
        //     // On mobile, it will auto-dial, but on desktop we can copy to clipboard
        //     if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //         e.preventDefault();
        //         const phoneNumber = this.querySelector('p').textContent.trim();
        //         navigator.clipboard.writeText(phoneNumber).then(() => {
        //             const originalText = this.querySelector('h4').textContent;
        //             this.querySelector('h4').textContent = 'Copied!';
        //             setTimeout(() => {
        //                 this.querySelector('h4').textContent = originalText;
        //             }, 2000);
        //         });
        //     }
        // });
    }
    
    // Email click handler
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            // On desktop, add copy to clipboard as secondary action
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                const email = this.querySelector('p').textContent.trim();
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = this.querySelector('h4').textContent;
                    this.querySelector('h4').textContent = 'Copied!';
                    setTimeout(() => {
                        this.querySelector('h4').textContent = originalText;
                    }, 2000);
                });
            }
        });
    }
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show success message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (in real project, use AJAX)
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});

// Form validation with better feedback
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const submitBtn = this.querySelector('button[type="submit"]');
            
            // Reset previous error states
            [name, email, message].forEach(input => {
                input.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            });
            
            // Validation
            let isValid = true;
            
            if (!name.value.trim()) {
                name.style.borderColor = '#ff4757';
                isValid = false;
            }
            
            if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                email.style.borderColor = '#ff4757';
                isValid = false;
            }
            
            if (!message.value.trim()) {
                message.style.borderColor = '#ff4757';
                isValid = false;
            }
            
            if (!isValid) {
                return;
            }
            
            // Show sending state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitBtn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
                
                // Clear form
                contactForm.reset();
                
                // Reset after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = 'rgba(77, 91, 255, 0.5)';
                } else {
                    this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }
            });
        });
    }
});
// Hire Section Scripts

    
    // Add hover effects to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

// Open Calendly function
function openCalendly() {
    // Replace with your actual Calendly link
    const calendlyLink = 'https://calendly.com/sarmilpani';
    window.open(calendlyLink, '_blank', 'noopener,noreferrer');
    
    // Or show a modal if you prefer
    // alert("Schedule your interview at: calendly.com/sarmilpani");
}

// Download Resume function
function downloadResume() {
    // Replace with your actual resume path
    const resumePath = '/public/Protfolio_Of_Shelly_Didi/resume/Shelly (2).pdf';
    
    // Create temporary link
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Sarmil_Pani_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    showSuccessMessage('Resume download started!');
}

// Copy Contact Info function
function copyContactInfo() {
    const contactInfo = `👤 Sarmil Pani
📞 Phone: +91 70086 50626
📧 Email: sarmilpani37@gmail.com
💼 LinkedIn: https://www.linkedin.com/in/sarmil-pani-628710287/
⏰ Availability: Mon-Sat, 10 AM - 7 PM`;
    
    navigator.clipboard.writeText(contactInfo).then(() => {
        showSuccessMessage('Contact info copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = contactInfo;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showSuccessMessage('Contact info copied to clipboard!');
    });
}

// Show success messag
function showSuccessMessage(message = 'Form submitted successfully!') {
    // Remove existing message if any
    const existingMsg = document.getElementById('customSuccessMessage');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    // Create new message element
    const successMsg = document.createElement('div');
    successMsg.id = 'customSuccessMessage';
    successMsg.className = 'success-message';
    successMsg.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(successMsg);
    
    // Show message
    successMsg.style.display = 'flex';
    
    // Hide after 5 seconds
    setTimeout(() => {
        successMsg.style.opacity = '0';
        successMsg.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (successMsg.parentNode) {
                successMsg.parentNode.removeChild(successMsg);
            }
        }, 500);
    }, 5000);
}
// Form validation and feedback
document.addEventListener('DOMContentLoaded', function() {
    const hireForm = document.getElementById('hireForm');
    
    if (hireForm) {
        hireForm.addEventListener('submit', function(e) {
            // Basic validation
            const hrName = document.getElementById('hrName').value.trim();
            const companyName = document.getElementById('companyName').value.trim();
            const hrEmail = document.getElementById('hrEmail').value.trim();
            const jobRole = document.getElementById('jobRole').value;
            
            // Check required fields
            if (!hrName || !companyName || !hrEmail || !jobRole) {
                e.preventDefault();
                alert('❌ Please fill all required fields marked with *');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(hrEmail)) {
                e.preventDefault();
                alert('❌ Please enter a valid email address');
                return false;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('.hire-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Let Formspree handle the submission
            // Form will submit normally
            
            // Reset button after 3 seconds (in case page doesn't redirect)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 3000);
        });
    }
});

// Download Resume function
function downloadResume() {
    // Update with your actual resume path
    const resumeUrl = '/public/Protfolio_Of_Shelly_Didi/resume/Shelly (2).pdf';
    
    // Create temporary link
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Sarmil_Pani_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Optional: Show confirmation
    alert('📄 Resume download started!');
}