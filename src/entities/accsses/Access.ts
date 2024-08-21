export type Access = {
  name: AccessType
  id: number
}

export enum AccessType {
  READ_LICENSE = 'READ_LICENSE',
  CREATE_LICENSE = 'CREATE_LICENSE',
  RETRIEVE_FILE = 'RETRIEVE_FILE',
  USER_ROLE_MANAGEMENT = 'USER_ROLE_MANAGEMENT',
}
