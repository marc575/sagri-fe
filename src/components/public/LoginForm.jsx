import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Email invalide').min(3, 'Email requis'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 6 caractères')
});

export const LoginForm = () => {
  const { login, loading, error: authError } = useAuth();
  const [serverError, setServerError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      await login(data);
      reset();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl mb-4 text-center font-black text-secondary uppercase">Connexion</h2>
        
        {(authError || serverError) && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{authError || serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4 space-y-2">
            <label className="label tooltip tooltip-right" data-tip="champ obligatoire" htmlFor="email">
              <span className="label-text">Email *</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="votre@email.com"
              className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              {...register('email')}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error text-xs">{errors.email.message}</span>
              </label>
            )}
          </div>

          <div className="form-control mb-6 space-y-2">
            <label className="label tooltip tooltip-right" data-tip="champ obligatoire" htmlFor="password">
              <span className="label-text">Mot de passe *</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
              {...register('password')}
            />
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-error text-xs">{errors.password.message}</span>
              </label>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <button
              type="submit"
              className={`btn btn-secondary ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
            <a href="" className='text-primary text-center'>Mot de passe oublié ?</a>
          </div>
        </form>
      </div>
    </div>
  );
};