import React, { useEffect, useState } from "react";
import apiGHNAddress from "../apis/apiGHNAddress";

export const GetGHNDistricts = React.createContext();
export const GetGHNDistrictsLoading = React.createContext();

export const GetGHNDistrictsProvider = (props) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get danh sách quận, huyện theo địa chỉ của GHN
    const getValue = async () => {
      const response = await apiGHNAddress.getDistrictsByProvinceId(
        {province_id: Number(props?.ProvinceId)}
      );
      if (response) {
        setValue(response.data);
        setLoading(false);
      }
    };
    getValue();
  }, [props?.ProvinceId]);

  return (
    <GetGHNDistricts.Provider value={value}>
      <GetGHNDistrictsLoading.Provider value={loading}>
        {props.children}
      </GetGHNDistrictsLoading.Provider>
    </GetGHNDistricts.Provider>
  );
};

export const GetGHNDistrictById = React.createContext();
export const GetGHNDistrictByIdLoading = React.createContext();

export const GetGHNDistrictByIdProvider = (props) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get danh sách quận, huyện theo địa chỉ của GHN
    const getValue = async () => {
      const response = await apiGHNAddress.getDistrictsByProvinceId(
        {province_id: Number(props?.ProvinceId)}
      );
      if (response) {
        if (props?.DistrictId) {
          let data = response.data?.find(
            (item) => item?.DistrictID.toString() === props?.DistrictId
          );
          setValue(data);
          setLoading(false);
        }
      }
    };
    getValue();
  }, [props?.ProvinceId, props?.DistrictId]);

  return (
    <GetGHNDistrictById.Provider value={value}>
      <GetGHNDistrictByIdLoading.Provider value={loading}>
        {props.children}
      </GetGHNDistrictByIdLoading.Provider>
    </GetGHNDistrictById.Provider>
  );
};
