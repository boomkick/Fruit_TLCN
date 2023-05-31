import React, { useEffect, useState } from "react";
import apiGHNAddress from "../apis/apiGHNAddress";

export const GetGHNWards = React.createContext();
export const GetGHNWardsLoading = React.createContext();

export const GetGHNWardsProvider = (props) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get danh sách quận, huyện theo địa chỉ của GHN
    const getValue = async () => {
      const response = await apiGHNAddress.getWardsByDictrictId(
        {district_id: Number(props?.DistrictId)}
      );
      if (response) {
        setValue(response.data);
        setLoading(false);
      }
    };
    getValue();
  }, []);

  return (
    <GetGHNWards.Provider value={value}>
      <GetGHNWardsLoading.Provider value={loading}>
        {props.children}
      </GetGHNWardsLoading.Provider>
    </GetGHNWards.Provider>
  );
};

export const GetGHNWardById = React.createContext();
export const GetGHNWardByIdLoading = React.createContext();

export const GetGHNWardByIdProvider = (props) => {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Get danh sách quận, huyện theo địa chỉ của GHN
    const getValue = async () => {
      const response = await apiGHNAddress.getWardsByDictrictId(
        {district_id: Number(props?.DistrictId)}
      );
      if (response) {
        if (props?.WardId) {
          let data = response.data?.find(
            (item) => item?.WardCode.toString() === props?.WardId
          );
          setValue(data);
          setLoading(false);
        }
      }
    };
    getValue();
  }, [props?.DistrictId, props?.WardId]);

  return (
    <GetGHNWardById.Provider value={value}>
      <GetGHNWardByIdLoading.Provider value={loading}>
        {props.children}
      </GetGHNWardByIdLoading.Provider>
    </GetGHNWardById.Provider>
  );
};
