import React from 'react'
import ConnectedPeople from '../../assets/icons/ConnectedPeople.png';
import Moleskine from '../../assets/icons/Moleskine.png';
import AddShoppingCart from '../../assets/icons/AddShoppingCart.png';
import Headset from '../../assets/icons/Headset.png';

function Services() {

  const services = [
    {id: "1", titre: "Mise en relation intelligente", content: "Trouvez facilement des partenaires commerciaux grâce à notre système de recherche par localisation, type de produit et disponibilité.", img: ConnectedPeople },
    {id: "2", titre: "Catalogue de produits agricoles", content: "Parcourez un large éventail de produits locaux directement proposés par les agriculteurs.", img: Moleskine },
    {id: "3", titre: "Gestion simplifiée des commandes", content: "Suivez vos commandes de manière fluide, du panier jusqu’à la livraison.", img: AddShoppingCart },
    {id: "4", titre: "Support multilingue & régional", content: "Accédez à la plateforme dans plusieurs langues et selon les réalités locales pour une meilleure inclusion.", img: Headset }
  ]

  return (
    <div className=' relative'>
    <div className='py-18 container mx-auto px-4 sm:px-6'>
      <div className="flex-col md:flex md:flex-row gap-4 space-y-6 ">
        <h2 className='text-xl md:text-3xl xl:text-4xl font-bold md:w-1/2'>NOS SERVICES</h2>
        <p>
            SAGRI & TM vous offre une plateforme innovante pensée 
            pour connecter efficacement producteurs agricoles et acheteurs, 
            en assurant transparence, proximité et simplicité.
        </p>
      </div>
      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-5'>
        {services.map(({id, titre, content, img}) =>  (
            <ServiceItem key={id} titre={titre} content={content} img={img} />
        ))}
      </div>
    </div>
    <div className='bg-[#8B5E2A] h-24 absolute top-3/4 left-0 -z-1 w-full'></div>
    </div>
  )
}

const ServiceItem = ({titre, content, img}) =>  {
    return (
        <div className="card card-dash bg-base-100 shadow-md md:shadow-xl space-y-3 rounded-xl">
          <div className="card-body">
            <h4 className='text-md font-semibold'>{titre}</h4>
            <p className='text-xs'>
                {content}
            </p>
            <img src={img} width="40" alt="" />
          </div>
        </div>
    )
}

export default Services
