export type License = {
  companyName: string
  productName: string
  licenseNumber: string
  expirationTime: Date
  machineDigestFile: string
  licenseFileName: string
  additionalInfo: Map<string, string>
}
