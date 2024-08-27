import { Prize, PrizeResponse, UserProfile } from "../types";

const API_BASE_URL_2002 = "https://ydvassdp.com:2002";
const API_BASE_URL_6002 = "https://ydvassdp.com:6002";

// error handler
const handleError = (error: any) => {
    if (error.message.includes('No Active Subscription')) {
        return "Hello, You are currently not subscribed to Fastest Finger.";
    } else if (error instanceof TypeError &&
               (error.message === "Failed to fetch" || error.message.toLowerCase().includes("load fail"))) {
        return "We're having trouble connecting to our servers. Please check your internet connection or try again later.";
    } else {
        return error.message;
    }
}
async function apiRequest<T>(
  baseUrl: string,
  endpoint: string,
  method: 'GET' | 'POST',
  token: string | null = null,
  body: any = null
): Promise<T> {
  const url = `${baseUrl}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(handleError(error));
  }
}



// Login User
export async function loginUser(username: string, password: string): Promise<string | null> {
  return apiRequest<{ jwtToken: string }>(
    API_BASE_URL_2002,
    '/api/FastestFingers/Authorization/Login',
    'POST',
    null,
    { username, password }
  ).then(data => data.jwtToken);
}

// Fetch Game Questions
export async function fetchGameQuestions(count: number, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_2002,
    `/api/FastestFingers/GamePlay/GetGameQuestions?count=${count}`,
    'GET',
    token
  );
}

// Submit Game Play
export async function submitGamePlay(
  msisdn: string,
  questionId: number,
  submittedAnswer: string,
  isHintUsed: boolean,
  gameDuration: number,
  token: string
): Promise<{ statusCode: string; statusMessage: string; message: string; } | null> {
  return apiRequest<{ statusCode: string; statusMessage: string; message: string; }>(
    API_BASE_URL_2002,
    '/api/FastestFingers/GamePlay/SubmitGamePlay',
    'POST',
    token,
    {
      msisdn,
      questionId,
      submittedAnswer: submittedAnswer.toLowerCase(),
      isHintUsed,
      gameDuration
    }
  );
}

// Get User Profile
export async function getUserProfile(msisdn: string, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_2002,
    `/api/FastestFingers/Profile/GetUserProfile?msisdn=${msisdn}`,
    'GET',
    token
  );
}

// Save User Profile
export async function saveUserProfile(profile: UserProfile, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_2002,
    '/api/FastestFingers/Profile/SaveUserProfile',
    'POST',
    token,
    profile
  );
}

// Fetch Leaderboard
export async function fetchLeaderboard(msisdn: string, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_2002,
    `/api/FastestFingers/Leaderboard/GetLeaderboardWithSubscriber?msisdn=${msisdn}`,
    'GET',
    token
  );
}

// Check Subscription Status (using a different base URL)
export async function checkSubscriptionStatus(msisdn: string, productId: number): Promise<{ statusCode: string; message: string; }> {
  return apiRequest<{ statusCode: string; message: string; }>(
    API_BASE_URL_6002,
    `/api/DataSync/Subscription/CheckSubscriptionStatus?msisdn=${msisdn}&productId=${productId}`,
    'GET'
  ).catch(error => {
    throw new Error(handleError(error));
  });
}

// Fetch Prizes by Country
export async function fetchPrizesByCountry(countryAlpha2Code: string): Promise<Prize[]> {
  return apiRequest<PrizeResponse>(
    API_BASE_URL_2002,
    `/api/Prize/GetPrizes?countryAlpha2Code=${countryAlpha2Code}`,
    'GET'
  ).then(data => data.data || []);
}
