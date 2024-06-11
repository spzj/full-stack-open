import NotificationType from "../constants/NotificationType";

const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  }

  const notificationStyle = {
    color:
      type === NotificationType.SUCCESS
        ? "green"
        : type === NotificationType.ERROR
          ? "red"
          : "gray",
  };

  return (
    <div className="mt-2 font-bold" style={notificationStyle}>
      {message}
    </div>
  );
};

export default Notification;
