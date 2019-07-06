import React, { useState, useEffect } from 'react';
import State from 'components/State';
import AppHead from 'components/AppHead';
import Fetch from '@/utils/fetch';

const List = ({ data }) => {
  if (Array.isArray(data) && data.length) {
    return (
      <ul className="msg-list">
        {data.map(msg => {
          return (
            <li key={msg.id}>
              <p>{msg.title}</p>
              <p>{msg.content}</p>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <></>;
  }
};

const Messages = () => {
  const [msgs, setMsgs] = useState([]);

  function allRead() {}

  function setRead(id) {
    const msg = msgs.find(msg => msg.id === id && !msg.read);
    msg.read = true;
    setMsgs(msgs);
  }

  useEffect(() => {
    async function getData() {
      const url =
        'https://www.easy-mock.com/mock/5c878df273929c5b2c60a5e9/example/messages';

      const data = await Fetch.get(url, '');
      setMsgs(data);
    }
    getData();
    return () => {};
  }, []);

  return (
    <div>
      <AppHead
        title="消息"
        rightText="全部已读"
        showBack={true}
        rightClick={allRead}
      />
      <div className="container full-height">
        {!msgs.length && <State type="NO_MESSAGES" />}
        <List data={msgs} />
      </div>
    </div>
  );
};

export default Messages;
