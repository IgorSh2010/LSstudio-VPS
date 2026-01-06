import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { client } from '../sanityClient';

const Breadcrumbs = () => {
  const location = useLocation();
  const [productTitle, setProductTitle] = useState(null);
  const pathnames = location.pathname.split('/').filter((x) => x);
  const pathNameMap = {
    'productsMain': 'Katalog wyrobów',
    'about': 'O nas',
    'favorites': 'Ulubione',
    'products': 'Produkty',
    'cart': 'Koszyk',
    'conservations' : 'Moje rozmowy',
    'orders': 'Moje zamówienia',
    'regulamin': 'Regulamin i polityka prywatności',
    // додай інші за потребою
  };

  useEffect(() => {
    const last = location.pathname.split('/').filter(Boolean).pop();
  
    if (last && last.length >= 8 && !pathNameMap[last]) {
      client.fetch(`*[_type == "product" && _id == $id][0]{ title }`, { id: last })
        .then((data) => {
          if (data?.title) {
            setProductTitle(data.title);
          }
        });
    }
  }, [location.pathname]);

  return (
    <nav className="text-sm text-gray-600 mt-1 mb-1">
      <ol className="list-reset flex">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Strona główna
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = isLast && productTitle
            ? productTitle
            : pathNameMap[name] || decodeURIComponent(name);

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{label}</span>
              ) : (
                <Link to={routeTo} className="text-blue-600 hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
