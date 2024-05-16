import "../css/news_row.css";

export default function NewsRow(props) {
  const { news } = props;

  const onClick = () => {
    if (news.link) {
      window.open(news.link, "_blank"); // 새 탭에서 링크 열기
    }
  };

  return (
    <div className="news_container" onClick={onClick}>
      {news.thumbnailImage === null ? null : (
        <img
          className="news_img"
          src={news.thumbnailImage}
          alt="thumbnail"
        ></img>
      )}
      <div className="text_content">
        <div className="news_header">{convertTime(news.publishAt)}</div>
        <div className="news_body">{news.title}</div>
        <div className="news_footer">{news.nameKo}</div>
      </div>
    </div>
  );
}

function convertTime(utcDateString) {
  const date = new Date(utcDateString);

  const formatNumber = (number) => (number < 10 ? `0${number}` : number);

  const koreanDateString = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일 ${formatNumber(date.getHours())}시 ${formatNumber(
    date.getMinutes()
  )}분 ${formatNumber(date.getSeconds())}초`;

  return koreanDateString;
}
