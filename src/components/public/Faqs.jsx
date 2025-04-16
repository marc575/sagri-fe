import React from 'react';
import img from '../../assets/img/3.jpg';
import faq from '../../assets/img/14.png';

function Faqs() {
  return (
    <div className='container pb-18 mx-auto sm:px-6 relative' id='faqs'>
      <div
        className='h-120' 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
          url(${img})`,
          backgroundPosition: 'center center',
          borderRadius: '0 0 10px 10px'
      }}>
      </div>
      <div className='flex flex-col lg:flex-row justify-between items-center gap-5 mx-2 md:mx-10 shadow-md px-5 md:p-8 rounded-xl absolute top-2/3 bg-white'>
        <img src={faq} alt="" className='w-full md:w-1/2' />
        <div className='space-y-3'>
          <h2 className='text-xl md:text-3xl xl:text-4xl font-bold capitalize text-secondary'>Questions Fréquemment Posées</h2>
          <p>Voici les réponses aux questions les plus courantes à propos de l’utilisation de la plateforme.</p>

          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold text-secondary">Comment s’inscrire en tant qu’agriculteur ?</div>
            <div className="collapse-content text-sm">Il vous suffit de cliquer sur "Rejoindre la communauté", remplir le formulaire et soumettre vos informations. C’est simple et gratuit.</div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold text-secondary">Est-ce que je peux acheter en tant que particulier ?</div>
            <div className="collapse-content text-sm">Oui, la plateforme est ouverte aussi bien aux professionnels qu’aux particuliers à la recherche de produits agricoles locaux.</div>
          </div>
          <div className="collapse collapse-plus bg-base-100 border border-base-300">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold text-secondary">Comment suivre une commande ?</div>
            <div className="collapse-content text-sm">Une fois votre commande passée, vous pouvez la suivre dans votre espace personnel à tout moment.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faqs
