import React, { useEffect } from 'react';
import bg from '../assets/img/11.jpg';
import logo from '../assets/img/logo-green.png';
import { useState } from 'react';
import { LoginForm } from '../components/public/LoginForm';
import { RegisterForm } from '../components/public/RegisterForm';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div 
    className='hero px-2 md:px-0 h-screen'
    style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),
        url(${bg})`,
    }}>
        <div className={`shadow-md rounded-xl bg-base-100 flex max-w-full ${isLogin ? 'flex-row' : 'flex-row-reverse'}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? 'login' : 'register'}
                    initial={{ opacity: 0, x: isLogin ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? -20 : 20 }}
                    transition={{ type: 'spring', stiffness: 40, damping: 15 }}
                  >
                    <motion.div
                      variants={container}
                      initial="hidden"
                      animate="show"
                    >
                      <motion.div variants={item}>
                        {isLogin ? <LoginForm /> : <RegisterForm />}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>

                <div className={`text-center flex max-w-[140px] md:max-w-[180px] flex-col gap-5 px-2 justify-center items-center bg-[#1F4D3B] text-white ${isLogin ? 'rounded-r-xl' : 'rounded-l-xl'}`}>
                    <a href="/">
                      <img src={logo} alt="" width="100" className='hover:scale-95 hover:duration-300' />
                    </a>
                
                    {isLogin 
                    ? (
                      <div className='space-y-6'>
                        <p className='font-semibold text-md'>Pas de compte ?</p>
                        <p className='text-xs text-[#ccc]'>Inscrivez-vous pour vous connecter à un vaste réseau de producteurs agricole !</p>
                        <button 
                          onClick={() => setIsLogin(!isLogin)}
                          className="btn btn-accent"
                        >
                         S'inscrire
                        </button>
                      </div>
                      )
                    : (
                      <div className='space-y-6'>
                        <p className='font-semibold text-md'>Bienvenue !</p>
                        <p className='text-xs text-[#ccc]'>Connectez-vous pour suivre l'actualité et élargir votre réseau !</p>
                        <button 
                          onClick={() => setIsLogin(!isLogin)}
                          className="btn btn-accent"
                        >
                         Se Connecter
                        </button>
                      </div>
                    )
                    }
                </div>
            </div>
    </div>
  )
}

export default Auth
