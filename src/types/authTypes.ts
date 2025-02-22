
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


interface ApiRefreshResponse {
    success: boolean;
    access_token: string;
    message: string;
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