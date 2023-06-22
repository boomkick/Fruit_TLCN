import React, { useEffect, useState } from "react";
import apiGHNAddress from "../apis/apiGHNAddress";

export const GetGHNProvinces = React.createContext();
export const GetGHNProvincesLoading = React.createContext();

export const GetGHNProvincesProvider = (props) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get danh sách thành phố, tỉnh thành theo địa chỉ của GHN
    const getValue = async () => {
      const response = await apiGHNAddress.getProvinces();
      if (response) {
        setValue(response.data);
        setLoading(false);
      }
    };
    getValue();
  }, []);

  return (
    <GetGHNProvinces.Provider value={value}>
      <GetGHNProvincesLoading.Provider value={loading}>
        {props.children}
      </GetGHNProvincesLoading.Provider>
    </GetGHNProvinces.Provider>
  );
};

export const GetGHNProvinceById = React.createContext();
export const GetGHNProvinceByIdLoading = React.createContext();

export const GetGHNProvinceByIdProvider = (props) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get danh sách thành phố, tỉnh thành theo địa chỉ của GHN
    const getValue = async () => {
      if (props?.ProvinceId) {
        const response = await apiGHNAddress.getProvinces();
        if (response) {
          if (props?.ProvinceId) {
            let data = response.data?.find(
              (item) => item?.ProvinceID.toString() === props?.ProvinceId.toString()
            );
            setValue(data);
            setLoading(false);
          }
        }
      }
    };
    getValue();
  }, [props?.ProvinceId]);

  return (
    <GetGHNProvinceById.Provider value={value}>
      <GetGHNProvinceByIdLoading.Provider value={loading}>
        {props.children}
      </GetGHNProvinceByIdLoading.Provider>
    </GetGHNProvinceById.Provider>
  );
};
