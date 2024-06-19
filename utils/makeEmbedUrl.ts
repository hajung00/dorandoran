export default function makeEmbedUrl(urlList: any[]) {
  const lists = urlList.map((url) => {
    const newList = { ...url };
    const embedIrl = newList.link.replace('watch?v=', 'embed/');
    newList.embedUrl = embedIrl;
    return newList;
  });
  return lists;
}
