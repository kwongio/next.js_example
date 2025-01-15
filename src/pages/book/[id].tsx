import style from "./[id].module.css";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-books";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  if (!book) {
    return {
      notFound: true,
    };
  }
  return {
    props: { book },
  };
};
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true,
    // false: 404 페이지
    // blocking: SSR 방식
    // true : SRR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입 북스</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입 북스" />
          <meta
            property="og:description"
            content="한입 북스에서 다양한 도서를 만나보세요."
          />
        </Head>
        <div>로딩중입니다.</div>
      </>
    );
  }
  if (!book) {
    return <div>문제가 발생했습니다. 다시 시도하세요</div>;
  }
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_image_container}
          style={{ backgroundImage: `url('${coverImgUrl}` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>{author} | publisher</div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
