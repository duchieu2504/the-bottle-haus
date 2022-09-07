import apiOrderProducts from "api/apiOrderProduct";
import { editApiAdress } from "./addressServices";

export const postOrder = async (data) => {
    try {
        const res = await apiOrderProducts.postOrderProduct(data);
        console.log("Lưu đơn hàng thành công");
    } catch {
        console.log("Lỗi tải dữ liệu đơn hàng lên server");
    }
};

export const getAllOrder = async (_id) => {
    try {
        const res = await apiOrderProducts.getOrderProducts(_id);
        const api = res.data;
        const result = async () => {
            let promise = api.map(async (item) => {
                const address = await editApiAdress(item.address);

                const {
                    billingAddress,
                    email,
                    fullName,
                    phoneNumber,
                    province,
                } = address;
                const { code, productIds, totalPrice } = item;
                return await {
                    billingAddress,
                    email,
                    fullName,
                    phoneNumber,
                    province,
                    code,
                    productIds,
                    totalPrice,
                };
            });
            return await Promise.all(promise);
        };

        const a = await result();

        return await result();
    } catch (err) {
        console.log("lỗi lấy dữ liệu các đơn hàng");
    }
};

export const getOrderUnpaid = async (uid) => {
    try {
        const res = await apiOrderProducts.getOrderUnpaid(uid);
        let result;

        switch (res.data.errCode) {
            case "0":
                result = res.data.data;
                break;
            case "1":
                break;
        }
        return result;
    } catch (err) {
        console.log("Lỗi lất đơn hàng chưa thanh toán");
    }
};

// export const getOrderUnpaid1 = async (uid) => {
//     try {
//         const res = await apiOrderProducts.getOrderUnpaid(uid);
//         return res.data;
//     } catch (err) {
//         console.log("Lỗi lất đơn hàng chưa thanh toán");
//     }
// };

export const postOrderUnpaid = async (uid, data) => {
    try {
        await apiOrderProducts.postOrderUnpaid(uid, data);
        console.log("Update dữ liệu thành công");
    } catch (err) {
        console.log("Lỗi lất đơn hàng chưa thanh toán");
    }
};

export const patchOrderUnpaid = async (uid, data) => {
    try {
        await apiOrderProducts.patchOrderUnpaid(uid, data);
        console.log("Update dữ liệu thành công");
    } catch (err) {
        console.log("Lỗi lất đơn hàng chưa thanh toán");
    }
};

export const patchOrderUnpaidProductIds = async (uid, data) => {
    try {
        await apiOrderProducts.patchOrderUnpaidProductIds(uid, data);
        await console.log("Update dữ liệu thành công");
    } catch (err) {
        console.log("Lỗi lất đơn hàng chưa thanh toán");
    }
};

export const patchOrderUnpaidDeleteProductId = async (uid, data) => {
    try {
        await apiOrderProducts.patchOrderUnpaidDeleteProductId(uid, data);
        await console.log("Chinh sưa dữ liệu thành công");
    } catch (err) {
        console.log("Lỗi chinh sưa dữ liệu thành công");
    }
};
