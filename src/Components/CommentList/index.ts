import { UserCircle } from 'phosphor-react';
import React from "react";


function CommentsList(props: any) {
  return (
    <div>
      <div style={style.container}>
        <a href="/" className="avatar">
          <UserCircle size={48} weight="light" className='text-slate-50'></UserCircle>
        </a>
        <div className="content">
          <p style={style.authorText}>
            <b> Usuário </b>
          </p>
          <div style={style.colorText}> {props.post.description} </div>
        </div>
      </div>
    </div>



  );

}

export const style = {
  container: {
    margin: "0% 0% 5% 6%"
  },
  authorText: {
    fontSize: "x-large",
    color: "white"
  },
  colorText: {
    color: "white",
  }
};

export default CommentsList;