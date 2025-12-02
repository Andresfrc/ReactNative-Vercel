import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, TextInput } from "react-native";
import estilos from "../componentes/Estilos/Style";
import RenderItem from "../componentes/pages/RenderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { scheduleTaskNotification } from "../notifiactionHandler";
import * as Notifications from 'expo-notifications';

export interface Task {
  title: string;
  done: boolean;
  date: Date;
}

export default function Tablero() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Guardar datos
  const storeData = async (value: Task[]) => {
    try {
      await AsyncStorage.setItem("my-todo", JSON.stringify(value));
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // Obtener datos - Convertir strings a Date
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-todo");
      if (value !== null) {
        const tasksLocal = JSON.parse(value);
        // ✅ Convertir strings de fecha a objetos Date
        const tasksWithDates = tasksLocal.map((task: any) => ({
          ...task,
          date: new Date(task.date),
        }));
        setTasks(tasksWithDates);
      }
    } catch (error) {
      console.error("Error al cargar:", error);
    }
  };

  // Solicitar permisos al iniciar
  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  // Cargar tareas al iniciar
  useEffect(() => {
    getData();
  }, []);

  // Manejar cambio de fecha
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      setShowTimePicker(true); // Mostrar selector de hora después
    }
  };

  // Manejar cambio de hora
  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (event.type === "set" && selectedTime) {
      const newDate = new Date(date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDate(newDate);
    }
  };

  // Agregar tarea - ✅ Programar notificación aquí
  const addTask = async () => {
    if (text.trim() === "") return;

    const newTask: Task = {
      title: text,
      done: false,
      date: date,
    };

    const tmp = [...tasks, newTask];
    setTasks(tmp);
    storeData(tmp);
    setText("");
    
    // ✅ Programar notificación solo si la fecha es futura
    if (date > new Date()) {
      await scheduleTaskNotification(newTask.title, date);
      console.log(`✅ Notificación programada para: ${formatDate(date)}`);
    } else {
      console.log("⚠️ No se programó notificación (fecha pasada)");
    }
    
    setDate(new Date()); // Resetear fecha después de agregar
  };

  // Marcar como completada - ✅ Reprogramar si se desmarca
  const markDone = async (task: Task) => {
    const tmp = [...tasks];
    const index = tmp.findIndex((el) => el.title === task.title);
    if (index !== -1) {
      tmp[index].done = !tmp[index].done;
      setTasks(tmp);
      storeData(tmp);
      
      // ✅ Reprogramar solo si se desmarca Y la fecha es futura
      if (!tmp[index].done && new Date(tmp[index].date) > new Date()) {
        await scheduleTaskNotification(
          tmp[index].title,
          new Date(tmp[index].date)
        );
        console.log(`✅ Notificación reprogramada: ${tmp[index].title}`);
      }
    }
  };

  // Eliminar tarea
  const deleteFunction = (task: Task) => {
    const tmp = tasks.filter((el) => el.title !== task.title);
    setTasks(tmp);
    storeData(tmp);
  };

  // Formato de fecha
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.title}>Lista de tareas</Text>

      <View style={estilos.inputcontainer}>
        <View style={estilos.caja_tarea}>
          <TextInput
            placeholder="Escriba"
            style={estilos.textinput}
            value={text}
            onChangeText={(t: string) => setText(t)}
          />

          <TouchableOpacity
            style={estilos.boton_fecha}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>📅</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <TouchableOpacity style={estilos.boton} onPress={addTask}>
          <Text style={estilos.texto_boton}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <RenderItem
            item={item}
            markDone={() => markDone(item)}
            deleteFunction={() => deleteFunction(item)}
          />
        )}
      />
    </View>
  );
}