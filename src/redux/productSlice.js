const { createSlice } = require("@reduxjs/toolkit");

const init = [
    {
        id: 0,
        title: "Buffalo Trace Bourbon Whiskey",
        category: "whiskey",
        classify: "whiskey",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        price: "499",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/BuyBuffaloTraceBourbonOnline_533x.png?v=1647314875",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 1,
        title: "Crown Royal Peach Whisky",
        category: "whiskey",
        classify: "vokda",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        price: "409",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_b2bd4bfc-7ae0-400d-838d-f42e5f876fec_533x.jpg?v=1629570438",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 2,
        title: "Angel's Envy Kentucky Straight Bourbon Whiskey",
        category: "whiskey",
        classify: "vokda",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        price: "589",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_3c88444c-d562-4cc0-9a61-18678aea6653.jpg?v=1631067615",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 5,
        title: "Blanton's Single Barrel Bourbon Whiskey",
        category: "whiskey",
        classify: "whiskey",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        price: "299",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_d4b57989-9a8c-401c-ad38-3ee25d24144a.jpg?v=1630940987",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 6,
        title: "Clase Azul Reposado Tequila",
        category: "whiskey",
        classify: "teqwuila",
        description: "Khuôn cửa sổ hình tròn",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        price: "199",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_72369386-e3f6-43bf-becc-5c765981193e.jpg?v=1630943814",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 7,
        title: "Don Julio 1942 Tequila",
        category: "whiskey",
        classify: "vokda",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        description: "Khuôn cửa sổ hình tròn",
        price: "200",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_01313f23-8acf-435d-a399-3fea97c7cc73_533x.jpg?v=1626305994",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 8,
        title: "Don Julio 1942 Tequila",
        category: "whiskey",
        classify: "teqwuila",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        description: "Khuôn cửa sổ hình tròn",
        price: "120",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_01313f23-8acf-435d-a399-3fea97c7cc73_533x.jpg?v=1626305994",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 9,
        title: "Don Julio 1942 Tequila",
        category: "whiskey",
        classify: "vokda",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        description: "Khuôn cửa sổ hình tròn",
        price: "199",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_01313f23-8acf-435d-a399-3fea97c7cc73_533x.jpg?v=1626305994",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 10,
        title: "Don Julio 1942 Tequila",
        category: "whiskey",
        classify: "teqwuila",
        size: ["40 x 40", "50 x 50", "60 x 60"],
        description: "Khuôn cửa sổ hình tròn",
        price: "100",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_01313f23-8acf-435d-a399-3fea97c7cc73_533x.jpg?v=1626305994",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
];

const products = createSlice({
    name: "products",
    initialState: init,
    reducers: {
        addPhoto: (state, action) => {
            return state;
        },
    },
});

const { reducer } = products;
// export const { addPhoto, updatePhoto, removePhoto } = actions
export default reducer;
