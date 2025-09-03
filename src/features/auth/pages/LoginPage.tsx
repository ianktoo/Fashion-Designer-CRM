
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../lib/auth';

const LoginPage: React.FC = () => {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (auth) {
      auth.login();
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-dark tracking-wider">Atelier</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Designer Portal Login</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {/* Mock form for demonstration */}
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" required 
                   className="relative block w-full px-3 py-2 text-gray-900 bg-white dark:bg-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                   placeholder="Email address" defaultValue="designer@atelier.com" />
          </div>
          <div>
            <label htmlFor="password"className="sr-only">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required 
                   className="relative block w-full px-3 py-2 text-gray-900 bg-white dark:bg-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" 
                   placeholder="Password" defaultValue="password" />
          </div>
          <div>
            <button type="submit" 
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md group hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-colors">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;