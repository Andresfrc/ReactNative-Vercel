import { StyleSheet, Dimensions, Animated } from "react-native";

const estilos = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f9fafc",
    flex: 1,
  },

  bg: {
    flex: 1,
    resizeMode: "cover",
  },
  textoboton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
},

  
  picker: {
    height: 50,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  
  textB: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 15,
    marginBottom: 10,
    letterSpacing: 0.5,
  },

  text: {
    fontSize: 16,
    color: "#000000ff",
  },

  textinput: {
  height: 44,            // en lugar de flex:1
  borderColor: "#d1d5db",
  borderWidth: 1,
  borderRadius: 15,
  paddingVertical: 8,
  paddingHorizontal: 12,
  fontSize: 16,
  color: "#1f2937",     
  backgroundColor: "#fff",
  marginVertical: 6
},


  inputcontainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  view:{
    
  },

  caja_tarea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },

  boton_fecha: {
    backgroundColor: "#fb923c", // naranja elegante
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 10,
    marginLeft: 10,
    shadowColor: "#fb923c",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },

  boton: {
    backgroundColor: "#3b82f6", // azul moderno
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    width: "50%",
    paddingVertical: 12,
    shadowColor: "#3b82f6",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },

  texto_boton: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  itemcointaner: {
    paddingVertical: 20,
    borderBottomColor: "#d1d5db",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textDone: {
    fontSize: 16,
    color: "#22c55e",
    textDecorationLine: "line-through",
  },

  removeBoton: {
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  removeText: {
    color: "white",
  },

  ContenedorBoton: {
    flexDirection: "row",
    gap: 25,
    marginTop: 10,
  },
});

export default estilos;
