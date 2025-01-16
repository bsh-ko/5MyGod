import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import PropTypes from "prop-types";

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const SCROLL_THRESHOLD = 10;
  const scrollTimeoutRef = React.useRef(null);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollDifference = Math.abs(currentScrollY - prevScrollPos);

    if (scrollDifference > SCROLL_THRESHOLD) {
      if (currentScrollY < prevScrollPos) {
        // 스크롤을 위로 올릴 때
        setVisible(true);
      } else {
        //스크롤을 아래로 내릴 때
        setVisible(false);
      }
      setPrevScrollPos(currentScrollY);
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, 150);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <NavigationContext.Provider value={{ visible }}>
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useNavigation = () => useContext(NavigationContext);
