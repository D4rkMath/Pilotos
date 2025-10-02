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
        <h4 class="video-title">${video.title}</h4> <!-- Fuente de datos -->
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

    // Función para actualizar el título EXTERNO
    const updateMainTitle = () => {
      const currentSlide = swiper.slides[swiper.activeIndex];
      const title = currentSlide.querySelector('.video-title')?.textContent || 'Sin título';
      document.querySelector('.main-video-title').textContent = title;
    };

    // Actualizar al cambiar de slide
    swiper.on('slideChange', updateMainTitle);

    // Forzar actualización al cargar
    setTimeout(updateMainTitle, 100); // Pequeño retraso para asegurar que Swiper esté listo

    // Conectar botones externos
    document.querySelector('.title-arrow.left')?.addEventListener('click', () => swiper.slidePrev());
    document.querySelector('.title-arrow.right')?.addEventListener('click', () => swiper.slideNext());
  })
  .catch(err => {
    console.error('Error:', err);
    document.querySelector('.main-video-title').textContent = 'Error al cargar';
  });
