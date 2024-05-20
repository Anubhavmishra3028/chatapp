// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const firestore = getFirestore();
    if (recipient) {
      const chatId = user.uid < recipient ? `${user.uid}_${recipient}` : `${recipient}_${user.uid}`;
      const messagesRef = collection(firestore, 'chats', chatId, 'messages');
      const q = query(messagesRef, orderBy('createdAt'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [recipient, user.uid]);

  const handleSend = async (e) => {
    e.preventDefault();
    const firestore = getFirestore();
    const chatId = user.uid < recipient ? `${user.uid}_${recipient}` : `${recipient}_${user.uid}`;
    const messagesRef = collection(firestore, 'chats', chatId, 'messages');
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      uid: user.uid,
      displayName: user.displayName
    });
    setNewMessage('');
  };

  return (
    <div>
      <input 
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient UID"
      />
      <div>
        {messages.map(({ id, text, displayName }) => (
          <div key={id}>
            <strong>{displayName}</strong>: {text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
