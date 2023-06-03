import { useEffect, useState } from "react";

import { getWorkingUrls } from "../utils";

const useWorkingUrls = (urls: string[]) => {
  const [workingUrls, setWorkingUrls] = useState<string[] | null>(null);

  useEffect(() => {
    const asyncFn = async () => {
      const lWorkingUrls = await getWorkingUrls(urls);

      setWorkingUrls(lWorkingUrls);
    };

    void asyncFn();
  }, [urls]);

  return { urls: workingUrls };
};

export default useWorkingUrls;
