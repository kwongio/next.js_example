import style from "./[id].module.css";
import { GetServerSidePropsContext, InferGetStaticPropsType } from "next";
import fetchOneBook from "@/lib/fetch-one-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));
  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
  if (!book) return <div>책 정보가 없습니다.</div>;
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;
  return (
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
  );
}
