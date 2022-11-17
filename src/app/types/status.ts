export type Status = {
  _id?: String;
  statusData: {
    name: String;
    description: String;
    color: String;
  };
  projectId: String;
};
