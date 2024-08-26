import { AccessType } from '../Access'

export const readableAccess = (access: AccessType | string) => accessDescritor.get(access) ?? access

const accessDescritor = new Map<string, string>()
accessDescritor.set(AccessType.CREATE_LICENSE, 'Создание лицензии')
accessDescritor.set(AccessType.READ_LICENSE, 'Чтение списка лицензий')
accessDescritor.set(AccessType.RETRIEVE_FILE, 'Скачивание файла лицензиии')
accessDescritor.set(AccessType.USER_ROLE_MANAGEMENT, 'Управление пользователями')
