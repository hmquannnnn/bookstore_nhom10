

export async function appFetch(input: String, init: RequestInit | undefined) {
    console.log(`http://localhost:8000${input}`)
    return await fetch(`http://localhost:8000${input}`, init);
}