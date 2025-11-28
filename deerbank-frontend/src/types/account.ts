export type AccountType = "SAVINGS" | "CHECKING";

export type AccountStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface Account {
  accountId: number;
  accountNo: string;
  accountType: AccountType;
  balance: number;
  status: AccountStatus;
  openedDate: string;
  interestRate: number;
  overdraftLimit: number;
  userId: number;
}

export interface CreateAccountRequest {
  accountType: AccountType;
  initialBalance: number;
  userId: number;
  credentialsId: number;
  interestRate: number;
  overdraftLimit: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
