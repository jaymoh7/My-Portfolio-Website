// Project Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.getElementById('projectModal');
    const closeModal = document.getElementById('closeModal');

    // Filter projects
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-white'));
            
            // Add active class to clicked button
            button.classList.add('active', 'bg-blue-600', 'text-white');
            button.classList.remove('bg-gray-200', 'dark:bg-gray-700', 'text-gray-800', 'dark:text-white');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    gsap.from(card, {
                        duration: 0.5,
                        y: 50,
                        opacity: 0,
                        ease: 'power3.out'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Project Modal
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const description = card.querySelector('p').textContent;
            const image = card.querySelector('img').src;
            const githubLink = card.querySelector('a[href*="github"]').href;
            const projectLink = card.querySelector('a:not([href*="github"])').href;

            // Update modal content
            projectModal.querySelector('h2').textContent = title;
            projectModal.querySelector('p').textContent = description;
            projectModal.querySelector('img').src = image;
            projectModal.querySelector('a:not([href*="github"])').href = projectLink;
            projectModal.querySelector('a[href*="github"]').href = githubLink;

            // Show modal with animation
            projectModal.classList.remove('hidden');
            gsap.from(projectModal.querySelector('.bg-white'), {
                duration: 0.5,
                scale: 0.8,
                opacity: 0,
                ease: 'power3.out'
            });
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        gsap.to(projectModal.querySelector('.bg-white'), {
            duration: 0.3,
            scale: 0.8,
            opacity: 0,
            ease: 'power3.in',
            onComplete: () => {
                projectModal.classList.add('hidden');
            }
        });
    });

    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            gsap.to(projectModal.querySelector('.bg-white'), {
                duration: 0.3,
                scale: 0.8,
                opacity: 0,
                ease: 'power3.in',
                onComplete: () => {
                    projectModal.classList.add('hidden');
                }
            });
        }
    });

    // Prevent modal from closing when clicking inside
    projectModal.querySelector('.bg-white').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}); 