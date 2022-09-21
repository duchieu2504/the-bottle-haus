import apiProducts from "connectApi/api/apiProduct";

export const productsApi = async () => {
    try {
        const category = ["whiskey", "shop alcohol"];
        const classify = ["teqwuila", "vokda", "bourbon", "american", "vokda"];
        const res = await apiProducts.getAll("products");
        const api = res.data;
        const a = api.map((i) => {
            return {
                ...i,
                category: category[Number(i.category) - 1],
                classify: classify[Number(i.classify) - 1],
            };
        });
        console.log("success");
        return a;
    } catch (err) {
        console.log("lỗi sever");
    }
};

export const getSearchProduct = async (query) => {
    try {
        const result = await apiProducts.getSearchProduct(query);
        console.log(result.data);
        return result.data;
    } catch (err) {
        console.log("Error :", err.message);
    }
};
