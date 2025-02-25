import React from 'react';

function Chat2({ message }) {
  return (
    <div className="flex justify-end">
    <div className="max-w-[50%] w-auto px-3 py-2 bg-blue-400 rounded-b-2xl rounded-tl-2xl break-words whitespace-pre-wrap">
      {message}
    </div>
    </div>
  );
}

export default Chat2;