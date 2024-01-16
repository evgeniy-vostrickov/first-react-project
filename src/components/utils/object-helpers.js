export const updateObjectInArray = (items, findPropName, objPropName, newObjProps) => {
    return items.map(u => {
        if (u[objPropName] === findPropName) {
            return { ...u, ...newObjProps };
        }
        return u;
    })

}