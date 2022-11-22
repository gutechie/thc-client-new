import {Fontisto} from "@expo/vector-icons";
import {Box, Button, Divider, Icon, ScrollView, Text, useToast, VStack,} from "native-base";
import {useState} from "react";
import {ComparerSelector, CriterionSelector, MetricsSelector} from "../features/compare";
import {routes} from "../constants/routes";
import {DateRangeSelector, ErrorScreen, Loading} from "../shared";
import {useGetMasterCriteriaQuery} from "../features/masters/masterApi";

export const ComparisonHomeScreenOthers = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState("currentWeek")
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [selectedCriteria, setSelectedCriteria] = useState<Array<{ criterion: number, value: number }>>([]);

    const toast = useToast();

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

    const handleMetricSelected = (metric) => {
        if (isIn(selectedMetrics, metric)) {
            setSelectedMetrics(
                selectedMetrics.filter((m) => m.title != metric.title)
            );
        } else {
            setSelectedMetrics([...selectedMetrics, metric]);
        }
    };

    const isIn = (selectedList, badge): boolean => {
        return selectedList.find((s) => s.id === badge.id);
    };

    if (criteriaLoading) {
        return <Loading/>
    }

    if (criteriaLoadingError) {
        console.log(criteriaError);
        return <ErrorScreen/>
    }

    function collectCriterionSelected(criterionId, criterionValueId) {
        let newCriteriaSelected = {
            criterion: criterionId,
            value: criterionValueId
        };
        let oldCriteriaSelected = selectedCriteria;
        const existingIndex = oldCriteriaSelected.findIndex(c => c.criterion === criterionId)
        if (existingIndex === -1) {
            oldCriteriaSelected.push(newCriteriaSelected);
        } else {
            oldCriteriaSelected[existingIndex].value = criterionValueId;
        }
        setSelectedCriteria(oldCriteriaSelected);
    }

    function onCompare() {
        if (selectedMetrics.length === 0) {
            toast.show({
                description: "You have not selected any metrics for comparison.",
                title: "Metrics not selected",
                placement: "top"
            })
            return;
        }

        navigation.navigate(routes.OTHER_COMPARER, {
            dateRange: selectedDate,
            metrics: selectedMetrics,
            criteria: selectedCriteria
        })
    }

    return (
        <ScrollView>
            <Box py={4} px={5}>
                <VStack space={4} py={4} px={1}>
                    <ComparerSelector currentScreenName={routes.OTHER_COMPARER_HOME} navigation={navigation}/>
                    <DateRangeSelector onDateRangeSelected={itemValue => setSelectedDate(itemValue)}
                                       selectedDateRange={selectedDate}/>
                    <VStack space={4}>
                        <VStack space={2}>
                            <VStack space={1}>
                                <Text fontSize="md">What do you want to compare?</Text>
                                <Divider/>
                            </VStack>
                            <MetricsSelector handleMetricSelected={handleMetricSelected}
                                             selectedMetrics={selectedMetrics}/>
                        </VStack>
                        <VStack space={2}>
                            <Text fontSize="md">With whom do you want to compare?</Text>
                            <Divider/>
                            {
                                criteriaData.data.map(criterion => <CriterionSelector key={criterion.id}
                                                                                      criterion={criterion}
                                                                                      onCriterionSelected={(criterionId, criterionValueId) => collectCriterionSelected(criterionId, criterionValueId)}/>)
                            }
                        </VStack>
                    </VStack>
                </VStack>

                <Box
                    py={5}
                    flexDirection="row"
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Icon as={Fontisto} name="checkbox-passive" size="4" color="grey"/>
                    <Text color={"black"} paddingLeft={3}>
                        Remember my preferences
                    </Text>
                </Box>

                <Button
                    colorScheme={"orange"}
                    onPress={onCompare}
                >
                    Compare now
                </Button>
            </Box>
        </ScrollView>
    );
};
