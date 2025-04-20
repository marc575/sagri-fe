import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import Auth from './pages/Auth';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProtectedRoute } from './components/dashboard/ProtectedRoute';

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={ <Home /> } />
          
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth initialMode="register" />} />
          <Route 
            path="/dashboard" 
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            } 
          />
        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
