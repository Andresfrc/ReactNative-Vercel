import { View, Text as RNText, TouchableOpacity } from "react-native";
import { TextInput, ImageBackground } from "react-native";
import estilos from "./Estilos/Style";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function Inicio({navigation}) {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [miembro, SetMiembro] = useState("");

    const handleLogin = async () => {
        try {
                const res = await fetch("http://10.1.245.221:5000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                })
            });

            const data = await res.json();

            if (!data.ok) {
                alert(data.message);
                return;
            }

            alert("Bienvenido " + data.user.email);
            navigation.navigate("Tablero")

        } catch (err) {
             console.log("Error en handlelogin:", err);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <ImageBackground
            source={require('../assets/download.jpg')}
            resizeMode="cover"
        >
            <View style={estilos.view}>
                
                <RNText style={estilos.title}>Iniciar sesión</RNText>

                <RNText style={estilos.text}>Correo</RNText>
                <TextInput
                    style={estilos.textinput}
                    value={email}
                    onChangeText={setEmail}
                />

                <RNText style={estilos.text}>Contraseña</RNText>
                <TextInput
                    style={estilos.textinput}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <RNText style={estilos.text}>Membresia</RNText>
                <Picker
                    selectedValue={miembro}
                    onValueChange={(value) => SetMiembro(value)}
                >
                    <Picker.Item label="Seleccione una opción" value="" />
                    <Picker.Item label="Usuario" value="Usuario" />
                    <Picker.Item label="Miembro" value="Miembro" />
                </Picker>

                <TouchableOpacity style={estilos.boton} onPress={handleLogin}>
                    <RNText style={estilos.textoboton}>Entrar</RNText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[estilos.boton, { marginTop: 10, backgroundColor: "#444" }]}
                  onPress={() => navigation.navigate("Registro")}>
                  <RNText style={estilos.textoboton}>Crear cuenta</RNText>
                </TouchableOpacity>


            </View>
        </ImageBackground>
    );
}