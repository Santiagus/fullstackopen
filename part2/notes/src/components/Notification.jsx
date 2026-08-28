const Notification = ({ message }) => {
  console.log("Notification: ", message);
  if (message === null) {
    return null;
  }

  return <div className={message.class}>{message.content}</div>;
};

export default Notification;
