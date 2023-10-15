

export async function appFetch(input: String, init: RequestInit | undefined) {
    return await fetch(`http://localhost:8000${input}`, init);
}