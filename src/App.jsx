import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Auth from './pages/Auth';
import MarketPlace from './pages/MarketPlace';
import { ProtectedRoute } from './components/dashboard/ProtectedRoute';
import Blog from './pages/Blog';
import Me from './pages/me';
import { ActivityProvider } from './context/ActivityContext';
import { ProjectProvider } from './context/ProjectContext';
import { ProductProvider } from './context/ProductContext';
import { OrderProvider } from './context/OrderContext';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
        <ProjectProvider>
        <ActivityProvider>
        <ProductProvider>
        <OrderProvider>
        <Routes>
          <Route path="/" element={ <Home /> } />
          
          <Route path="/auth/login" element={<Auth />} />
          <Route path="/auth/register" element={<Auth initialMode="register" />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MarketPlace />
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
        </OrderProvider>
        </ProductProvider>
        </ActivityProvider>
        </ProjectProvider>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
