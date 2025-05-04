
const userKeys = {
    all: ['users'] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: () =>
}