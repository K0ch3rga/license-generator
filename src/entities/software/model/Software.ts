export type Software = {
  id: number
  company_name: string
  required_attributes: string[]
  license_generator_path: string
}

export type NewSoftwareDto = Omit<Software, 'id'>
