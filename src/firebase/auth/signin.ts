import {
  GoogleAuthProvider,
  User,
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import app from "../config";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

type UserToken = User & {
  accessToken: string;
};

async function signInGoogle(): Promise<UserToken> {
  let user = {} as User;
  let token = "";

  try {
    const result = await signInWithPopup(auth, provider);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    token = credentials?.accessToken || "";
    user = result.user;
  } catch (error) {
    console.log(error);
  }

  console.log(user, token);

  return {
    ...user,
    accessToken: token,
  };
}

async function signInPasswordless(email: string): Promise<void> {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: "http://localhost:3000/verify",
      handleCodeInApp: true,
    });
  } catch (error) {
    console.error(error);
  }
}

async function signInPasswordlessConfirm(
  email: string,
  href: string
): Promise<UserToken> {
  let user = {} as User;
  let token = "";
  console.log(email, href);
  try {
    const result = await signInWithEmailLink(auth, email, href);
    const credentials = GoogleAuthProvider.credentialFromResult(result);
    token = credentials?.accessToken || "";
    user = result.user;
  } catch (error) {
    console.error(error);
  }

  return {
    ...user,
    accessToken: token,
  };
}

export { signInGoogle, signInPasswordless, signInPasswordlessConfirm };
