import { StyleSheet } from "react-native";
export const onboardingstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
  },
  title: {
    paddingTop: 25,
    paddingBottom: 10,
    fontSize: 23,
    fontWeight: "bold",
    color: "#21465b",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    color: "#b5b5b5",
    fontSize: 15,
    paddingHorizontal: 30,
  },
  image: {
    resizeMode: "contain",
    height: "80%",
    width: "100%",
  },
});
