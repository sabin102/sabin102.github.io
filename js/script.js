document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    const loader = document.getElementById('loader');
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }
    }, 800);

    // 2. Dark/Light Mode
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        if (themeToggle) themeToggle.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // 3. Dynamic Projects Loader
    const projectContainer = document.getElementById('projects-container');
    if (projectContainer) {
        fetch('data/projects.json')
            .then(response => response.json())
            .then(data => {
                data.forEach((project, index) => {
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    card.style.animationDelay = `${index * 100}ms`;

                    card.innerHTML = `
                        <img src="${project.image}" alt="${project.title}" class="project-img">
                        <div class="project-content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="tags" style="margin: 10px 0;">
                                ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                            </div>
                            <div class="links">
                                <a href="${project.liveLink}" target="_blank" class="btn" style="padding: 5px 15px; font-size: 0.9rem;">View</a>
                                <a href="${project.githubLink}" target="_blank" style="margin-left: 10px; color: var(--text-color);"><i class="fab fa-github"></i> Code</a>
                            </div>
                        </div>
                    `;
                    projectContainer.appendChild(card);
                    setTimeout(() => card.classList.add('visible'), 50);
                });
            })
            .catch(err => console.error('Error loading projects:', err));
    }

    // 4. Scroll Spy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 5. INPUT VALIDATION (NEW FEATURE)

    // Validate Name: Only Letters and Spaces
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('input', function () {
            // Regex: Replace anything that is NOT (^) a-z, A-Z, or space (\s)
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    }

    // Validate Message: Remove Emojis
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('input', function () {
            // Regex to strip common emoji ranges
            const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
            this.value = this.value.replace(emojiRegex, '');
        });
    }
});
