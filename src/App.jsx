import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Auth from './pages/Auth';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/dashboard/ProtectedRoute';
import Blog from './pages/Blog';
import Me from './pages/me';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={ <Home /> } />
          
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/register" element={<Auth initialMode="register" />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/blog" 
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/me" 
            element={
              <ProtectedRoute>
                <Me />
              </ProtectedRoute>
            } 
          />
        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
