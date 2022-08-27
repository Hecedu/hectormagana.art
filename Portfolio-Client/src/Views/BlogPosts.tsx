import axios from "axios";
import React, { useEffect, useState } from "react";
import Comment from "../Models/Comments";
import { useStoreSelector } from "../Store";
import { containerStyle } from "../Styles/LayoutStyles";

export default function MoodBoard() {
  var userGoogleToken = useStoreSelector((state) => state.auth.userToken);
  var userBearerToken = useStoreSelector((state) => state.auth.bearerToken);

  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    axios.get(`/api/Comments`).then((res) => {
      setComments(res.data);
    });
  }, []);

  function onMessageChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMessage(event.target.value);
  }
  function onSubmitForm() {
    if (message.length > 0) {
      if (userBearerToken !== undefined) {
        axios
          .post(
            `/api/Comments/AddComment?jwt=${userGoogleToken}`,
            new Comment(0, message, ""),
            {
              headers: { Authorization: `Bearer ${userBearerToken}` },
            }
          )
          .then(function () {
            axios.get(`/api/Comments`).then((res) => {
              setComments(res.data);
            });
          })
          .catch(function (error) {
            alert(error);
          });
      } else {
        axios
          .post(
            `/api/Comments/AddAnonymousComment`,
            new Comment(0, message, "")
          )
          .then(function () {
            axios.get(`/api/Comments`).then((res) => {
              setComments(res.data);
            });
          })
          .catch(function (error) {
            alert(error);
          });
      }
    } else {
      alert("Please input a valid message.");
    }
  }
  return (
    <div className="container">
      <div className={containerStyle}>
        <h1 className="display-1 fw-bold">Moodboard</h1>
        <hr></hr>
        <div className="text-center border border-dark border-4 p-4 m-3 rounded-3 shadow bg-white">
          <h1>Tell us about your mood!</h1>
          <div className="my-2">
            <label className="m-1">Comment:</label>
            <br />
            <input
              type="text"
              name="comment"
              value={message}
              onChange={onMessageChange}
            />
          </div>
          <div className="my-2">
            <button
              className="btn btn-dark"
              type="submit"
              value="Submit"
              onClick={onSubmitForm}
            >
              Submit
            </button>
          </div>
        </div>
        <h4 className="display-5">Recent Moods</h4>
        <hr></hr>
        {comments.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center">
            {comments.map((comment) => {
              return (
                <div
                  className="border border-dark border-4 w-75 rounded-3 p-2 shadow bg-white my-2"
                  key={comment.comment}
                >
                  <p className="fst-italic fw-bold m-0">
                    {comment.poster_username}'s mood
                  </p>
                  <p className="fst-italic">
                    Posted on: {new Date(comment.date_added).toDateString()}
                  </p>
                  <p className="overflow-auto">{comment.comment}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <p>No moods yet!</p>
          </>
        )}
      </div>
    </div>
  );
}
