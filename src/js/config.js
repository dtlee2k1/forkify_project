/*
File config.js là một tệp tin Javascript chứa các thông tin cấu hình (configuration) cho một ứng dụng hoặc một trang web. Các thông tin này có thể bao gồm các biến môi trường, cài đặt khóa API, cài đặt cho cơ sở dữ liệu, các thông số kỹ thuật của ứng dụng hoặc các giá trị tùy chỉnh khác.

Mục đích của việc sử dụng file config.js là để cho phép người lập trình thay đổi các thông tin cấu hình một cách dễ dàng mà không cần phải truy cập vào mã nguồn của ứng dụng hoặc trang web. Điều này cho phép ứng dụng hoặc trang web có tính linh hoạt cao và dễ bảo trì, vì các thông tin cấu hình có thể được chỉnh sửa mà không cần phải thay đổi mã nguồn.

Một số ví dụ về thông tin cấu hình có thể được lưu trữ trong file config.js bao gồm các thông tin như địa chỉ cơ sở dữ liệu, cài đặt cho các trình duyệt và bộ xử lý, các cài đặt mạng, khóa API, mật khẩu truy cập, các giá trị tùy chỉnh cho ứng dụng và nhiều hơn nữa.
*/

export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/';
export const TIMEOUT_SEC = 10;
export const RES_PER_PAGE = 10;
export const KEY = 'a4c62843-289a-47e5-ad1a-fc5c6eda9506';
