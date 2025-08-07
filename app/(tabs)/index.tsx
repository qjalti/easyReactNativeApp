import {StyleSheet, TextInput} from 'react-native';
import {useState} from 'react';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

export default function HomeScreen() {
    const [meteorsPerMinute, setMPM] = useState('0');
    const [meteorsPerSecond, setMPS] = useState('0');
    const [depth, setDepth] = useState('0');
    const [distanceToLightning, setDTL] = useState('0');

    const calculateMeteorsPerHour = (value: string) => {
        let meteorsPerHour = value;
        if (value) {
            if (/,/.test(value)) {
                meteorsPerHour = value.replace(',', '.');
            }
            const METEORS_PER_SECOND = (3600 / Number(meteorsPerHour)).toFixed(2);
            const METEORS_PER_MINUTE = (60 / Number(meteorsPerHour)).toFixed(2);
            setMPM(METEORS_PER_MINUTE);
            setMPS(METEORS_PER_SECOND);
        }
    }

    const calculateDepth = (value: string) => {
        let fallTime = value;
        if (value) {
            if (/,/.test(value)) {
                fallTime = value.replace(',', '.');
            }
            const DEPTH = (9.81 * Math.pow(Number(fallTime), 2) / 2).toFixed(2);
            setDepth(DEPTH);
        }
    }

    const calculateLightningDistance = (value: string) => {
        let timing = value;
        if (value) {
            if (/,/.test(value)) {
                timing = value.replace(',', '.');
            }
            const DISTANCE_TO_LIGHTNING = (334 * Number(timing)).toFixed(2);
            setDTL(DISTANCE_TO_LIGHTNING);
        }
    }

    return (
        <>
            <ThemedView style={styles.stepContainer}>
                <ThemedText
                    type={'subtitle'}
                >
                    Метеоры
                </ThemedText>
                <TextInput
                    onChangeText={calculateMeteorsPerHour}
                    enterKeyHint={'send'}
                    inputMode={'numeric'}
                    keyboardType={'numeric'}
                    placeholder={'Метеоров в час'}
                />
                <ThemedText>
                    1 метеор каждые: {meteorsPerSecond}s
                </ThemedText>
                <ThemedText>
                    1 метеор каждые: {meteorsPerMinute}m
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText
                    type={'subtitle'}
                >
                    Глубина
                </ThemedText>
                <TextInput
                    onChangeText={calculateDepth}
                    enterKeyHint={'send'}
                    inputMode={'numeric'}
                    keyboardType={'numeric'}
                    placeholder={'Время падения в секундах'}
                />
                <ThemedText>
                    Глубина: {depth}m
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText
                    type={'subtitle'}
                >
                    Расстояние до молнии
                </ThemedText>
                <TextInput
                    onChangeText={calculateLightningDistance}
                    enterKeyHint={'send'}
                    inputMode={'numeric'}
                    keyboardType={'numeric'}
                    placeholder={'Время в секундах от вспышки до грома'}
                />
                <ThemedText>
                    Растояние до молнии: {distanceToLightning}m
                </ThemedText>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        padding: 16,
        borderRadius: 16,
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
    },
});
