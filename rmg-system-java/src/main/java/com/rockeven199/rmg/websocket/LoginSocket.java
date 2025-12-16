package com.rockeven199.rmg.websocket;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;

@ServerEndpoint("/websocket")
@Component
public class LoginSocket {
    //    存放多个webSocket
    private static final CopyOnWriteArrayList<Session> webSocketSet = new CopyOnWriteArrayList<>();

    //    当前会话
    private static Session runingSession;

    @OnOpen
    public void onOpen(Session session) throws IOException {
        webSocketSet.add(session);
        runingSession = session;
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        webSocketSet.remove(session);
    }

    public void sendMessage(String message, String QRSessionID) throws IOException {
        for (Session a : webSocketSet) {
            if (a.getId().equals(QRSessionID)) {
                a.getBasicRemote().sendText(message);
            }
        }
    }

    public Session getRunningSession() {
        return runingSession;
    }
}