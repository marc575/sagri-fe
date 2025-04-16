import React, { useEffect, useState } from 'react'
import Button from '../ui/Button'
import slide1 from '../../assets/img/3.jpg'
import slide2 from '../../assets/img/6.jpg'
import slide3 from '../../assets/img/7.jpg'
import slide4 from '../../assets/img/8.jpg'
import slide5 from '../../assets/img/11.jpg'

function About() {
    const [currentSlide, setCurrentSlide] = useState(1);
    const totalSlides = 5;
  
    // Fonction pour passer au slide suivant
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev % totalSlides) + 1);
    };
  
    // Fonction pour passer au slide précédent
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev === 1 ? totalSlides : prev - 1));
    };
  
    // Effet pour le changement automatique
    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000); // 5 secondes
  
      return () => clearInterval(interval); // Nettoyage
    }, []);

  return (
    <div className='py-18 container mx-auto px-4 sm:px-6' id='about'>
    <div className='flex flex-col lg:flex-row justify-between items-center gap-10'>
        <div className="carousel">
        {/* Slide 1 */}
        <div 
            id="slide1" 
            className={`carousel-item relative w-full transition-opacity duration-500 ${currentSlide !== 1 && 'hidden'}`}
        >
            <img
            src={slide1}
            className="w-full rounded-xl" 
            alt="Slide 1"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle">❮</button>
            <button onClick={nextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>

        {/* Slide 2 */}
        <div 
            id="slide2" 
            className={`carousel-item relative w-full transition-opacity duration-500 ${currentSlide !== 2 && 'hidden'}`}
        >
            <img
            src={slide2}
            className="w-full rounded-xl" 
            alt="Slide 2"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle">❮</button>
            <button onClick={nextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>

        {/* Slide 3 */}
        <div 
            id="slide3" 
            className={`carousel-item relative w-full transition-opacity duration-500 ${currentSlide !== 3 && 'hidden'}`}
        >
            <img
            src={slide3}
            className="w-full rounded-xl" 
            alt="Slide 3"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle">❮</button>
            <button onClick={nextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>

        {/* Slide 4 */}
        <div 
            id="slide4" 
            className={`carousel-item relative w-full transition-opacity duration-500 ${currentSlide !== 4 && 'hidden'}`}
        >
            <img
            src={slide4}
            className="w-full rounded-xl" 
            alt="Slide 4"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle">❮</button>
            <button onClick={nextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>

        {/* Slide 5 */}
        <div 
            id="slide5" 
            className={`carousel-item relative w-full transition-opacity duration-500 ${currentSlide !== 5 && 'hidden'}`}
        >
            <img
            src={slide5}
            className="w-full rounded-xl" 
            alt="Slide 5"
            />
            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <button onClick={prevSlide} className="btn btn-circle">❮</button>
            <button onClick={nextSlide} className="btn btn-circle">❯</button>
            </div>
        </div>
      </div>

      <div className='space-y-3'>
        <p className='uppercase text-xs md:text-md font-bold text-secondary'>Une vision nouvelle pour une agriculture durable</p>
        <h2 className='text-xl md:text-3xl xl:text-4xl font-bold capitalize text-secondary'>Nous connectons les acteurs de l'agriculture africaine</h2>
        <p>
            SAGRI & TM est bien plus qu’un marketplace : c’est un écosystème pensé pour 
            transformer l’agriculture africaine. Nous croyons en une chaîne de valeur 
            agricole plus équitable, plus transparente et plus numérique. Notre mission 
            est de faciliter les échanges entre agriculteurs, acheteurs et exportateurs, 
            tout en mettant en avant les richesses locales.
        </p>
        <Button className="btn btn-secondary">Découvrir notre mission</Button>
      </div>
    </div>
    </div>
  )
}

export default About
