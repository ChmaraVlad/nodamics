import {io, Socket} from "socket.io-client";
import {CONFIG} from "../config";
import Session from "supertokens-auth-react/recipe/session";

const socketNamespaces: Map<string, Socket> = new Map<string, Socket>();

export async function getSocketAsync({
                                         namespace = '',
                                     }) {
    const token = await Session.getAccessToken();
    if (token === undefined) {
        throw new Error("User is not logged in");
    }
    const foundSocket = socketNamespaces.get(namespace);
    if (!foundSocket) {
        const socket = io(`${CONFIG.API_URL}${namespace}`, {
            path: '/socket',
            withCredentials: true,
            query: {token},
        });
        socketNamespaces.set(namespace, socket);
        return socket
    }

    return foundSocket
}

