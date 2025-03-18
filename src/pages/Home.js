import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../style/Home.module.css";
import { getArticle } from "../services/Articles";
import Header from "../components/Header";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getArticle().then((res) => {
      setArticles(res);
    });
  }, []);
  return (
    <div>
      <Header></Header>
      <h1 className={styles.title}>Bài báo mới nhất</h1>
      <div className={styles.articlesGrid}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className={styles.articleCard}>
              <img
                src={article.image_url}
                alt={article.title || "Hình ảnh bài viết"}
                className={styles.articleImage}
              />
              <h3 className={styles.articleTitle}>
                {article.title || "Không có tiêu đề"}
              </h3>
              <p className={styles.articleDescription}>
                {article.description || "Không có mô tả"}
              </p>
              <Link to={`/article/${article.id}`} className={styles.readMore}>
                Xem chi tiết
              </Link>
            </div>
          ))
        ) : (
          <p className={styles.noArticles}>Không tìm thấy bài viết phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
