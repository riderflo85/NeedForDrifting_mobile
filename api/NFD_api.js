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

export function getTracks(url, username, token) {
    const newUrl = `${url}/api/v1/get_tracks?username=${username}&api=${token}`;

    return fetch(newUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function changeTrack(url, username, token, idServer,idTrack, configTrack, maxClients) {
    const newUrl = `${url}/api/v1/change_track?username${username}&api=${token}&server_id=${idServer}&track_id=${idTrack}&config_track=${configTrack}&max_clients=${maxClients}`;

    return fetch(newUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error))
}

export function runCommand(url, username, token, idServer, cmd) {
    const newUrl = `${url}/api/v1/run_command?username=${username}&api=${token}&server_id=${idServer}&server_cmd=${cmd}`;

    return fetch(newUrl)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}