import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';

const registerSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide').min(1, 'Email requis'),
  role: z.string().min(3, 'Rôle requis'),
  password: z.string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Doit contenir au moins une majuscule')
    .regex(/[0-9]/, 'Doit contenir au moins un chiffre'),
  password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
  message: "Les mots de passe ne correspondent pas",
  path: ["password_confirmation"]
});

export const RegisterForm = () => {
  const { registerInitial, loading, error } = useAuth();
  const [serverError, setServerError] = useState(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      await registerInitial(data);
      reset();
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl mb-4 text-center font-black text-secondary uppercase">Inscription</h2>
        
        {(error || serverError) && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error || serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control mb-4 space-y-2">
            <label className="label tooltip tooltip-right" data-tip="champ obligatoire" htmlFor="name">
              <span className="label-text">Nom complet *</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Votre nom"
              className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
              {...register('name')}
            />
            {errors.name && (
              <label className="label">
                <span className="label-text-alt text-error text-xs">{errors.name.message}</span>
              </label>
            )}
          </div>

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

          <div className="form-control mb-4">
            <label 
              className="label tooltip tooltip-right" 
              data-tip="Champ obligatoire" 
              htmlFor="role"
            >
              <span className="label-text flex items-center gap-1">
                Type de compte
                <span className="text-error">*</span>
              </span>
            </label>
            
            <select
              id="role"
              name="role"
              className={`select select-bordered w-full ${errors.role ? 'select-error' : ''}`}
              aria-invalid={!!errors.role}
              {...register('role', {
                required: "Le type de compte est obligatoire"
              })}
            >
              <option value="">Sélectionnez un type</option>
              <option value="farmer">Agriculteur</option>
              <option value="buyer">Acheteur</option>
            </select>
            
            {errors.role && (
              <label className="label" htmlFor="role">
                <span className="label-text-alt text-error flex items-center gap-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  {errors.role.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control mb-4 space-y-2">
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

          <div className="form-control mb-6 space-y-2">
            <label className="label tooltip tooltip-right" data-tip="champ obligatoire" htmlFor="password_confirmation">
              <span className="label-text">Confirmer le mot de passe *</span>
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="••••••••"
              className={`input input-bordered w-full ${errors.password_confirmation ? 'input-error' : ''}`}
              {...register('password_confirmation')}
            />
            {errors.password_confirmation && (
              <label className="label">
                <span className="label-text-alt text-error text-xs">{errors.password_confirmation.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <button
              type="submit"
              className={`btn btn-secondary w-full ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? 'Inscription en cours...' : "S'inscrire"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};