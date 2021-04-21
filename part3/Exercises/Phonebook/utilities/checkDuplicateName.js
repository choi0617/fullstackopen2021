const checkDuplicateName = (obj, name) => {
    return obj.filter(x => x.name === name)
}

module.exports = checkDuplicateName;