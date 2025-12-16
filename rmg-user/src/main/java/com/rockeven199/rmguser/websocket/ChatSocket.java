package com.rockeven199.rmguser.websocket;

import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@ServerEndpoint("/chat/{UserID}")
@Component
public class ChatSocket {
    private static final CopyOnWriteArrayList<ChatSocket> webSockets = new CopyOnWriteArrayList<>();
    private static final ConcurrentHashMap<Session, String> sessionPool = new ConcurrentHashMap<>();
    private String UserID;
    private Session session;

    @OnOpen
    public void onOpen(Session session, @PathParam("UserID") String UserID) throws IOException {
        this.session = session;
        this.UserID = UserID;
        webSockets.add(this);
        this.sessionPool.put(session, UserID);

        ArrayList<String> sessionList = new ArrayList<String>();
        for (Session session1 : sessionPool.keySet()) {
            sessionList.add(session1.getId());
        }
    }

    @OnMessage
    public void onMessage(String message, Session currentSession) {
        // 广播消息给所有在线用户（除了发送者自己）
        for (Session session : sessionPool.keySet()) {
            try {
                // 排除当前发送消息的会话
                if (!currentSession.equals(session) && session.isOpen()) {
                    session.getBasicRemote().sendText(message);
                }
            } catch (IOException e) {
                log.error("消息发送失败", e);
            }
        }
    }

    @OnClose
    public void onClose(Session session) throws IOException {
        this.session.close();
        sessionPool.remove(session);
    }
}