export function passwordGenerate() {
    return Math.random().toString(36).slice(-7);
}