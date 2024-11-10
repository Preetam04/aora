export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.preetam.aora",
  projectId: "6730332d002c6a48f824",
  databaseId: "67303490001f18c1f8c0",
  userCollectionId: "673034a90031e0ea6442",
  videoCollectionId: "673034d100175bb40dec",
  storageId: "673036520038595aa425",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    const avatarURL = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      { accountId: newAccount.$id, email, username, avatar: avatarURL }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error?.message || "Something went wrong");
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error?.message || "Error Signing In");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    // console.log(currentAccount);

    if (!currentAccount) {
      throw Error;
    }

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    // console.log(currentUser);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId);

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error?.message || "Something went wrong");
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt"),
      Query.limit(7),
    ]);

    return posts.documents;
  } catch (error) {
    throw new Error(error.message || "Something wenr wrong latestposts");
  }
};
