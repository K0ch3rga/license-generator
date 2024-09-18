import JSEncrypt from 'jsencrypt'

export const encrypt = (text: string, key: string) => {
  const encrypt = new JSEncrypt()
  encrypt.setPublicKey(key)
  return encrypt.encrypt(text)
}
