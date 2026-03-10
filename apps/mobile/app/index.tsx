import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Rural Logistics MVP</Text>
      <Text style={{ marginTop: 8, textAlign: 'center' }}>
        Single mobile app with role-based experiences for consumers, vendors, drivers, and hub
        hosts.
      </Text>
    </View>
  );
}
