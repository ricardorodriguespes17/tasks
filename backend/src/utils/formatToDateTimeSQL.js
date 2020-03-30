module.exports = function formatToDateTimeSQL(date) {
    try {
        if(date.toISOString){
            return date.toISOString().replace('T', ' ')
        } else {
            return date.replace('T', ' ')
        }
    } catch (error) {
        return null
    }    
}