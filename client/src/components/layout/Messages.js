import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import MessageItem from "./MessageItem";

const Messages = () => {
  const [messages, setMessages] = useState(null);

  const getMessages = async () => {
    const msg = await axios.get("/api/messages");

    setMessages(msg.data);
  };

  const onDelete = async (id) => {
    const deleteMsg = await axios.delete(`/api/messages/${id}`);
    console.log(deleteMsg.data);
    setMessages(messages.filter((message) => message._id !== id));
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div style={{ padding: "25px 30px", width: "100%", margin: "0 auto" }}>
      {messages !== null ? (
        <div>
          <div>
            <h1>Messages</h1>
            {messages.map((message) => (
              <MessageItem
                key={message._id}
                message={message}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>loading..</div>
      )}
    </div>
  );
};

export default Messages;
