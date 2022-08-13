import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./../User.module.scss";
import Loading1 from "util/Loading1/Loading1";

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

    const [loadingCity, setLoadingCity] = useState(false);
    const [loadingDis, setLoadingDis] = useState(true);
    const [loadingWards, setLoadingWards] = useState(true);

    // lấy dữ liệu các tỉnh, thành phố
    useEffect(() => {
        const fetchProducts = async () => {
            const reponse = await axios
                .get("https://provinces.open-api.vn/api/p")
                .catch((err) => {
                    console.log("err:", err);
                });
            reponse && setDataCity(reponse.data);
            setLoadingCity(true);
        };
        fetchProducts();
    }, []);

    // lấy dữ liệu các huyện ứng với tỉnh, thành phố đã chọn
    useEffect(() => {
        if (codeCity > 0) {
            const fetchProducts = async () => {
                const reponse = await axios
                    .get(
                        `https://provinces.open-api.vn/api/p/${codeCity}?depth=2`
                    )
                    .catch((err) => {
                        console.log("err:", err);
                    });
                const r = reponse && reponse.data.districts;
                setDataDistrict(r);
                setLoadingDis(true);
            };
            fetchProducts();
        }
    }, [codeCity]);

    //lấy dữ liệu các xã phường của 1 huyện

    useEffect(() => {
        if (codeDistrict > 0) {
            const fetchProducts = async () => {
                const reponse = await axios
                    .get(
                        `https://provinces.open-api.vn/api/d/${codeDistrict}?depth=2`
                    )
                    .catch((err) => {
                        console.log("err:", err);
                    });
                const r = reponse && reponse.data.wards;
                setDataWards(r);
                setLoadingWards(true);
            };
            fetchProducts();
        }
    }, [codeDistrict]);

    const { field, form, label } = props;
    const { errors, touched } = form;
    const { name } = field;
    const showErrors = errors[name] && touched[name];

    // console.log(form);
    // const selectOption = dataCity.find(option => option.code === value)

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
    console.log(loadingDis);

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
                    value={city}
                    className={clsx(styles.form_control)}
                    onChange={(e) => {
                        setCity(e.target.value);
                        setCodeCity(e.target.value);
                        setLoadingDis(false);
                    }}
                >
                    <option value="">City</option>
                    {dataCity.length === 0 ? (
                        <div> Chưa có dữ liệu </div>
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
                    value={district}
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
                    value={wards}
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
            {loadingCity ? <div></div> : <Loading1 />}
            {loadingDis ? <div></div> : <Loading1 />}
            {loadingWards ? <div></div> : <Loading1 />}
            {showErrors && (
                <span className={clsx(styles.form_message)}>
                    {errors[name]}
                </span>
            )}
        </div>
    );
}

export default SelectField;
