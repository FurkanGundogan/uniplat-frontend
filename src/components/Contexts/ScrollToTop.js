import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const ScrollToTop = (props) => {

  const { pathname, state } = useLocation();
 
 
 // browserback ve onpopstate tarayıcıdan geri dönüşlerde eski scrolla dönmeyi sağlıyor düzgün çalışıyor
 // ama hala profil sayfasından post detayına gidilip butonla geri dönüldüğünde en başa atıyor
 const [browserback,setbrowserback]=useState(false)

  useEffect(() => {
    // profilden gidilen bi posttan geri donuste aynı scroll'da olma sağlanamadı

  
    if (state !== null) {
      const scroll = () => {
        if (state.prevScrollY !== undefined && state.prevScrollY !== 0) {
        
        
          window.onpopstate=async(a,b)=>{
           
            //console.log("a:",a)
            if(a.isTrusted){
              await setbrowserback(true)
              window.scrollTo(0, window.pageYOffset);
              
            }
            
            
          }
          if(browserback===false){
          //console.log("once", window.pageYOffset);
          const h = state.prevScrollY;
         // console.log("olmasi gereken", h);
          window.scrollTo(0, h);
         // console.log("sonra", window.pageYOffset);
        }
        } else {
          window.scrollTo(0, 0);
          //console.log("en yukari kaydirildi");
        }
      };
     
      scroll();
      setbrowserback(false)
    }
    return null
  }, [pathname, state,browserback]);

  return <>{props.children}</>;
};

export default ScrollToTop;
