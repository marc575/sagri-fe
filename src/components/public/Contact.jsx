import React from 'react';
import bg from '../../assets/img/8.jpg';
import phone from '../../assets/icons/phone.png';
import map from '../../assets/icons/map.png';
import mail from '../../assets/icons/mail.png';
import Button from '../ui/Button';

function Contact() {
  return (
    <div
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
        url(${bg})`,
    }}
    className='hero xl:h-screen  pt-18 pb-52 px-4 md:px-20 lg:mt-90 md:mt-132 mt-150 '
    >
        <div className='space-y-3'>
        <div className='flex flex-col lg:flex-row justify-between gap-5'>
            <div className='space-y-5 text-white'> 
                <h2 className='text-xl md:text-3xl xl:text-4xl font-bold capitalize'>Écrivez-nous dès maintenant !</h2>
                <p className='mb-10'>Une question ? Une idée ? Contactez-nous !</p>
                <div className='text-white flex flex-wrap gap-20'>
                    <div className='flex gap-5'>
                        <img src={phone} alt="" />
                        <div className='space-y-2'>
                            <h4 className='font-bold'>Téléphone</h4>
                            <a href='tel:+2376XXXXXXXX'>+237 6XX XXX XXX</a>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <img src={mail} alt="" />
                        <div className='space-y-2'>
                            <h4 className='font-bold'>E-mail</h4>
                            <a href='mailto:exemple@site.com'>exemple@site.com</a>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <img src={map} alt="" />
                        <div className='space-y-2'>
                            <h4 className='font-bold'>Adresse</h4>
                            <p>Douala, Cameroun</p>
                        </div>
                    </div>
                </div>
            </div>
            <form action="" className='space-y-5 bg-white py-6 px-4 rounded-xl shadow-md lg:w-1/2'>
                <label className="input w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                    <input type="input" placeholder="Nom Complet" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="nom complet" />
                </label>
                <label className="input w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                    <input type="email" placeholder="mail@site.com" required/>
                </label>
                <textarea name="name" id="name" placeholder="Hello, svp j'aimerai ...." className="textarea w-full"></textarea>
                <Button type="submit" className='btn btn-secondary w-full' >Envoyer</ Button>
                
            </form>
        </div>
        </div>
    </div>
  )
}

export default Contact
