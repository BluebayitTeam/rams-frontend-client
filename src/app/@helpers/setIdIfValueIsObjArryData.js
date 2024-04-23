import _ from 'lodash';

const setIdIfValueIsObjArryData = (array = []) => {
    let convertedArray = JSON.parse(JSON.stringify(array));

    if (_.isArray(convertedArray)) {
        const modifiedArr = [];
        convertedArray.forEach(data => {
            let modifiedObj = data;
            for (let x in modifiedObj) {
                if (_.isObject(modifiedObj[x])) {
                    modifiedObj[x] = modifiedObj[x]?.id;
                }
            }
            modifiedArr.push(modifiedObj);
        });
        convertedArray = modifiedArr;
    }

    return convertedArray;
};

export default setIdIfValueIsObjArryData;
