import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { toast } from "sonner";

interface UseDebouncedSaveOptions<T> {
  initialData: T;
  saveData: (data: T) => void;
  debounceDelay?: number;
}

export const useDebouncedSave = <T>({
  initialData,
  saveData,
  debounceDelay = 1000,
}: UseDebouncedSaveOptions<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [changes, setChanges] = useState(-1);

  const debouncedChanges = useDebounce(changes, debounceDelay);

  const handleChange = (key: keyof T, value: T[keyof T]) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setChanges((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (changes === -1) return;
      setChanges(-1);
      await saveData(data);
    };
    fetchData();
  }, [debouncedChanges]);

  return { data, handleChange, setData };
};
