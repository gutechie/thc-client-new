import {CheckIcon, Select} from "native-base";

export const DateRangeSelector = ({selectedDateRange, onDateRangeSelected}) => {

    return <Select selectedValue={selectedDateRange} w={"full"}
                   accessibilityLabel="Choose Date Range" placeholder="Choose Date Range"
                   _selectedItem={{endIcon: <CheckIcon size="5"/>}} mt={1}
                   onValueChange={itemValue => onDateRangeSelected(itemValue)}>
        <Select.Item label="This week" value="currentWeek"/>
        <Select.Item label="This month" value="currentMonth"/>
        <Select.Item label="Last month" value="previousMonth"/>
    </Select>

}