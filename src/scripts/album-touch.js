document.addEventListener('DOMContentLoaded', () => {
  const albumItems = document.querySelectorAll('.group');

  albumItems.forEach(item => {
    let touchStartY = 0;
    let touchStartTime = 0;

    item.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      
      // Show the description overlay
      const overlay = item.querySelector('.bg-black');
      const content = item.querySelector('.opacity-0');
      
      overlay.classList.remove('bg-opacity-0');
      overlay.classList.add('bg-opacity-80');
      content.classList.remove('opacity-0');
      content.classList.add('opacity-100');
    });

    item.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Prevent default scrolling while touching album art
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - touchStartY;
      
      // Optional: Add some parallax effect to the description based on scroll
      const content = item.querySelector('.opacity-100');
      if (content) {
        content.style.transform = `translateY(${deltaY * 0.1}px)`;
      }
    });

    item.addEventListener('touchend', () => {
      const timeDiff = Date.now() - touchStartTime;
      
      // If it was a quick tap (less than 300ms), keep the overlay visible
      // Otherwise, hide it after touch ends
      if (timeDiff > 300) {
        const overlay = item.querySelector('.bg-black');
        const content = item.querySelector('.opacity-100');
        
        if (overlay && content) {
          overlay.classList.add('bg-opacity-0');
          overlay.classList.remove('bg-opacity-80');
          content.classList.add('opacity-0');
          content.classList.remove('opacity-100');
          content.style.transform = '';
        }
      }
    });
  });
});
