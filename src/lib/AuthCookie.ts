export function getCookie(cookies: any) : string {
    const authToken: string = cookies.get('auth_token') ?? '';
    return authToken;
}