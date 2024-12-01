import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'

export const ShopContext = createContext(null); //Ce contexte permettra de partager des données (comme all_product) entre les composants qui en ont besoin.

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length+1; index++) {
    cart[index] = 0;
  }
  return cart;
}

const ShopContextProvider = (props) => { /*ShopContextProvider : Une fonction qui agit comme un composant.
  contextValue : C'est un objet contenant les données que vous voulez partager via le contexte. Ici, il contient simplement all_product*/

  const [cartItems, setCartItems] = useState(getDefaultCart());
  

  const addToCart = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}));
    console.log(cartItems);
  }
  
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
  }
  


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems)
    {
      if(cartItems[item]>0)
      {
        let itemInfo = all_product.find((product) => product.id===Number(item)) 
        totalAmount += itemInfo.new_price * cartItems[item]; 

      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalItem = 0;
    for(const item in cartItems)
    {
        if(cartItems[item]>0)
        {
          totalItem+= cartItems[item];
        }
    }
    return totalItem;
  }





  const contextValue = {getTotalCartItems,getTotalCartAmount,all_product, cartItems,addToCart,removeFromCart};
 
  return(
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>

    /*ShopContext.Provider : Un composant spécial fourni par le contexte.
Il rend accessible la valeur définie dans value={contextValue} (all_product ici) à tous les composants enfants qui consomment ce contexte.
props.children : Représente tout ce qui est inclus entre les balises <ShopContextProvider> dans l'arborescence des composants*/
  )
}

export default ShopContextProvider;

/*Création du contexte :

ShopContext est créé pour contenir des données que vous voulez partager entre plusieurs composants.
Périmètre du fournisseur (Provider) :

Vous placez ShopContextProvider autour des composants qui ont besoin d'accéder aux données all_product.
Consommation du contexte :

Les composants enfants peuvent accéder à all_product en utilisant le contexte, généralement via le hook useContext.*/