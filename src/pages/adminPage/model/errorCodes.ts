const ErrorCodes = new Map<number, string>()
ErrorCodes.set(401, 'Авторизуйтесь')
ErrorCodes.set(403, 'Недостаточно прав')
ErrorCodes.set(429, 'Слишком много запросов')
ErrorCodes.set(404, 'Сервер на техническом обслуживании')

const ErrorDescription = (code: number) => ErrorCodes.get(code)

export { ErrorDescription }
