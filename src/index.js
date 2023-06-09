
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ShowProductRouter from "./components/showProductRouter"
import Home from "./Home";
import { RequestApiProdcut } from "./scriptAll/requestAPI";
import YourCart from "./components/yourCart/yourCartYou";
import ProductAll from "./components/ProductAll";
import BuyProduct from "./components/buyProduct";
import CompleteBuyProduct from "./components/completeBuyProduct";
function Error(){
  return(
    <>
      <div className="notFound">
                    <h1>NOT FOUND</h1>
        </div>
    </>
  )
}
async function loadProduct(){
  const getData = await RequestApiProdcut();
  return getData;
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
            <Route path="" element={<Home/>}/>
             {/* Lấy data bên hàm loadProduct cho giao diện chính nhận được khi thao tác sẽ chuyển qua tab listProduct tương ứng với cái id đằng sau
             Tiếp theo ta cùng đi vào Section Two */}
             <Route path="listProduct/:invoiceId" element={<ShowProductRouter loadProductData={loadProduct} />} />       
             <Route path="yourcart" element={<YourCart/>} />            
             <Route path="buyproduct" element={<BuyProduct/>}/>
                

             <Route path="buyproduct/complete/:invoiceId" element={<CompleteBuyProduct/>}/>
             <Route path="productAll/:invoiceId" element ={<ProductAll/>}/>
            <Route path="*" element ={<Error/>}/>
      </Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
