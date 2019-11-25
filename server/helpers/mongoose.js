module.exports = {
    normalizeErrors: function(errors) {
        const normalizeErrors = [];
        //loop through the err object and get the property eg email and then get the resp. error message
        //has own property avoids parsing inherited properties
        for(let property in errors) {
            if(errors.hasOwnProperty(property)) {
                normalizeErrors.push({title: property, detail: errors[property].message})
            }
        }
        return normalizeErrors;
    }
}