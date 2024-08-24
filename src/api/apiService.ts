import { Prize, PrizeResponse, UserProfile } from "../types";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const baseUrl = "http://ydvassdp.com:2002"

const handleError = (error: any) => {
    if (error.message.includes('No active Subscription')) {
        return "Hello, You are currently not subscribed to Fastest Finger.";
    } else if (error instanceof TypeError &&
               (error.message === "Failed to fetch" || error.message.toLowerCase().includes("load fail"))) {
        return "We're having trouble connecting to our servers. Please check your internet connection or try again later.";
    } else {
        return error.message;
    }
}

// Function to login and fetch token
export async function loginUser(username: string, password: string): Promise<string | null> {
    const url = `${baseUrl}/api/FastestFingers/Authorization/Login`;

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
        // console.log('Login response data:', data);
        return data.jwtToken;
    } catch (error) {
        console.error('Login error:', error);
        if (error instanceof TypeError &&
            (error.message === "Failed to fetch" || error.message.toLowerCase().includes("load fail"))) {
            throw new Error("We're having trouble connecting to our servers. Please try again later.");
        }
        throw error;
    }
}
// Function to fetch game questions
export async function fetchGameQuestions(count: number, token: string): Promise<any> {
    const url = `${baseUrl}/api/FastestFingers/GamePlay/GetGameQuestions?count=${count}`;

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
    const url = `${baseUrl}/api/FastestFingers/GamePlay/SubmitGamePlay`;

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
    const url = `${baseUrl}/api/FastestFingers/Profile/GetUserProfile?msisdn=${msisdn}`;

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
    const url = `${baseUrl}/api/FastestFingers/Profile/SaveUserProfile`;

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

export async function fetchLeaderboard(msisdn: string, token: string): Promise<any> {
    const url = `${baseUrl}/api/FastestFingers/Leaderboard/GetLeaderboardWithSubscriber?msisdn=${msisdn}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch leaderboard: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
}

// Function to check subscription status
export async function checkSubscriptionStatus(msisdn: string, productId: number): Promise<{ statusCode: string; message: string; }> {
    const url = `http://ydvassdp.com:6002/api/DataSync/Subscription/CheckSubscriptionStatus?msisdn=${msisdn}&productId=${productId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'accept': 'application/json' }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || `Failed to check subscription status: ${response.status} ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Error checking subscription status:', (error as Error).message);
        throw new Error(handleError(error));
    }
}

// Function to fetch prizes based on country alpha2 code
export async function fetchPrizesByCountry(countryAlpha2Code: string): Promise<Prize[]> {
    const url = `${baseUrl}/api/Prize/GetPrizes?countryAlpha2Code=${countryAlpha2Code}`;
    
    // console.log('Fetching URL:', url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
            },
        });
        const data = await response.json() as PrizeResponse;

        if (!response.ok) {
            throw new Error(`Failed to fetch prizes: ${response.status} ${response.statusText}`);
        }

        // console.log('Fetched Data:', data);
        return data.data || [];
    } catch (error) {
        console.error('Error fetching prizes:', error);

        if (error instanceof TypeError &&
            (error.message === "Failed to fetch" || error.message.toLowerCase().includes("load fail"))) {
            throw new Error("Failed to fetch prizes: Please try refreshing the page or check back later.");
        }
        throw error;


    }
}