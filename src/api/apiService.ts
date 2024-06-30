//apiService.ts
import { UserProfile } from "../types";

// Function to login and fetch token
export async function loginUser(username: string, password: string): Promise<string | null> {
    const url = `https://ydvassdp.com:2001/api/FastestFingers/Authorization/Login`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(`Failed to login: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.jwtToken;
    } catch (error) {
        console.error('Login error:', error);
        throw error;

    }
}
// Function to fetch game questions
export async function fetchGameQuestions(count: number, token: string): Promise<any> {
    const url = `https://ydvassdp.com:2001/api/FastestFingers/GamePlay/GetGameQuestions?count=${count}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch questions: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}


export async function submitGamePlay(
    msisdn: string,
    questionId: number,
    submittedAnswer: string,
    isHintUsed: boolean,
    gameDuration: number,
    token: string
): Promise<{ statusCode: string; statusMessage: string; message: string; } | null> {
    const url = `https://ydvassdp.com:2001/api/FastestFingers/GamePlay/SubmitGamePlay`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                msisdn,
                questionId,
                submittedAnswer: submittedAnswer.toLowerCase(),
                isHintUsed,
                gameDuration
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to submit gameplay: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Submit gameplay error:', error);
        throw error;
    }
}
export async function getUserProfile(msisdn: string, token: string): Promise<any> {
    const url = `https://ydvassdp.com:2001/api/FastestFingers/Profile/GetUserProfile?msisdn=${msisdn}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user profile: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

// Function to save user profile
export async function saveUserProfile(profile: UserProfile, token: string): Promise<any> {
    const url = `https://ydvassdp.com:2001/api/FastestFingers/Profile/SaveUserProfile`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profile)
        });

        if (!response.ok) {
            throw new Error(`Failed to save user profile: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error saving user profile:', error);
        throw error;
    }
}

