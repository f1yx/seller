import React from "react"


export interface ICommentItem{
    feedback:string
    advantages:string
    disadvantages:string
    date:string
    displayName:string
    photoURL:string
}

export const CommentItem:React.FC<ICommentItem> = ({feedback,advantages,disadvantages,date,displayName,photoURL}) => {

  return (
    <div className="single__comment">
    <div className="single__account">
      <div className="single__accountdesc">
        <img src={photoURL}/>
        <span className='single__name'>{displayName}</span>
      </div>
      <span>{date}</span>
    </div>
    <p className='single__description'>{feedback}</p>
    {advantages && 
    <div className="single__advantages">
      <span>Плюсы:</span>
      <p>{advantages}</p>
    </div>}
    {disadvantages && 
    <div className="single__advantages">
      <span>Минусы:</span>
      <p>{disadvantages}</p>
    </div>}
  </div>
  )
}
