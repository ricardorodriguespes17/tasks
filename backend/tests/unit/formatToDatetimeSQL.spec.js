const formatToDatetimeSQL = require('../../src/utils/formatToDateTimeSQL')

describe('Format Date to Datetime in SQL', () => {
    it('Should return datetime', () => {
        const date = new Date()
        
        const response = formatToDatetimeSQL(date)

        expect(response)
    })
})