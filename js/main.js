// ===========================
// MathCounts Study Guide - JavaScript
// ===========================

document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Solution Toggle Functionality
    const solutionHeaders = document.querySelectorAll('.solution-header');

    solutionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');

            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                if (arrow) arrow.textContent = '▼';
            } else {
                content.classList.add('hidden');
                if (arrow) arrow.textContent = '▶';
            }
        });
    });

    // Highlight active navigation link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            currentPath.includes(link.getAttribute('href').replace('.html', ''))) {
            link.classList.add('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Problem filter functionality (for practice pages)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const problems = document.querySelectorAll('.problem');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter problems
            problems.forEach(problem => {
                if (filter === 'all') {
                    problem.style.display = 'block';
                } else {
                    if (problem.dataset.difficulty === filter ||
                        problem.dataset.topic === filter) {
                        problem.style.display = 'block';
                    } else {
                        problem.style.display = 'none';
                    }
                }
            });
        });
    });

    // Toggle all solutions
    const toggleAllBtn = document.getElementById('toggle-all-solutions');
    if (toggleAllBtn) {
        toggleAllBtn.addEventListener('click', function() {
            const solutions = document.querySelectorAll('.solution-content');
            const allHidden = Array.from(solutions).every(s => s.classList.contains('hidden'));

            solutions.forEach(solution => {
                if (allHidden) {
                    solution.classList.remove('hidden');
                } else {
                    solution.classList.add('hidden');
                }
            });

            this.textContent = allHidden ? 'Hide All Solutions' : 'Show All Solutions';
        });
    }

    // Print functionality
    const printBtn = document.getElementById('print-page');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Progress tracking (for practice problems)
    function trackProgress() {
        const completedProblems = JSON.parse(localStorage.getItem('completedProblems') || '[]');
        const checkboxes = document.querySelectorAll('.problem-checkbox');

        checkboxes.forEach(checkbox => {
            const problemId = checkbox.dataset.problemId;
            if (completedProblems.includes(problemId)) {
                checkbox.checked = true;
                checkbox.closest('.problem').classList.add('completed');
            }

            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    if (!completedProblems.includes(problemId)) {
                        completedProblems.push(problemId);
                    }
                    this.closest('.problem').classList.add('completed');
                } else {
                    const index = completedProblems.indexOf(problemId);
                    if (index > -1) {
                        completedProblems.splice(index, 1);
                    }
                    this.closest('.problem').classList.remove('completed');
                }
                localStorage.setItem('completedProblems', JSON.stringify(completedProblems));
                updateProgressBar();
            });
        });

        updateProgressBar();
    }

    function updateProgressBar() {
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        if (progressBar && progressText) {
            const total = document.querySelectorAll('.problem-checkbox').length;
            const completed = document.querySelectorAll('.problem-checkbox:checked').length;
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

            progressBar.style.width = percentage + '%';
            progressText.textContent = `${completed} of ${total} problems completed (${percentage}%)`;
        }
    }

    trackProgress();

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const searchableItems = document.querySelectorAll('.searchable');

            searchableItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.style.display = 'block';
            } else {
                backToTop.style.display = 'none';
            }
        });

        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Random problem generator
    const randomProblemBtn = document.getElementById('random-problem');
    if (randomProblemBtn) {
        randomProblemBtn.addEventListener('click', function() {
            const problems = document.querySelectorAll('.problem');
            if (problems.length > 0) {
                const randomIndex = Math.floor(Math.random() * problems.length);
                problems[randomIndex].scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                problems[randomIndex].style.border = '3px solid #e74c3c';
                setTimeout(() => {
                    problems[randomIndex].style.border = '';
                }, 2000);
            }
        });
    }

    // Timer functionality for practice
    let timerInterval;
    let seconds = 0;

    const startTimerBtn = document.getElementById('start-timer');
    const stopTimerBtn = document.getElementById('stop-timer');
    const resetTimerBtn = document.getElementById('reset-timer');
    const timerDisplay = document.getElementById('timer-display');

    if (startTimerBtn) {
        startTimerBtn.addEventListener('click', function() {
            if (!timerInterval) {
                timerInterval = setInterval(function() {
                    seconds++;
                    updateTimerDisplay();
                }, 1000);
                this.disabled = true;
                if (stopTimerBtn) stopTimerBtn.disabled = false;
            }
        });
    }

    if (stopTimerBtn) {
        stopTimerBtn.addEventListener('click', function() {
            clearInterval(timerInterval);
            timerInterval = null;
            if (startTimerBtn) startTimerBtn.disabled = false;
            this.disabled = true;
        });
    }

    if (resetTimerBtn) {
        resetTimerBtn.addEventListener('click', function() {
            clearInterval(timerInterval);
            timerInterval = null;
            seconds = 0;
            updateTimerDisplay();
            if (startTimerBtn) startTimerBtn.disabled = false;
            if (stopTimerBtn) stopTimerBtn.disabled = true;
        });
    }

    function updateTimerDisplay() {
        if (timerDisplay) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    }
});

// Utility function to format numbers
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Mathematical helper functions
const MathHelpers = {
    gcd: function(a, b) {
        return b === 0 ? a : this.gcd(b, a % b);
    },

    lcm: function(a, b) {
        return (a * b) / this.gcd(a, b);
    },

    isPrime: function(n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
    },

    factorial: function(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
};
