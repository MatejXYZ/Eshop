import { doesMediaUrlWork, findMediaType } from ".";

const getWorkingUrls: (urls: string[]) => Promise<string[]> = async (urls) => {
  return new Promise((resolve) => {
    const checkedUrls: { fail: string[]; success: string[] } = {
      fail: [],
      success: [],
    };

    urls.forEach(async (url) => {
      const doesUrlWork = await doesMediaUrlWork({
        url,
        type: findMediaType(url),
      });

      doesUrlWork ? checkedUrls.success.push(url) : checkedUrls.fail.push(url);

      if (checkedUrls.fail.length + checkedUrls.success.length === urls.length)
        resolve(checkedUrls.success);
    });
  });
};

export default getWorkingUrls;
