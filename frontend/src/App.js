import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import Cart from './Pages/Cart';
import LoginSignUp from './Pages/LoginSignUp';
import Product from './Pages/Product';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import mobile_banner from './Components/Assets/For all.png';
import tv_banner from './Components/Assets/TVBanner.png';
import computer_banner from './Components/Assets/ComputersBanner.png';
import appliance_banner from './Components/Assets/home.png';
import beauty_banner from './Components/Assets/trimmer.png';
import gadget_banner from './Components/Assets/gadget.png';
import Orders from './Components/Orders/Orders';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mobile" element={<ShopCategory banner={mobile_banner} category="mobile"/>} />
          <Route path="/tv" element={<ShopCategory banner={tv_banner} category="tv"/>} />
          <Route path="/computer" element={<ShopCategory banner={computer_banner} category="computer"/>} />
          <Route path="/appliance" element={<ShopCategory banner={appliance_banner} category="computer"/>} />
          <Route path="/beauty" element={<ShopCategory banner={beauty_banner} category="beauty"/>} />
          <Route path="/gadget" element={<ShopCategory banner={gadget_banner} category="gadget"/>} />
          <Route path="/product" element={<Product/>}>
            <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path="/cart" element={<Cart/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/login" element={<LoginSignUp/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
