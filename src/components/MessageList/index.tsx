import styles from "./styles.module.scss";
import { api } from "../../services/api";

import LogoImg from "../../assets/logo.svg";
import { useEffect, useState } from "react";

interface MessageProps {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

export function MessageList() {
  const [messages, setMessages] = useState<MessageProps[]>([]);

  useEffect(() => {
    api.get<MessageProps[]>("messages/last3").then((response) => {
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={LogoImg} alt="" />

      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}