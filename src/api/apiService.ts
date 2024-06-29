//apiService.ts
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
        return null;
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
        return null;
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
        return null;
    }
}