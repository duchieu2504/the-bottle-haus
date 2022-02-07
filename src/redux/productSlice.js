const { createSlice } = require("@reduxjs/toolkit");


const init = [
    {
        id: '0',
        code: '#0',
        title:'Khuôn cửa sổ tròn kích thước 1',
        category: 'khuôn sắt',
        classify: 'cửa sổ',
        description: 'Khuôn cửa sổ hình tròn asfsdfsadfasdfsadfsadfsdfsdfsdf ffsfdsfs fsdfsdf sffsdf sf sdfsdfsf sdf sf sdfsdfs dfegerg ',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        price:'1200000',
        quantily: '1',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '1',
        code: '#1',
        title:'Khuôn cửa sổ tròn kích thước 2',
        category: 'khuôn sắt',
        classify: 'cửa sổ',
        description: 'Khuôn cửa sổ hình tròn',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        quantily: '1',
        price:'1400000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '2',
        code: '#2',
        title:'Khuôn cửa sổ tròn kích thước 3',
        category: 'khuôn sắt',
        classify: 'cửa sổ',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        description: 'Khuôn cửa sổ hình tròn',
        quantily: '1',
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '5',
        code: '#5',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        category: 'khuôn sắt',
        classify: 'cửa sổ',
        description: 'Khuôn cửa sổ hình tròn',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        quantily: '1',
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '6',
        code: '#6',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        category: 'khuôn sắt',
        classify: 'gạch hoa',
        description: 'Khuôn cửa sổ hình tròn',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        quantily: '1',
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '7',
        code: '#7',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        category: 'khuôn sắt',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        quantily: '1',
        classify: 'đấu trụ',
        description: 'Khuôn cửa sổ hình tròn',
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '8',
        code: '#8',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        category: 'khuôn sắt',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        quantily: '1',
        classify: 'hàng rào',
        description: 'Khuôn cửa sổ hình tròn',
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '9',
        code: '#9',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        category: 'khuôn sắt',
        quantily: '1',
        classify: 'cửa sổ',
        description: 'Khuôn cửa sổ hình tròn',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '10',
        code: '#10',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        quantily: '1',
        category: 'khuôn sắt',
        classify: 'đấu trụ',
        description: 'Khuôn cửa sổ hình tròn',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '11',
        code: '#11',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        category: 'khuôn sắt',
        classify: 'đấu trụ',
        quantily: '1',
        description: 'Khuôn cửa sổ hình tròn',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
    {
        id: '12',
        code: '#12',
        title:'Khuôn cửa sổ tròn kích thước 40x40 50x50 60x60',
        category: 'khuôn nhựa',
        classify: 'đấu trụ',
        quantily: '1',
        description: 'Khuôn cửa sổ hình tròn',
        size: ['40 x 40', '50 x 50', '60 x 60'],
        price:'1200000',
        img:'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
        rating: {
            rate: '3.9',
            count: '124'
        }
    },
]

const products = createSlice({
    name: 'products',
    initialState: init,
    reducers: {
      addPhoto: (state, action) => {
        // const newPhoto = action.payload
        // state.push(newPhoto)
        return state
      }
    }
})

const { reducer } = products
// export const { addPhoto, updatePhoto, removePhoto } = actions
export default reducer