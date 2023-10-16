export async function appFetch(input: string, init: RequestInit | undefined) {
    return await fetch(`http://localhost:8000${input}`, init);
}


export function intoQuerry(value: Object) {
    let stringBuilder: Array<string> = [];
    for (let key in value) {
        const element = !value[key] ? "" : value[key];
        stringBuilder.push(`${key}=${element}`);
    }
    return `?${stringBuilder.join("&")}`;
}