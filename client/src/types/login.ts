export type Error = {
    email?: string;
    password?: string;
    otherError?: string;
}

export type FormState = {
    token: string | null;
    error: Error;
    isSuccess: boolean;
}