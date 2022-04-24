import axios from "axios";

export interface githubSignIn {
  code: string
}

export async function signInGitHub(code: string) {

  const config = {
    "headers": {
      "Accept": "application/json"
    }
  }

  const params = new URLSearchParams({
    client_id: "941b0093a2cb7c9a9182",
    client_secret: process.env.CLIENT_SECRET,
    code: code,
  });

  const URL = "https://github.com/login/oauth/access_token?" + params.toString()

  const data = await axios.post(URL, null, config)

  return data.data

}

export async function getGitHubData(token: string, tokenType: string) {

  const URL = "https://api.github.com/user"

  const config = {
    "headers": {
      "Authorization": `${tokenType} ${token}`
    }
  }

  const data = await axios.get(URL, config)

  return data.data

}