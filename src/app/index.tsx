import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ReadyBridge</Text>

      <Text style={styles.title}>
        Be ready when it matters most.
      </Text>

      <Text style={styles.subtitle}>
        Keep important information, trusted contacts, and emergency plans in one place.
      </Text>

      <TouchableOpacity
  style={styles.mainButton}
  onPress={() => router.push('/plan')}
>
  <Text style={styles.mainButtonText}>
    Create Emergency Plan
  </Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>
          Trusted Contacts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>
          Important Documents
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F7F8FA',
  },

  logo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 40,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 16,
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 40,
  },

  mainButton: {
    backgroundColor: '#111827',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
  },

  mainButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 14,
    marginBottom: 12,
  },

  secondaryButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});