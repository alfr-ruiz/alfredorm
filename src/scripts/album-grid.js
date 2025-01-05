document.addEventListener('DOMContentLoaded', () => {
  const albumGrid = document.querySelector('.album-grid');
  const modal = document.getElementById('albumModal');
  const closeModal = document.getElementById('closeModal');
  
  // Album data with detailed information
  const albums = [
    {
      title: "Hejira",
      artist: "Joni Mitchell",
      image: "images/album-art/Hejira.jpg",
      releaseYear: "1976",
      label: "Asylum Records",
      credits: [
        { role: "Location", name: "A&M Studios, Hollywood" },
        { role: "Recording", name: "Henry Lewy" },
        { role: "Mixing", name: "Henry Lewy & Steve Katz" },
        { role: "Mastering", name: "Bernie Grundman" },
        { role: "Copyright", name: "All songs by Mitchell 1976 Crazy Crow Music (BMI)" }
      ]
    }
  ];

  // Generate album items
  albums.forEach((album, index) => {
    const albumItem = document.createElement('div');
    albumItem.className = `group relative opacity-0 animate-slide-down animation-delay-${index}00 cursor-pointer`;
    
    albumItem.innerHTML = `
      <img src="${album.image}"
           alt="Album Art - ${album.title}"
           class="w-full aspect-square object-cover rounded-lg" />
      <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition duration-300 rounded-lg">
        <div class="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition duration-300 px-4">
          <h3 class="album-title text-white">${album.title}</h3>
          <p class="album-artist text-white">${album.artist}</p>
        </div>
      </div>
    `;
    
    // Add click event for all albums
    albumItem.addEventListener('click', () => {
      if (album.releaseYear) {
        showAlbumDetails(album);
      }
    });
    
    albumGrid.appendChild(albumItem);
  });

  // Modal functionality
  function showAlbumDetails(album) {
    // Set basic info
    document.getElementById('modalAlbumArt').src = album.image;
    document.getElementById('modalAlbumArt').alt = `Album Art - ${album.title}`;
    document.getElementById('modalTitle').textContent = album.title;
    document.getElementById('modalArtist').textContent = album.artist;
    document.getElementById('modalReleaseYear').textContent = album.releaseYear;
    document.getElementById('modalLabel').textContent = album.label;
    
    // Generate credits
    const creditsContainer = document.getElementById('modalCredits');
    const credits = album.credits.filter(credit => credit.role !== "Copyright");
    creditsContainer.innerHTML = credits
      .map(credit => `
        <div>
          <div class="font-ibmplex text-navbarItem text-sm">${credit.role}</div>
          <div class="font-ibmplex text-navbarItemHover text-lg mt-2">${credit.name}</div>
        </div>
      `)
      .join('');
    
    // Add copyright notice
    const copyrightContainer = document.getElementById('modalCopyright');
    const copyrightText = album.credits.find(credit => credit.role === "Copyright")?.name;
    if (copyrightText) {
      copyrightContainer.innerHTML = `
        <div class="font-novela text-xs text-navbarItem/40">&copy;&nbsp;${copyrightText}</div>
      `;
    } else {
      copyrightContainer.innerHTML = '';
    }
    
    // Generate Spotify link with icon
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = `
      <a href="https://open.spotify.com/album/3Z0qQc09rmk4JYtIaxEx2J?si=F8h_a4_VS5ik21zlduwdxw" 
         target="_blank" 
         class="text-navbarItem hover:text-navbarItemHover transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
        </svg>
      </a>
    `;
    
    // Show modal with animation
    const modal = document.getElementById('albumModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = modal.querySelector('.relative.w-full');
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Reset animations
    modalOverlay.classList.remove('modal-overlay-exit');
    modalContent.classList.remove('modal-content-exit');
    modalOverlay.classList.add('modal-overlay-enter');
    modalContent.classList.add('modal-content-enter');
  }

  function closeAlbumDetails() {
    const modal = document.getElementById('albumModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = modal.querySelector('.relative.w-full');
    
    // Start exit animations
    modalOverlay.classList.remove('modal-overlay-enter');
    modalContent.classList.remove('modal-content-enter');
    modalOverlay.classList.add('modal-overlay-exit');
    modalContent.classList.add('modal-content-exit');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 195); // Match the animation duration
  }
  
  // Close on click outside
  document.getElementById('modalOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeAlbumDetails();
    }
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAlbumDetails();
    }
  });
});
