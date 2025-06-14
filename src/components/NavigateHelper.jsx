import { useNavigate } from 'react-router-dom';

/**
 * A custom hook to easily navigate to a specified path.
 *
 * @returns {function(string, object=): void} A function `goToPath` that takes a path and an optional options object.
 */
const useNavigationHelper = () => {
  const navigate = useNavigate();

  /**
   * Navigates to a specified path.
   * @param {string} path The path to navigate to (e.g., '/menu', '/dashboard').
   * @param {object} [options] Options for navigation (e.g., { replace: true, state: { someData: 'value' } }).
   */
  const goToPath = (path, options) => {
    if (path) {
      navigate(path, options);
    } else {
      console.warn("No path provided for navigation.");
    }
  };

  return goToPath;
};

export default useNavigationHelper;

// ใช้code3ตัวนี้navigateหน้า
// import useNavigationHelper from "../components/NavigateHelper";
// const goToPath = useNavigationHelper();
// goToPath('./menu')