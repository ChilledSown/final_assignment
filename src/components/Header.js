import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getArticle } from '../services/Articles';
import styles from '../style/Header.module.css';

const Header = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        getArticle().then(res => setArticles(res));
    }, []);

    const uniqueCategories = [...new Set(articles.map((article) => article.category))]
    return (
        <div className={styles.headerContainer}>
            {uniqueCategories.map((category) => (
                <NavLink 
                    key={category} 
                    to={`/article?category=${category}`} 
                    className={styles.navLink}
                >
                    {category}
                </NavLink>
            ))}
        </div>
    );
};

export default Header;
