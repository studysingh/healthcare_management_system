import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response?.data?.message || "Error fetching messages");
      }
    };
    fetchMessages();
  }, []);

  const handleReply = async (id) => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }

    try {
      // Example API endpoint (you need to make it in your backend)
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/message/reply/${id}`,
        { reply: replyText },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      toast.success(data.message);
      setReplyText("");
      setReplyingTo(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reply");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGES</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>

                {/* Reply Section */}
                <div className="reply-section">
                  {replyingTo === element._id ? (
                    <>
                      <textarea
                        rows="3"
                        placeholder="Type your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="reply-actions">
                        <button
                          className="btn send"
                          onClick={() => handleReply(element._id)}
                        >
                          Send
                        </button>
                        <button
                          className="btn cancel"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyText("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <button
                      className="btn reply"
                      onClick={() => setReplyingTo(element._id)}
                    >
                      Reply
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
