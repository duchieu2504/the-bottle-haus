const convertPrice = (price) => {
    const priceArray = price.split('')
    const priceLength = Math.floor(priceArray.length / 3 )
    let thousands = []
    let hundred = []

    // đi qua từ cụm số gồm 3 số lần lượt
    for( var  i = 0; i <= priceLength; i++) {
    
        if( i === 0) {
            const a = priceArray.slice(- 3 * (i + 1)).join('')
            thousands.push(a)
        }

        if ( 0 <  i <= priceLength ) {
            const a = priceArray.slice(-3 * (i + 1), -3 * i).join('')
            hundred.push(a)
        }
    }

    // lọc bỏ hết các phần tử rỗng '' trong mảng
    const hundreds =  hundred.filter(i => {
        return i !== ''
    })

    // thêm 1 phần tử rỗng '' vào đầu mảng để khi nối phần tử trong mảng có 1 phần tử trống ở cuối tạo thêm dấu .
    hundreds.unshift('')

    // chuối số cuối cùng
    let priceCovenrt = `${hundreds.reverse().join('.')}${thousands.join()}` 
    return priceCovenrt
}

export default convertPrice