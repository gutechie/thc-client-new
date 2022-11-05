import {Box, CheckIcon, Heading, HStack, ScrollView, Select, Text, FlatList} from "native-base";
import {selectUser} from "../features/auth/authSlice";
import {useAppSelector} from "../hooks";
import {ErrorScreen, Loading, PerformanceChartSingle} from "../shared";
import {useGetMasterCriteriaQuery, useGetMasterMetricsQuery} from "../features/masters/masterApi";
import {add, endOfMonth, endOfWeek, startOfMonth, startOfWeek, sub} from "date-fns";
import {useEffect, useState} from "react";
import {useGetCurrentUserQuery} from "../features/user/userApi";

export const HomeOtherScreen = () => {
    const user = useAppSelector(selectUser);

    // build state_date and end_date for different date filters
    const dateRanges = {
        currentWeek: {
            startDate: startOfWeek(new Date(Date.now()), {weekStartsOn: 1}),
            endDate: endOfWeek(new Date(Date.now()), {weekStartsOn: 1}),
        },
        currentMonth: {
            startDate: add(startOfMonth(new Date(Date.now())), {days: 1}),
            endDate: endOfMonth(new Date(Date.now())),
        },
        previousMonth: {
            startDate: add(startOfMonth(sub(new Date(Date.now()), {months: 1})), {days: 1}),
            endDate: endOfMonth(sub(new Date(Date.now()), {months: 1})),
        }
    };

    const [selectedDate, setSelectedDate] = useState("currentWeek")
    const [selectedCriterion, setSelectedCriterion] = useState<string>()
    const [selectedMetric, setSelectedMetric] = useState<string>()
    const [loadProfile, setLoadProfile] = useState<boolean>(false)
    const [criterionAvailable, setCriterionAvailable] = useState<boolean>(true)

    // first load comparable metrics
    const metricsSearchParams = new URLSearchParams({
        'filter[comparable]': 'true',
        'fields': 'id,name,base_unit',
    })
    const {
        data: metrics,
        isLoading: metricsLoading,
        isError: metricsLoadingError,
        error: metricsError
    } = useGetMasterMetricsQuery(metricsSearchParams.toString())

    // then get all the comparable criteria
    const criteriaSearchParams = new URLSearchParams({
        'filter[active]': 'true',
        'fields': 'id,name,label'
    })
    const {
        data: criteriaData,
        isLoading: criteriaLoading,
        isError: criteriaLoadingError,
        error: criteriaError,
    } = useGetMasterCriteriaQuery(criteriaSearchParams.toString())


    const {
        data: userWithProfile,
        isLoading: isUserLoading,
        isError: isUserError,
        error: userError
    } = useGetCurrentUserQuery();

    const handleCriterionSelection = (itemValue) => {
        console.log(userWithProfile.profile)
        const sc = findSelectedCriterion(itemValue)
        console.log(userWithProfile.profile[sc.name])
        if (!userWithProfile.profile[sc.name]) {
            setCriterionAvailable(false)
        } else {
            setCriterionAvailable(true)
        }
        setSelectedCriterion(itemValue)
    }

    const findSelectedCriterion = (id) => {
        return criteriaData.data.find(criterion => criterion.id == id);
    }

    if (metricsLoading || criteriaLoading || isUserLoading) {
        return <Loading/>
    }

    if (metricsLoadingError || criteriaLoadingError || userError) {
        console.log(metricsError)
        console.log(criteriaError)
        console.log(userError)
        return <ErrorScreen/>
    }

    if (criteriaData && !selectedCriterion && userWithProfile) {
        const criterionToBeSelected = criteriaData.data[0];
        setSelectedCriterion(criterionToBeSelected.id)
        console.log(userWithProfile.profile)
        console.log(userWithProfile.profile[criterionToBeSelected.name])
        if (!userWithProfile.profile[criterionToBeSelected.name]) {
            setCriterionAvailable(false)
        }
    }

    return <Box px={4} mb={48}>
        <Heading size={"md"} textAlign={"center"} my={4} color={"orange.500"}>Here's what others are doing</Heading>
        <Select selectedValue={selectedDate} w={"full"}
                accessibilityLabel="Choose Date Range" placeholder="Choose Date Range"
                _selectedItem={{endIcon: <CheckIcon size="5"/>}} mt={1}
                onValueChange={itemValue => setSelectedDate(itemValue)}>
            <Select.Item label="This week" value="currentWeek"/>
            <Select.Item label="This month" value="currentMonth"/>
            <Select.Item label="Last month" value="previousMonth"/>
        </Select>
        {
            criteriaData && metrics && userWithProfile && <Box mb={4}>
                <Select selectedValue={selectedCriterion} w={"full"} accessibilityLabel="Choose Criteria"
                        placeholder="Choose Criteria" _selectedItem={{endIcon: <CheckIcon size="5"/>}} mt={1}
                        onValueChange={handleCriterionSelection}>
                    {criteriaData.data.map(criterion => <Select.Item key={criterion.id} label={criterion.label}
                                                                     value={criterion.id}/>)}
                </Select>
            </Box>
        }
            {criteriaData && metrics && (
                criterionAvailable ?

                    <ScrollView>
                        {
                            metrics.data.map(metric => <PerformanceChartSingle dateRange={dateRanges[selectedDate]}
                                                                               metric={metric}
                                                                               key={metric.id.toString()}
                                                                               criterion={criteriaData.data.find(criterion => criterion.id === selectedCriterion)}/>)
                        }
                    </ScrollView> :
                    <Text my={4}>You have not provided the value for {findSelectedCriterion(selectedCriterion).label}. Please edit your profile details to
                        update the value or select other criteria</Text>
            )
                // <FlatList data={metrics} keyExtractor={(item) => item.id.toString()}
                //           renderItem={({item}) => <PerformanceChartSingle dateRange={dateRanges[selectedDate]} metric={item}
                //                                                           criterion={criteriaData.data.find(criterion => criterion.id === selectedCriterion)}/>}/>
            }
    </Box>
};
