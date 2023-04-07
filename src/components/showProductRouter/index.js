import { useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import "./showProductRouter.css"
import Slider from "react-slick";

import { convertToSlug } from "../../scriptAll/convertTextLowUp";
 function ShowProductRouter(props) {
    const [cout,setCout] = useState(1);


    const { invoiceId } = useParams(); // Lấy ra invoiceId từ URL
    const { loadProductData } = props;

    const [dataAllProduct, setDataAllProduct] = useState(null);
   

      const settings = {
        arrows:false,
        infinite: true,

        responsive: [
          {
            breakpoint: 400.9,
            settings: {
              slidesToShow: 2,
             
              
            }
          }
        ]
      };
    useEffect(() => {
      async function fetchData() {
        const getData = await loadProductData();
        setDataAllProduct(getData);
      }
      fetchData();
    }, [loadProductData]);
    let invoiceItem = undefined
    if(dataAllProduct != null){
       invoiceItem= dataAllProduct.find(data => data.id.toString() === invoiceId.toString())
       console.log(invoiceItem)
    }
    const [index, setIndex] = useState(-1);
    const handClickAdd = ()=>{
        setCout(cout+1);
    }
    const handClickSub = ()=>{
        if(cout>1){
            setCout(cout-1);
        }
    }
    const handleClick = (e)=>{
        const checkActive = document.querySelector(".sectionProductRouter__boxBtnActive");
        const checkActiveSpan = document.querySelector(".sectionProductRouter__activeSpan")
        checkActive.classList.remove("sectionProductRouter__boxBtnActive");
        e.target.classList.add("sectionProductRouter__boxBtnActive")
        const indexValue = Array.from(e.target.parentNode.parentNode.children).indexOf(e.target.parentNode);
        const sectionProductRouterspanA = document.querySelector(".sectionProductRouter__spanA");
        const sectionProductRouterspanB = document.querySelector(".sectionProductRouter__spanB");
        checkActiveSpan.classList.remove("sectionProductRouter__activeSpan")
        switch (indexValue) {
            case 0:
                sectionProductRouterspanA.classList.add("sectionProductRouter__activeSpan");
                break;
            case 1:
                sectionProductRouterspanB.classList.add("sectionProductRouter__activeSpan");
                break;
            default:
                break;
        }
    }
   
    return (
      <>
       {
        invoiceItem !== undefined &&(
            <>
                <section className="sectionProductRouter">
                    <div className="container">
                        <div className="sectionProductRouter__box">
                            <div className="sectionProductRouter__flex">
                                <div className="sectionProductRouter__flex--image">
                                    <Slider className="sectionProductRouter__imageMain" {...settings}>
                                        {
                                            invoiceItem.images.map((image,index)=>(             
                                                <img key={index}  src={image} alt ={invoiceItem.title}></img>
                                               
                                            ))
                                        }
                                    </Slider>
                                    <div className="sectionProductRouter__imageList">
                                        {
                                            invoiceItem.images.map((image,index)=>(
                                                <div className="sectionProductRouter__imageList--item" key ={index}>
                                                     <img  src={image} alt ={invoiceItem.title}></img>
                                                </div>
                                               
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="sectionProductRouter__flex--text">
                                    <div className="sectionProductRouter__boxText">
                                        <h1>{convertToSlug(invoiceItem.title)}</h1>
                                        <p>Brand:{convertToSlug(invoiceItem.brand)}</p>
                                        <p>Price: <strong >{invoiceItem.price}</strong>$</p>
                                        
                                    </div>
                                    <div className="sectionProductRouter__boxBtn">
                                        <ul className="sectionProductRouter__boxBtn--btn" >
                                            <li >
                                                <button className="sectionProductRouter__boxBtnA sectionProductRouter__boxBtnActive" onClick={handleClick}>Description</button>
                                            </li>
                                            <li >
                                                <button className="sectionProductRouter__boxBtnA" onClick={handleClick}>Reviews</button>
                                            </li>
                                            
                                        </ul>
                                        <div className="sectionProductRouter__boxBtn--text">
                                            <span className="sectionProductRouter__spanA sectionProductRouter__activeSpan">{invoiceItem.description}</span>
                                            <span className="sectionProductRouter__spanB ">{invoiceItem.description} 5 <i class="fa-solid fa-star"></i></span>
                                        </div>

                                        <div className="sectionProductRouter__boxBtn--count">
                                            <div className="sectionProductRouter__count--text">
                                                <h3><span>Count</span></h3>
                                            </div>
                                            <div className="sectionProductRouter__count--icon">
                                                <div className="sectionProductRouter__count" onClick={handClickSub}>
                                                    <i class="fa-solid fa-minus"></i>
                                                </div>
                                                <div className="sectionProductRouter__count--input">
                                                        <input type="number" class="ant-input-number-input" autocomplete="off" max="50" min="1" step="1" value={cout}/>
                                                </div>
                                                <div className="sectionProductRouter__count"  onClick={handClickAdd}>     
                                                    <i class="fa-solid fa-plus"></i>
                                                </div>
                                            </div>
                                            <div className="sectionProductRouter__count--btn">
                                               <button className="sectionProductRouter__cout__btn">ADD TO CART</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
       }
      </>
    );
  }
  
  export default ShowProductRouter;