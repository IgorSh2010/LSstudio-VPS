import { useLocation, useNavigate, Link } from "react-router-dom";
import { logout } from '../api/auth';
import { useEffect, useState, useRef } from "react";
//import CartPreview from "./CartPreview";
import { Button } from "./ui/Button";
import { getMe } from "../api/user";
import { Speech, UserRound, Heart, LogOut, NotebookTabs, MessageCircle } from "lucide-react";


const Header = () => {
  //const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);  
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);  
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);  
  //const isHome = location.pathname === "/";
  const logo = "/logoLS.png";

  
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await getMe();
        if (res.status === 401) {
          //localStorage.removeItem("token");
          //navigate("/login");
          //return;
        }
        setUser(res.user);
        setUserRole(res.user.role || "user");
      } catch (err) {
        console.warn("❌ Не вдалося отримати користувача:", err);
        setUser(null);
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);
   
  // 📬 Отримуємо кількість непрочитаних повідомлень
  useEffect(() => {
    if (!user) return;

    const fetchUnread = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/messages/unread-count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.unreadCount || 0);
        }
      } catch (err) {
        console.error("❌ Error fetching unread count:", err);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 10000);
    return () => clearInterval(interval);
  }, [user]);

  // 🚪 Вихід із системи
  const handleLogout = () => {
    /* localStorage.removeItem("token");
    setUser(null);
    setUserRole(null);
    navigate("/"); */
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  const handleOutsideClick = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };
  if (menuOpen) {
    document.addEventListener("mousedown", handleOutsideClick);
  } else {
    document.removeEventListener("mousedown", handleOutsideClick);
  }
  return () => document.removeEventListener("mousedown", handleOutsideClick);
}, [menuOpen]);

  return (
    <header
      className="shadow-md  top-0 pb-3 w-full bg-gradient-to-b from-fujiLight to-fujiBase text-textPrimary"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        {/* Лого та назва */}
        <Link to={`/`}>
        <div className="flex space-x-4 sm:flex-row items-center sm:space-x-4 text-center sm:text-left">
          <img src={logo} alt="logo" className="w-12 h-12 rounded-sm"/>
          <div>
            <h1 className="text-4xl text-textPrimary font-bold font-dancing tracking-wide">
              LS STUDIO
            </h1>
            <p className="text-textPrimary font-dancing text-sm">
              Love in little things
            </p>
          </div>
        </div>
        </Link>

        {/* Навігація (desktop) */}
        <nav className="flex md:gap-4 text-sm md:text-xl font-semibold uppercase">
          <a href="/" className="border border-transparent hover:border-border px-2 py-1 rounded-lg">
            Glówna
          </a>
          <a href="/productsMain" className="border border-transparent hover:border-border px-2 py-1 rounded-lg">
            Katalog wyrobów
          </a>
          <a href="/patterns" className="border border-transparent hover:border-border px-2 py-1 rounded-lg">
            Wzory
          </a>
          {user ? (
            <a href="/account" className="border border-transparent hover:border-border px-2 py-1 rounded-lg">
              Konto
            </a>
          ) : ("")
          }  
          <a href="/about" className="border border-transparent hover:border-border px-2 py-1 rounded-lg">
            O nas
          </a>

          {/* Кнопка мобільного меню */}
            <button
              className="md:hidden text-xl focus:outline-none ml-4"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button> 
        </nav>

        {/* Навігація (mobile) */}
        <div className="text-center md:text-right">
          <div className="flex md:mb-auto space-x-4 gap-2 md:items-end md:text-right">       
            {userRole === "admin" && (
              <Button variant="secondary"
                onClick={() => navigate("/admin/dashboard")}
              >
                <span>⚙ Admin Panel</span>
              </Button>
            )}

            {/* Кнопка кошика */}
            {user ? (
              <div className="relative">
                {/* <CartPreview /> */}
              </div>
            ) : ("")}                        
          </div>
        </div>

        {/* Додаткові кнопки */}
        {user ? (
          <div ref={dropdownRef} className="relative hidden md:flex items-center space-x-4">
            <Button variant="secondary"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>{user.email.split("@")[0]}</span>
              <span>▼</span>
              {unreadCount > 0 &&
                <div>               
                  <span className="absolute -right-2 -top-2 w-5 h-5 bg-red-500 rounded-full animate-ping opacity-60"></span>
                  <span className="absolute -right-1 -top-1 w-3 h-3 bg-red-600 rounded-full"></span>
                </div>
              }
            </Button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 bg-white text-gray-700 shadow-lg rounded-md w-56 z-50 border border-pink-200">
                <div className="px-4 py-3 border-b border-pink-100">
                  <p className="font-bold text-pink-700">{user.email}</p>
                </div>
                <ul className="text-sm">
                  <li>
                    <a href="/account" className="flex items-center gap-1 w-full px-4 py-2 hover:bg-pink-100">
                    <UserRound size={16} color="black"/>Moje konto</a>
                  </li>
                  <li>
                    <a href="/favorites" className="flex items-center gap-1 w-full px-4 py-2 hover:bg-pink-100">
                    <Heart size={16} color="red"/>Ulubione</a>
                  </li>
                  <li>
                    <a href="/orders" className="flex items-center gap-1 w-full px-4 py-2 hover:bg-pink-100">
                    <NotebookTabs size={16} color="green"/>Moje zamówienia</a>
                  </li>
                  <li> 
                    <a href="/conservations" className="relative flex items-center gap-2 w-full px-4 py-2 hover:bg-pink-100"> 
                      <Speech size={16} color="blue" /> Moje rozmowy 
                          {unreadCount > 0 && 
                             (<span className="absolute right-4 content-between bg-red-600 text-white text-sm font-bold shadow-lg rounded-xl w-8 h-8 flex items-center justify-center animate-pulse"> 
                                <MessageCircle size={16}/> {unreadCount} 
                              </span> )} 
                    </a> 
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 w-full text-left px-4 py-2 hover:bg-pink-100"
                    >
                      <LogOut size={16} color="gray"/> Wyloguj się
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center space-x-1">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              <span>Zaloguj</span>
            </Button>
            <span>|</span>
            <Button variant="ghost" onClick={() => navigate("/register")}>
              <span>Zarejestruj</span>
            </Button>
          </div>
        )}
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <div ref={mobileMenuRef} className="md:hidden px-4 pb-4 bg-gray-800 text-white text-center mt-2 rounded-md">
          <hr className="my-2 border-gray-600" />
          {user ? (
            <div className="text-white space-y-2">
              <p className="font-bold">{user.email}</p>
              <a href="/account" className="flex items-center justify-center gap-1 w-full hover:underline"><UserRound size={16}/>Moje konto</a>
              <a href="/favorites" className="flex items-center justify-center gap-1 w-full hover:underline"><Heart size={16}/>Ulubione</a>
              <a href="/orders" className="flex items-center justify-center gap-1 w-full hover:underline"><NotebookTabs size={16}/>Moje zamówienia</a>
              <a href="/conservations" className="relative flex items-center justify-center gap-1 w-full hover:underline">
                <Speech size={16}/>Moje rozmowy
                      {unreadCount > 0 && ( 
                        <span className="absolute right-4 content-between bg-red-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                           <MessageCircle size={16}/>{unreadCount} 
                        </span> 
                      )}
              </a>
              <button
                onClick={handleLogout}
                className="flex text-rose-700 font-semibold items-center justify-center gap-1 w-full text-left hover:underline"
              >
                <LogOut size={16} />Wyloguj się
              </button>
            </div>
          ) : (
            <div className="my-2 space-y-2">
              <a href="/login" className="my-2 block hover:underline">Zaloguj</a>
              <a href="/register" className="my-2 block hover:underline">Zarejestruj</a>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
