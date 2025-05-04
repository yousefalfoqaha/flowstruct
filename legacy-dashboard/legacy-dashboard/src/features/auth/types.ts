export type User = {
    id: number;
    username: string;
}

export type LoginResponse = {
    token: string;
    user: User;
}