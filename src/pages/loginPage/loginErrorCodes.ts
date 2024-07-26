const errorCodes = new Map<number, string>()
errorCodes.set(400, 'Неверные логин или пароль')
errorCodes.set(422, 'Неверные логин или пароль')
errorCodes.set(500, 'Ошибка сервера')
errorCodes.set(503, 'Сервер обслуживается')

export const getDescriptionByCode = (code: number): string => {
  return errorCodes.get(code) ?? 'Сервер не отвечает'
}
