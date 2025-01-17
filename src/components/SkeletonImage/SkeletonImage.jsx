import { useState, cloneElement } from "react";

const SkeletonImage = ({ Image, skeletonStyle = {} }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div
          style={{
            backgroundColor: "#f5f5f5",
            ...skeletonStyle,
            width: "100%",
            height: "100%",
          }}
        />
      )}

      {cloneElement(Image, {
        onLoad: () => setIsLoaded(true),
        style: {
          display: isLoaded ? "block" : "none",
        },
      })}
    </>
  );
};

export default SkeletonImage;
