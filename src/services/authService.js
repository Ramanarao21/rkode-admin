import api from "./api";

class AuthService {
    async register(email, password, name) {
        try {
            const response = await api.post("/api/auth/register", {
                email,
                password,
                name
            });
            
            if (response.success && response.data.token) {
                this.setToken(response.data.token);
                this.setUser(response.data);
            }
            
            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || "Registration failed",
            };
        }
    }

    async login(email, password) {
        try {
            const response = await api.post("/api/auth/login", {
                email,
                password
            });
            
            if (response.success && response.data.token) {
                this.setToken(response.data.token);
                this.setUser(response.data);
            }
            
            return response;
        } catch (error) {
            return {
                success: false,
                message: error.message || "Login failed",
            };
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated() {
        return !!this.getToken();
    }
}

export default new AuthService();
