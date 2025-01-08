import { useState, useEffect, useRef, useCallback } from "react";
import Loading from "../Loading/Loading";

const InfiniteScroll = ({ fetch, RenderComponent }) => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const isMounted = useRef(false);
  const targetRef = useRef();
  const scrollRef = useRef(0);
  const nextToken = useRef();

  const observeElement = useCallback((callback) => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const currentScrollY = window.scrollY;
        if (currentScrollY > scrollRef.current) {
          observer.unobserve(element);
          callback();
        }

        scrollRef.current = currentScrollY;
      }
    });
    observer.observe(element);
  }, []);

  const handleScroll = useCallback(() => {
    observeElement(() => setIsFetching(true));
  }, [observeElement]);

  const fetchCallback = useCallback(async () => {
    try {
      const newData = await fetch(nextToken.current);
      setData((prevData) => {
        const newItems = newData.items
          .map((v) => {
            return {
              id: v.customUrl,
              ...v,
            };
          })
          .filter(
            (newItem) =>
              !prevData.some((prevItem) => prevItem.id === newItem.id)
          );

        return [...prevData, ...newItems];
      });
      nextToken.current = newData.nextToken;
    } catch (err) {
      console.log("fetch Error in InfiniteScroll", err);
    } finally {
      setIsFetching(false);
    }
  }, [fetch]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isFetching) return;
    fetchCallback();
  }, [fetch, fetchCallback, isFetching]);

  useEffect(() => {
    if (!isMounted.current) return;
    fetchCallback();
  }, [fetchCallback]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <>
      {data?.map((item) => {
        return <RenderComponent key={item.id} item={item} />;
      })}
      {isFetching && <Loading />}
      <div ref={targetRef} />
    </>
  );
};

export default InfiniteScroll;
