import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/HeaderNew'
import Home from './Pages/Home'
import Products from './Pages/ProductsMain'
import AboutUs from './Pages/About'
import ProductDetails from './Pages/ProductDetails'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Account from './Pages/Account'
import Regulamin from './Pages/RegulaminPolityki'
import Favorites from './Pages/Favorites'
import ConservationsMain from './Pages/ConservationsMain'
import CartPage from './Pages/CartPage'
import CookieConsent from './components/ui/CookieConsent';
import Orders from './components/Orders';
import AdminOrders from './cms/AdminOrders'
import AdminProtectedRoute from './cms/AdminProtectedRoute'
import ConservationsDetails from './components/ConservationsDetails'
import ProtectedChat from './components/ProtectedChat'
import { CartProvider } from "./context/CartContext"; 
import AdminDashboard from './cms/dashboard'
import AdminProductsAll from './cms/AdminProductsAll'
import AdminProductDetails from './cms/AdminProductDetails'

const Layout = () => {
  
  return (    
    <div className="min-h-screen flex flex-col">    
      {/* HEADER */}
      <header><Header /></header>
      
      {/*NEWS SECTION*/}
      {/*<div className="bg-red-500 text-white p-4">
        ТУТ МОЖЕ БУТИ ЯКАСЬ ЦІКАВА ІНФОРМАЦІЯ ЧИ, МОЖЛИВО, ЕКСТРЕНІ ПОВІДОМЛЕННЯ!
      </div>*/}

      {/*CONTENT SECTION*/}
      <div className="flex flex-1">

      {/* Routing */}
      <main className="md:p-4 flex-1 bg-cover bg-center bg-no-repeat bg-fixed w-full" 
            style={{ backgroundImage: "url('/vyazanie-kryuchkom-8.jpg')" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/regulamin" element={<Regulamin />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/productsMain" element={<Products />} />
          <Route path="/productsMain/:id" element={<ProductDetails />} />
          <Route path="/favorites" element={<Favorites />} />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/admin/productsAll" element={<AdminProtectedRoute><AdminProductsAll /></AdminProtectedRoute>} />
          <Route path="/admin/products/:id" element={<AdminProtectedRoute><AdminProductDetails /></AdminProtectedRoute>} />
          {/*
          
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/conservations" element={<ConservationsMain />} />
          <Route path="/chat/:orderId" element={<ProtectedChat><ConservationsDetails /></ProtectedChat>} />
          
          {/* Admin routes }
          <Route path="/admin/orders" element={<AdminProtectedRoute><AdminOrders /></AdminProtectedRoute>} /> 
          */}
        </Routes>
      </main>

      {/* RIGHT SIDEBAR 
      {!isHome && (     
        <aside className="w-1/6 pt-16 bg-pink-200 shadow-md p-4 hidden lg:block border-l bg-bottom bg-cover"
                style={{ backgroundImage: "url('/flowers-rozi-buket-tsveti-rozovie-knigi.jpeg')" }}>
          <h2 className="text-lg font-semibold mb-2">Контакти</h2>
          <p className="text-sm text-gray-700">📧 fund@example.org</p>
          <p className="text-sm text-gray-700">📞 +38 (097) 123-45-67</p>

          <div className="mt-4">
            <h3 className="text-sm font-semibold">Поділитись</h3>
            <div className="flex space-x-2 mt-1">
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">Facebook</button>
              <button className="bg-blue-400 text-white px-2 py-1 rounded text-xs hover:bg-blue-500">Telegram</button>
            </div>
          </div>
        </aside>
      )}*/}
      </div> 
    </div>
  )}

function App() {
  return (
    // <CartProvider>
      <Router>
        <Layout />
        <CookieConsent />

        {/* FOOTER (опціонально) */}
        <footer className="flex flex-col bg-fujiBase text-center text-sm text-gray-400">
          <div className="flex gap-2 justify-center border-b border-border py-2">
              <a
              href="https://www.facebook.com/larysa.shepetko"
              target="_blank"
              rel="noopener noreferrer"
              >
              <img src="/2023_Facebook_icon.svg.png" alt="Facebook" title="Polub nas na Facebook" className="w-7 h-7" />
              </a>
              <a
              href="https://www.instagram.com/shepetko.larisa"
              target="_blank"
              rel="noopener noreferrer"
              >
              <img src="/Instagram.png" alt="Instagram" title="Śledź nas na Instagram" className="w-7 h-7" />
              </a>
              <a
              href="https://wa.me/48501577919"
              target="_blank"
              rel="noopener noreferrer"
              >
              <img src="/whatsapp logo.png" alt="WhatsApp" title="Napisz na WhatsApp" className="w-7 h-7" />
              </a>
          </div>
          <div className="justify-center py-2">
            &copy; {new Date().getFullYear()} LS STUDIO. Wszelkie prawa zastrzeżone.
          </div>
        </footer>
      </Router>
    //</CartProvider> 
  )
}

export default App
