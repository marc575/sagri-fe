import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Auth from './pages/Auth';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/dashboard/ProtectedRoute';
import Blog from './pages/Blog';
import Me from './pages/me';
import { ActivityProvider } from './context/ActivityContext';
import { ProjectProvider } from './context/ProjectContext';
import { ProductProvider } from './context/ProductContext';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
        <ProjectProvider>
        <ActivityProvider>
        <ProductProvider>
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
        </ProductProvider>
        </ActivityProvider>
        </ProjectProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
