declare module 'bcrypt' {
    export function hash(password: string | Buffer, saltOrRounds: string | number): Promise<string>;
    export function hashSync(password: string | Buffer, saltOrRounds: string | number): string;
    export function compare(data: string | Buffer, encrypted: string): Promise<boolean>;
    export function compareSync(data: string | Buffer, encrypted: string): boolean;
    export function genSalt(rounds?: number): Promise<string>;
    export function genSaltSync(rounds?: number): string;
}

declare module 'jsonwebtoken' {
    export function sign(
        payload: string | object | Buffer,
        secretOrPrivateKey: string | Buffer,
        options?: {
            algorithm?: string;
            expiresIn?: string | number;
            notBefore?: string | number;
            audience?: string | string[];
            subject?: string;
            issuer?: string;
            jwtid?: string;
            mutatePayload?: boolean;
            noTimestamp?: boolean;
            header?: object;
            encoding?: string;
        }
    ): string;

    export function verify(
        token: string,
        secretOrPublicKey: string | Buffer,
        options?: {
            algorithms?: string[];
            audience?: string | RegExp | Array<string | RegExp>;
            clockTolerance?: number;
            issuer?: string | string[];
            ignoreExpiration?: boolean;
            ignoreNotBefore?: boolean;
            subject?: string;
            clockTimestamp?: number;
        }
    ): object | string;

    export function decode(
        token: string,
        options?: { json?: boolean; complete?: boolean }
    ): null | { [key: string]: any; payload?: object | string; header?: object };
}