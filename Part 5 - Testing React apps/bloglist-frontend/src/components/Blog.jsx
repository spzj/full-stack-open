import { useState } from "react";
import styles from "../styles/blog.module.css";

const Blog = ({ blog, updateLikes }) => {
  const [displayPost, setDisplayPost] = useState(false);

  const toggleDisplayPost = () => setDisplayPost(!displayPost);
  const handleLikeClick = () => updateLikes(blog);

  return (
    <article className={styles.blog}>
      <div className={styles.profileIcon}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M226-262q59-42.33 121.33-65.5 62.34-23.17 132.67-23.17 70.33 0 133 23.17T734.67-262q41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM480.31-80q-82.64 0-155.64-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.51T80-480.18q0-82.82 31.5-155.49 31.5-72.66 85.83-127Q251.67-817 324.51-848.5T480.18-880q82.82 0 155.49 31.5 72.66 31.5 127 85.83Q817-708.33 848.5-635.65 880-562.96 880-480.31q0 82.64-31.5 155.64-31.5 73-85.83 127.34Q708.33-143 635.65-111.5 562.96-80 480.31-80Zm-.31-66.67q54.33 0 105-15.83t97.67-52.17q-47-33.66-98-51.5Q533.67-284 480-284t-104.67 17.83q-51 17.84-98 51.5 47 36.34 97.67 52.17 50.67 15.83 105 15.83Zm0-366.66q31.33 0 51.33-20t20-51.34q0-31.33-20-51.33T480-656q-31.33 0-51.33 20t-20 51.33q0 31.34 20 51.34 20 20 51.33 20Zm0-71.34Zm0 369.34Z" />
        </svg>
      </div>

      <div className={styles.body}>
        <div className={styles.profileDetails}>
          <span className={styles.user}>{blog.user.name}</span>
          <span className={styles.username}>@{blog.user.username}</span>
        </div>

        <div className={styles.content}>
          <span>{blog.title}</span>
          {displayPost && (
            <div>
              <span>{blog.author}</span>
              <a className={styles.url} href={blog.url}>
                <span>{blog.url}</span>
              </a>
            </div>
          )}
          <div className={styles.showButton} onClick={toggleDisplayPost}>
            <span>{displayPost ? "Show less" : "Show more"}</span>
            <span className={styles.arrowIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="M480-344 240-584l47.33-47.33L480-438.67l192.67-192.66L720-584 480-344Z" />
              </svg>
            </span>
          </div>
          <div className={styles.engagement}>
            <span className={styles.likeButton} onClick={handleLikeClick}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                <path d="m480-120.67-46.67-42q-104.18-95.08-172.25-164.04Q193-395.67 152.67-450.17q-40.34-54.5-56.5-99.16Q80-594 80-640q0-91.44 61.33-152.72 61.34-61.28 152-61.28 55.34 0 103.34 25.33 48 25.34 83.33 72.67 39.33-49.33 86.33-73.67 47-24.33 100.34-24.33 90.66 0 152 61.28Q880-731.44 880-640q0 46-16.17 90.67-16.16 44.66-56.5 99.16-40.33 54.5-108.41 123.46-68.07 68.96-172.25 164.04l-46.67 42Zm0-88.66q99.49-90.67 163.75-155.5Q708-429.67 745.67-478.17q37.66-48.5 52.66-86.42t15-75.31q0-64.1-41.33-105.77-41.33-41.66-105.18-41.66-50.02 0-92.59 29.83-42.56 29.83-65.56 81.5h-58q-22.34-51-64.9-81.17-42.57-30.16-92.59-30.16-63.85 0-105.18 41.66-41.33 41.67-41.33 105.88 0 37.46 15 75.62 15 38.17 52.66 87Q252-428.33 316.67-363.83q64.66 64.5 163.33 154.5Zm0-289Z" />
              </svg>
            </span>
            <span className={styles.likeCountText}>{blog.likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Blog;
