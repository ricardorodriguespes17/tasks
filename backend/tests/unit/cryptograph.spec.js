const cryptograph = require('../../src/utils/cryptograph')

describe('Cryptograph password', () => {

    it('Should able to cryptograph password', () => {
        const passwordTest = '123456abc'

        const cryptographPassword = cryptograph(passwordTest)

        expect(cryptographPassword).toHaveLength(64)
    })
})