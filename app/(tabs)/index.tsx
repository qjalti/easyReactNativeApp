import {Platform, StyleSheet, TextInput} from 'react-native';
import {useState} from 'react';

import {HelloWave} from '@/components/HelloWave';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

export default function HomeScreen() {
    const [meteorsPerMinute, setMPM] = useState('0');
    const [meteorsPerSecond, setMPS] = useState('0');

    const calculateLightningDistance = (value: string) => {
        console.log(value);
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
    return (
        <>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 1: Try it</ThemedText>
                <ThemedText>
                    Edit <ThemedText
                    type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to
                    see changes.
                    Press{' '}
                    <ThemedText type="defaultSemiBold">
                        {Platform.select({
                            ios: 'cmd + d',
                            android: 'cmd + m',
                            web: 'F12',
                        })}
                    </ThemedText>{' '}
                    to open developer tools.
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">Step 2: Explore</ThemedText>
                <ThemedText>
                    {`Tap the Explore tab to learn more about what's included in this starter app.`}
                </ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText
                    type={'subtitle'}
                >
                    Метеоры
                </ThemedText>
                <TextInput
                    onChangeText={calculateLightningDistance}
                    autoFocus
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
        </>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        margin: 16,
        padding: 16,
        borderRadius: 16,
        boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)'
    },
});
