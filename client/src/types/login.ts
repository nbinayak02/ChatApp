export type Error = {
    username?: string;
    password?: string;
    otherError?: string;
}

export type FormState = {
    error: Error;
    isSuccess: boolean;
}