/*
"helpers.js" là một tệp tin trong ứng dụng web, thường được sử dụng để chứa các hàm trợ giúp (helper functions) hoặc các đoạn mã lặp đi lặp lại trong ứng dụng. Tệp tin này có thể được sử dụng để giảm thiểu sự trùng lặp của mã trong các tệp tin khác như component hay module trong ứng dụng của bạn.

Các hàm trợ giúp có thể được sử dụng để thực hiện các tác vụ nhỏ hơn trong ứng dụng web của bạn, như xử lý chuỗi, định dạng số, kiểm tra dữ liệu đầu vào, tạo URL hoặc đường dẫn tới các tài nguyên, v.v.
*/

import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';
const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(
                new Error(`Request took too long! Timeout after ${s} second`)
            );
        }, s * 1000);
    });
};

// export const AJAX = async function (url, uploadData = undefined) {
//     try {
//         const fetchPro = uploadData
//             ? fetch(url, {
//                   method: 'POST',
//                   headers: {
//                       'Content-Type': 'application/json',
//                   },
//                   body: JSON.stringify(uploadData),
//               })
//             : fetch(url);

//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//         const data = await res.json();

//         if (!res.ok) throw new Error(`${data.message} ${res.status}`);
//         return data;
//     } catch (error) {
//         throw error;
//     }
// };

export const getJSON = async function (url) {
    try {
        const fetchPro = fetch(url);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} ${res.status}`);
        return data;
    } catch (error) {
        throw error;
    }
};

export const sendJSON = async function (url, uploadData) {
    try {
        const fetchPro = fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(uploadData),
        });
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} ${res.status}`);
        return data;
    } catch (error) {
        throw error;
    }
};
