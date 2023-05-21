import { db } from "../connect.js"
import jwt  from "jsonwebtoken";
export const getLikes=(req,res)=>{

    const q = "SELECT userId from likes WHERE postId = ?";

db.query(q, [req.query.postId], (err, data) => {
if (err) return res.status(500).json(err);
return res.status(200).json(data.map(like=>like.userId));
});
}

export const addLike=(req,res)=>{

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
          if (err) return res.status(403).json("Token is not valid!");
  
          const q = "INSERT INTO likes (`userid`,`postid`) VALUES(?)"// userid fetched from access token

          const values=[
            userInfo.id,
            req.body.postid
          ];
  
          db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json("like has been addded");
          });
    });

}

export const deleteLike=(req,res)=>{

    
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("not logged in");
  
    jwt.verify(token, "secretkey", (err, userInfo) => {
          if (err) return res.status(403).json("Token is not valid!");
  
          const q = "DELETE FROM likes WHERE `userId`= ? AND `postId`= ?"// userid fetched from access token

          db.query(q, [userInfo.id,req.params.postId], (err, data) => {
          if (err) return res.status(500).json(err);
          if(data.affectedRows>0) return res.status(200).json("like has been deleted")
          return res.status(403).json("You cannot dislike");
          });
    });


}