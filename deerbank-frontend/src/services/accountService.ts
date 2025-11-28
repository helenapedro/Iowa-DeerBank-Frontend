import type {
  Account,
  ApiResponse,
  CreateAccountRequest,
} from "../types/account";

const BASE_URL = "http://localhost:8080/api/accounts";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  return res.json();
}

export async function createAccount(
  payload: CreateAccountRequest
): Promise<ApiResponse<Account>> {
  const res = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<ApiResponse<Account>>(res);
}

export async function getAccountById(
  id: number
): Promise<ApiResponse<Account>> {
  const res = await fetch(`${BASE_URL}/${id}`);
  return handleResponse<ApiResponse<Account>>(res);
}

export async function getAllAccounts(): Promise<ApiResponse<Account[]>> {
  const res = await fetch(`${BASE_URL}`);
  return handleResponse<ApiResponse<Account[]>>(res);
}
