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
    creditsContainer.innerHTML = album.credits
      .map(credit => `
        <div>
          <div class="font-ibmplex text-navbarItem text-sm">${credit.role}</div>
          <div class="font-ibmplex text-navbarItemHover text-lg mt-1">${credit.name}</div>
        </div>
      `)
      .join('');
    
    // Generate Spotify link with icon
    const linksContainer = document.getElementById('modalLinks');
    linksContainer.innerHTML = `
      <a href="${album.spotifyUrl}" 
         target="_blank" 
         class="inline-flex items-center justify-center w-8 h-8 transition hover:text-highlight">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-full h-full text-navbarItem">
          <path fill="currentColor" d="M31.747,33.915c-0.292,0-0.585-0.145-0.877-0.292c-2.777-1.607-6.139-2.484-9.792-2.484c-2.047,0-4.093,0.291-5.993,0.73 c-0.292,0-0.731,0.146-0.877,0.146c-0.731,0-1.169-0.586-1.169-1.17c0-0.73,0.438-1.17,1.023-1.314 c2.338-0.586,4.677-0.877,7.161-0.877c4.093,0,7.893,1.021,11.108,2.924c0.438,0.291,0.731,0.584,0.731,1.314 C32.916,33.478,32.331,33.915,31.747,33.915z M33.793,28.945c-0.438,0-0.73-0.144-1.023-0.291c-3.068-1.9-7.308-3.071-12.13-3.071 c-2.339,0-4.531,0.293-6.139,0.733c-0.439,0.144-0.585,0.144-0.877,0.144c-0.877,0-1.462-0.73-1.462-1.461 c0-0.877,0.439-1.316,1.169-1.607c2.192-0.584,4.385-1.023,7.454-1.023c4.97,0,9.793,1.17,13.593,3.507 c0.584,0.291,0.877,0.877,0.877,1.461C35.255,28.215,34.67,28.945,33.793,28.945z M36.132,23.101c-0.438,0-0.585-0.146-1.023-0.291 c-3.508-2.047-8.769-3.217-13.885-3.217c-2.631,0-5.262,0.293-7.6,0.877c-0.293,0-0.585,0.146-1.023,0.146 c-1.023,0.146-1.754-0.73-1.754-1.754c0-1.023,0.585-1.607,1.315-1.754c2.777-0.877,5.7-1.17,9.062-1.17 c5.554,0,11.4,1.17,15.785,3.654c0.584,0.293,1.022,0.877,1.022,1.754C37.886,22.369,37.154,23.101,36.132,23.101z"/>
          <path fill="currentColor" d="M24,44C12.972,44,4,35.028,4,24S12.972,4,24,4s20,8.972,20,20S35.028,44,24,44z M24,6C14.075,6,6,14.075,6,24 s8.075,18,18,18s18-8.075,18-18S33.925,6,24,6z"/>
        </svg>
      </a>
    `;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  // Close modal functionality
  function closeAlbumDetails() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  closeModal.addEventListener('click', closeAlbumDetails);
  
  // Close on click outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
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
