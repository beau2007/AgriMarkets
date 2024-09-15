'use client'

import { useEffect } from 'react';

function Carousel() {
  useEffect(() => {
    const carouselItems = document.querySelectorAll('[data-carousel-item]');
    let currentIndex = 0;
    const intervalTime = 7000; //temps en miliseconde pour chaque slides

    function showSlide(index) {
      carouselItems.forEach((item, i) => {
        item.classList.toggle('hidden', i !== index);
        item.classList.toggle('block', i === index);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % carouselItems.length;
      showSlide(currentIndex);
    }
          //défilement automatique de slide image
    

    const autoScroll = setInterval(nextSlide, intervalTime)

     //controles manuels du changement de slide image
    document.querySelector('[data-carousel-prev]').addEventListener('click', function() {
      clearInterval(autoScroll); //stopper le defilement automatique lors de l'interacion
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
      showSlide(currentIndex);
    });

    document.querySelector('[data-carousel-next]').addEventListener('click', function() {
      clearInterval(autoScroll); //stopper le defilement automatique lors de l'interacion
      nextSlide();
    });

    showSlide(currentIndex);

    return() => clearInterval(autoScroll);
  }, []);

  return (
      <div id="default-carousel" className="relative w-full pt-16" data-carousel="slide">
          {/* <!-- Carousel wrapper --> */}
          <div className="relative h-72 overflow-hidden rounded-lg md:h-[700px]">
              
              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/asset/images/backgroud_affiche2.jpg" className="absolute block w-full h-full object-cover" alt="Image 1"/>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                      <h2 className="text-white text-xl md:text-3xl font-bold mb-2 font-mono">Bienvenue dans notre application de vente de produits agricoles</h2>
                      <p className="text-white text-sm md:text-lg font-mono">Nous vous proposons des produits de première catégorie à moindre coût et surtout de bonne qualité. Vous n'en trouverez nulle part ailleurs.</p>
                  </div>
              </div>

              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/asset/images/cabbage.jpg" className="absolute block w-full h-full object-cover" alt="Image 2"/>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                      <h2 className="text-white text-xl md:text-3xl font-bold mb-2 font-mono">Achetez les meilleurs produits frais directement des agriculteurs</h2>
                      <p className="text-white text-sm md:text-lg font-mono">Nous vous proposons des produits de première catégorie à moindre coût et surtout de bonne qualité. Vous n'en trouverez nulle part ailleurs.</p>
                  </div>
              </div>

              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/asset/images/cassava-346887_1280.jpg" className="absolute block w-full h-full object-cover" alt="Image 3"/>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                      <h2 className="text-white text-xl md:text-3xl font-bold mb-2 font-mono">Des produits de qualité pour une alimentation saine</h2>
                      <p className="text-white text-sm md:text-lg font-mono">Nous vous proposons des produits de première catégorie à moindre coût et surtout de bonne qualité. Vous n'en trouverez nulle part ailleurs.</p>
                  </div>
              </div>

              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/asset/images/farming.jpg" className="absolute block w-full h-full object-cover" alt="Image 4"/>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                      <h2 className="text-white text-xl md:text-3xl font-bold mb-2 font-mono">Supportez nos agriculteurs locaux en achetant leurs produits</h2>
                      <p className="text-white text-sm md:text-lg font-mono">Nous vous proposons des produits de première catégorie à moindre coût et surtout de bonne qualité. Vous n'en trouverez nulle part ailleurs.</p>
                  </div>
              </div>

              <div className="hidden duration-700 ease-in-out" data-carousel-item>
                  <img src="/asset/images/istockphoto-1451085109-1024x1024.jpg" className="absolute block w-full h-full object-cover" alt="Image 5"/>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
                      <h2 className="text-white text-xl md:text-3xl font-bold mb-2 font-mono">Une application dédiée à la vente de produits agricoles</h2>
                      <p className="text-white text-sm md:text-lg font-mono">Nous vous proposons des produits de première catégorie à moindre coût et surtout de bonne qualité. Vous n'en trouverez nulle part ailleurs.</p>
                  </div>
              </div>
          </div>

          {/* <!-- Slider indicators --> */}
          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
              <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
          </div>

          {/* <!-- Slider controls --> */}
          <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                  </svg>
                  <span className="sr-only">Previous</span>
              </span>
          </button>
          <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="sr-only">Next</span>
              </span>
          </button>
      </div>
  );
}

export default Carousel;
