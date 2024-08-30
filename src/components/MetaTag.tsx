interface Props {
  title?: string;
  description?: string;
  imgUrl?: string;
  noFollow?: boolean;
}

const MetaTag = ({ title, description, imgUrl, noFollow = false }: Props) => {
  return (
    <>
      <title>{title ? `${title} | PS` : '$$합법 PS 놀이터$$'}</title>
      <meta name="description" content={description || '주 4회 PS 스터디를 했을 뿐인데 부자가 되어 있는? 사이트'} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title ? `${title} | PS` : '$$합법 PS 놀이터$$'} />
      <meta property="og:description" content={description || '주 4회 PS 스터디를 했을 뿐인데 부자가 되어 있는? 사이트'} />
      <meta property="og:image" content={imgUrl || '/thumbnail.png'} />
      <meta property="og:url" content="myopener.kr" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Opener" />
      <meta property="og:locale" content="ko" />
      <meta name="robots" content={noFollow ? 'index, nofollow' : 'index, follow'} />
      <meta name="twitter:title" content={title ? `${title} | PS` : '$$합법 PS 놀이터$$'} />
      <meta name="twitter:description" content={description || '주 4회 PS 스터디를 했을 뿐인데 부자가 되어 있는? 사이트'} />
      <meta name="twitter:image" content={imgUrl || '/thumbnail.png'} />
    </>
  );
};

export default MetaTag;
