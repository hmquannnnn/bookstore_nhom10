import instance from "../../utils/axiosCustomize"

export const callPayment = (orderId, payment) => {
    const req = {
        order_id: orderId,
        payment: payment
    }
    console.log(req);
    return instance.post(`/payment`, req);
}

// export const callPayment = async (orderId, payment) => {
//     const req = {
//         order_id: orderId,
//         payment: payment
//     };

//     console.log(req);

//     try {
//         const response = await fetch("http://localhost:8080/api/payment", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(req),
//         });

//         if (!response.ok) {
//             // Handle non-successful responses here
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("Fetch error:", error);
//         throw error;
//     }
// };