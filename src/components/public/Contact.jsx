import React from 'react';
import bg from '../../assets/img/8.jpg';
import phone from '../../assets/icons/tel.svg';
import map from '../../assets/icons/map.svg';
import mail from '../../assets/icons/envelope.svg';
import Button from '../ui/Button';

function Contact() {
  return (
    <div
    id='contact'
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
        url(${bg})`,
    }}
    className='hero xl:h-screen mb-[-220px] md:mb-[-100px]  pt-28 pb-72 px-4 md:px-20 lg:mt-90 md:mt-132 mt-150 '
    >
        <div className='space-y-3'>
        <div className='flex flex-col lg:flex-row justify-between gap-5'>
            <div className='space-y-5 text-white'> 
                <h2 className='text-xl md:text-2xl xl:text-3xl font-bold uppercase text-center md:text-start'>Écrivez-nous dès maintenant !</h2>
                <p className='mb-10 text-center md:text-start'>Une question ? Une idée ? Contactez-nous !</p>
                <div className='text-white flex flex-wrap lg:gap-15 gap-8'>
                    <div className='flex gap-5'>
                        <img src={phone} alt="" width="40"/>
                        <div className='space-y-2'>
                            <h4 className='font-bold'>Téléphone</h4>
                            <a href='tel:+2376XXXXXXXX'>+237 6XX XXX XXX</a>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <img src={mail} alt="" width="40"/>
                        <div className='space-y-2'>
                            <h4 className='font-bold'>E-mail</h4>
                            <a href='mailto:exemple@site.com'>exemple@site.com</a>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <img src={map} alt="" width="40"/>
                        <div className='space-y-2'>
                            <h4 className='font-bold'>Adresse</h4>
                            <p>Douala, Cameroun</p>
                        </div>
                    </div>
                </div>
            </div>
            <form action="" className='space-y-5 bg-[#FDFAD0] py-10 px-4 rounded-xl shadow-md lg:w-1/2 mt-10 md:mt-0'>
                <label className="input w-full">
                    <svg className="h-[1em] opacity-50 text-base-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                    <input type="input" className=' text-base-300' placeholder="Nom Complet" pattern="[A-Za-z][A-Za-z0-9\-]*" minLength="3" maxLength="30" title="nom complet" />
                </label>
                <label className="input w-full">
                    <svg className="h-[1em] opacity-50 text-base-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="email" placeholder="mail@site.com" className=' text-base-300' required/>
                </label>
                <textarea rows="5" name="name" id="name" placeholder="Hello, svp j'aimerai ...." className="textarea w-full"></textarea>
                <Button type="submit" className='btn btn-secondary w-full' >Envoyer</ Button>
                
            </form>
        </div>
        </div>
    </div>
  )
}

export default Contact
