interface User {
    id: string;
    email: string;
}

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

interface RefreshTokenRequest {
    refreshToken: string;
}

interface RefreshResponse {
    user: User;
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