
interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    user: string;
    accessToken: string;
    refreshToken: string;
}

interface RefreshTokenRequest {
    refreshToken: string;
}

interface RefreshResponse {
    user: string;
    accessToken: string;
    refreshToken: string;
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface RegisterResponse {
    user: {
        name: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}