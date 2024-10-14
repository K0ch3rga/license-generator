export type NewLicenseDto = {
  company_name: string
  product_name: string
  license_users_count: number
  required_attributes: string[]
  exp_time?: string
  additional_license_information?: string
}
