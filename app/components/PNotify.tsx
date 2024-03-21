import React from "react";

export default function PNotify({ title, text, closeToast }: any) {
  return (
    <>
      <div className="ui-pnotify-closer" onClick={closeToast}>
        <span className="fas fa-times" title="close"></span>
      </div>
      <h4 className="ui-pnotify-title">{title}</h4>
      <div className="ui-pnotify-text">{text}</div>
    </>
  );
}
