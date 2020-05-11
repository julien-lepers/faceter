import Cookies from '/lib/js-cookie.js'
import { route } from '/lib/preact-router.js'

let sessionId = undefined;

function setSessionId(id) {
    sessionId = id;
    if (id == undefined || id == -1) {
        Cookies.remove('sessionId')
    } else {
        Cookies.set('sessionId', id)
    }
}

export function getSessionId() {
    if (sessionId == undefined) {
        sessionId = Cookies.get('sessionId');

        if (sessionId == undefined) {
            sessionId = -1;
        }
    }

    return sessionId;
}

export function isLoggedIn() {
    return sessionId != undefined && sessionId != -1;
}

export function login(username, password, onSuccess, onFailure) {
    console.log(`Login with: ${username}`)

    fetch(`/api/query-login.php?username=${username}&password=${password}`)
        .then(function (response) {
            return response.json()
        })
        .then(login => {
            if (login.success) {
                console.log('Login succeeded!')
                setSessionId(login.userId);
                onSuccess();
            }
            else {
                console.log(`Login Failed: ${login.message}!`)
                onFailure(login.message)
            }
        })
}

export function logoff() {
    if (isLoggedIn()) {
        setSessionId(undefined);
        route('/');
    }
}
