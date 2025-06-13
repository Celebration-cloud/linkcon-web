/* eslint-disable prettier/prettier */
import { Client, Databases, Account, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // e.g. 'https://cloud.appwrite.io/v1'
  .setProject(process.env.APPWRITE_PROJECT_ID); // Your project ID

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account, ID };
