import { useEffect, useState } from "react";

const useApicall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const fetchData = async (url, options) => {
     try {
    setLoading(true);
   
      const response = await fetch(url, options);
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     fetchData();
//   }, []);
  return { loading, error, result, fetchData };
};

export default useApicall;
