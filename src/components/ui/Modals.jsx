import { useImperativeHandle, useState, useRef } from "react";
import { createPortal } from "react-dom";
export const Alert = ({ dialogRef }) => {
  const alertModalRef = useRef();
  const [errorMessage, setErrorMessage] = useState();

  /**
   * Props로 전달된 ref에게 DOM이 아닌 함수 객체를 전달하기 위한 방법.
   * 부모 컴포넌트에게 전달해 줄 데이터(함수, 객체, 변수, 상수 등)
   * 부모에게 전달해 줄 데이터들은 props로 전달된 ref에 담아 전달.
   */
  useImperativeHandle(dialogRef, () => {
    // dialogRef에게 할당해 줄 데이터들을 반환
    return {
      showModal(message) {
        alertModalRef.current.showModal();
        setErrorMessage(message);
      },
    };
  });

  const onCloseClickHandler = () => {
    alertModalRef.current.close();
  };
  return (
    <>
      {createPortal(
        // dialog가 alertModalRef로 들어감
        <dialog className="modal" ref={alertModalRef}>
          <div className="modal-body">
            <section
              className="modal-close-button"
              onClick={onCloseClickHandler}>
              X
            </section>
            <div>{errorMessage} 입력해 주세요</div>
          </div>
        </dialog>,
        document.querySelector("#modals"),
      )}
    </>
  );
};

export const Confirm = ({ confirmRef, onOkClick, onCloseClick }) => {
  const confirmDialogRef = useRef();
  const [confirmDialog, setConfirmDialog] = useState();
  const handledFromEvents = useRef({
    fired: false,
  });
  useImperativeHandle(confirmRef, () => {
    return {
      showConfirm(message) {
        confirmDialogRef.current.showModal();
        setConfirmDialog(message);
      },
    };
  });

  const onOkClickHandler = () => {
    handledFromEvents.fired = true;
    confirmDialogRef.current.close();
    onOkClick();
  };

  const onCloseClickHandler = () => {
    handledFromEvents.fired = true;
    confirmDialogRef.current.close();
    onCloseClick();
  };

  const onCloseNative = () => {
    if (!handledFromEvents.fired) {
      onCloseClick();
    }
    // dialog가 꺼질 때, fired 값을 false로 변경.
    // event에 의해 닫힌 케이스도 초기화.
    handledFromEvents.fired = false;
  };

  return (
    <>
      {createPortal(
        <dialog
          className="modal"
          ref={confirmDialogRef}
          onClose={onCloseNative}>
          <div className="modal-body">
            <div>{confirmDialog}</div>
            <section>
              <button
                type="button"
                className="confirm-ok"
                onClick={onOkClickHandler}>
                OK
              </button>
              <button
                type="button"
                className="confirm-cancel"
                onClick={onCloseClickHandler}>
                Cancel
              </button>
            </section>
          </div>
        </dialog>,
        document.querySelector("#modals"),
      )}
    </>
  );
};
