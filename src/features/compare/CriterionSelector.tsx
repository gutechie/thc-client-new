import {CheckIcon, Select} from "native-base";
import {useGetMasterCriterionValuesQuery} from "../masters/masterApi";
import {ErrorScreen, Loading} from "../../shared";
import {useState} from "react";

export const CriterionSelector = ({onCriterionSelected, criterion}) => {

    const [selected, setSelected] = useState("");

    const {data: criterionValues, isLoading, isError, error} = useGetMasterCriterionValuesQuery(criterion.id);

    function handleValueChange(itemValue: string) {
        setSelected(itemValue);
        onCriterionSelected(criterion.id, itemValue)
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (isError) {
        console.log(error)
        return <ErrorScreen/>;
    }

    console.log(criterionValues)

    return <Select selectedValue={selected} w={"full"}
                   accessibilityLabel={`Choose ${criterion.label}`} placeholder={`Choose ${criterion.label}`}
                   _selectedItem={{endIcon: <CheckIcon size="5"/>}} mt={1}
                   onValueChange={handleValueChange}>
        {
            criterionValues.map(item => <Select.Item label={item} value={item} key={item} />)
        }

    </Select>
}