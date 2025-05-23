import React from 'react'
import hero from '../../assets/img/15.png'
import arrowUp from '../../assets/icons/DoubleUp.png'
import arrowDown from '../../assets/icons/DoubleDown.png'

export default function Hero() {
  return (
    <>
        <div
        id='hero'
            className="hero h-screen"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
                url(${hero})`,
                marginTop: "-92px",
            }}>
            <div className="items-start text-neutral-content text-center">
                <div className="max-w-full">
                    <h1 className="mb-0 px-2 text-2xl md:text-4xl xl:text-5xl font-black text-[#FDFAD0] uppercase">Réinventons l'Agriculture Africaine</h1>
                </div>
            </div>
            <div className="absolute top-1/6 right-1/12 animate-bounce xl:animate-none">
                <div className="card card-dash opacity-75 bg-base-100 md:w-96 w-[280px]">
                    <div className="card-body">
                        <p className='md:text-xl font-semibold'>Rejoignez la communauté des agriculteurs !</p>
                    </div>
                </div>
            </div>
            <div className="absolute top-4/6 left-1/12 animate-bounce xl:animate-none">
                <div className="card card-dash opacity-75 bg-base-100 md:w-96 w-[280px]">
                    <div className="card-body">
                        <p className='md:text-xl font-semibold'>Trouvez vos fournisseurs agricoles dès maintenant !</p>
                    </div>
                </div>
            </div>
            <div className="absolute hidden xl:block xl:top-1/12 xl:right-72 opacity-50 pt-2 animate-bounce">
                <img src={arrowDown} alt="arrow" width="40"/>
            </div>
            <div className="absolute hidden xl:block xl:bottom-1/12 xl:left-72 opacity-50 animate-bounce">
                <img src={arrowUp} alt="arrow" width="40"/>
            </div>
        </div>
    </>
  )
}
