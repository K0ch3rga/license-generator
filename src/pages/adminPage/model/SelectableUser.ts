import { type User } from '@/entities/user'

export type SelectableUser = User & { selected: boolean }
