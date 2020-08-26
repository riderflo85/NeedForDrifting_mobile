export function authenticateUser(url, username, pwd, token) {
    const newUrl = `${url}/api/v1/check_login?username=${username}&pwd=${pwd}&api=${token}`;

    return fetch(newUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getAllServers(url, username, token) {
    const newUrl = `${url}/api/v1/get_servers?username=${username}&api=${token}`;

    return fetch(newUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}