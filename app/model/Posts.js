import { getSessionToken } from "/app/model/Session.js";
import { ajaxRequest } from "/app/model/Utils.js";

let observers = {}

function notify() {
    for (const [observer, callback] of Object.entries(observers)) {
        callback()
    }
}

export function observePosts(object, callback) {
    observers[object] = callback;
}

export function stopObservePosts(object) {
    delete observers[object]
}

export function createTextPost(content, onSuccess, onFailure) {
    content = content.trim()

    if (content == '') {
        return onFailure("Vous ne pouvez pas publier de post vide");
    }

    ajaxRequest(
        "create-post",
        {
            sessionToken: getSessionToken(),
            postType: "text",
            postContent: newPost.value
        },
        respond => {
            if (respond.success) {
                onSuccess();
                notify();
            } else {
                onFailure(respond.message)
            }
        });
}
