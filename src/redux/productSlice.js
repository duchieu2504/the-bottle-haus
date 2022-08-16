const { createSlice } = require("@reduxjs/toolkit");

const init = [
    {
        id: 0,
        title: "Arrogant Bastard Whiskey",
        category: "whiskey",
        classify: "american",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        price: "299",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_ea480749-f832-4119-b091-4a9e45d22eda_533x.jpg?v=1637875130",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 1,
        title: "Bainbridge Battle Point Organic Wheat Whiskey",
        category: "whiskey",
        classify: "american",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        price: "64",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_71ef106d-7577-4b48-91c2-c5af3b7b311a_533x.png?v=1631989951",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 2,
        title: "Bainbridge Two Islands Barbados Rum Cask Organic Wheat Whiskey",
        category: "whiskey",
        classify: "american",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        price: "93",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_71ef106d-7577-4b48-91c2-c5af3b7b311a_533x.png?v=1631989951",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 3,
        title: "Balcones 100 Proof Texas Rye Whisky",
        category: "whiskey",
        classify: "american",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        price: "43",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_d3da0987-f9bf-4035-b6b1-52868e34bc78.jpg?v=1631858599",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 4,
        title: "Balcones Baby Blue Corn Texas Whisky",
        category: "whiskey",
        classify: "american",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        price: "589",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_49f4231f-468c-4d00-ba32-0a974c09c67d.jpg?v=1631858767",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 5,
        title: "Blanton's Single Barrel Bourbon Whiskey",
        category: "whiskey",
        classify: "bourbon",
        description:
            "Buffalo Trace Kentucky Straight Bourbon Whiskey is distilled, aged and bottled at the most award-winning distillery in the world. Made from the finest corn, rye and barley malt, this whiskey ages in new oak barrels for years in century old warehouses until the peak of maturity. The taste is rich and complex, with hints of vanilla, toffee and candied fruit. The smooth finish lingers on the palate. This will never change. Ancient buffalo carved paths through the wilderness that led American pioneers and explorers to new frontiers. One such trail led to the banks of the Kentucky River where Buffalo Trace Distillery has been making bourbon whiskey the same way for more than 200 years. In tribute to the mighty buffalo and the rugged, independent spirit of the pioneers who followed them, we created our signature Buffalo Trace Kentucky Straight Bourbon Whiskey.",
        price: "224",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/image_d4b57989-9a8c-401c-ad38-3ee25d24144a.jpg?v=1630940987",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 6,
        title: "Buffalo Trace Bourbon Whiskey",
        category: "whiskey",
        classify: "bourbon",
        description:
            "Angel’s Envy Kentucky Straight Bourbon is finished in port wine casks for an award-winning spirit. We guide each batch’s conditioning, blending our handcrafted bourbon in small batches of 8 to 12 barrels at a time. It’s typically aged for up to 6 years. While we lose about 5% of the spirit each year to evaporation, or “the Angel’s Share,” what’s left behind after we’re done is truly worthy of envy. Once it’s deemed ready, we finish our bourbon in ruby port wine casks, which adds subtly distinct flavor nuances that enhance the whiskey without challenging it. Our port finishing process lasts between three to six months, depending on taste. We use 60-gallon ruby port barrels made from French oak and imported directly from Portugal. This creates a whiskey of unprecedented smoothness, sweetness and balance.",
        price: "44",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/BuyBuffaloTraceBourbonOnline_533x.png?v=1647314875",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 7,
        title: "Angel's Envy Kentucky Straight Bourbon Whiskey",
        category: "whiskey",
        classify: "vokda",
        description:
            "Angel’s Envy Kentucky Straight Bourbon is finished in port wine casks for an award-winning spirit. We guide each batch’s conditioning, blending our handcrafted bourbon in small batches of 8 to 12 barrels at a time. It’s typically aged for up to 6 years. While we lose about 5% of the spirit each year to evaporation, or “the Angel’s Share,” what’s left behind after we’re done is truly worthy of envy. Once it’s deemed ready, we finish our bourbon in ruby port wine casks, which adds subtly distinct flavor nuances that enhance the whiskey without challenging it. Our port finishing process lasts between three to six months, depending on taste. We use 60-gallon ruby port barrels made from French oak and imported directly from Portugal. This creates a whiskey of unprecedented smoothness, sweetness and balance.",
        price: "58",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/Titos-Vodka-750-ml_1_533x.png?v=1580827970",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 8,
        title: "Tito's Vodka",
        category: "shop alcohol",
        classify: "vodka",
        description:
            "Angel’s Envy Kentucky Straight Bourbon is finished in port wine casks for an award-winning spirit. We guide each batch’s conditioning, blending our handcrafted bourbon in small batches of 8 to 12 barrels at a time. It’s typically aged for up to 6 years. While we lose about 5% of the spirit each year to evaporation, or “the Angel’s Share,” what’s left behind after we’re done is truly worthy of envy. Once it’s deemed ready, we finish our bourbon in ruby port wine casks, which adds subtly distinct flavor nuances that enhance the whiskey without challenging it. Our port finishing process lasts between three to six months, depending on taste. We use 60-gallon ruby port barrels made from French oak and imported directly from Portugal. This creates a whiskey of unprecedented smoothness, sweetness and balance.",

        price: "22",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/greygoose__22031__51730.1358534050.1280.1280.jpg?v=1620677887",
        rating: {
            rate: "3.9",
            count: "124",
        },
    },
    {
        id: 9,
        title: "Grey Goose Vodka",
        category: "shop alcohol",
        classify: "vokda",
        description:
            "Grey Goose is crafted in the legendary tradition of the Cognac region, under the watchful eye of the Maitre de Chai (or Master of the Cellar), who uses a proprietary five step distillation process to transform fine French wheat and pure artesian spring water into the World's Best Tasting Vodka.",
        price: "35",
        img: "https://cdn.shopify.com/s/files/1/0313/6228/5699/products/ABSOLUT_VODKA_750ML__16867.1553621218.1280.1280.jpg?v=1620677483",
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
        description:
            "Grey Goose is crafted in the legendary tradition of the Cognac region, under the watchful eye of the Maitre de Chai (or Master of the Cellar), who uses a proprietary five step distillation process to transform fine French wheat and pure artesian spring water into the World's Best Tasting Vodka.",

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
