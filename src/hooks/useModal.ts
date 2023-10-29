import { useState } from "react";

export const useModal = () => {
    const [isOpening, setIsOpening] = useState(false);

    const toggle = () => {
      setIsOpening(!isOpening);
      console.log(isOpening);
    }
    return {
        isOpening,
        toggle
    }
}