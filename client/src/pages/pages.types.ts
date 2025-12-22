export type ServerResponse = {
  type: "error" | "response" | "broadcast";
  payload: {
    message: string;
  };
};

export type ChatMessages = {
  sender: "me" | "server";
  message: string;
};
