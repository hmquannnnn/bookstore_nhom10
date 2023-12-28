import instance from "../../utils/axiosCustomize"

const orderURL = "/order"

export const callCreateOrder = (orderList) => {
    console.log(">>>check order list: ", orderList)
    return instance.post(`${orderURL}`, orderList);
}

// export const callCreateOrder = async (orderList) => {
//     const token = localStorage.getItem("token")
//     console.log(orderList);
//     try {
//         const response = await fetch(`http://localhost:8080/api/order`, {
//             method: 'POST',
//             headers: {
//                 'Auth': token,
//                 'Content-Type': 'application/json',
//                 // Các header khác nếu cần
//             },
//             body: orderList,
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error during fetch:', error);
//         throw error; // hoặc xử lý lỗi theo ý bạn
//     }
// };

// const URL = "http://localhost:8080/api/order";

// export const callCreateOrder = (orderList) => {
//     console.log(">>>check order list: ", orderList);
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             // Đặt token xác thực của bạn ở đây
//             'Auth': `${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(orderList),
//     };

//     return fetch(URL, requestOptions)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .catch(error => {
//             console.error('Error during fetch:', error);
//             throw error;
//         });
// };


export const callGetOrder = () => {
    return instance.get(`${orderURL}`);
}