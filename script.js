document.addEventListener('DOMContentLoaded', function() {
  const heroBackground = document.getElementById('heroBackground');
  let currentImageIndex = 0;
  let images = [];
  
  // Fetch images from JSON file
  fetch('images.json')
    .then(response => response.json())
    .then(data => {
      images = data; // data is directly the array
      
      // Shuffle the images array
      shuffleArray(images);
      
      // Set initial background
      updateBackground();
      
      // Change background every 10 seconds
      setInterval(rotateBackground, 10000);
    })
    .catch(error => {
      console.error('Error loading images:', error);
    });
  
  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
  
  function rotateBackground() {
    // Fade out current image
    heroBackground.style.opacity = '0';
    
    setTimeout(() => {
      // Update to next image
      currentImageIndex = (currentImageIndex + 1) % images.length;
      updateBackground();
      
      // Fade in new image
      heroBackground.style.opacity = '0.4';
    }, 1000);
  }
  
  function updateBackground() {
    heroBackground.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  }
});