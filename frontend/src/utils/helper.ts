
export function intoQuerry(value: Object) {
    let stringBuilder: Array<string> = [];
    for (let key in value) {
        const element = !value[key] ? "" : value[key];
        stringBuilder.push(`${key}=${element}`);
    }
    return `?${stringBuilder.join("&")}`;
}