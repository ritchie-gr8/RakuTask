import React, { useEffect } from "react";

interface DetectOutsideModalProps {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
}

const useDetectOutsideModal = ({ ref, callback }: DetectOutsideModalProps) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
};

export default useDetectOutsideModal;
