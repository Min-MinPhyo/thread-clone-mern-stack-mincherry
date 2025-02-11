import { Flex, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { conversationsAtom, selectedConversationAtom } from "../atoms/messagesAtom";
import useShowToast from "../hooks/useShowToast";
const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const setConversations=useRecoilValue(selectedConversationAtom)
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageText) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      setMessageText("");
      setMessages((messages) => [...messages, data]);

      setConversations(prevConvs =>{
        const updatedConversation=prevConvs.map(conversation =>{
          if(conversation._id === selectedConversation._id){
            return {
              ...conversation,
              lastMessage:{
                text:messageText,
                sender:data.sender
              }

            
            }

          }
          return conversation
        })

        return updatedConversation

      })

      setMessageText("")



      











    } catch (error) {
      showToast("Error", error.messsage, "erro");
    }
  };

  return (
    <form>
      <InputGroup>
        <Input
          w={"full"}
          placeholder="Type a message"
          onChange={(e) => setMessageText(e.target.value)}
          value={messageText}
        />

        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
          <IoSendSharp color="gray.500" />
        </InputRightElement>
      </InputGroup>
    </form>
  );
};

export default MessageInput;
