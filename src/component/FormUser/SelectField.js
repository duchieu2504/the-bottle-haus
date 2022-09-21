import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./User.module.scss";

import Loading from "component/Loading";

import {
    cityApi,
    districtApi,
    wardsApi,
} from "connectApi/apiServices/provinceServices";

SelectField.propTypes = {
    field: PropTypes.object.isRequired,

    options: PropTypes.array,
    placeholder: PropTypes.string,
    label: PropTypes.string,
};

function SelectField(props) {
    const [dataCity, setDataCity] = useState([]);
    const [dataDistrict, setDataDistrict] = useState([]);
    const [dataWards, setDataWards] = useState([]);

    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [wards, setWards] = useState("");

    const [codeCity, setCodeCity] = useState(0);
    const [codeDistrict, setCodeDistrict] = useState(0);
    // const [ codeWards, setCodeWards ] = useState(0)

    const [selectOptionCity, setSelectOptionCity] = useState(0);
    const [selectOptionDis, setSelectOptionDis] = useState(0);
    const [selectOptionwards, setSelectOptionWards] = useState(0);

    const [loadingCity, setLoadingCity] = useState(false);
    const [loadingDis, setLoadingDis] = useState(true);
    const [loadingWards, setLoadingWards] = useState(true);

    // lấy dữ liệu các tỉnh, thành phố
    useEffect(() => {
        const fetchProducts = async () => {
            const reponse = await cityApi();
            reponse && setDataCity(reponse.data);
            setLoadingCity(true);
        };
        fetchProducts();
    }, []);

    // lấy dữ liệu các huyện ứng với tỉnh, thành phố đã chọn
    useEffect(() => {
        if (codeCity > 0) {
            const fetchProducts = async () => {
                const result = await districtApi(codeCity);
                setDataDistrict(result.data.districts);
                setLoadingDis(true);
            };
            fetchProducts();
        }
    }, [codeCity]);

    //lấy dữ liệu các xã phường của 1 huyện
    useEffect(() => {
        if (codeDistrict > 0) {
            const fetchProducts = async () => {
                const result = await wardsApi(codeDistrict);
                setDataWards(result.data.wards);
                setLoadingWards(true);
            };
            fetchProducts();
        }
    }, [codeDistrict]);

    const { field, form, label } = props;
    const { errors, touched } = form;
    const { value, name } = field;
    const showErrors = errors[name] && touched[name];

    // console.log(form);

    // lấy dữ liệu ban đầu nếu có
    useEffect(() => {
        if (value) {
            const getCity = async () => {
                const res = await cityApi();
                const result = await res.data.find(
                    (option) => option.name === value.split(" - ")[0]
                );
                setSelectOptionCity(result.code);

                // setOption dữ liệu các huyện
                const resDisApi = await districtApi(result.code);
                await setDataDistrict(resDisApi.data.districts);
                const resultDisApi = await resDisApi.data.districts.find(
                    (option) => option.name === value.split(" - ")[1]
                );
                await setSelectOptionDis(resultDisApi.code);

                // setOption dữ liệu các xã
                const resWardsApi = await wardsApi(resultDisApi.code);
                await setDataWards(resWardsApi.data.wards);
                const resultWardsApi = await resWardsApi.data.wards.find(
                    (option) => option.name === value.split(" - ")[2]
                );
                await setSelectOptionWards(resultWardsApi.code);
            };
            getCity();
        }
    }, []);

    const handleChangleSelect = (e) => {
        setWards(e.target.value);

        const nameCity = dataCity.find((i) => +i.code === +codeCity);
        const nameDis = dataDistrict.find((i) => +i.code === +codeDistrict);
        const nameWards = dataWards.find((i) => +i.code === +e.target.value);

        const province = `${nameCity.name} - ${nameDis.name} - ${nameWards.name}`;
        // const selectValue = selectOption ? selectOption.code : selectOption
        const changeEvent = {
            target: {
                name: name,
                value: province,
            },
        };
        field.onChange(changeEvent);
    };
    return (
        <div className={clsx(styles.form_group)}>
            {label && (
                <label htmlFor="province" className={clsx(styles.form_label)}>
                    {label}
                </label>
            )}
            <div className={clsx(styles.form_select)}>
                <select
                    id="city"
                    value={city || selectOptionCity}
                    className={clsx(styles.form_control)}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setCodeCity(e.target.value);
                        setLoadingDis(false);
                    }}
                >
                    <option value="">City</option>
                    {dataCity.length === 0 ? (
                        <option> Chưa có dữ liệu </option>
                    ) : (
                        dataCity.map((i) => {
                            return (
                                <option key={i.code} value={i.code}>
                                    {i.name}
                                </option>
                            );
                        })
                    )}
                </select>
                <select
                    id="district"
                    value={district || selectOptionDis}
                    className={clsx(styles.form_control)}
                    onChange={(e) => {
                        setDistrict(e.target.value);
                        setCodeDistrict(e.target.value);
                        setLoadingWards(false);
                    }}
                >
                    <option value="">District</option>
                    {dataDistrict.length === 0 ? (
                        <option> Chưa có dữ liệu </option>
                    ) : (
                        dataDistrict.map((i) => {
                            return (
                                <option key={i.code} value={i.code}>
                                    {i.name}
                                </option>
                            );
                        })
                    )}
                </select>
                <select
                    id="wards"
                    value={wards || selectOptionwards}
                    onChange={handleChangleSelect}
                    className={clsx(styles.form_control)}
                >
                    <option value="">Wards</option>
                    {dataWards.length === 0 ? (
                        <option>Chưa có dữ liệu</option>
                    ) : (
                        dataWards.map((i) => {
                            return (
                                <option value={i.code} key={i.code}>
                                    {i.name}
                                </option>
                            );
                        })
                    )}
                </select>
            </div>
            {loadingCity ? <div></div> : <Loading />}
            {loadingDis ? <div></div> : <Loading />}
            {loadingWards ? <div></div> : <Loading />}
            {showErrors && (
                <span className={clsx(styles.form_message)}>
                    {errors[name]}
                </span>
            )}
        </div>
    );
}

export default SelectField;
