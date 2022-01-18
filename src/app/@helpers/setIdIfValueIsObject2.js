import _ from 'lodash';

const setIdIfValueIsObject2 = (object = {}) => {

    const conVertedObject = object

    for (let x in conVertedObject) {
        if (_.isObject(conVertedObject[x])) conVertedObject[x] = conVertedObject[x]?.id
    }

    return conVertedObject
}

export default setIdIfValueIsObject2
