// import { Prize, PrizeResponse, UserProfile } from "../types";
import {  UserProfile } from "../types";


// const API_BASE_URL_2001 = "https://ydvassdp.com:2001";
// const API_BASE_URL_6001 = "https://ydvassdp.com:6001";
const API_BASE_URL_69 = "http://69.197.174.10:8093"; 
// const API_BASE_URL_69 = "/another-api";
const API_BASE_URL_fastestfingers = "https://fastestfingers.runasp.net";


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
// export async function loginUser(username: string, password: string): Promise<string | null> {
//   return apiRequest<{ jwtToken: string }>(
//     API_BASE_URL_2001,
//     '/api/FastestFingers/Authorization/Login',
//     'POST',
//     null,
//     { username, password }
//   ).then(data => data.jwtToken);
// }


export async function loginUser(username: string, password: string): Promise<string | null> {
  // console.log("Calling login API...");
  return apiRequest<{data: { jwtToken: string }}>(
    API_BASE_URL_fastestfingers,
    '/api/FastestFingers/Authorization/Login',
    'POST',
    null,
    { username, password }
  )
  // .then(data => data.jwtToken);
  .then(response => {
    // console.log("Login API Response:", response);
    // return data.jwtToken;
    if (!response?.data?.jwtToken) {
      console.error("JWT token missing in response:", response);
      return null;
  }
  return response.data.jwtToken; 
})
.catch(error => {
  console.error("Login API Error:", error);
  return null;
});
}

// Fetch Game Questions
export async function fetchGameQuestions(count: number, msisdn:string, token: string): Promise<any> {
  return apiRequest<any>(

    API_BASE_URL_fastestfingers,
    `/api/FastestFingers/GamePlay/GetGameQuestions?count=${count}&msisdn=${msisdn}`,
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
  ): Promise<{ isSuccessful: boolean; message: string; data?: any } | null> {
    return apiRequest<{ isSuccessful: boolean; message: string; data?: any }>(
      API_BASE_URL_fastestfingers,
    '/api/FastestFingers/GamePlay/SubmitGamePlay',
    'POST',
    token,
    {
      msisdn,
      questionId,
      submittedAnswer: submittedAnswer.toLowerCase(),
      isHintUsed,
      gameDuration,
      transactionId: crypto.randomUUID() 
    }
  );
}


// Get User Profile
export async function getUserProfile(msisdn: string, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_fastestfingers,
    `/api/FastestFingers/Profile/GetUserProfile?msisdn=${msisdn}`,
    'GET',
    token
  );
}

// Save User Profile
export async function saveUserProfile(profile: UserProfile, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_fastestfingers,
    '/api/FastestFingers/Profile/SaveUserProfile',
    'POST',
    token,
    profile
  );
}

// Fetch Leaderboard
export async function fetchLeaderboard(msisdn: string, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_fastestfingers,
    `/api/FastestFingers/Leaderboard/GetLeaderboardWithSubscriber?msisdn=${msisdn}`,
    'GET',
    token
  );
}
// update Leaderboard
export async function updateLeaderboard(msisdn: string, gameScore: number, token: string): Promise<any> {
  return apiRequest<any>(
    API_BASE_URL_fastestfingers,
    `/api/FastestFingers/Leaderboard/UpdateLeaderboardScore`,
    'POST',
    token,
    {
      msisdn,
      gameScore
    },
  );
}

// Check Subscription Status (using a different base URL)
// export async function checkSubscriptionStatus(msisdn: string, serviceId: number): Promise<{ statusCode: string; message: string; }> {
//   export async function checkSubscriptionStatus(msisdn: string): Promise<{ statusCode: string; message: string; }> {

//   return apiRequest<{ statusCode: string; message: string; }>(
//     API_BASE_URL_69,
//     // `/api/DataSync/Subscription/CheckSubscriptionStatus?msisdn=${msisdn}&serviceId=${serviceId}`,
//     `/api/DataSync/CheckActiveSubscription?msisdn=${msisdn}`,
//     'GET'
//   ).catch(error => {
//     throw new Error(handleError(error));
//   });
// }

export async function checkSubscriptionStatus(msisdn: string): Promise<{ isSuccessful: boolean; message: string; data: { isActive: boolean } }> {
  return apiRequest<{ isSuccessful: boolean; message: string; data: { isActive: boolean } }>(
    API_BASE_URL_69,
    `/api/DataSync/CheckActiveSubscription?msisdn=${msisdn}`,
    'GET'
  ).catch(error => {
    throw new Error(handleError(error));
  });
}

// export async function checkSubscriptionStatus(msisdn: string): Promise<{ isSuccessful: boolean; message: string; data: { isActive: boolean } }> {
//   try {
//       const response = await apiRequest<{ isSuccessful: boolean; message: string; data: { isActive: boolean } }>(
//         API_BASE_URL_69,
//           `/api/DataSync/CheckActiveSubscription?msisdn=${msisdn}`,
//           'GET'
//       );

//       return response;
//   } catch (error) {
//       console.error("Subscription API Error:", error);
//       throw new Error(handleError(error));
//   }
// }





// Fetch Prizes by Country
// export async function fetchPrizesByCountry(countryAlpha2Code: string): Promise<Prize[]> {
//   return apiRequest<PrizeResponse>(
//     API_BASE_URL_2001,
//     `/api/Prize/GetPrizes?countryAlpha2Code=${countryAlpha2Code}`,
//     'GET'
//   ).then(data => data.data || []);
// }






