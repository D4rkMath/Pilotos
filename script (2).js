// Cargar videos desde JSON
fetch('videos.json')
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar videos.json');
    return response.json();
  })
  .then(videos => {
    const wrapper = document.getElementById('swiper-wrapper');
    wrapper.innerHTML = videos.map(video => `
      <div class="swiper-slide">
        <div class="video-embed-container">
          <iframe 
            src="${video.embedUrl}" 
            frameborder="0" 
            allowfullscreen
            class="youtube-embed">
          </iframe>
        </div>
        <h4 class="video-title">${video.title}</h4>
      </div>
    `).join('');

    // Inicializar Swiper
    const swiper = new Swiper('.mySwiper', {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    });

    // Actualizar título externo
    const updateTitle = () => {
      const currentSlide = swiper.slides[swiper.activeIndex];
      const title = currentSlide.querySelector('.video-title').textContent;
      document.querySelector('.video-title').textContent = title;
    };

    swiper.on('slideChange', updateTitle);
    updateTitle(); // Inicial

    // Conectar botones externos
    document.querySelector('.title-arrow.left').addEventListener('click', () => swiper.slidePrev());
    document.querySelector('.title-arrow.right').addEventListener('click', () => swiper.slideNext());
  })
  .catch(err => {
    console.error('Error:', err);
    document.querySelector('.video-title').textContent = 'Error al cargar videos';
  });