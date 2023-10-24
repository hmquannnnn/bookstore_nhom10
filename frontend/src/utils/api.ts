import { intoQuerry } from "./helper";

export async function appFetch(input: string, init?: RequestInit | undefined) {
    return await fetch(`http://localhost:8080${input}`, init);
}

export async function fetchUser(value: { email: string, password: string }) {
    const query = intoQuerry(value);
    const user = await (await appFetch(`/user${query}`)).json().then(data => {
        return data;
    });
    return user;
}