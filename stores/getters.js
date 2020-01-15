export function getByKeyword(list, key, out) {
    let i,
        proto = Object.prototype,
        ts = proto.toString,
        hasOwn = proto.hasOwnProperty.bind(list);
    if ('[object Array]' !== ts.call(out)) out = [];
    for (i in list) {
        if (hasOwn(i)) {
            if (i === key) {
                out.push(list[i]);
            } else if ('[object Array]' === ts.call(list[i]) || '[object Object]' === ts.call(list[i])) {
                getByKeyword(list[i], key, out);
            }
        }
    }
    return out;
}

export function hasEmptyFields(list, key, error) {
    let i,
        proto = Object.prototype,
        ts = proto.toString,
        hasOwn = proto.hasOwnProperty.bind(list);
    // if ('[object Array]' !== ts.call(out)) out = [];
    for (i in list) {
        if (hasOwn(i)) {
            if (i === key) {
                return true;
            } else if ('[object Array]' === ts.call(list[i]) || '[object Object]' === ts.call(list[i])) {
                getByKeyword(list[i], key, error);
            }
        }
    }
    return false;
}
