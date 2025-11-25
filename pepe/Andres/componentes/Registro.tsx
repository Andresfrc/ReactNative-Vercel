import { View, Text as RNText, TouchableOpacity } from "react-native";
import { TextInput, ImageBackground } from "react-native";
import estilos from "./Estilos/Style";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function Registro({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [miembro, SetMiembro] = useState("");

    const handleRegistro = async () => {
        try {
            const res = await fetch("https://backend-reactnative.vercel.app/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    miembro
                })
            });

            const data = await res.json();

            if (!data.ok) {
                alert(data.message);
                return;
            }

            alert("Usuario registrado correctamente");
            navigation.navigate("Inicio");

        } catch (err) {
             console.log("Error en handleRegistro:", err);
            alert("Error al conectar con el servidor");
        }
    };

    return (
        <ImageBackground
            source={require('../assets/bob.jpg')}
            resizeMode="cover"
        >
            <View style={estilos.view}>

                <RNText style={estilos.title}>Registrarse</RNText>

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

                <RNText style={estilos.text}>Membresía</RNText>
                <Picker
                    selectedValue={miembro}
                    onValueChange={(value) => SetMiembro(value)}
                >
                    <Picker.Item label="Seleccione una opción" value="" />
                    <Picker.Item label="Usuario" value="Usuario" />
                    <Picker.Item label="Miembro" value="Miembro" />
                </Picker>

                <TouchableOpacity style={estilos.boton} onPress={handleRegistro}>
                    <RNText style={estilos.textoboton}>Registrarse</RNText>
                </TouchableOpacity>

            </View>
        </ImageBackground>
    );
}
