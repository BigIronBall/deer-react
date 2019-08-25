import React, { useState, useEffect } from 'react';
import State from 'components/State';
import AppHead from 'components/AppHead';
import Fetch from '@/utils/fetch';
import dayjs from 'dayjs';
import toast from 'components/CyToast';
import { GET_MESSAGES } from '../utils/api';

import 'styles/pages/messages.scss';

const List = ({ data, rowClick }) => {
  if (Array.isArray(data) && data.length) {
    return (
      <ul className="msg-list">
        {data.map(msg => {
          return (
            <li key={msg.id}>
              <p className="f12 c999 center mr12">{msg.time}</p>
              <div className="msg-content container">
                <h4
                  className={[
                    'title',
                    'f14',
                    `${msg.read ? '' : 'unread'}`
                  ].join(' ')}
                  onClick={() => rowClick(msg.id)}
                >
                  {msg.title}
                </h4>
                <p className="content f12">{msg.content}</p>
              </div>
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

  /**
   * 全部已读
   *
   */
  function allRead() {
    const flag = msgs.every(x => x.read);
    if (flag) {
      toast('没有未读消息');
      return;
    }
    msgs.forEach(x => (x.read = true));
    setMsgs(JSON.parse(JSON.stringify(msgs)));
  }

  /**
   * 已读
   *
   * @param {Number} id 消息id
   * @returns
   */
  function setRead(id) {
    const msg = msgs.find(msg => msg.id === id && !msg.read);
    if (!msg || msg.read) return;

    msg.read = true;
    // console.log(msgs);
    setMsgs(JSON.parse(JSON.stringify(msgs)));
  }

  useEffect(() => {
    async function getData() {
      const url = GET_MESSAGES;

      let data = await Fetch.get(url, '', true);
      if (Array.isArray(data) && data.length) {
        data.forEach(x => {
          x.time = dayjs(x.time).format('YYYY-MM-DD HH:mm:ss');
        });
        setMsgs(data);
      }
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
        <List data={msgs} rowClick={setRead} />
      </div>
    </div>
  );
};

export default Messages;
