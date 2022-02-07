import React, { useEffect } from 'react';
import Header from './component/page/Header/Header.js'
import Footer from './component/page/Footer/Footer.js'
import Main from './component/page/Main/index.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from 'scss/GlobalStyles/index.js';
import NavabarInfo from 'component/Content/PageInfo/PageInfo.js';
import Products from 'component/Content/PageProducts/PageProducts.js';
import ProductDetail from 'component/Content/ProductDetail/ProductDetail.js';
import PageLogin from 'component/Content/PageLogin/PageLogin.js';
import ScrollToTop from 'util/ScrollToTop.js';
import AOS from 'aos';
import PageCart from 'component/Content/PageCart/PageCart.js';
import CheckOut from 'component/Content/PageCheckOut/CheckOut.js';

const App = () => {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
      <GlobalStyles>
        <div className="shop_demo" style={{overflow: 'hidden'}}>
        <Router>
          <ScrollToTop />
            <Header />
            <main style={{marginTop: '80px', minHeight: '90vh'}}>
              <Routes>
                <Route exact path='/home' element={<Main />} />
                <Route exact path='/' element={<Main />} />
                <Route path='/thong_tin' element={<NavabarInfo />} />
                <Route path='/cart' element={<PageCart />} />
                <Route path='/checkout' element={<CheckOut />} />
                <Route path='/:url' element={<Products />} />
                <Route path='/:url/:productId' element={<ProductDetail />} />
              </Routes>
              <PageLogin />
            </main>
            <Footer />
        </Router>
        </div>
      </GlobalStyles>
    )
}
export default App