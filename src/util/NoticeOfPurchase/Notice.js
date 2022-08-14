function Notice(values) {
    // Tạo thông báo khi đã có sản phẩm và kích thước đã có trong giở hàng
    const data = () => {
        if (typeof values === "object") {
            return `<h3 class='notice_title'>Customer information:</h3>
            <p>Full Name: ${values.fullname}</p>
            <p>Phone: ${values.billing_address_phone}</p>
            <p>Shipping address: ${values.province}</p>
            <p>Detailed description: ${values.billing_address}</p>`;
        } else {
            return `<h3 class='notice_title'>Notification</h3>
            <p class='notice_msg'>You already have this product in your cart</p>`;
        }
    };
    const a = document.createElement("div");
    a.classList.add("notice");
    a.innerHTML = `
            <div class='notice_icon'>
                <img src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/000000/external-info-hotel-services-flatarticons-blue-flatarticons.png" alt='Info'/>
            </div>
            <div class='notice_body'>
            ${data()}
                
            </div>
            <div class='notice_close'>
                <img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/64/000000/external-delete-user-interface-flatart-icons-flat-flatarticons.png" alt='close'/>
            </div>
        `;
    return a;
}

export { Notice };
