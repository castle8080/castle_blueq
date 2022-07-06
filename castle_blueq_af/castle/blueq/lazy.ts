export function lazy<T>(f: () => T): () => T {
    let value: T = null;
    return () => {
        if (value === null) {
            value = f();
        }
        return value;
    };
}