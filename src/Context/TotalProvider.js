import React, { createContext } from "react";
import { useSelector } from "react-redux";

export const TotalContext = createContext();

const TotalProvider = ({ children }) => {
    const dataCategory = useSelector((state) => state.products);
    const dataCategoryArray = [...dataCategory];

    const dataProductCart = useSelector((state) => state.productsCart);
    const dataProductCartArray = [...dataProductCart];

    const productCart = dataProductCartArray.map((item) => {
        const data = dataCategoryArray.find((i) => i.id === item.id_product);
        return { quantily: item.quantily, price: data.price };
    });
    const totalProduct = productCart.reduce((acc, item) => {
        const t = Number(item.price) * Number(item.quantily);
        return acc + t;
    }, 0);
    return (
        <TotalContext.Provider value={totalProduct}>
            {children}
        </TotalContext.Provider>
    );
};

export default TotalProvider;
