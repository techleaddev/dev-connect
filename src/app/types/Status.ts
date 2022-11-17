export type statusType = {
  statusData: {
    color: string|null;
    description: string|null;
    name: string|null;
  };
  projectId: string|null;
};
export type statusTypeResponse = {
  statusData: {
    color: string;
    description: string;
    name: string;
  };
  projectId: string;
  _id: string;
};
