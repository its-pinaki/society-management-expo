import { StyleSheet } from "react-native";
import { FontSize,FontFamily,Color,Margin,Border,Padding } from "../../../../../GlobalStyles";

export const loginstyles = StyleSheet.create({
  iconview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  areua3: {
    fontSize: 14,
    color: "#919eabe6",
    fontWeight: "500",
  },
  icontouch: {
    backgroundColor: "black",
    padding: 8,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginLeft: 16,
  },
  imgview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  bottomview: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  inputview: {
    marginTop: 10,
    backgroundColor: "transparent",
    color: "gray",
    borderRadius: 20,
    // marginBottom: 24
  },
  loginbtn: {
    paddingVertical: 12,
    backgroundColor: "#FFd100",
    borderRadius: 20,
    marginTop: "10%",
  },
  logintxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "Gray",
    textAlign: "center",
  },
  signview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  error: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    paddingVertical: 100,
    backgroundColor: "white",
    padding: 30,
    borderRadius: 8,
  },

  modalContainer1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent1: {
    paddingVertical: 100,
    backgroundColor: "transparent",
    padding: 30,
    borderRadius: 8,
  },
  maincont: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  safearea: {
    display: "flex",
    height: "29%",
  },
  safeareaotp: {
    display: "flex",
    height: "50%",
  },
  safearealog: {
    display: "flex",
    flex: 1,
    height: "29%",
  },
  logoo: {
    width: 25,
    height: 25,
  },
  imgg: {
    width: 110,
    height: 110,
  },
  imgg2: {
    width: 300,
    height: 250,
  },
  checkbx: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 15,
  },
  already: {
    color: "#888888",
    fontWeight: "bold",
  },
  alreadylog: {
    fontWeight: "bold",
    color: "#FFD100",
  },
  linkText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  suppliertxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888888",
    textAlign: "center",
  },
  imageshowstyle: {
    marginLeft: Padding.p_xl,
    marginBottom: Padding.p_xl,
  },
  areua: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#888888",
    marginLeft: 10,
  },
  modalbtn: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Margin.m_2xs,
    backgroundColor: Color.yellow,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  buttonContainer1: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 16,
  },
  loadingContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  submitText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  nexttext: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containNext: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  inputContainer: {
    marginHorizontal: 5,
  },
  container1: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: "#fff",
  },
  inputotp: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container4: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
  },

  choicecontainer: {
    backgroundColor: "white",
    elevation: 5,
    width: "80%",
    // height: '50%',
    borderRadius: 12,
    // alignItems: 'center',
    justifyContent: "center",
    padding: 30,
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  selectedOptionItem: {
    backgroundColor: "blue",
  },
  optionText: {
    fontSize: 18,
    color: "black",
  },
  labelContainer: {
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  wheelsText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ApplySuccessPage
  containerSucc: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  redText: {
    color: "red",
  },
  blueText: {
    color: "blue",
  },
  animation2: {
    width: "100%",
    height: "50%",
    marginBottom: 20,
  },
  succtext1: {
    height: "35%",
  },
  succtext2: {
    height: "25%",
  },
  greenText: {
    color: "green",
  },
  areuavie: {
    justifyContent: "center",
    // padding: 10
  },
  downloadButton: {
    alignItems: "flex-end",
    marginTop: -15,
  },
  buttonTextInfo: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  areua2: {
    borderBottomColor: Color.yellow,
    borderBottomWidth: 2,
    paddingVertical: 10,
    marginBottom: 10,
  },
});
