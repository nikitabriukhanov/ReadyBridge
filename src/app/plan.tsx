import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PlanScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [instructions, setInstructions] = useState("");
  const [saved, setSaved] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loadData = async () => {
      const savedName = await AsyncStorage.getItem("name");
      const savedPhone = await AsyncStorage.getItem("phone");
      const savedContactName = await AsyncStorage.getItem("contactName");
      const savedContactPhone = await AsyncStorage.getItem("contactPhone");
      const savedInstructions = await AsyncStorage.getItem("instructions");

      if (savedName !== null) {
        setName(savedName);
      }

      if (savedPhone !== null) {
        setPhone(savedPhone);
      }

      if (savedContactName !== null) {
        setContactName(savedContactName);
      }

      if (savedContactPhone !== null) {
        setContactPhone(savedContactPhone);
      }

      if (savedInstructions !== null) {
        setInstructions(savedInstructions);
      }
    };

    loadData();
  }, []);

  const saveData = async () => {
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("phone", phone);
    await AsyncStorage.setItem("contactName", contactName);
    await AsyncStorage.setItem("contactPhone", contactPhone);
    await AsyncStorage.setItem("instructions", instructions);

    Keyboard.dismiss();

    setSaved(true);

    fadeAnim.setValue(0);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setSaved(false);
      });
    }, 1700);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Emergency Plan</Text>

          <Text style={styles.subtitle}>
            Keep your important information ready in one place.
          </Text>
        </View>

        <ScrollView
          style={styles.formScroll}
          contentContainerStyle={styles.formContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          bounces={true}
          alwaysBounceVertical={true}
        >
          <TextInput
            style={styles.input}
            placeholder="Your full name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={styles.input}
            placeholder="Emergency contact name"
            value={contactName}
            onChangeText={setContactName}
          />

          <TextInput
            style={styles.input}
            placeholder="Emergency contact phone"
            keyboardType="phone-pad"
            value={contactPhone}
            onChangeText={setContactPhone}
          />

          <TextInput
            style={[styles.input, styles.instructionsInput]}
            placeholder="Emergency instructions"
            value={instructions}
            onChangeText={setInstructions}
            multiline
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveData}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          {saved && (
            <Animated.Text
              style={[
                styles.savedText,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              Saved successfully
            </Animated.Text>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.back}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  keyboardView: {
    flex: 1,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 90,
    paddingBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 12,
  },

  formScroll: {
    flex: 1,
  },

  formContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  input: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    fontSize: 16,
  },

  instructionsInput: {
    height: 120,
  },

  saveButton: {
    width: "100%",
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },

  saveButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },

  savedText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 15,
    fontWeight: "600",
  },

  backButton: {
    position: "absolute",
    left: 24,
    bottom: 40,
  },

  back: {
    fontSize: 18,
  },
});
