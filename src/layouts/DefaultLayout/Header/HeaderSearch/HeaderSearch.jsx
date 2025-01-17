import styles from "./HeaderSearch.module.css";
import { MdMic } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import {
  DropDown,
  DropDownContent,
  DropDownTrigger,
} from "../../../../components/DropDown/DropDown";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageEndPoints } from "../../../../constants/api";

const HeaderSearch = () => {
  const [inputWidth, setInputWidth] = useState();
  const [searchList, setSearchList] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!inputRef.current || !inputRef.current.value) return;
      const newSearchList = [...searchList, inputRef.current.value];
      const newSearchListSet = new Set(newSearchList);
      const newSearchListUnique = [...newSearchListSet];
      const query = inputRef.current.value;

      if (newSearchListUnique.length >= 10) {
        newSearchListUnique.splice(0, newSearchListUnique.length - 10);
      }

      inputRef.current.value = "";
      localStorage.setItem("search-list", JSON.stringify(newSearchListUnique));
      setSearchList(newSearchListUnique);
      navigate(`${pageEndPoints.RESULTS}?query=${query}`);
    },
    [navigate, searchList]
  );

  const handleClickListItem = useCallback(
    (e, searchItem) => {
      e.stopPropagation();
      navigate(`${pageEndPoints.RESULTS}?query=${searchItem}`);
    },
    [navigate]
  );

  const handleDeleteSearchItem = useCallback(
    (e, searchItem) => {
      e.stopPropagation();

      const newSearchList = searchList.filter((v) => v !== searchItem);
      localStorage.setItem("search-list", JSON.stringify(newSearchList));
      setSearchList(newSearchList);
    },
    [searchList]
  );

  useEffect(() => {
    if (!inputRef.current) return;

    const updateWidth = () => {
      setInputWidth(inputRef.current.offsetWidth);
    };

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(inputRef.current);
  }, []);

  useEffect(() => {
    const initialSearchList = localStorage.getItem("search-list");
    if (!initialSearchList) return;

    setSearchList(JSON.parse(initialSearchList));
  }, []);

  return (
    <section className={styles.search_container}>
      <form className={styles.search_flex_box} onSubmit={handleSearchSubmit}>
        <DropDown style={{ width: "100%" }}>
          <DropDownTrigger style={{ width: "100%" }}>
            <input
              className={styles.search_input}
              placeholder="검색"
              ref={inputRef}
            />
          </DropDownTrigger>
          <DropDownContent>
            <ul
              style={{
                width: inputWidth,
              }}
              className={styles.search_list}
            >
              {searchList.map((v) => {
                return (
                  <li
                    key={v}
                    className={styles.search_item}
                    onClick={(e) => handleClickListItem(e, v)}
                  >
                    <CiSearch size={24} />
                    <div className={styles.search_item_text}>{v}</div>
                    <button
                      onClick={(e) => handleDeleteSearchItem(e, v)}
                      type="button"
                    >
                      삭제
                    </button>
                  </li>
                );
              })}
            </ul>
          </DropDownContent>
        </DropDown>
        <button className={styles.submit_btn} type="submit">
          <CiSearch size={24} />
        </button>
      </form>
      <button className={styles.mic_btn}>
        <MdMic size={22} />
      </button>
    </section>
  );
};

export default HeaderSearch;
