//to get the data from local storage
export const getStoredData = (key: string) => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};

// to set the data in local storage
export const setStoredData = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// to delete the data from local storage
export const deleteStoredData = (key: string) => {
  localStorage.removeItem(key);
};
