import { useState } from "react";
import { Link } from "react-router-dom";
/* img src import */

/* color.js */
import { COLORS } from "../../styles/colors";

/* css import */
import "./PostItem.css";

/** */
const PostItem = ({ mood, userName, postId }) => {
  return (
    <>
      <div className="post-item">
        <div className="img-container">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM_1pnOJt_sEd1qODO-oTkU_DAbzeQirV7GrFZIaD&s" />
        </div>
        <div className="bottom-text-container"></div>
      </div>
    </>
  );
};

export default PostItem;
