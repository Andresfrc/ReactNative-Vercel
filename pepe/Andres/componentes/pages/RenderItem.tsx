import estilos from "../Estilos/Style"
import {  View, Text,  TouchableOpacity} from "react-native";

import {Task} from "../Tablero";
interface ItemProps{
    item:Task,
    markDone:(task:Task)=>void,
    deleteFunction:(task:Task)=>void
}
export default function RenderItem({ item,markDone,deleteFunction }: ItemProps) {
     const formatDate=(date:Date)=>{
        const d = typeof date==='string' ? new Date(date):date
        return d.toLocaleDateString('es-ES',{
            day:'2-digit',
            month:'2-digit',
            year:'numeric',
            hour:'2-digit',
            minute:'2-digit'
        })
    }
    return(
        <View>
            <TouchableOpacity onPress={()=>markDone(item)}>
                <Text style={item.done ? estilos.textDone : estilos.text}>{item.title}</Text>
                <Text>{formatDate(item.date)}</Text>
            </TouchableOpacity>

             
            {
                item.done && 
                (<TouchableOpacity 
                style = {estilos.removeBoton}
                onPress={()=>deleteFunction(item)}>
                    
                    <Text style = {estilos.removeText}>Eliminar </Text>
                </TouchableOpacity>)
            }

            
        </View>
    )
}

//DatetimePiker