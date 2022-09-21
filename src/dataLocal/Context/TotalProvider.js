import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const TotalContext = createContext();

const TotalProvider = ({ children }) => {
    //tất cả sản phẩm
    const dataCategory = useSelector((state) => state.products.items);
    const loading = useSelector((state) => state.products.loading);
    const [totalProduct, setTotalProduct] = useState(0);
    const dataCategoryArray = [...dataCategory];

    const dataSession = JSON.parse(sessionStorage.getItem("productIds")) || [];

    useEffect(() => {
        const dataSession1 = () => {
            window.addEventListener("storage", () => {
                console.log(dataSession);
            });
        };
        return () => {
            dataSession1();
        };
    }, [dataSession]);
    const dataProductCartArray = [...dataSession];
    const productCart = dataProductCartArray.map((item) => {
        const data = dataCategoryArray.find((i) => i._id === item.productId);
        if (data) {
            return { quantily: item.quantily, price: data.price };
        } else {
            return null;
        }
    });
    useEffect(() => {
        if (dataCategory.length > 0) {
            const totalProduct = productCart.reduce((acc, item) => {
                const t = Number(item.price) * Number(item.quantily);
                return acc + t;
            }, 0);
            setTotalProduct(totalProduct);
            return;
        } else {
            return;
        }
    }, [loading, dataCategory]);

    return (
        <TotalContext.Provider value={totalProduct}>
            {children}
        </TotalContext.Provider>
    );
};

export default TotalProvider;
