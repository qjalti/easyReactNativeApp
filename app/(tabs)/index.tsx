import {StyleSheet, TextInput, Button, ScrollView} from 'react-native';
import {useState} from 'react';

import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

export default function HomeScreen() {
    const [meteorsPerMinute, setMPM] = useState('0');
    const [meteorsPerSecond, setMPS] = useState('0');
    const [depth, setDepth] = useState('0');
    const [distanceToLightning, setDTL] = useState('0');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [x, setX] = useState('');
    const [history, setHistory] = useState<string[]>([]);

    const calculateMeteorsPerHour = (value: string) => {
        let meteorsPerHour = value;
        if (value) {
            if (/,/.test(value)) {
                meteorsPerHour = value.replace(',', '.');
            }
            const METEORS_PER_SECOND = (3600 / Number(meteorsPerHour)).toFixed(2);
            const METEORS_PER_MINUTE = (60 / Number(meteorsPerHour)).toFixed(2);
            setMPM(new Intl.NumberFormat('ru-RU').format(Number(METEORS_PER_MINUTE)).replace(',', '.'));
            setMPS(new Intl.NumberFormat('ru-RU').format(Number(METEORS_PER_SECOND)).replace(',', '.'));
        }
    }

    const calculateDepth = (value: string) => {
        let fallTime = value;
        if (value) {
            if (/,/.test(value)) {
                fallTime = value.replace(',', '.');
            }
            const DEPTH = (9.81 * Math.pow(Number(fallTime), 2) / 2).toFixed(2);
            setDepth(new Intl.NumberFormat('ru-RU').format(Number(DEPTH)).replace(',', '.'));
        }
    }

    const calculateLightningDistance = (value: string) => {
        let timing = value;
        if (value) {
            if (/,/.test(value)) {
                timing = value.replace(',', '.');
            }
            const DISTANCE_TO_LIGHTNING = (334 * Number(timing)).toFixed(2);
            setDTL(new Intl.NumberFormat('ru-RU').format(Number(DISTANCE_TO_LIGHTNING)).replace(',', '.'));
        }
    }

    const calculateX = () => {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        const numC = parseFloat(c);

        if (!numA || !numB || !numC) return;

        const result = ((numB * numC) / numA).toFixed(2);
        const formattedResult = new Intl.NumberFormat('ru-RU').format(Number(result)).replace(',', '.');
        setX(result);

        setHistory(prev => {
            const updated = [formattedResult, ...prev];
            return updated.slice(0, 10);
        });
    };

    const resetXCalc = () => {
        setA('');
        setB('');
        setC('');
        setX('');
    };

    return (
        <ScrollView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type={'subtitle'}>Вычисление X</ThemedText>
                <ThemedView style={styles.xContainer}>
                    <ThemedView style={styles.calcXInputs}>
                        <TextInput
                            value={a}
                            onChangeText={setA}
                            placeholder={'A'}
                            keyboardType={'numeric'}
                            style={styles.input}
                        />
                        <TextInput
                            value={b}
                            onChangeText={setB}
                            placeholder={'C'}
                            keyboardType={'numeric'}
                            style={styles.input}
                        />
                    </ThemedView>
                    <ThemedView style={styles.calcXInputs}>
                        <TextInput
                            value={c}
                            onChangeText={setC}
                            placeholder={'B'}
                            keyboardType={'numeric'}
                            style={styles.input}
                        />
                        <TextInput
                            value={x}
                            placeholder={'X'}
                            editable={false}
                            style={styles.input}
                        />
                    </ThemedView>
                </ThemedView>
                <Button
                    title={'Рассчитать'}
                    onPress={calculateX}
                    color={'#673ab7'}
                />
                <Button
                    title={'Сброс'}
                    onPress={resetXCalc}
                    color={'#f44336'}
                />

                <ThemedText type={'subtitle'}>История X</ThemedText>
                {history.map((item, index) => (
                    <ThemedText key={index}>{index + 1}. {item}</ThemedText>
                ))}
            </ThemedView>
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
            <ThemedView style={styles.lastStepContainer}>
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
        </ScrollView>
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
    xContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 8,
        margin: 4,
    },
    calcXInputs: {
        flex: 1,
        alignItems: 'flex-start',
    },
    input: {
        padding: 8,
        marginBottom: 8,
        width: '90%',
    },
    lastStepContainer: {
        gap: 8,
        marginTop: 16,
        marginLeft: 16,
        marginRight: 16,
        padding: 16,
        borderRadius: 16,
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        marginBottom: 8 * 2,
    }
});
