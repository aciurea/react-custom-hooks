export interface App {
  userInfo: UserInfo,
  isLoggedIn: boolean
}

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  datePolicyAccepted: Date | undefined;
  lang: string;
  refreshToken: string | undefined;
  token: string | undefined;
}