import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";

const LIGHT_THEME = {
  BACKGROUND_COLOR: "#F1F2F3",
  TEXT_COLOR: "#222",
  BUTTON_COLOR: "#fff",
  MAIN_COLOR: "#f8970a",
  FADED_BUTTON_COLOR: "#D2D3DA",
};

const DARK_THEME = {
  BACKGROUND_COLOR: "#17171C",
  TEXT_COLOR: "#fff",
  BUTTON_COLOR: "#2E2F38",
  MAIN_COLOR: "#f8970a",
  FADED_BUTTON_COLOR: "#4E505F",
};

type Operator = "+" | "-" | "x" | "/" | "%";

interface ButtonProps {
  label: string;
  onPress: () => void;
  buttonStyle?: any;
  textStyle?: any;
  style?: any;
}

const CalculatorButton: React.FC<ButtonProps> = ({
  label,
  onPress,
  buttonStyle,
  textStyle,
  style,
}) => {
  return (
    <TouchableOpacity style={[style.button, buttonStyle]} onPress={onPress}>
      <Text style={[style.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default function App(): JSX.Element {
  const [displayValue, setDisplayValue] = useState("0");
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;
  const styles = createStyles(theme);

  const handleNumberPress = (num: string): void => {
    if (displayValue === "0") {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorPress = (op: Operator): void => {
    if (currentValue === null) {
      setCurrentValue(parseFloat(displayValue));
    } else if (operator) {
      const result = calculateResult();
      setCurrentValue(result);
      setDisplayValue(result.toString());
    }
    setOperator(op);
    setDisplayValue("0");
  };

  const calculateResult = (): number => {
    const value = parseFloat(displayValue);
    switch (operator) {
      case "+":
        return (currentValue || 0) + value;
      case "-":
        return (currentValue || 0) - value;
      case "x":
        return (currentValue || 0) * value;
      case "/":
        return (currentValue || 0) / value;
      case "%":
        return (currentValue || 0) % value;
      default:
        return value;
    }
  };

  const handleEqualPress = (): void => {
    if (operator && currentValue !== null) {
      const result = calculateResult();
      setCurrentValue(null);
      setOperator(null);
      setDisplayValue(result.toString());
    }
  };

  const handleClearPress = (): void => {
    setDisplayValue("0");
    setCurrentValue(null);
    setOperator(null);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.BACKGROUND_COLOR }]}
    >
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: theme.TEXT_COLOR,
          }}
        >
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={(newValue) => setIsDarkMode(newValue)}
          trackColor={{
            false: theme.MAIN_COLOR,
            true: theme.MAIN_COLOR,
          }}
          thumbColor="#fff"
          style={{ marginTop: 20 }}
        />
      </View>
      <View style={styles.display}>
        <Text style={[styles.displayText, { color: theme.TEXT_COLOR }]}>
          {displayValue}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CalculatorButton
          label="C"
          onPress={handleClearPress}
          buttonStyle={styles.buttonFade}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="√"
          onPress={handleClearPress}
          buttonStyle={styles.buttonFade}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="%"
          onPress={() => handleOperatorPress("%")}
          buttonStyle={styles.buttonFade}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="÷"
          onPress={() => handleOperatorPress("/")}
          buttonStyle={styles.buttonOpa}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="7"
          onPress={() => handleNumberPress("7")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="8"
          onPress={() => handleNumberPress("8")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="9"
          onPress={() => handleNumberPress("9")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="x"
          onPress={() => handleOperatorPress("x")}
          buttonStyle={styles.buttonOpa}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="4"
          onPress={() => handleNumberPress("4")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="5"
          onPress={() => handleNumberPress("5")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="6"
          onPress={() => handleNumberPress("6")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="-"
          onPress={() => handleOperatorPress("-")}
          buttonStyle={styles.buttonOpa}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="1"
          onPress={() => handleNumberPress("1")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="2"
          onPress={() => handleNumberPress("2")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="3"
          onPress={() => handleNumberPress("3")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="+"
          onPress={() => handleOperatorPress("+")}
          buttonStyle={styles.buttonOpa}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="0"
          onPress={() => handleNumberPress("0")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="•"
          onPress={() => handleNumberPress(".")}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="∞"
          onPress={handleEqualPress}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
          style={styles}
        />
        <CalculatorButton
          label="="
          onPress={handleEqualPress}
          buttonStyle={styles.buttonOpa}
          textStyle={styles.buttonText}
          style={styles}
        />
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    display: {
      flex: 2,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      paddingHorizontal: 20,
    },
    displayText: {
      fontSize: 50,
      fontWeight: "300",
    },
    button: {
      height: 70,
      width: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.BUTTON_COLOR,
      borderRadius: 10,
    },
    buttonOpa: {
      height: 70,
      width: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.MAIN_COLOR,
      borderRadius: 10,
    },
    buttonFade: {
      height: 70,
      width: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.FADED_BUTTON_COLOR,
      borderRadius: 10,
    },
    buttonEcu: {
      height: 70,
      width: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.BUTTON_COLOR,
      borderRadius: 10,
    },
    buttonText: {
      fontSize: 24,
      fontWeight: "400",
      textAlign: "center",
      color: theme.TEXT_COLOR,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 20,
      flexWrap: "wrap",
      rowGap: 10,
    },
  });

  return styles;
};
