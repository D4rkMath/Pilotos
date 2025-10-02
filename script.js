// Cargar videos desde JSON
fetch('videos.json')
  .then(response => {
    if (!response.ok) throw new Error('No se pudo cargar videos.json');
    return response.json();
  })
  .then(videos => {
    const wrapper = document.getElementById('swiper-wrapper');
    wrapper.innerHTML = ''; // Limpiar contenido anterior

    videos.forEach(video => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = `
        <div class="video-embed-container">
          <iframe 
            src="${video.embedUrl}" 
            frameborder="0" 
            allowfullscreen
            class="youtube-embed">
          </iframe>
        </div>
        <h4 class="video-title">${video.title}</h4>
      `;
      wrapper.appendChild(slide);
    });

    // Inicializar Swiper
    const swiper = new Swiper('.mySwiper', {
      loop: false,
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      on: {
        slideChange: function () {
          const currentSlide = this.slides[this.activeIndex];
          const title = currentSlide.querySelector('.video-title').textContent;
          document.querySelector('.video-title').textContent = title; // ✅ Actualiza el título externo
        }
      }
    });

    // Conectar botones externos
    document.querySelector('.title-arrow.left').addEventListener('click', () => swiper.slidePrev());
    document.querySelector('.title-arrow.right').addEventListener('click', () => swiper.slideNext());

    // Inicializar el título al cargar
    if (videos.length > 0) {
      document.querySelector('.video-title').textContent = videos[0].title;
    }
  })
  .catch(err => {
    console.error('Error:', err);
    document.querySelector('.video-title').textContent = 'Error al cargar videos';
  });
