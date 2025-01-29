import { useCallback, useEffect, useRef, useState } from "react";
import Loading from "../Loading/Loading";

const InfiniteScroll = ({ fetch, RenderComponent }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const targetRef = useRef();
  const nextToken = useRef();

  const fetchCallback = useCallback(async () => {
    if (isFetching || nextToken.current === null) return;
    setIsFetching(true);

    try {
      const newData = await fetch(nextToken.current);
      if (!newData) return;
      setData((prevData) => {
        const newItems = newData.items
          .map((v) => {
            const id = v.id ?? v.customUrl;
            return {
              id,
              ...v,
            };
          })
          .filter(
            (newItem) =>
              !prevData.some((prevItem) => prevItem.id === newItem.id)
          );

        return [...prevData, ...newItems];
      });

      if (!newData.nextToken) {
        nextToken.current = null;
        return;
      }

      nextToken.current = newData.nextToken;
    } catch (err) {
      console.log("fetch Error in InfiniteScroll", err);
    } finally {
      setIsFetching(false);
    }
  }, [fetch, isFetching]);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchCallback();
      }
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchCallback]);

  useEffect(() => {
    setData([]);
    nextToken.current = undefined;
  }, [fetch]);

  return (
    <>
      {data?.map((item, index) => {
        return <RenderComponent key={item.id} item={{ index, ...item }} />;
      })}
      {isFetching && <Loading />}
      <div ref={targetRef} />
    </>
  );
};

export default InfiniteScroll;
