import JSEncrypt from 'jsencrypt'

export const encrypt = (text: string, key: string) => {
  const publicKey = `-----BEGIN PUBLIC KEY-----\n${key}\n-----END PUBLIC KEY-----`
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(publicKey)
  return encrypt.encrypt(text)
}
