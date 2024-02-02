import CryptoJS from 'crypto-js';

export function getSignatureForESewa(
  total_amount: number,
  transaction_uuid: string,
  product_code: string
) {
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const secretKey = '8gBm/:&EnhH.1/q';
  const hash = CryptoJS.HmacSHA256(message, secretKey);
  const encodedSignature = CryptoJS.enc.Base64.stringify(hash);
  return encodedSignature;
}

export function decodeHmacESewa(encodedSignature: string) {
  const bytes = CryptoJS.enc.Base64.parse(encodedSignature);
  const decodedSignature = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decodedSignature);
}
