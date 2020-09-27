import React, { useState } from "react";

import { useAuth0 } from "@auth0/auth0-react";

import { useApi } from "../../utils/request.js";
import VideoForm from "./VideoForm.js";

const VideoUpload = ({ videoOnly, staticOnly }) => {
  const [blob, setBlob] = useState();
  const [studyName, setStudyName] = useState();
  const [description, setDescription] = useState();
  const [reviewerCount, setReviewerCount] = useState();
  const [contentType, setContentType] = useState(
    staticOnly ? "Static" : "Video"
  );
  const [validated, setValidated] = useState(false);
  const [contentLength, setContentLength] = useState();
  const [surveyQuestion, setSurveyQuestion] = useState();
  const [isAB, setIsAB] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const { user, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    async function asyncWrapper() {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    }
    asyncWrapper();
  }, [getAccessTokenSilently]);

  React.useEffect(() => {
    if (studyName && description && reviewerCount) {
      setValidated(true);
    }
  }, [studyName, description, reviewerCount]);

  const updateStudyName = e => {
    setStudyName(e.target.value);
  };
  const updateDescriptionForm = e => {
    setDescription(e.target.value);
  };
  const updateReviewerCountForm = e => {
    setReviewerCount(parseInt(e.target.value));
  };
  const updateContentLengthForm = e => {
    setContentLength(parseInt(e.target.value));
  };
  const updateContentType = e => {
    if (e.target.value === "ABTest") {
      setIsAB(true);
    } else {
      setContentType(e.target.value);
    }
  };
  const updateSurveyQuestionForm = e => {
    setSurveyQuestion(e.target.value);
  };

  const requestNewStudy = async () => {
    // validate form
    // Get our upload URL
    const study = await fetch(
      process.env.REACT_APP_AXON_DOMAIN + "/api/creator/study",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          CreatorId: user.sub,
          Name: studyName,
          Description: description,
          DesiredReviewers: reviewerCount,
          ContentType: contentType,
          SurveyQuestion: surveyQuestion,
          IsAB: isAB,
          Filename: "video-content.mp4",
          secondFilename: "second-video-content.mp4"
        })
      }
    )
      .then(res => res.json())
      .then(
        study => {
          return study;
        },
        error => {
          console.log("Error: ", error);
        }
      );

    // Upload video content
    await fetch(study.UploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType === "Static" ? "image/jpeg" : "video/mp4"
      },
      body: blob
    })
      .then(res => res.json())
      .then(
        result => {
          // setUploading(false);
          return result;
        },
        error => {
          // setUploading(false);
          console.log("Error: ", error);
        }
      );

    if (study.SecondUploadUrl) {
      await fetch(study.SecondUploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": contentType === "Static" ? "image/jpeg" : "video/mp4"
        },
        body: blob
      })
        .then(res => res.json())
        .then(
          result => {
            // setUploading(false);
            return result;
          },
          error => {
            // setUploading(false);
            console.log("Error: ", error);
          }
        );
    }

    if (contentType === "Static") {
      // Make request to neuron to upload content
      await fetch(process.env.REACT_APP_AXON_DOMAIN + "/api/creator/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          StudyID: study.StudyID,
          ContentLength: contentLength
        })
      })
        .then(res => res.json())
        .then(
          resp => {
            return study;
          },
          error => {
            console.log("Error: ", error);
          }
        );
    }
  };

  return (
    <>
      <VideoForm
        contentType={contentType}
        blob={blob}
        setBlob={setBlob}
        updateStudyName={updateStudyName}
        updateDescriptionForm={updateDescriptionForm}
        updateReviewerCountForm={updateReviewerCountForm}
        updateContentType={updateContentType}
        updateContentLength={updateContentLengthForm}
        updateSurveyQuestionForm={updateSurveyQuestionForm}
        requestNewStudy={requestNewStudy}
        videoOnly={videoOnly}
        staticOnly={staticOnly}
        validated={validated}
      />
    </>
  );
};

export default VideoUpload;
