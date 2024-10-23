import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const handleInputChange = <T>(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    setData: Dispatch<SetStateAction<T>>
) => {
    const { name, value } = e.target;
    const formattedValue = Number(value) || value;
    setData((prevData) => ({ ...prevData, [name]: formattedValue }));
};