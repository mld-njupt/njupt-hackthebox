import React from "react";
import "./ProfileCard.scss";
interface CardProp {
  score: number;
  category: string;
}
function ProfileCard(props: CardProp) {
  const { score, category } = props;
  return (
    <div className="profile-card">
      <div className="card-icon"></div>
      <div className="card-score">{score}</div>
      <div className="card-name">{category}</div>
    </div>
  );
}

export default ProfileCard;
