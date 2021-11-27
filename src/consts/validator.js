/* 資料是否存在 */
export const required = (v) => !!v || '請填寫資料';

/* 真實中文姓名 */
export const realChName = (v) => /^[\u4e00-\u9fa5]{2,8}$/.test(v) || '請填寫真實姓名';

/* Email */
export const checkEMail = (v) => /^[A-Za-z0-9._]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) || '請填寫正確的Email';
