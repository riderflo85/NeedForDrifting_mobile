export function authenticateUser(username, pwd, token) {
    const url = `http://192.168.1.19:8000/api/v1/check_login?username=${username}&pwd=${pwd}&api=${token}`;

    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function getAllServers(username, token) {
    const url = `http://192.168.1.19:8000/api/v1/get_servers?username=${username}&api=${token}`;

    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}