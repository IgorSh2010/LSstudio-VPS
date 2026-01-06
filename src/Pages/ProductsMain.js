import Products from '../components/Products'
import Breadcrumbs from '../components/Breadcrumbs';

export default function ProductsMain() {
  return (
  <>
    <div className='ml-1'><Breadcrumbs /></div>    
    <div className="ml-1 bg-white/5 backdrop-blur-md shadow-md p-2"> 
      <h2 className="text-3xl font-bold text-textPrimary/80 mb-4">Wszystkie wyroby</h2>
      <Products />
    </div>
  </>
  )
}
