import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import axios from 'axios';

let nombre = false;
let documento = false;
let problema = false;
let telefono = false;

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hola! ¿En qué podemos ayudarte?', sender: "cliente" },
  ]);
  const [showOptions, setShowOptions] = useState(true);
  const { register, handleSubmit, reset, setValue } = useForm();

  const options = [
    "Peticiones",
    "Quejas",
    "Reclamos",
    "Sugerencias",
  ];

  const getAutoReply = (message) => {
    const lowerCaseMessage = message.toLowerCase();
    if (!nombre) {
      nombre = true;
      return "¿Cuál es tu nombre?";
    }
    if (!documento) {
      documento = true;
      return "¿Cuál es tu número de documento sin puntos ni espacios?";
    }
    if (!problema) {
      problema = true;
      return "Por favor, describe tu problema o consulta.";
    }
    if (!telefono) {
      telefono = true;
      return "Danos por favor un número de teléfono de contacto.";
    }
    if (telefono === true) {
      return "Gracias por la información. Pronto te contactaremos para brindarte ayuda.";
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const { text } = data;
    if (text.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: text,
      sender: "yo",
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    reset();
    setShowOptions(false); 

    try {
      const response = await axios.post("http://localhost:3000/api/chatbot", { text, sender: 'yo', user_id: 1 });
      console.log("Server response:", response.data);

      setTimeout(() => {
        const botReply = {
          id: messages.length + 2,
          text: getAutoReply(text),
          sender: "cliente",
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1500);

    } catch (error) {
      console.error("Error sending message:", error);
    }
  });

  const handleOptionClick = (option) => {
    setValue("text", option);
    onSubmit();
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center justify-between bg-green-600 p-4 text-white shadow-md">
        <h1 className="text-lg font-bold">Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id} className={`my-2 ${message.sender === 'yo' ? 'flex justify-end' : 'flex justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs ${message.sender === 'yo' ? 'bg-green-600 text-white' : 'bg-gray-200 text-black'}`}>
              {message.text}
            </div>
          </div>
        ))}
        
        {showOptions && (
          <div className="flex flex-col items-start mt-4">
            {options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionClick(option)}
                className="mb-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-200">
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex items-center p-2 border-t border-gray-300 bg-white shadow-md">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          {...register('text')}
          className="flex-1 p-2 border border-green-500 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
        />
        <button type="submit" className="ml-2 p-2 bg-green-600 text-white rounded-lg flex items-center hover:bg-green-500 transition duration-200">
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatBot;
