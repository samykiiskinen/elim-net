import { jwtDecode } from 'jwt-decode'

export const apiCall = async (endpoint: string, method = 'GET', body: object | null = null, accessToken: string | null = null) => {
    const isTokenExpired = (token: string | null) => {
        if (!token) return true; 
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp < currentTime;
    };

    const validAccessToken = accessToken && !isTokenExpired(accessToken) ? accessToken : null;
    if (!validAccessToken) {
        throw new Error("Invalid or expired access token");
    }    

    const headers = {
        Authorization: `Bearer ${validAccessToken}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(endpoint, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API call error:", error);
        throw error;
    }
};
