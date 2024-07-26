import { exportFile, useQuasar } from 'quasar'
import type { Column } from './'
const $q = useQuasar()
const wrapCsvValue = (val: any, formatFn: ((val: any, row: any) => any) | undefined, row: any) => {
  let formatted = formatFn !== void 0 ? formatFn(val, row) : val

  formatted = formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

export const exportTable = (rows: any[], columns: Column[]) => {
  const content = [columns.map((col) => wrapCsvValue(col.label, undefined, undefined))]
    .concat(
      rows.map((row) =>
        columns
          .map((col) =>
            wrapCsvValue(
              typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format,
              row
            )
          )
          .join(',')
      )
    )
    .join('\r\n')
  console.log(content)

  const status = exportFile('table-export.csv', content, {
    encoding: 'utf-8',
    mimeType: 'text/csv',
    byteOrderMark: '\uFEFF'
  })
  if (status !== true) {
    $q.notify({
      message: 'Browser denied file download...',
      color: 'negative',
      icon: 'warning'
    })
  }
}
