import {Box, FlatList, Heading, HStack, Text} from "native-base";

export const ActivityScreen = () => {
    return <Box>
        <FlatList data={data.data} renderItem={({item}) => <Box>
            <Heading fontSize={"sm"}>
                {item.activity.name.charAt(0).toUpperCase() + item.activity.name.slice(1)}
            </Heading>
            <HStack justifyContent={"space-between"}>
                <HStack space={2}>
                    <Text>{item.activity.measuring_metric}</Text>
                    <Text>
                        {item.metrics.find((metric) => metric.name === item.activity.measuring_metric)?.stats} {item.metrics.find(metric => metric.name === item.activity.measuring_metric)?.unit}
                    </Text>
                </HStack>
                <HStack space={2}>
                    <Text>Tokens</Text>
                    <Text>
                        {item.tokens}
                    </Text>
                </HStack>
            </HStack>
        </Box>} keyExtractor={item => item.id.toString()}/>
    </Box>
}

export interface data {
    data: Array<{
        id: number;
        activity_date: Date | string;
        tokens: string;
        activity: {
            id: number;
            name: string;
            measuring_metric: string;
            measuring_unit: string;
            base_quantity: string;
            token: string
        },
        metrics: Array<{
            id: number;
            name: string;
            unit: string;
            stats: number;
        }>
    }>;
    links: {
        first: string;
        last: string;
        prev?: string;
        next?: string;
    },
    meta: any
}

const data: data = {
    "data": [
        {
            "id": 33,
            "activity_date": "2022-08-28T06:14:47.000000Z",
            "tokens": "3.86",
            "activity": {
                "id": 1,
                "name": "running",
                "measuring_metric": "distance",
                "measuring_unit": "metres",
                "base_quantity": "1000",
                "token": "1"
            },
            "metrics": [
                {
                    "id": 1,
                    "name": "distance",
                    "unit": "km",
                    "stats": 3.86
                },
                {
                    "id": 2,
                    "name": "moving time",
                    "unit": "minutes",
                    "stats": 59.76
                },
                {
                    "id": 3,
                    "name": "duration",
                    "unit": "minutes",
                    "stats": 59.76
                },
                {
                    "id": 4,
                    "name": "elevation",
                    "unit": "km",
                    "stats": 0
                },
                {
                    "id": 5,
                    "name": "speed",
                    "unit": "kmph",
                    "stats": 3.86
                }
            ]
        },
        {
            "id": 36,
            "activity_date": "2022-09-14T15:14:24.000000Z",
            "tokens": "0",
            "activity": {
                "id": 2,
                "name": "walking",
                "measuring_metric": "distance",
                "measuring_unit": "metres",
                "base_quantity": "1000",
                "token": "1"
            },
            "metrics": [
                {
                    "id": 1,
                    "name": "distance",
                    "unit": "km",
                    "stats": 1.45
                },
                {
                    "id": 2,
                    "name": "moving time",
                    "unit": "minutes",
                    "stats": 30.88
                },
                {
                    "id": 3,
                    "name": "duration",
                    "unit": "minutes",
                    "stats": 30.88
                },
                {
                    "id": 4,
                    "name": "elevation",
                    "unit": "km",
                    "stats": 0
                },
                {
                    "id": 5,
                    "name": "speed",
                    "unit": "kmph",
                    "stats": 2.8
                }
            ]
        },
        {
            "id": 38,
            "activity_date": "2022-09-15T09:07:30.000000Z",
            "tokens": "0",
            "activity": {
                "id": 2,
                "name": "walking",
                "measuring_metric": "distance",
                "measuring_unit": "metres",
                "base_quantity": "1000",
                "token": "1"
            },
            "metrics": [
                {
                    "id": 1,
                    "name": "distance",
                    "unit": "km",
                    "stats": 0.86
                },
                {
                    "id": 2,
                    "name": "moving time",
                    "unit": "minutes",
                    "stats": 11.45
                },
                {
                    "id": 3,
                    "name": "duration",
                    "unit": "minutes",
                    "stats": 14.59
                },
                {
                    "id": 4,
                    "name": "elevation",
                    "unit": "km",
                    "stats": 15.75
                },
                {
                    "id": 5,
                    "name": "speed",
                    "unit": "kmph",
                    "stats": 4.49
                }
            ]
        }
    ],
    "links": {
        "first": "http://127.0.0.1:8000/api/v1/user/activities?fields%5Bactivity_user%5D=id%2Cactivity_date%2Ctokens%2Cactivity_id&include=metrics%2Cactivity&page%5Bnumber%5D=1",
        "last": "http://127.0.0.1:8000/api/v1/user/activities?fields%5Bactivity_user%5D=id%2Cactivity_date%2Ctokens%2Cactivity_id&include=metrics%2Cactivity&page%5Bnumber%5D=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [
            {
                "url": null,
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "http://127.0.0.1:8000/api/v1/user/activities?fields%5Bactivity_user%5D=id%2Cactivity_date%2Ctokens%2Cactivity_id&include=metrics%2Cactivity&page%5Bnumber%5D=1",
                "label": "1",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "http://127.0.0.1:8000/api/v1/user/activities",
        "per_page": 30,
        "to": 3,
        "total": 3
    }
}
