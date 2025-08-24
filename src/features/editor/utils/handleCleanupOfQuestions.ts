import {
  getStoredData,
  setStoredData,
  deleteStoredData,
} from "@/utils/localStorageUtils";

import {
  cleanupOfLocalStorageInDays,
  expiryTimeCodeInLocalStorageInDays,
} from "@/data/configureVariables";

export const cleanUpExpiredQuestions = () => {
  //hours * minutes * seconds * milliseconds
  const expiryTime = expiryTimeCodeInLocalStorageInDays * 24 * 60 * 60 * 1000;
  const currentTime = new Date().getTime();
  const lastCleanupTime = getStoredData("lastCleanupTime");
  const cleanupInterval = cleanupOfLocalStorageInDays * 24 * 60 * 60 * 1000;

  let shouldCleanup = false;

  if (lastCleanupTime) {
    const lastCleanupTimeMillis = new Date(lastCleanupTime).getTime();

    if (!isNaN(lastCleanupTimeMillis)) {
      if (currentTime - lastCleanupTimeMillis > cleanupInterval)
        shouldCleanup = true;
    }
  } else {
    shouldCleanup = true;
    setStoredData("lastCleanupTime", new Date().toISOString());
  }

  if (!shouldCleanup) return;

  setStoredData("lastCleanupTime", new Date().toISOString());
  Object.keys(localStorage).forEach((key) => {
    if (key.endsWith("_updatedTime")) {
      const updatedTime = localStorage.getItem(key);

      if (updatedTime) {
        const updatedTimeMillis = new Date(updatedTime.slice(1, -1)).getTime();

        if (
          !isNaN(updatedTimeMillis) &&
          currentTime - updatedTimeMillis > expiryTime
        ) {
          const questionKey = key.replace("_updatedTime", "");
          deleteStoredData(questionKey);
          deleteStoredData(key);
        }
      }
    }
  });
};
