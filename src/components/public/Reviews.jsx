import React, { useState, useEffect, useRef } from 'react'
import rightQuote from '../../assets/icons/right-quote.png'

function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(1);
    const carouselRef = useRef(null);
    const reviews = [
        {id: "1", rating: 3.5, name: "Brooklin Simmon", jobprofile: "CEO, Bribbble  LLc", message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui itaque sapiente, laboriosam impedit sequi voluptates cumque aperiam minima nam, iste commodi veritatis quasi? Doloremque temporibus in nulla nihil voluptate corrupti."},
        {id: "2", rating: 4, name: "Marc Tatchou", jobprofile: "CEO, Bribbble  LLc", message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui itaque sapiente, laboriosam impedit sequi voluptates cumque aperiam minima nam, iste commodi veritatis quasi? Doloremque temporibus in nulla nihil voluptate corrupti."},
        {id: "3", rating: 3, name: "Jean Luc", jobprofile: "CEO, Bribbble  LLc", message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui itaque sapiente, laboriosam impedit sequi voluptates cumque aperiam minima nam, iste commodi veritatis quasi? Doloremque temporibus in nulla nihil voluptate corrupti."},
        {id: "4", rating: 2.5, name: "Stephane Cury", jobprofile: "CEO, Bribbble  LLc", message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui itaque sapiente, laboriosam impedit sequi voluptates cumque aperiam minima nam, iste commodi veritatis quasi? Doloremque temporibus in nulla nihil voluptate corrupti."},
        {id: "5", rating: 3, name: "Alete Johnson", jobprofile: "CEO, Bribbble  LLc", message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui itaque sapiente, laboriosam impedit sequi voluptates cumque aperiam minima nam, iste commodi veritatis quasi? Doloremque temporibus in nulla nihil voluptate corrupti."},
        {id: "6", rating: 5, name: "Yimga Melvine", jobprofile: "CEO, Bribbble  LLc", message: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui itaque sapiente, laboriosam impedit sequi voluptates cumque aperiam minima nam, iste commodi veritatis quasi? Doloremque temporibus in nulla nihil voluptate corrupti."},
    ]

    // Gestion du responsive
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1440) {
          setVisibleItems(4);
        } else if (window.innerWidth >= 1024) {
            setVisibleItems(3);
        } else if (window.innerWidth >= 768) {
          setVisibleItems(2);
        } else {
          setVisibleItems(1);
        }
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    // Défilement automatique
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 10000); // 10 secondes
  
      return () => clearInterval(interval);
    }, [currentIndex, visibleItems]);
  
    const nextSlide = () => {
      setCurrentIndex(prev => (prev + 1) % (reviews.length - visibleItems + 1));
    };
  
    const prevSlide = () => {
      setCurrentIndex(prev => (prev - 1 + (reviews.length - visibleItems + 1)) % (reviews.length - visibleItems + 1));
    };

  return (
    <div className='bg-base-100' id='reviews'>
      <div className='py-18 container mx-auto px-4 text-center sm:px-6 space-y-5'>
        <h2 className='text-xl md:text-2xl xl:text-3xl font-bold lg:w-1/2 mx-auto text-secondary uppercase'>Ce qu’ils disent de nous !</h2>
        <p className='lg:w-2/3 mx-auto text-md'>
            Nos utilisateurs partagent leur expérience avec la plateforme SAGRI & TM. 
            Découvrez comment notre solution a changé leur manière de produire, 
            vendre et acheter dans le secteur agricole.
        </p>
        
        <div className="relative w-full mx-auto overflow-hidden">
            <div 
                ref={carouselRef}
                className="carousel carousel-center sm:space-x-3 overflow-hidden rounded-box max-w-full"
            >
                {reviews.map(({id, rating, name, jobprofile, message}) => (
                <div 
                    key={id}
                    className={`carousel-item py-5 transition-transform duration-500 ease-in-out`}
                    style={{
                    transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
                    width: `${100 / visibleItems}%`,
                    minWidth: `${100 / visibleItems}%`
                    }}
                >
                    {cardReviews(rating, name, jobprofile, message)}
                </div>
                ))}
            </div>

            {/* Contrôles de navigation en bas à droite */}
            <div className="flex justify-end mt-4 space-x-3">
                <button 
                onClick={prevSlide}
                className="btn btn-circle btn-sm border-[#1F4D3B]"
                aria-label="Précédent"
                >
                ❮
                </button>
                <button 
                onClick={nextSlide}
                className="btn btn-circle btn-sm border-[#1F4D3B]"
                aria-label="Suivant"
                >
                ❯
                </button>
            </div>
        </div>
      </div>
    </div>
  )
}

const cardReviews = (rating, name, jobprofile, message) => {
    return (
        <div className='card card-dash p-6 space-y-3 bg-base-200 shadow-md sm:w-full'>
            <div className='flex gap-5 items-center justify-between'>
                {renderStars(rating)}
                <img src={rightQuote} alt="" />
            </div>
            <p className='text-start text-md'>{message}</p>
            <div  className='flex gap-5 items-center justify-start'>
                <img src={`https://ui-avatars.com/api/?name=${name}&background=random`} className="rounded-full" width="40" />
                <div>
                    <p className='text-start font-bold'>{name}</p>
                    <p className='text-start italic'>{jobprofile}</p>
                </div>
            </div>
        </div>
    )
}

const renderStars = (rating) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
  
    return (
      <div className="flex items-center">
        {/* Étoiles pleines */}
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
  
        {/* Demi-étoile */}
        {hasHalfStar && (
          <div className="relative w-5 h-5">
            <svg className="absolute w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg className="absolute w-5 h-5 text-yellow-400" fill="currentColor" style={{ clipPath: 'inset(0 50% 0 0)' }} viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        )}
  
        {/* Étoiles vides */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
  
        {/* Optionnel: Afficher la note numérique */}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

export default Reviews
