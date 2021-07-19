import React from "react";
import {
  StyleSheet,
} from "react-native";
import Routes from "./src/routes";


export default function App() {
  return (
   <>
    <Routes></Routes>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7F39FB",
    alignItems: "center",
    justifyContent: "center",
  },
});
