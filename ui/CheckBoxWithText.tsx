import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Используем иконки Expo

// Определяем типы пропсов
interface CheckBoxWithTextProps {
    label: string;
    onChange?: (checked: boolean) => void;
    checked?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export const CheckBoxWithText: React.FC<CheckBoxWithTextProps> = ({
       label,
       onChange,
       checked = false,
       style = {},
       textStyle = {}
}) => {
    const [isChecked, setIsChecked] = useState<boolean>(checked);

    const toggleCheckbox = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onChange?.(newValue); // Вызываем onChange, если он передан
    };

    return (
        <TouchableOpacity
            style={[styles.container, style]}
            onPress={toggleCheckbox}
            activeOpacity={0.7}
        >
            <View style={[styles.checkbox, isChecked && styles.checked]}>
                {isChecked && <Ionicons name="checkmark" size={20} color="white" />}
            </View>
            <Text style={[styles.text, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 2,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    checked: {
        backgroundColor: "#2DA1F4",
    },
    text: {
        fontSize: 16,
        color: "#333",
    },
});
