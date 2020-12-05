import React from "react";

const Animal = props => {

  const avatarHeight = props.avatarHeight ? props.avatarHeight : 100
  const avatarWidth = props.avatarWidth ? props.avatarWidth : 100
  
  return (
    <img src={`https://avatars.dicebear.com/4.4/api/gridy/${props.id}.svg?h=${avatarHeight}&w=${avatarWidth}`} alt="Avatar"></img>
  );
};

export default Animal;
