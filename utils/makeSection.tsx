import moment from 'moment';

export default function makeSection(chatList: any[]) {
  const sections: { [key: string]: any[] } = {};
  chatList.forEach((chat) => {
    const monthDate = moment(chat.createdAt).format('YYYY-MM-DD');
    if (Array.isArray(sections[monthDate])) {
      sections[monthDate].push(chat);
    } else {
      sections[monthDate] = [chat];
    }
  });
  return sections;
}
