import {CheckIcon, Select} from "native-base";
import {useGetMasterCriterionValuesQuery} from "../masters/masterApi";
import {ErrorScreen, Loading} from "../../shared";
import {useState} from "react";

export const CriterionSelector = ({onCriterionSelected, criterion, selectedValue}) => {
    const {
        data: criterionValues,
        isLoading,
        isError,
        error,
    } = useGetMasterCriterionValuesQuery(criterion.id);

    const handleValueChange = (itemValue: string) => {
        onCriterionSelected(criterion.name, itemValue);
    };

    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        console.log(error);
        return <ErrorScreen/>;
    }

    return (
        <Select
            selectedValue={selectedValue ?? ""}
            w={"full"}
            accessibilityLabel={`Choose ${criterion.label}`}
            placeholder={`Choose ${criterion.label}`}
            _selectedItem={{endIcon: <CheckIcon size="5"/>}}
            mt={1}
            onValueChange={handleValueChange}
        >
            {criterionValues.map((item) => (
                <Select.Item label={item} value={item} key={item}/>
            ))}
        </Select>
    );
};
