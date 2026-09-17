import './App.css'
import React, { useState } from 'react'
import { IoCodeSlashSharp } from "react-icons/io5";
import { BiPlanet } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { IoSend } from "react-icons/io5";
import { GoogleGenAI } from "@google/genai";



const App = () => {
  const [message, setMessage] = useState("");
  const [isResponseScreen, setIsResponseScreen] = useState(false);
  const [messages, setMessages] = useState([]);
  // let allMessages = [];

  const hitRequest = () => {
    if (message.trim()) {
      genrateResponse(message)

    } else {
      alert("You must write something...!")
    }
  }


  const genrateResponse = async (msg) => {
  try {
    const genAI = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    const result = await genAI.models.generateContent({
      model: "gemini-3.6-flash",
      contents: msg,
    });

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "userMsg",
        text: msg,
      },
      {
        type: "responseMsg",
        text: result.text,
      },
    ]);

    setIsResponseScreen(true);
    setMessage("");

  } catch (error) {
    console.error("Gemini Error:", error);
  }
};


  const newChat = () => {
    setIsResponseScreen(false);
    setMessages([]);
  }

  return (
    <>
      <div className=" w-screen min-h-screen overflow-x-hidden bg-[#0E0E0E] text-white">

        {
          isResponseScreen ?
            <div className="h-[80vh] ">
              <div className="header pt-[25px] flex items-center justify-between w-[100vw] px-[300px]">
                <h2 className='text-2xl'>AssistMe</h2>
                <button id='newChatBtn' className='bg-[#181818] cursor-pointer p-2.5 rounded-[30px] text-sm px-5 ' onClick={newChat} >New chat</button>
              </div>
              <div className="messages">
                {
                  messages.map((msg, index) => {
                    return (
                      <div key={index} className={msg.type}>
                        {msg.text}</div>
                    )
                  })
                }
                {/* <div className="userMsg">You : What is the HTML stand for</div>
                <div className="responseMsg">HTML stand for Hyper Text Markup Language</div> */}
              </div>
            </div> :
            <div className="middle h-[80vh] flex items-center flex-col justify-center">
              <h1 className="text-4xl">AssistMe</h1>
              <div className="boxes mt-7 flex items-center gap-2">

                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-5 relative min-h-[20vh] bg-[#181818] p-2.5 flex flex-col justify-between">
                  <p>what is coading? <br />
                    How we can learn it.</p>
                  <i className='flex justify-end'><IoCodeSlashSharp /></i>
                </div>
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-5 relative min-h-[20vh] bg-[#181818] p-2.5 flex flex-col justify-between">
                  <p>Which is the red <br /> planet of solar <br />system</p>
                  <i className='flex justify-end'><BiPlanet /></i>
                </div>
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-5 relative min-h-[20vh] bg-[#181818] p-2.5 flex flex-col justify-between">
                  <p>In which year python <br /> was invented ?</p>
                  <i className='flex justify-end'><FaPython /></i>
                </div>
                <div className="card rounded-lg cursor-pointer transition-all hover:bg-[#201f1f] px-5 relative min-h-[20vh] bg-[#181818] p-2.5 flex flex-col justify-between">
                  <p>How we can use <br /> the AI for Adopt?</p>
                  <i className='flex justify-end'><TbMessageChatbot /></i>
                </div>

              </div>
            </div>
        }


        <div className="bottom w-full flex flex-col items-center">
          <div className="inputBox w-[60%] text-[15px] py-1.5 flex items-center bg-[#181818] rounded-[30px]">
            <input value={message} onChange={(e) => { setMessage(e.target.value) }} className="p-2.5 pl-4 bg-transparent flex-1 outline-none border-none" type="text" placeholder='Write your message here...' id='messageBox' />
            {
              message == "" ? "" : <i className="text-green-500 text-[25px]  cursor-pointer pr-4" onClick={hitRequest} ><IoSend /></i>
            }
          </div>
          <p className="text-[gray] text-[14px] my-4">AssistMe is developed by Mo. Mahdi Farooqui. this AI use the gemini API for giving the response</p>
        </div>

      </div>
    </>
  )
}

export default App


