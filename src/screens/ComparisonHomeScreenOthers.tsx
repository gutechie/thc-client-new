import {
    Actionsheet,
    Box,
    Button,
    Divider,
    FormControl,
    Input,
    Modal, Pressable,
    ScrollView,
    Text,
    useToast,
    VStack,
} from "native-base";
import {useState} from "react";
import {ComparerSelector, CriterionSelector, MetricsSelector,} from "../features/compare";
import {routes} from "../constants/routes";
import {DateRangeSelector, ErrorScreen, Loading} from "../shared";
import {useGetMasterCriteriaQuery} from "../features/masters/masterApi";
import {useGetUserPreferenceQuery, useSaveUserPreferenceMutation} from "../features/user/userApi";
import {getType} from "@reduxjs/toolkit";

export const ComparisonHomeScreenOthers = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState("currentWeek");
    const [selectedMetrics, setSelectedMetrics] = useState([]);
    const [selectedCriteria, setSelectedCriteria] = useState<Array<{ name: string; value: string }>>([]);
    const [showSavePreferenceDialog, setShowSavePreferenceDialog] = useState(false)
    const [templateName, setTemplateName] = useState("");
    const [showSavedPreferences, setShowSavedPreferences] = useState(false);

    const toast = useToast();

    const [saveUserPreference, {isLoading}] = useSaveUserPreferenceMutation();

    const criteriaSearchParams = new URLSearchParams({
        "filter[active]": "true",
        fields: "id,name,label",
        sort: "id",
    });
    const {
        data: criteriaData,
        isLoading: criteriaLoading,
        isError: criteriaLoadingError,
        error: criteriaError,
    } = useGetMasterCriteriaQuery(criteriaSearchParams.toString());

    const preferencesSearchParams = new URLSearchParams({
        "filter[type]": "comparison-with-others"
    })

    const {
        data: preferences,
        isLoading: isPreferencesLoading,
        isError: isPreferencesError,
        error: preferencesError
    } = useGetUserPreferenceQuery(preferencesSearchParams.toString());

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

    if (criteriaLoading || isPreferencesLoading) {
        return <Loading/>;
    }

    if (criteriaLoadingError || isPreferencesError) {
        console.log(preferencesError)
        console.log(criteriaError);
        return <ErrorScreen/>;
    }

    const collectCriterionSelected = (name, value) => {
        let newCriteriaSelected = {
            name,
            value,
        };
        let oldCriteriaSelected = selectedCriteria;
        const existingIndex = oldCriteriaSelected.findIndex((c) => c.name === name);
        if (existingIndex === -1) {
            oldCriteriaSelected.push(newCriteriaSelected);
        } else {
            oldCriteriaSelected[existingIndex].value = value;
        }
        setSelectedCriteria(oldCriteriaSelected);
    };

    const onCompare = () => {
        if (selectedMetrics.length === 0) {
            toast.show({
                description: "You have not selected any metrics for comparison.",
                title: "Metrics not selected",
                placement: "top",
            });
            return;
        }

        navigation.navigate(routes.OTHER_COMPARER, {
            dateRange: selectedDate,
            metrics: selectedMetrics,
            criteria: selectedCriteria,
        });
    };

    const handleSavePreference = () => {
        if (selectedMetrics.length === 0) {
            toast.show({
                description: "You have not selected any metrics for comparison.",
                title: "Metrics not selected",
                placement: "top",
            });
            return;
        }
        setShowSavePreferenceDialog(true);
    };

    const savePreference = async () => {
        const preference = {
            name: templateName,
            type: "comparison-with-others",
            preference: {
                dateRange: selectedDate,
                metrics: selectedMetrics,
                criteria: selectedCriteria,
            },
        };
        try {
            await saveUserPreference(preference).unwrap()
            toast.show({
                description: "Your preference have been successfully.",
                title: "Preference saved",
                placement: "top",
            });
        } catch (e) {
            console.log(e)

            if (e.status && e.status === 422) {
                toast.show({
                    description: e.data.message,
                    title: "Preference not saved",
                    placement: "top",
                });
            } else {
                toast.show({
                    description: "Your preference was not saved.",
                    title: "Something went wrong",
                    placement: "top",
                });
            }
        }
        setTemplateName("");
        setShowSavePreferenceDialog(false);
    };

    const loadPreferences = ({preference}) => {
        const {dateRange, criteria, metrics} = JSON.parse(preference)
        setSelectedCriteria(criteria)
        setSelectedDate(dateRange)
        setSelectedMetrics(metrics)
        setShowSavedPreferences(false)
    };

    console.log(selectedCriteria)

    return (<>
            <ScrollView>
                <Box py={4} px={5}>
                    <VStack space={4} py={4} px={1}>
                        <ComparerSelector
                            currentScreenName={routes.OTHER_COMPARER_HOME}
                            navigation={navigation}
                        />
                        <Button colorScheme={"emerald"} onPress={() => setShowSavedPreferences(true)}>Load from saved
                            preference</Button>
                        <DateRangeSelector
                            onDateRangeSelected={(itemValue) => setSelectedDate(itemValue)}
                            selectedDateRange={selectedDate}
                        />
                        <VStack space={4} mt={4}>
                            <VStack space={2}>
                                <VStack space={1}>
                                    <Text fontSize="md">What do you want to compare?</Text>
                                    <Divider/>
                                </VStack>
                                <MetricsSelector
                                    handleMetricSelected={handleMetricSelected}
                                    selectedMetrics={selectedMetrics}
                                />
                            </VStack>
                            <VStack space={2}>
                                <Text fontSize="md">With whom do you want to compare?</Text>
                                <Divider/>
                                {criteriaData.data.map((criterion) => (
                                    <CriterionSelector
                                        key={criterion.id}
                                        criterion={criterion}
                                        selectedValue={selectedCriteria.find(sc =>sc.name == criterion.name)?.value}
                                        onCriterionSelected={(criterionName, criterionValue) =>
                                            collectCriterionSelected(criterionName, criterionValue)
                                        }
                                    />
                                ))}
                            </VStack>
                        </VStack>
                    </VStack>

                    <VStack space={4}>
                        <Button color={"green"} paddingLeft={3} onPress={handleSavePreference}>
                            Save my preference
                        </Button>

                        <Button colorScheme={"orange"} onPress={onCompare}>
                            Compare now
                        </Button>
                    </VStack>
                </Box>
            </ScrollView>
            <Modal size={"full"} isOpen={showSavePreferenceDialog} onClose={() => setShowSavePreferenceDialog(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton/>
                    <Modal.Header>Save preference as</Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label>Name</FormControl.Label>
                            <Input value={templateName} onChangeText={text => setTemplateName(text)}/>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setShowSavePreferenceDialog(false);
                            }}>
                                Cancel
                            </Button>
                            <Button colorScheme={"orange"} onPress={savePreference}>
                                Save
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Actionsheet isOpen={showSavedPreferences} onClose={() => setShowSavedPreferences(false)}>
                <Actionsheet.Content>
                    {
                        preferences.data.map(preference =>
                            <Pressable key={preference.name} onPress={() => loadPreferences(preference)}>
                                <Box w="100%" h={60} px={4}>
                                    <Text fontSize="16" color="gray.500" _dark={{
                                        color: "gray.300"
                                    }}>
                                        {preference.name}
                                    </Text>
                                </Box>
                            </Pressable>
                        )
                    }
                </Actionsheet.Content>
            </Actionsheet>
        </>
    );
};
