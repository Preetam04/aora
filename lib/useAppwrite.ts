import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (func: any) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await func();
      setData(response);
    } catch (error) {
      Alert.alert("Error", error?.message || "Error getting the posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;
