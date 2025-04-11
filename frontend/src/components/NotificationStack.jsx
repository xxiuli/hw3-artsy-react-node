// src/components/NotificationStack.jsx
import { useNotification } from "../contexts/NotificationContext"; // 

import { Alert } from "react-bootstrap";

const NotificationStack = () => {
  const { notifications, removeNotification } = useNotification(); //
  return (
    <div style={{
      position: "fixed",
      top: "6rem",
      right: "1rem",
      zIndex: 1050,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      maxWidth: "300px"
    }}>
      {notifications.map(({ id, message, type }) => (
        <Alert key={id} variant={type} dismissible onClose={() => removeNotification(id)} className="mb-0">
          {message}
        </Alert>
      ))}
    </div>
  );
};

export default NotificationStack;
