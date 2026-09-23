import { useEffect, useRef, useState } from "react";
import "./App.css";

const modes = [
  {
    id: "angry",
    name: "Angry Teacher",
    icon: "😡",
  },
  {
    id: "depressed",
    name: "Depressed Teacher",
    icon: "😞",
  },
  {
    id: "happy",
    name: "Happy Teacher",
    icon: "😄",
  },
  {
    id: "sad",
    name: "Sad Teacher",
    icon: "😔",
  },
];


const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function App() {

  const [mode, setMode] = useState("happy");

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);


  // -----------------------------------------------
  // Auto scroll
  // -----------------------------------------------

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);


  // -----------------------------------------------
  // Change teacher
  // -----------------------------------------------

  const changeMode = (newMode) => {

    setMode(newMode);

    setMessages([]);

  };


  // -----------------------------------------------
  // Send message
  // -----------------------------------------------

  const sendMessage = async () => {

    if (!message.trim() || loading) {
      return;
    }


    const userMessage = message.trim();


    // Add user message immediately

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);


    setMessage("");

    setLoading(true);


    try {

      const response = await fetch(
        `${API_BASE_URL}/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: userMessage,
            mode: mode,
          }),
        }
      );


      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }


      const data = await response.json();


      // Add AI response

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: data.response,
        },
      ]);

    } catch (error) {

      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Unable to connect to the AI server.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };


  // -----------------------------------------------
  // Enter key
  // -----------------------------------------------

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();

    }
  };


  const selectedMode = modes.find(
    (item) => item.id === mode
  );


  return (

    <div className="app">

      {/* Background */}

      <div className="background">

        <div className="glow glow-one"></div>

        <div className="glow glow-two"></div>

      </div>


      {/* Main Chat */}

      <div className="chat-container">


        {/* ----------------------------------------
            Header
        ----------------------------------------- */}

        <header className="header">

          <div className="brand">

            <div className="brand-icon">
              ✦
            </div>

            <div>

              <h1>
                Teacher AI
              </h1>

              <div className="status">

                <span></span>

                Online

              </div>

            </div>

          </div>


          {/* Current teacher */}

          <div className="current-mode">

            <span>
              {selectedMode.icon}
            </span>

            {selectedMode.name}

          </div>

        </header>


        {/* ----------------------------------------
            Teacher Selector
        ----------------------------------------- */}

        <div className="mode-selector">

          <p>
            Choose your teacher
          </p>


          <div className="mode-list">

            {modes.map((item) => (

              <button
                key={item.id}
                className={
                  mode === item.id
                    ? "mode active"
                    : "mode"
                }
                onClick={() =>
                  changeMode(item.id)
                }
              >

                <span className="mode-icon">
                  {item.icon}
                </span>

                <span>
                  {item.name}
                </span>

              </button>

            ))}

          </div>

        </div>


        {/* ----------------------------------------
            Messages
        ----------------------------------------- */}

        <main className="messages">


          {messages.length === 0 && (

            <div className="welcome">

              <div className="welcome-icon">
                {selectedMode.icon}
              </div>

              <h2>
                {selectedMode.name}
              </h2>

              <p>
                Choose your teacher and start
                a conversation.
              </p>

            </div>

          )}


          {messages.map((msg, index) => (

            <div
              key={index}
              className={
                `message-row ${msg.role}`
              }
            >

              <div className="avatar">

                {msg.role === "user"
                  ? "You"
                  : selectedMode.icon}

              </div>


              <div className="bubble">

                {msg.content}

              </div>

            </div>

          ))}


          {/* Typing */}

          {loading && (

            <div className="message-row bot">

              <div className="avatar">

                {selectedMode.icon}

              </div>

              <div className="bubble typing">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          )}


          <div ref={messagesEndRef}></div>

        </main>


        {/* ----------------------------------------
            Input
        ----------------------------------------- */}

        <footer className="input-area">

          <div className="input-box">

            <textarea
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={handleKeyDown}
              placeholder={
                `Message ${selectedMode.name}...`
              }
              rows={1}
            />


            <button
              className={
                message.trim() && !loading
                  ? "send active"
                  : "send"
              }
              onClick={sendMessage}
              disabled={
                !message.trim() ||
                loading
              }
            >
              ↑
            </button>

          </div>


          <div className="disclaimer">

            AI can make mistakes. Verify important information.

          </div>

        </footer>

      </div>

    </div>
  );
}

export default App;